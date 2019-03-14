"use strict";

const BetModel = require("./bet.model");

exports.createBet = function(
  betId,
  seedHash,
  userSeedHash,
  referrer,
  quantity,
  assetType,
  contract,
  createAt,
  expiration
) {
  var bet = new BetModel({
    betId: betId,
    seedHash: seedHash,
    userSeedHash: userSeedHash,
    referrer: referrer,
    amount: {
      quantity: quantity,
      assetType: assetType,
      contract: contract
    },
    contract: contract,
    createAt: createAt,
    expiration: expiration
  });

  return bet.save();
};

exports.findBetByBetId = function(betId) {
  return BetModel.findOne({ betId: betId }).lean();
};

exports.findBetBySeedHash = function(seedHash) {
  return BetModel.findOne({ seedHash: seedHash }).lean();
};

exports.deleteBet = function(betId) {
  return BetModel.findOneAndRemove({ betId: betId }).lean();
};

exports.setRevealed = function(betId) {
  return BetModel.update({ expiration: betId }, { hasRevealed: true });
};

exports.updateSeedInSha256 = function(betId, seedInSha256) {
  return BetModel.update({ expiration: betId }, { seedInSha256: seedInSha256 }, {upsert: true });
};
