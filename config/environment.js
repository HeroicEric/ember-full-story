/*jshint node:true*/
'use strict';

module.exports = function(environment /* appConfig */) {
  var config = {};

  if (environment === 'production') {
    config['enabled'] = true;
  } else {
    config['enabled'] = false;
  }

  return { 'ember-full-story': config };
};
