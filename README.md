# Ember-Sinon-Sandbox 

[![Greenkeeper badge](https://badges.greenkeeper.io/scalvert/ember-sinon-sandbox.svg)](https://greenkeeper.io/)

![Build Status](https://travis-ci.org/cibernox/ember-native-dom-helpers.svg?branch=master)
[![npm version](https://badge.fury.io/js/ember-sinon-sandbox.svg)](https://badge.fury.io/js/ember-sinon-sandbox)

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

### Accessing Sinon from Within Tests

The `ember-sinon-sandbox` addon converts the global sinon object to a sandbox by default for each test. Additionally, in your tests you will be able to access the same sandboxed version of sinon via the `this.sandbox` property available within the test's scope:

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

* `git clone git@github.com:scalvert/ember-sinon-sandbox.git`
* `cd ember-sinon-sandbox`
* `yarn`

### Running Tests

* `yarn test`
* `ember test`
* `ember test --server`
