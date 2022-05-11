"use strict";

const instrumentation = require("./lib/instrumentation");

module.exports = [
  {
    type: "datastore",
    moduleName: "@mysql/xdevapi",
    onRequire: instrumentation.initialize,
  },
  {
    type: "datastore",
    moduleName: "../Protocol/Client",
    onRequire: instrumentation.initializeProtocolClient,
  },
];

