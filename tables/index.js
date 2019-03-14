const Table = require("./table");
const config = require("config");

exports.start = function() {
  let intervalId = setInterval(() => {
    Table.getTableRowsAndStoreToDB();
  }, config.TimeIntervalOfFetchingTable);
};
