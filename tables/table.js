const request = require("request-promise");
const config = require("config");
const _ = require("underscore");
const BetProxy = require("./bet.proxy");

// curl 'https://eos.greymass.com/v1/chain/get_table_rows' \
//    --data-binary '{"json":true,"code":"eosbetdice11","scope":"eosbetdice11","table":"activebets","table_key":"","limit":100}' --compressed \
//    > test/eosbetdice11_mainnet_table.json

var getTableRows = function() {
  var options = {
    method: "POST",
    url: config.nodeos_url + "/v1/chain/get_table_rows",
    body: {
      scope: config.table.scope, // 账号名
      code: config.table.code, // 合约名
      table: config.table.table,
      table_key: "",
      limit: 100,
      json: "true"
    },
    json: true
  };

  return request(options)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log("getTableRows err:", error);
      //throw new Error(error);
      // retry, possibly has problems here.
      return getTableRows();
    });
};

var getTableRowsAndStoreToDB = function() {
  getTableRows().then(rows => {
    // store each row into mongodb
    _.map(rows, function(row) {
      BetProxy.findBetByBetId(row.id).then(res => {
        if (!res) {
          let quantityStringList = row.amount.quantity.split(" ");
          let quantity = 0.0;
          let assetType = "EOS";
          if (quantityStringList.length === 2) {
            quantity = parseFloat(quantityStringList[0]);
            assetType = quantityStringList[1];
          }
          BetProxy.createBet(
            row.id,
            row.seed_hash,
            row.user_seed_hash,
            row.referrer,
            quantity,
            assetType,
            row.amount.contract,
	        row.created_at,
            row.expiration,
          ).then(res => {
            return null;
          });
        } else {
          return null;
        }
      });
    });
  });
};

exports.getTableRows = getTableRows;
exports.getTableRowsAndStoreToDB = getTableRowsAndStoreToDB;
