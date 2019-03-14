const Config = require("config");
const Eos = require("eosjs");
const fetch = require("node-fetch"); // node only; not needed in browsers
const { TextDecoder, TextEncoder } = require("text-encoding"); // node, IE11 and IE Edge Browsers
let defaultPrivateKey = require("../config/credentials").defaults.privateKey;


// Default configuration
config = {
  chainId: Config.chainId, // 32 byte (64 char) hex string
  keyProvider: [defaultPrivateKey], // WIF string or array of keys..
  httpEndpoint: Config.nodeos_url,
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}

eos = Eos(config)
exports.reveal = function(betId, seedInHash) {
  return eos.transaction(
    {
      actions: [
        {
          account: Config.account,
          name: "reveal",
          authorization: [
            {
              actor: Config.authorizationActor,
              permission: "active"
            }
          ],
          data: {
            id: betId,
            seed: seedInHash
          }
        }
      ]
    }
  );
};
