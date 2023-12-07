casper-client put-deploy -n http://65.108.0.148:7777/rpc \
--chain-name "casper-test" \
--payment-amount 500000000000 \
-k keys/secret_key.pem \
--session-path cep-78-enhanced-nft/contract/target/wasm32-unknown-unknown/release/contract.wasm \
--session-arg "collection_name:string='Mel'" \
--session-arg "collection_symbol:string='MEL'" \
--session-arg "total_token_supply:u64='10000'" \
--session-arg "ownership_mode:u8='2'" \
--session-arg "nft_kind:u8='1'" \
--session-arg "json_schema:string='{\"properties\":{\"coins\":{\"name\":\"coins\",\"description\":\"The amount of coins the user owns.\",\"required\":true},\"skins\":{\"name\":\"skins\",\"description\":\"A list of skins the user owns.\",\"required\":true},\"active_skin\":{\"name\":\"active_skin\",\"description\":\"The skin that the player has enabled.\",\"required\":true}}}'" \
--session-arg "allow_minting:bool='true'" \
--session-arg "owner_reverse_lookup_mode:u8='0'" \
--session-arg "nft_metadata_kind:u8='3'" \
--session-arg "identifier_mode:u8='0'" \
--session-arg "metadata_mutability:u8='1'"
