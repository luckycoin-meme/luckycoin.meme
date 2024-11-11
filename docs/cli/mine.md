主要提供了一个矿工的挖矿流程。支持单人矿池挖矿和单人挖矿。

```rust
    pub async fn mine(&self, args: MineArgs) -> Result<(), Error> {
        match args.pool_url {
            Some(ref pool_url) => {
                let pool = &Pool {
                    http_client: reqwest::Client::new(), 
                    pool_url: pool_url.clone(),
                };
                self.mine_pool(args, pool).await?;
            }
            None => {
                self.mine_solo(args).await;
            }
        }
        Ok(())
    }
```

## 单人挖矿

```rust
    async fn mine_solo(&self, args: MineArgs) {
        // 如果需要，打开账户
        let signer = self.signer();
        self.open().await;
        // 检查线程数
        self.check_num_cores(args.cores);
        // 开始循环挖矿
        let mut last_hash_at = 0;
        let mut last_balance = 0;
        loop {
            // 获取工作量证明
            let config = get_config(&self.rpc_client).await;
            // 打印当前状态信息
            let proof = get_updated_proof_with_authority(&self.rpc_client, signer.pubkey(), last_hash_at).await;
            println!(
                "\n\nStake: {} ORE\n{}  Multiplier: {:12}x",
                amount_u64_to_string(proof.balance),
                if last_hash_at.gt(&0) {
                    format!(
                        "  Change: {} ORE\n",
                        amount_u64_to_string(proof.balance.saturating_sub(last_balance))
                    )
                } else {
                    "".to_string()
                },
                calculate_multiplier(proof.balance, config.top_balance)
            );
            // 更新上次的哈希值和余额
            last_hash_at = proof.last_hash_at;
            last_balance = proof.balance;

            // 计算截止时间
            let cutoff_time = self.get_cutoff(proof.last_hash_at, args.buffer_time).await;
            // 构建Nonce索引
            let mut nonce_indices = Vec::with_capacity(args.cores as usize);
            for n in 0..(args.cores) {
                let nonce = u64::MAX.saturating_div(args.cores).saturating_mul(n);
                nonce_indices.push(nonce);
            }

            // 运行挖矿算法
            let solution = Self::find_hash_par(
                proof.challenge,
                cutoff_time,
                args.cores,
                config.min_difficulty as u32,
                nonce_indices.as_slice(),
            )
                .await;

            // 构建指令集
            let mut ixs = vec![ore_api::instruction::auth(proof_pubkey(signer.pubkey()))];
            let mut compute_budget = 500_000;

            // 根据条件增加计算预算并添加重置指令
            if self.should_reset(config).await && rand::thread_rng().gen_range(0..100).eq(&0) {
                compute_budget += 100_000;
                ixs.push(ore_api::instruction::reset(signer.pubkey()));
            }

            // 构建挖矿指令
            ixs.push(ore_api::instruction::mine(
                signer.pubkey(),
                signer.pubkey(),
                self.find_bus().await,
                solution,
            ));

            // 提交交易
            self.send_and_confirm(&ixs, ComputeBudget::Fixed(compute_budget), false)
                .await
                .ok();
        }
    }
```

## 矿池挖矿
```rust
async fn mine_pool(&self, args: MineArgs, pool: &Pool) -> Result<(), Error> {
        // 注册矿池成员(如果需要)
        let mut pool_member = pool.post_pool_register(self).await?;
        // 获取矿池成员的索引
        let nonce_index = pool_member.id as u64;
        // 获取链上的矿池账户信息
        let pool_address = pool.get_pool_address().await?;
        // 初始化链上矿池成员的状态
        let mut pool_member_onchain: ore_pool_api::state::Member;
        // 检查线程数
        self.check_num_cores(args.cores);
        // 开始循环挖矿
        let mut last_hash_at = 0;
        let mut last_balance: i64;
        loop {
            // 获取最新的挑战信息
            let member_challenge = pool.get_updated_pool_challenge(last_hash_at).await?;
            // 更新上次的余额和哈希值
            last_balance = pool_member.total_balance;
            last_hash_at = member_challenge.challenge.lash_hash_at;
            // 计算截止时间
            let cutoff_time = self.get_cutoff(last_hash_at, member_challenge.buffer).await;
            // 构建Nonce索引
            let num_total_members = member_challenge.num_total_members.max(1);
            let u64_unit = u64::MAX.saturating_div(num_total_members);
            let left_bound = u64_unit.saturating_mul(nonce_index);
            let range_per_core = u64_unit.saturating_div(args.cores);
            let mut nonce_indices = Vec::with_capacity(args.cores as usize);
            for n in 0..(args.cores) {
                let index = left_bound + n * range_per_core;
                nonce_indices.push(index);
            }
            // 运行挖矿算法
            let solution = Self::find_hash_par(
                member_challenge.challenge.challenge,
                cutoff_time,
                args.cores,
                member_challenge.challenge.min_difficulty as u32,
                nonce_indices.as_slice(),
            )
                .await;
            // 向矿池运营商提交解决方案
            pool.post_pool_solution(self, &solution).await?;
            // 获取更新后的矿池成员信息
            pool_member = pool.get_pool_member(self).await?;
            // 获取链上更新后的矿池成员信息
            pool_member_onchain = pool
                .get_pool_member_onchain(self, pool_address.address)
                .await?;
            // 打印进度信息
            println!(
                "Claimable ORE balance: {}",
                amount_u64_to_string(pool_member_onchain.balance)
            );
            if last_hash_at.gt(&0) {
                println!(
                    "Change of ORE credits in pool: {}",
                    amount_u64_to_string(
                        pool_member.total_balance.saturating_sub(last_balance) as u64
                    )
                )
            }
        }
    }
```
