import QUnit from 'qunit';
import { warn } from '@ember/debug';

const SINON = self.sinon;

export function createSandbox() {
  const sandbox = SINON.sandbox.create();
  QUnit.config.current.testEnvironment.sandbox = self.sinon = sandbox;

  sandbox.sandbox = {
    create() {
      warn(
        'Explicitly calling `sinon.sandbox.create()` in conjunction with ember-sinon-sandbox is not recommended. Please use `this.sandbox` available in your tests to access sinon.',
        true,
        {
          id: 'ember-sinon-sandbox'
        }
      );

      return sandbox;
    }
  }

  sandbox.assert = {};
  Object.keys(SINON.assert).forEach(assertMethod => {
    sandbox.assert[assertMethod] = function() {
      throw new Error('The `sinon.assert` API is not avaiable in conjunction with ember-sinon-sandbox. Please use your test framework\'s assert API.');
    }
  });

  sandbox.fakeServer = {
    create() {
      throw new Error('The `sinon.fakeServer` API is not available in conjunction with ember-sinon-sandbox.');
    }
  }
}

export function restoreSandbox() {
  self.sinon.restore();
  self.sinon = null;
}

export default function setupSinonSandbox(testEnvironment = QUnit) {
  testEnvironment.testStart(createSandbox);
  testEnvironment.testDone(restoreSandbox);
}
