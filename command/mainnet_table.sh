# curl --request POST \
#   --url https://api.eosn.io/v1/history/get_table_rows \
#   --data '{"scope":"eosbetdice11","code":"eosbetdice11","table":"activebets","limit":100}' > test/eosbetdice11_mainnet_table.json


# curl --request POST \
#   --url https://eos.greymass.com/v1/chain/get_table_rows  \
#   --data '{"code":"eosbetdice11","scope":"eosbetdice11","table":"activebets", "limit":100}' > test/eosbetdice11_mainnet_table.json

curl 'https://eos.greymass.com/v1/chain/get_table_rows' \
   --data-binary '{"json":true,"code":"eosbetdice11","scope":"eosbetdice11","table":"activebets","table_key":"","limit":100}' --compressed \
   > test/eosbetdice11_mainnet_table.json