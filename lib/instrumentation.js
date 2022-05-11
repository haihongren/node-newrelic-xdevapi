"use strict";
exports.initialize = function initialize(shim, xdevapi) {
  shim.setDatastore("xdevapi");
  shim.recordOperation(xdevapi, ["getSession"], {
    promise: true,
  });
};

exports.initializeProtocolClient = function initializeProtocolClient(
  shim,
  protocolClient
) {
  const proto = protocolClient.prototype;
  shim.setDatastore("xdevapi");
  shim.setParser(protcololQueryParser);

  shim.recordQuery(
    proto,
    ["crudInsert", "crudModify", "crudFind", "crudRemove"],
    describeQuery
  );
};

function describeQuery(shim, queryFn, fnName, args) {
  const session = args[0].getSession()._properties;
  const host = session.host;
  const port = session.port;

  var result = {
    stream: false,
    query: "Other",
    promise: true,
    record: true,
  };

  switch (fnName) {
    case "crudInsert":
      {
        let verb = "Insert ";
        let columns = args[0].getColumns();
        let values = args[0].getItems();
        let table = args[0].getTableName();
        let query = verb + ":: " + columns + ":: " + table;
        result = {
          stream: false,
          query: query,
          promise: true,
          record: true,
          parameters: {
            host: host,
            database_name: table,
            port_path_or_id: port,
          },
        };
      }
      break;
    case "crudRemove":
      {
        let verb = "Delete ";
        let columns = args[0].getCriteria();
        // let values = args[0].getOperations();
        let table = args[0].getTableName();
        let query = verb + ":: " + columns + ":: " + table;
        result = {
          stream: false,
          query: query,
          promise: true,
          record: true,
          parameters: {
            host: host,
            database_name: table,
            port_path_or_id: port,
          },
        };
      }
      break;
    case "crudModify":
      {
        let verb = "Update ";
        let columns = args[0].getCriteria();
        // let values = args[0].getOperations();
        let table = args[0].getTableName();
        let query = verb + ":: " + columns + ":: " + table;
        result = {
          stream: false,
          query: query,
          promise: true,
          record: true,
          parameters: {
            host: host,
            database_name: table,
            port_path_or_id: port,
          },
        };
      }
      break;
    case "crudFind":
      {
        let verb = "Select ";
        let columns = args[0].getCriteria();
        // let values = args[0].getOperations();
        let table = args[0].getTableName();
        let query = verb + ":: " + columns + ":: " + table;

        result = {
          stream: false,
          query: query,
          promise: true,
          record: true,
          parameters: {
            host: host,
            database_name: table,
            port_path_or_id: port,
          },
        };
      }
      break;

    default:
      // code block
      result = {
        stream: false,
        query: "unknown",
        promise: true,
        record: true,
      };
  }
  return result;
}

// query parser
function protcololQueryParser(query) {

  let parsedQuery = query.split("::");

  let operation = "";
  let collection = "";
  if (parsedQuery.length > 1) {
    operation = parsedQuery[0];
    collection = parsedQuery[2];
  }
  return { operation, collection, query };
}
