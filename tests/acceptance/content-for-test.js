import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

const SCRIPT_BODY = `
(function(m,n,e,t,l,o,g,y){
  if (e in m && m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'); return;}
  g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
  o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
  y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
  g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};
  g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
  g.clearUserCookie=function(c,d,i){if(!c || document.cookie.match('fs_uid=[\`;\`]*\`[\`;\`]*\`[\`;\`]*\`')){
  d=n.domain;while(1){n.cookie='fs_uid=;domain='+d+
  ';path=/;expires='+new Date(0).toUTCString();i=d.indexOf('.');if(i<0)break;d=d.slice(i+1)}}};
})(window,document,window['_fs_namespace'],'script','user');
`;


module('Acceptance | content for', function(hooks) {
  setupApplicationTest(hooks);

  test('the recording script is inserted into the document head', async function(assert) {
    await visit('/');

    let head = document.getElementsByTagName('head')[0].innerHTML;

    assert.ok(
      head.includes(SCRIPT_BODY),
      'script body is included'
    );
    assert.ok(
      head.includes(`window['_fs_debug'] = true;`),
      'includes debug value'
    );
    assert.ok(
      head.includes(`window['_fs_org'] = 'testOrg';`),
      'include org value'
    );
    assert.ok(
      head.includes(`window['_fs_host'] = 'testHost';`),
      'includes host value'
    );
    assert.ok(
      head.includes(`window['_fs_namespace'] = 'testNamespace';`),
      'includes namespace value'
    );
    assert.ok(
      head.includes(`window['_fs_is_outer_script'] = true;`),
      'includes runInIframe value'
    );
  });
});
