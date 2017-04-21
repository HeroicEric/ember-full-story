import Ember from 'ember';

export default Ember.Service.extend({
  identify(userId, userVars = {}) {
    window.FS.identify(userId, userVars);
  },
  setUserVars(userVars = {}) {
    window.FS.setUserVars(userVars);
  }
});
