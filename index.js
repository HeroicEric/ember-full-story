/* jshint node: true */
'use strict';

function fsValidateConfig(config) {
  if (!config.org) {
    throw new Error('ember-full-story requires an org to be configured.');
  }
}

function fsRecordingSnipppet(config) {
  return [
    "<script>",
    "window['_fs_debug'] = false;",
    "window['_fs_host'] = 'www.fullstory.com';",
    "window['_fs_org'] = '" + config.org + "';",
    "(function(m,n,e,t,l,o,g,y){",
    "  g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];",
    "  o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';",
    "  y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);",
    "  g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){FS(l,v)};",
    "  g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;FS(o,v)};",
    "  g.clearUserCookie=function(d,i){d=n.domain;while(1){n.cookie='fs_uid=;domain='+d+",
    "  ';path=/;expires='+new Date(0);i=d.indexOf('.');if(i<0)break;d=d.slice(i+1)}}",
    "})(window,document,'FS','script','user');",
    "</script>"
  ].join('\n');
}

module.exports = {
  name: 'ember-full-story',

  contentFor: function(type, config) {
    if (type === 'head-footer') {
      fsValidateConfig(config);

      return fsRecordingSnippet(config);
    }
  }
};
