import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

moduleFor('service:full-story', 'Unit | Service | full story');

test('#identify', function(assert) {
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

test('#setUserVars', function(assert) {
  const setUserVarsSpy = sinon.spy();

  const oldFS = window.FS;
  window.FS = {
    setUserVars: setUserVarsSpy
  };

  let service = this.subject();

  service.setUserVars({
    someProp: 'abc'
  });

  assert.ok(
    setUserVarsSpy.calledWithExactly({
      someProp: 'abc'
    })
  );

  window.FS = oldFS;
});
