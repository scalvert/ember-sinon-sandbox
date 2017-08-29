import QUnit from 'qunit';

const SINON = self.sinon;

export function createSandbox() {
  QUnit.config.current.testEnvironment.sandbox = self.sinon = SINON.sandbox.create();
}

export function restoreSandbox() {
  self.sinon.restore();
  self.sinon = null;
}

export default function setupSinonSandbox(testEnvironment = QUnit) {
  testEnvironment.testStart(createSandbox);
  testEnvironment.testDone(restoreSandbox);
}
