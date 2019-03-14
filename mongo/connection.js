// 连接MongoDB
"use strict";

const logger = require("../helpers/logger.js");
const Promise = require("bluebird");
const mongoose = require("mongoose");
mongoose.Promise = Promise;


const mongodbURI = `mongodb://${process.env.MONGO_HOST}/mooncake-${process.env.NODE_ENV}?replicaSet=rs0`;

console.log("mongodb uri:", mongodbURI);

var conn = mongoose.createConnection(mongodbURI,
{
    server:
    {
        socketOptions:
        {
            keepAlive: 120
        }
    },
    replset:
    {
        socketOptions:
        {
            keepAlive: 120
        }
    }
});

conn.on('connected', function()
{
    logger.info("connect to mongodb success");
});

conn.on('disconnected', function()
{
    logger.error("mongodb disconnected");
    // fundebug.notifyError(new Error("mongodb disconnected"));
});

module.exports = conn;
