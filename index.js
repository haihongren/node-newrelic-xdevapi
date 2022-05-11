"use strict";

/**
 * Allows users to `require('@newrelic/couchbase')` directly in their app.
 */
const newrelic = require("newrelic");
const instrumentation = require("./lib/instrumentation");

newrelic.instrumentDatastore({
  moduleName: "@mysql/xdevapi",
  onRequire: instrumentation.initialize,
  onError: function myErrorHandler(err) {
    console.error(err.message, err.stack);
    process.exit(-1);
  }
});

newrelic.instrumentDatastore({
  moduleName: "../Protocol/Client",
  onRequire: instrumentation.initializeProtocolClient,
  onError: function myErrorHandler(err) {
    console.error(err.message, err.stack);
    process.exit(-1);
  },
});
