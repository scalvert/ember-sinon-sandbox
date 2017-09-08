/* global sinon */
import { module, test } from 'qunit';
import setupSinonSandbox, { createSandbox, restoreSandbox, setOptions } from 'ember-sinon-sandbox/test-support';

module('Unit | ember-sinon-sandbox | No global access', {
  before() {
    setOptions({ errorOnGlobalSinonAccess: true });
  },

  after() {
    setOptions({ errorOnGlobalSinonAccess: false });
  }
});

test('errors when accessing the sinon global', function(assert) {
  assert.expect(2);

  createSandbox();

  assert.throws(() => {
    let sinon = self.sinon;
    sinon.spy();
  }, 'self.sinon is not available');

  assert.throws(() => {
    sinon.spy();
  }, 'sinon is not available');

  restoreSandbox();
});

test('calling `sinon.sandbox.restore()` noops to ensure restoration is controlled', function(assert) {
  assert.expect(2);

  createSandbox();

  this.sandbox.spy();

  assert.equal(this.sandbox.fakes.length, 1);

  this.sandbox.restore();

  assert.equal(this.sandbox.fakes.length, 1);

  restoreSandbox();
});

test('using sinon.assert.* methods throw an error when `errorOnGlobalSinonAccess`', function(assert) {
  assert.expect(1);

  setOptions({ errorOnGlobalSinonAccess: true });
  createSandbox();

  assert.throws(() => {
    this.sandbox.assert.calledOnce()
  }, 'sinon.assert methods throw an error');

  restoreSandbox();
});

test('using sinon.fakeServer.create throws an error', function(assert) {
  assert.expect(1);

  createSandbox();

  assert.throws(() => {
    this.sandbox.fakeServer.create()
  }, 'sandbox.fakeServer.create throws and error');

  restoreSandbox();
});

test('ensures sandbox is restored correctly', function(assert) {
  assert.expect(1);

  createSandbox();
  restoreSandbox();

  assert.notOk(this.sandbox, 'Sandbox is restored');
});

test('ensures sandbox instances are different for each test', function(assert) {
  assert.expect(10);

  let previousSandbox;

  for (let i = 0; i < 10; i++) {
    createSandbox();
    assert.notEqual(previousSandbox, this.sandbox, 'Sandbox instance is unique per test');
    previousSandbox = Object.assign({}, this.sandbox);
    restoreSandbox();
  }
});

test('configuring setup/restore', function(assert) {
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
    errorOnGlobalSinonAccess: true
  };

  setupSinonSandbox(options);

  assert.ok(testStartCalled, 'testEnvironment.testStart is called');
  assert.ok(testDoneCalled, 'testEnvironment.testDone is called');
});
