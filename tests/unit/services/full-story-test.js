import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';


moduleFor('service:full-story', 'Unit | Service | full story', {
  beforeEach() {
    window._fs_namespace = "FS"
    window._fs_loaded = true;
  },

});

test('`invoke` calls the method named in full story', function(assert) {
  let service = this.subject();
  let idspy = sinon.spy();
  window.FS = {
    identify: idspy,
  };

  let id = '1234-5677'
  service.invoke('identify', id);

  assert.ok(idspy.calledOnce, 'It was called with the correct method name');
  assert.ok(idspy.calledWith(id), 'It was called with correct args');
});

test('Method names calls underlying full story method', function(assert) {
  let service = this.subject(),
      userspy = sinon.spy();

  window.FS = {
    setUserVars: userspy
  }

  let props = {foo: "bsar"};
  service.setUserVars(props);

  assert.ok(userspy.calledOnce, 'setUserVars passed to fullstory');
  assert.ok(userspy.calledWith(props), 'It was called with correct args');
})

test('compute properties should match underlying properties', function(assert) {
  let service = this.subject();
  assert.equal(service.get('fsLoaded'), window._fs_loaded)

  window._fs_namespace = "ABCD"
  assert.equal(service.get('fsNamespace'), window._fs_namespace);
})
