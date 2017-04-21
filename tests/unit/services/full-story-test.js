import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

moduleFor('service:full-story', 'Unit | Service | full story', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  const identifySpy = sinon.spy();

  const oldFS = window.FS;
  window.FS = {
    identify: identifySpy
  };

  let service = this.subject();

  service.identify(123, {
    someProp: 'abc'
  });

  assert.ok(
    identifySpy.calledWithExactly(123, {
      someProp: 'abc'
    })
  );

  window.FS = oldFS;
});
