## Mainnet
curl --request POST \
  --url https://api.eosn.io/v1/history/get_actions \
  --data '{"account_name":"eosbetdice11", "pos": -1, "offset": -20}' > test/eosbetdice11_mainnet.json