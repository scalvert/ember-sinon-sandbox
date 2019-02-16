# ember-sinon-sandbox

![Build Status](https://api.travis-ci.org/scalvert/ember-sinon-sandbox.svg?branch=master)
[![npm version](https://badge.fury.io/js/ember-sinon-sandbox.svg)](https://badge.fury.io/js/ember-sinon-sandbox)

This addon adds automatic sandboxing of sinon to your QUnit tests. This ensures that sinon is correctly isolated and doesn't leak state between test executions.

## Installation

Run:

```
ember install ember-sinon-sandbox
```

## Usage

The `ember-sinon-sandbox` addon supports two different API versions:

1. The classic API, which automatically wires up sandbox creation and restoration to `QUnit.testStart` and `QUnit.testDone` respectively
1. The new QUnit hooks API, which takes a `hooks` object and wires up sandbox creation and restoration to `beforeEach` and `afterEach` of the module.

### Classic API

To use, import the setup method from within your `tests/test-helper.js` file and execute it.

```js
import setupSinonSandbox from 'ember-sinon-sandbox/test-support/setup-global-sinon-sandbox';

...

setupSinonSandbox(options);
```

This will automatically wire-up the sandbox `sinon.sandbox.create` and `sandbox.restore` methods to QUnit `testStart` and `testDone` respectively.

### QUnit `hooks` API

To use, import the setup method from within your test file and execute it.

```js
import { setupSinonSandbox } from 'ember-sinon-sandbox/test-support';

...

module('my module', function(hooks) {
  setupSinonSandbox(hooks);

  test('my test', function(assert) {
    ...
  })
})
```

This will automatically wire-up the sandbox `sinon.createSandbox` and `sandbox.restore` methods to the module's `beforeEach` and `afterEach` respectively.

### Accessing Sinon from Within Tests

In each test you will be able to access the same sandboxed version of sinon via the `this.sandbox` property available within the test's scope:

```js
test('very important test happening here', function(assert) {
  const spy = this.sandbox.spy();

  ...
});
```

Both the global sinon object and the `this.sandbox` convenience property point to the same, test-specific instance of a sinon sandbox.

### Incremental Migration

To ease the path to migrate to using `ember-sinon-sandbox`'s version of a fully sandboxed sinon, the sandbox that's provided includes a `create` method, which returns the same instance of the sandbox referenced by `this.sandbox`. This allows you to incrementally remove usages of sandboxing within your application.

```js
test('another equally important test', function(assert) {
  // sandbox === this.sandbox
  const sandbox = sinon.sandbox.create();
  ...
});
```

## Contributing

### Installation

- `git clone git@github.com:scalvert/ember-sinon-sandbox.git`
- `cd ember-sinon-sandbox`
- `yarn`

### Running Tests

- `yarn test`
- `ember test`
- `ember test --server`
