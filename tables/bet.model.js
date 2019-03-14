const mongoose = require("mongoose");
const Promise = require("bluebird");
const conn = require("../mongo/connection.js");

mongoose.Promise = Promise;
const Schema = mongoose.Schema;

let BetSchema = new Schema({
  betId: {
    type: String,
    required: true
  },
  seedInSha256: String,
  seedHash: String,
  userSeedHash: String,
  referrer: String,
  amount: {
    quantity: Number,
    assetType: String,
    contract: String
  },
  createAt: Date,
  expiration: String,
  hasRevealed: {
    type: Boolean,
    default: false
  },
  docCreateAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = conn.model("bet", BetSchema);
