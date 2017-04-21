import Ember from 'ember';

export default Ember.Service.extend({
  identify(userId, props = {}) {
    console.log(window.FS);
    window.FS.identify(userId, props);
  }
});
