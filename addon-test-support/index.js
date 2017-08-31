import Ember from 'ember';
import QUnit from 'qunit';

const { warn } = Ember;

const SINON = self.sinon;

export function createSandbox() {
  QUnit.config.current.testEnvironment.sandbox = self.sinon = SINON.sandbox.create();

  self.sinon.sandbox = {
    create() {
      warn(
        'Explicitly calling `sinon.sandbox.create()` in conjunction with ember-sinon-sandbox is not recommended. Please use `this.sandbox` available in your tests to access sinon.',
        true,
        {
          id: 'ember-sinon-sandbox'
        }
      );

      return self.sinon;
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
