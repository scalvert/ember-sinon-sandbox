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

## Contributing

### Installation

* `git clone git@github.com:scalvert/ember-sinon-sandbox.git`
* `cd ember-sinon-sandbox`
* `yarn`

### Running Tests

* `yarn test`
* `ember test`
* `ember test --server`
