[![New Relic Experimental header](https://github.com/newrelic/open-source-office/raw/master/examples/categories/images/Experimental.png)](https://github.com/newrelic/open-source-office/blob/master/examples/categories/index.md#new-relic-experimental)


# New Relic JavaScript Instrumentation for MySQL Connector/Node.js xdevapi

Instrumentation for MySQL Connector/Node.js supporting xdevapi version v8.0.25

MySQL Connector/Node.js instrumentation for use with the [Node agent](https://github.com/newrelic/node-newrelic).
This module is a dependency of the agent and is installed with it by running:

```sh
npm install git+https://github.com/haihongren/node-newrelic-xdevapi.git
```

```js
// index.js
require("newrelic"); // from the newrelic agent install
require("@newrelic/xdevapi");
```

### Supported modules

- [`xdevapi`](https://www.npmjs.com/package/@mysql/xdevapi) version v8.0.25

For more information, please see the agent [installation guide][1], and
[compatibility and requirements][2].

[1]: https://docs.newrelic.com/docs/agents/nodejs-agent/installation-configuration/install-nodejs-agent
[2]: https://docs.newrelic.com/docs/agents/nodejs-agent/getting-started/compatibility-requirements-nodejs-agent
