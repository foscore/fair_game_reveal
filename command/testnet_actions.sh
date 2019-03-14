
## Testnet
curl --request POST \
  --url api-kylin.eosasia.one/v1/history/get_actions \
  --data '{"account_name":"eosbetdice11", "pos": -1, "offset": -20}'  > test/eosbetdice11_testnet.json

