import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupSinonSandbox from 'ember-sinon-sandbox/test-support/setup-sinon-sandbox';

module('Unit | ember-sinon-sandbox | Validates helper with hooks', function(hooks) {
  setupTest(hooks);
  setupSinonSandbox(hooks);

  hooks.beforeEach(function(assert) {
    assert.ok(this.sandbox);
  });

  test('Fake test name', function(assert) {
    assert.expect(1);
  })
});