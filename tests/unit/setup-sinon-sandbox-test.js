import { module, test } from 'qunit';
import setupSinonSandbox from 'ember-sinon-sandbox/test-support/setup-sinon-sandbox';
import { createSandbox, restoreSandbox } from 'ember-sinon-sandbox/test-support/sinon-sandbox';

module('Unit | ember-sinon-sandbox | With global access', function() {
  [
    true,
    false
  ].forEach((errorOnGlobalSinonAccess) => {
    test(`configuring setup/restore when errorOnGlobalSinonAccess is ${errorOnGlobalSinonAccess}`, function(assert) {
      assert.expect(4);

      let beforeEachCalled = false;
      let afterEachCalled = false;

      let hooks = {
        beforeEach(callback) {
          beforeEachCalled = true;
          assert.equal(callback, createSandbox);
        },

        afterEach(callback) {
          afterEachCalled = true;
          assert.equal(callback, restoreSandbox);
        }
      };

      setupSinonSandbox(hooks);

      assert.ok(beforeEachCalled, 'hooks.beforeEach is called');
      assert.ok(afterEachCalled, 'hooks.afterEach is called');
    });
  });
});
