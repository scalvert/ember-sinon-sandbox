import QUnit, { module, test } from 'qunit';
import setupSinonSandbox, { createSandbox, restoreSandbox } from 'ember-sinon-sandbox/test-support';

module('Unit | ember-sinon-sandbox');

test('stores sandbox created as module property', function(assert) {
  assert.expect(3);

  assert.notOk(QUnit.config.current.testEnvironment.sandbox);

  createSandbox();

  const sandbox =  QUnit.config.current.testEnvironment.sandbox;

  assert.ok(sandbox, 'Sandbox is defined in testEnvironment');
  assert.equal(sandbox, self.sinon, 'Sandbox instances on testEnvironment and self are equal');
});

test('ensures sandbox is restored correctly', function(assert) {
  assert.expect(1);

  createSandbox();
  restoreSandbox();

  assert.notOk(self.sinon, 'Sandbox is restored');
});

test('ensures sandbox instances are different for each test', function(assert) {
  assert.expect(10);

  let previousSandbox;

  for (let i = 0; i < 10; i++) {
    createSandbox();
    assert.notEqual(previousSandbox, self.sinon, 'Sandbox instance is unique per test');
    previousSandbox = Object.assign({}, self.sinon);
    restoreSandbox();
  }
});

test('configuring setup/restore', function(assert) {
  assert.expect(2);

  let testStartCalled = false;
  let testDoneCalled = false;

  let testEnvironment = {
    testStart() {
      testStartCalled = true;
    },

    testDone() {
      testDoneCalled = true;
    }
  };

  setupSinonSandbox(testEnvironment);

  assert.ok(testStartCalled, 'testEnvironment.testStart is called');
  assert.ok(testDoneCalled, 'testEnvironment.testDone is called');
});
