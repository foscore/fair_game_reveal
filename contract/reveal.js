const config = require("config");
const BetProxy = require("../tables/bet.proxy");
const Table = require("../tables/table");
const EOSJS = require("../eosjs/index");
const events = require("events");
const eventEmitter = new events.EventEmitter();

exports.findBetAndReveal = function(seedAndExpireTimeObj) {
  let expiration_time = new Date();
  // 在过期之前一直查找, 默认设置1天过期。
  // 过期后放弃开奖，数据库依然有记录
  expiration_time.setHours(
    expiration_time.getHours() + config.ExpireTimeSpanInHour
  );
  recCallFindBet(seedAndExpireTimeObj, expiration_time);
};

function recUpdateBetSeed(betId, seedHash){
  setTimeout(function() {
    updateBetSeed(betId, seedHash);
  }, config.TimeIntervalOfSearchingMongo);
}

function updateBetSeed(betId, seedHash){
  // store seedInSha256 into mongodb
  BetProxy.updateSeedInSha256(betId, seedHash)
    .then(res => {})
    .catch(err => {
      console.log("err, store seedInSha256 failed:", betId, seedInSha256, err);
    });
}
function recCallFindBet(seedAndExpireTimeObj, expiration_time) {
  setTimeout(function() {
    findBet(seedAndExpireTimeObj, expiration_time);
  }, config.TimeIntervalOfSearchingMongo);
}

function findBet(seedAndExpireTimeObj, expiration_time) {
        // Fire the reveal event
        return eventEmitter.emit(
          "reveal",
          seedAndExpireTimeObj.expiration_timestamp,
          seedAndExpireTimeObj.seedInSha256
        );
}

eventEmitter.on("reveal", reveal);

function reveal(betId, seedHash) {
  let count = 0;
  recallReveal(betId, seedHash, count);
}

function recallReveal(betId, seedHash, count) {
  recUpdateBetSeed(betId, seedHash);
  setTimeout(function() {
    EOSJS.reveal(betId, seedHash)
      .then(res => {
    //console.log(res);
        recUpdateBetSeed(betId, seedHash);
        BetProxy.setRevealed(betId)
          .then(res => {})
          .catch(err => {
            console.log("set revealed failed:", err);
          });
      })
      .catch(err => {
        console.log("err:", betId, seedHash, count, err);
        recUpdateBetSeed(betId, seedHash);
        // 2018-12-17: check the Bet exists in the chain table or not
        // Table.getTableRows().then(rows => {
          // Note: rows can be undefined, when request failed.
          //       it is werid, since I defined recursive call
          //       to make http request until it success.
          // let betRow = -1;
          // if (rows) {
          //   betRow = rows.find(row => {
          //     return row.expiration == betId;
          //   });
          //   console.log("betRow:", betRow);
          // }
            count++;
            if (count < config.MaxRetryNumOfReveal) {
              recallReveal(betId, seedHash, count);
            } else {
              console.log("reveal finally still failed, betId: ", betId);
            }
      });
  }, config.TimeIntervalOfReval);
}
