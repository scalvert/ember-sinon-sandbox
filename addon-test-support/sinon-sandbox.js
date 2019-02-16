import QUnit from 'qunit';

const SINON = self.sinon;

let clockToRestore;

/**
 * Creates a `sandbox` propery on the test context for access within each test.
 * Additionally ensures fake timers that are created during a single test are
 * also restored.
 *
 * @public
 */
export function createSandbox() {
  let create =
    typeof SINON.createSandbox === 'function'
      ? SINON.createSandbox
      : SINON.sandbox.create;
  let sandbox = (QUnit.config.current.testEnvironment.sandbox = create());

  patchUseFakeTimers(sandbox);

  sandbox.__restore = sandbox.restore;
}

/**
 * Restores each sandbox at the end of each test.
 *
 * @public
 */
export function restoreSandbox() {
  let current = QUnit.config.current;

  if (clockToRestore) {
    clockToRestore.restore();
    clockToRestore = null;
  }

  current.testEnvironment.sandbox.__restore();
  current.testEnvironment.sandbox = null;
}

/**
 * Patches the `useFakeTimers` method in `sinon` to ensure
 * created clocks are tracked, and subsequently restored after
 * each test is complete. Calling this more than once within a single
 * test will result in an error thrown.
 *
 * @param {object} sandbox
 * @returns {object} a clock object returned from `useFakeTimers`
 */
function patchUseFakeTimers(sandbox) {
  let originalUseFakeTimers = sandbox.useFakeTimers;

  sandbox.useFakeTimers = function(...args) {
    if (clockToRestore) {
      throw new Error(
        "You called sinon's useFakeTimers multiple times within the same test. This can result in unknown behavior."
      );
    }

    let clock = originalUseFakeTimers(...args);

    clockToRestore = clock;

    return clock;
  };
}
