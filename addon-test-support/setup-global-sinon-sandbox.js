import { createSandbox, restoreSandbox } from './sinon-sandbox';

/**
 * Allows for creating and restoring a global sinon sandbox per test. This is
 * done via the `QUnit.testStart` and `QUnit.testDone` methods. This method also
 * optionally takes an `options` object, which allows you to further configure
 * whether or not the global `sinon` object is available within tests. This helps
 * guide users down the path of interacting with sinon strictly through the sandbox
 * API.
 *
 * @export
 * @param {Object} An object containing optional options
 * @param {boolean} options.errorOnGlobalSinonAccess If true, disables the global sinon object.
 * @public
 */
export default function setupSinonSandbox(options = {}) {
  let testEnvironment = options.QUnit || self.QUnit;

  testEnvironment.testStart(createSandbox);
  testEnvironment.testDone(restoreSandbox);
}
