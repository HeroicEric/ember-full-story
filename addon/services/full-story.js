import Service from '@ember/service';
import {get, computed} from '@ember/object';
import {not} from '@ember/object/computed'


export default Service.extend({

  /**
   * Invoke full story method
   * @private
   * @param  {string} method name of method
   * @param  {params} params params to pass to full story
   * @return {[type]}        [description]
   */
  invoke(method, ...params) {
    if (!get(this, 'fsLoaded')) {
      return false
    }
    let fs = get(this, 'fsNamespace');
    return window[fs][method].apply(this, params)
  },

  /**
   * check against fastboot
   * @private
   * @type {[type]}
   */
  _canExecute: not('fastboot'),

  /**
   * Check fs property
   * @private
   * @param  {string} prop `_fs_propname`
   * @return {bool}
   */
  checkProp(prop) {
    if (!get(this, '_canExecute')) {
      return false
    }

    return window[prop] || false;
  },

  /**
   * is fullstory fsLoaded
   * @property
   * @public
   * @return {[type]} [description]
   */
  fsLoaded: computed(function() {
    return this.checkProp('_fs_loaded')
  }),


  /**
   * fsNamespace
   * @property
   * @private
   * @return {[type]} [description]
   */
  fsNamespace: computed(function() {
    return this.checkProp('_fs_namespace')
  }),

  /**
   * full story host property
   * @property
   * @public
   * @return boolean
   */
  fsHost: computed(function() {
    return this.checkProp('_fs_host');
  }),

  /**
   * full story org g
   * @property
   * @public
   * @return string
   */
  fsOrg: computed(function() {
    return this.checkProp('_fs_org')
  }),

  /**
   * identify user data
   * @param  {string} uid [description]
   */
  identify(uid, params) {
    return this.invoke('identify', uid, params);
  },

  /**
   * Set User Variables
   * send additional user details to full fullstory
   * @param {Object} params note: this should be a pojo
   */
  setUserVars(params) {
    return this.invoke('setUserVars', params);
  },

  getCurrentSessionURL() {
    return this.invoke('getCurrentSessionURL');
  },

  shutdown() {
    return this.invoke('shutdown');
  },

  restart() {
    return this.invoke('restart');
  },

  log(label, message) {
    return this.invoke('log', label, message)
  }
});
