'use strict';

window.App = {};


require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash',
    //bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'  
  }
});

require([
  'backbone',
  'routes/dirapp'
], function (Backbone, Router) {
	App.router = new Router();
	Backbone.history.start();
});
