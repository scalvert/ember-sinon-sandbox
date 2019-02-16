import { module, test } from 'qunit';
import {
  createSandbox,
  restoreSandbox,
} from 'ember-sinon-sandbox/test-support/sinon-sandbox';

let previousSandbox;

module(`Unit | ember-sinon-sandbox`, function() {
  test('calling `sinon.sandbox.restore()` can be called explicitly and via `restoreSandbox`', function(assert) {
    assert.expect(2);

    const foo = () => true;
    const bar = { foo };

    createSandbox();

    this.sandbox.stub(bar, 'foo');

    assert.notEqual(bar.foo, foo);

    this.sandbox.restore();

    assert.equal(bar.foo, foo);

    restoreSandbox();
  });

  test('using useFakeTimers API continues to work', function(assert) {
    assert.expect(1);

    createSandbox();

    let clock = this.sandbox.useFakeTimers();

    assert.ok(
      clock,
      'The clock API continues to work after forced sandboxing.'
    );

    restoreSandbox();
  });

  test('using sinon.useFakeTimers correctly restores clocks', function(assert) {
    assert.expect(2);

    createSandbox();

    let clock = this.sandbox.useFakeTimers();

    clock.tick(10000);

    assert.equal(Date.now(), 10000);

    restoreSandbox();

    assert.notEqual(Date.now(), 10000);
  });

  test('using sinon.useFakeTimers multiple times in a single test throws', function(assert) {
    assert.expect(1);

    createSandbox();

    this.sandbox.useFakeTimers();

    assert.throws(() => {
      this.sandbox.useFakeTimers();
    }, /You called sinon's useFakeTimers multiple times within the same test\. This can result in unknown behavior\./);

    restoreSandbox();
  });

  test('ensures sandbox is restored correctly', function(assert) {
    assert.expect(1);

    createSandbox();
    restoreSandbox();

    assert.equal(
      this.sandbox,
      null,
      'Sandbox is set to null after restoration'
    );
  });

  test('ensures sandbox instances are different for each test', function(assert) {
    assert.expect(10);

    for (let i = 0; i < 10; i++) {
      createSandbox();
      assert.notEqual(
        previousSandbox,
        this.sandbox,
        'Sandbox instance is unique per test'
      );
      previousSandbox = this.sandbox;
      restoreSandbox();
    }
  });
});
