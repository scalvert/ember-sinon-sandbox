import QUnit from 'qunit';
import { warn } from '@ember/debug';

const SINON = self.sinon;
const REQUIRED_SANDBOX_APIS = ['clock'];

let errorOnGlobalSinonAccess;
let currentSandbox;

export function setOptions(options = {}) {
  errorOnGlobalSinonAccess = !!options.errorOnGlobalSinonAccess;
}

export function createSandbox() {
  currentSandbox = SINON.sandbox.create();

  if (errorOnGlobalSinonAccess) {
    disableSinonGlobal();
  } else {
    disableSinonGlobalAPIs(currentSandbox);
  }

  QUnit.config.current.testEnvironment.sandbox = currentSandbox;

  currentSandbox.__restore = currentSandbox.restore;
  currentSandbox.restore = function() {
    warn(
      'Explicitly calling `sinon.sandbox.restore()` in conjunction with ember-sinon-sandbox does not restore the sandbox. Sandboxes are automatically restored after each test.',
      true,
      {
        id: 'ember-sinon-sandbox'
      }
    )
  };
}

export function restoreSandbox() {
  currentSandbox.__restore();

  QUnit.config.current.testEnvironment.sandbox = currentSandbox = null;

  if (!errorOnGlobalSinonAccess) {
    self.sinon = null;
  }
}

function disableSinonGlobal() {
  Object.defineProperty(self, 'sinon', {
    get() {
      throw new Error('Sinon is not available globally because it has been disabled by setting `disableGlobalSinon` to `true` when setting up ember-sinon-sandbox.')
    }
  });
}

function disableSinonGlobalAPIs(sandbox) {
  for (let key in SINON) {
    if (!sandbox[key] && !REQUIRED_SANDBOX_APIS.includes(key)) {
      if (key === 'sandbox') {
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
      }
      else {
        Object.defineProperty(sandbox, key, {
          get() {
            throw new Error(`The sinon.${key} API is not available in conjunction with ember-sinon-sandbox.`);
          }
        })
      }
    }
  }

  self.sinon = sandbox;

  return sandbox;
}

export default function setupSinonSandbox(testEnvironment = QUnit, options = {}) {
  setOptions(options);

  testEnvironment.testStart(createSandbox);
  testEnvironment.testDone(restoreSandbox);
}
