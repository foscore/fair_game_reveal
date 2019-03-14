const Queue = require("bee-queue");
const config = require("config");
const seedQueue = new Queue(config.get('bequeueName'));
const Contract = require("../contract/reveal");

exports.start = function () {
  seedQueue.process(config.numOfWorkersForBeeQueue, function (job, done) {
    //console.log("job data:", job.data);
    let data = job.data;
    Contract.findBetAndReveal(data)
    return done(null);
  });
}