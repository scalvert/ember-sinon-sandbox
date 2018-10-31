import QUnit, { module, test } from 'qunit';
import {
  createSandbox,
  restoreSandbox,
  setOptions
} from 'ember-sinon-sandbox/test-support/sinon-sandbox';

module('Unit | ember-sinon-sandbox | With global access', function(hooks) {
  hooks.before(function() {
    setOptions({ errorOnGlobalSinonAccess: false });
  });

  test('stores sandbox created as module property', function(assert) {
    assert.expect(3);

    assert.notOk(QUnit.config.current.testEnvironment.sandbox);

    createSandbox();

    const sandbox =  QUnit.config.current.testEnvironment.sandbox;

    assert.ok(sandbox, 'Sandbox is defined in testEnvironment');
    assert.equal(sandbox, self.sinon, 'Sandbox instances on testEnvironment and self are equal');

    restoreSandbox();
  });

  test('stubbing out sandbox.create returns the already created sandbox', function(assert) {
    assert.expect(1);

    createSandbox();

    const createdSandbox = this.sandbox.sandbox.create();

    assert.equal(this.sandbox, createdSandbox, 'Sandbox created via sandbox.create is the same as the already created sandbox');

    restoreSandbox();
  });

  test('stubbing out sandbox.createSandbox returns the already created sandbox', function(assert) {
    assert.expect(1);

    createSandbox();

    const createdSandbox = this.sandbox.createSandbox();

    assert.equal(this.sandbox, createdSandbox, 'Sandbox created via sandbox.createSandbox is the same as the already created sandbox');

    restoreSandbox();
  });

  test('ensures sandbox is restored correctly', function(assert) {
    assert.expect(2);

    createSandbox();
    restoreSandbox();

    assert.equal(this.sandbox, null, 'Sandbox is set to null after restoration');
    assert.equal(self.sinon, null, 'self.sinon is set to null after restoration');
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
});
