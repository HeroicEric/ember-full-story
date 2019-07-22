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
    "  if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window[\"_fs_namespace\"].');} return;}",
    "  g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];",
    "  o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_host+'/s/fs.js';",
    "  y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);",
    "  g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};",
    "  g.shutdown=function(){g(\"rec\",!1)};g.restart=function(){g(\"rec\",!0)};",
    "  g.log = function(a,b) { g(\"log\", [a,b]) };",
    "  g.consent=function(a){g(\"consent\",!arguments.length||a)};",
    "  g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};",
    "  g.clearUserCookie=function(){};",
  "})(window,document,window['_fs_namespace'],'script','user');",
    "</script>"
  ].join('\n');
}

module.exports = {
  name: require('./package').name,

  config(/* environment, appConfig */) {
    return {
      'ember-full-story': {
        debug: false,
        enabledEnvironments: ['production'],
        host: 'www.fullstory.com',
        namespace: 'FS'
      }
    };
  },

  contentFor(type, config) {
    var environment = config['environment'];
    var addonConfig = config['ember-full-story'];
    var shouldInsertFs = addonConfig['enabledEnvironments'].indexOf(environment) > -1;

    if (type === 'head-footer' && shouldInsertFs) {
      fsValidateConfig(addonConfig);

      return fsRecordingSnipppet(addonConfig);
    }
  }
};
