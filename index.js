'use strict';

function fsValidateConfig(addonConfig) {
  if (!addonConfig['org']) {
    throw new Error("ember-full-story requires ENV['ember-full-story']['org'] to be set when enabled.");
  }
}

function fsRecordingSnipppet(addonConfig) {
  return [
    "<script>",
    "window['_fs_debug'] = " + addonConfig.debug + ";",
    "window['_fs_host'] = '" + addonConfig.host + "';",
    "window['_fs_org'] = '" + addonConfig.org + "';",
    "window['_fs_namespace'] = '" + addonConfig.namespace + "';",
    "(function(m,n,e,t,l,o,g,y){",
    "  if (e in m && m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window[\"_fs_namespace\"].'); return;}",
    "  g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];",
    "  o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';",
    "  y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);",
    "  g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};",
    "  g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};",
    "  g.clearUserCookie=function(c,d,i){if(!c || document.cookie.match('fs_uid=[`;`]*`[`;`]*`[`;`]*`')){",
    "  d=n.domain;while(1){n.cookie='fs_uid=;domain='+d+",
    "  ';path=/;expires='+new Date(0).toUTCString();i=d.indexOf('.');if(i<0)break;d=d.slice(i+1)}}};",
    "})(window,document,window['_fs_namespace'],'script','user');",
    "</script>"
  ].join('\n');
}

module.exports = {
  name: 'ember-full-story',

  config: function(/* environment, appConfig */) {
    return {
      'ember-full-story': {
        debug: false,
        enabledEnvironments: ['production'],
        host: 'www.fullstory.com',
        namespace: 'FS'
      }
    };
  },

  contentFor: function(type, config) {
    var environment = config['environment'];
    var addonConfig = config['ember-full-story'];
    var shouldInsertFs = addonConfig['enabledEnvironments'].indexOf(environment) > -1;

    if (type === 'head-footer' && shouldInsertFs) {
      fsValidateConfig(addonConfig);

      return fsRecordingSnipppet(addonConfig);
    }
  }
};
