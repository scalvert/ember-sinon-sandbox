import { module, test } from 'qunit';
import {
  createSandbox,
  restoreSandbox,
  setOptions
} from 'ember-sinon-sandbox/test-support/sinon-sandbox';

[
  true,
  false
].forEach((errorOnGlobalSinonAccess) => {
  module(`Unit | ember-sinon-sandbox | With errorOnGlobalSinonAccess ${errorOnGlobalSinonAccess}`, function(hooks) {
    hooks.before(function() {
      setOptions({ errorOnGlobalSinonAccess });
    });

    test('calling `sinon.sandbox.restore()` can be called explicitly and via `restoreSandbox`', function(assert) {
      assert.expect(2);

      createSandbox();

      this.sandbox.spy();

      assert.equal(this.sandbox.fakes.length, 1);

      this.sandbox.restore();

      assert.equal(this.sandbox.fakes.length, 0);

      restoreSandbox();
    });

    test('using useFakeTimers API continues to work', function(assert) {
      assert.expect(1);

      createSandbox();

      let clock = this.sandbox.useFakeTimers();

      assert.ok(clock, 'The clock API continues to work after forced sandboxing.');

      restoreSandbox();
    });

    test('using useFakeXMLHttpRequest API continues to work', function(assert) {
      assert.expect(1);

      let requests = [];

      createSandbox();

      let fakeXHR = this.sandbox.useFakeXMLHttpRequest();
      fakeXHR.onCreate = (req) => {
        requests.push(req);
      };

      let xhr = new XMLHttpRequest();
      xhr.addEventListener("load", () => {});
      xhr.open("GET", "http://www.example.org/example.txt");
      xhr.send();

      assert.equal(requests.length, 1, 'The fake XHR API continues to work after forced sandboxing.');

      restoreSandbox();
    });

    test('using sinon.assert.* methods throws an error', function(assert) {
      assert.expect(1);

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
  });
});
