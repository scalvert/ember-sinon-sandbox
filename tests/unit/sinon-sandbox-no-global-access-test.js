/* global: sinon */
import { module, test } from 'qunit';
import { createSandbox, restoreSandbox, setOptions } from 'ember-sinon-sandbox/test-support';

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
    let sinon = self.sinon;
    sinon.spy();
  }, 'sinon is not available');

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
