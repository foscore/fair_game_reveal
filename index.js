// 默认ENV为"development"
if (!process.env.NODE_ENV)
{
    process.env.NODE_ENV = "development";
}

// 默认为开发环境, 虚拟机Ubuntu中的Mongo
if (!process.env.MONGO_HOST)
{
    process.env.MONGO_HOST = "127.0.0.1";
}

//const table = require("./tables/index");
//table.start();

const queue = require("./queue/index");
queue.start();
