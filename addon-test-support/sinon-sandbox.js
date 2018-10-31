import QUnit from 'qunit';
import { warn } from '@ember/debug';

const SINON = self.sinon;
const REQUIRED_SANDBOX_APIS = ['clock'];

let errorOnGlobalSinonAccess = false;

export function setOptions(options = {}) {
  errorOnGlobalSinonAccess = !!options.errorOnGlobalSinonAccess;
}

export function createSandbox() {
  let create = typeof SINON.createSandbox === 'function' ? SINON.createSandbox : SINON.sandbox.create;
  let sandbox = QUnit.config.current.testEnvironment.sandbox = create();

  if (errorOnGlobalSinonAccess) {
    disableSinonGlobal();
  } else {
    disableSinonGlobalAPIs(sandbox);
  }

  sandbox.__restore = sandbox.restore;
}

export function restoreSandbox() {
  QUnit.config.current.testEnvironment.sandbox.__restore();
  QUnit.config.current.testEnvironment.sandbox = null;

  if (!errorOnGlobalSinonAccess) {
    Object.defineProperty(self, 'sinon', { value: null });
  }
}

function disableSinonGlobal() {
  Object.defineProperty(self, 'sinon', {
    get() {
      throw new Error('Sinon is not available globally because it has been disabled by setting `disableGlobalSinon` to `true` when setting up ember-sinon-sandbox. https://git.io/v56JW')
    }
  });
}

function disableSinonGlobalAPIs(sandbox) {
  for (let key in SINON) {

    if (!sandbox[key] && REQUIRED_SANDBOX_APIS.indexOf(key) === -1) {
      if (key === 'createSandbox') {
        sandbox.createSandbox = function() {
          warnOnUsage('sinon.createSandbox');

          return sandbox;
        }
      } else if (key === 'sandbox') {
        sandbox.sandbox = {
          create() {
            warnOnUsage('sinon.sandbox.create');

            return sandbox;
          }
        }
      } else {
        Object.defineProperty(sandbox, key, {
          get() {
            throw new Error(`The sinon.${key} API is not available when using ember-sinon-sandbox.`);
          }
        })
      }
    }
  }

  Object.defineProperty(self, 'sinon', { value: sandbox });

  return sandbox;
}

function warnOnUsage(method) {
  warn(
    `Explicitly calling '${method}()' in conjunction with ember-sinon-sandbox is not recommended. Please use 'this.sandbox' available in your tests to access sinon.`,
    true,
    {
      id: 'ember-sinon-sandbox'
    }
  );
}
