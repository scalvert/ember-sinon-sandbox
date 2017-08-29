# Ember-Sinon-Sandbox 

This addon adds automatic sandboxing of sinon to your QUnit tests. This ensures that sinon is correctly isolated and doesn't leak state between test executions.

## Installation

Run either:

```
ember install ember-sinon-sandbox
```

or 

```
npm install --save-dev ember-sinon-sandbox
```

## Usage

To use, simply import the setup method from within your `tests/test-helper.js` file and execute it.

```js
import setupSinonSandbox from 'ember-sinon-sandbox/test-support';

...

setupSinonSandbox();
```

This will automatically wire-up the sandbox `sinon.sandbox.create` and `sandbox.restore` methods to QUnit `testStart` and `testDone` respectively.
