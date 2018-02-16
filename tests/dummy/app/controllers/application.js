
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  fullStory: service(),
  actions: {
    identify() {
      this.get('fullStory').identify('asdfasdf')
    },
    shutdown() {
      this.get('fullStory').shutdown()
    },
    restart() {
      this.get('fullStory').restart()
    },
    setUserVars() {
      let data = {"foo_str": "bar", "bat_bool": true}
      this.get('fullStory').setUserVars(data);
    },
    log() {
      this.get('fullStory').log('test');
    },
    getCurrentSessionURL() {
      this.get('fullStory').getCurrentSessionURL()
    }
  }
});
