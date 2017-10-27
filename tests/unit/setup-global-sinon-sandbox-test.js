import { module, test } from 'qunit';
import setupSinonSandbox from 'ember-sinon-sandbox/test-support/setup-global-sinon-sandbox';
import { createSandbox, restoreSandbox } from 'ember-sinon-sandbox/test-support/sinon-sandbox';

module('Unit | ember-sinon-sandbox | With global access');

[
  true,
  false
].forEach((errorOnGlobalSinonAccess) => {
  test(`configuring setup/restore when errorOnGlobalSinonAccess is ${errorOnGlobalSinonAccess}`, function(assert) {
    assert.expect(4);

    let testStartCalled = false;
    let testDoneCalled = false;

    let options = {
      QUnit: {
        testStart(callback) {
          testStartCalled = true;
          assert.equal(callback, createSandbox);
        },

        testDone(callback) {
          testDoneCalled = true;
          assert.equal(callback, restoreSandbox);
        }
      },
      errorOnGlobalSinonAccess
    };

    setupSinonSandbox(options);

    assert.ok(testStartCalled, 'testEnvironment.testStart is called');
    assert.ok(testDoneCalled, 'testEnvironment.testDone is called');
  });
});
