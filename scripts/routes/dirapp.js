
define([
  'jquery',
  'backbone',
  'views/dirapp',
], function ($, Backbone, Views) {
  'use strict';

  var DirappRouter = Backbone.Router.extend({
    routes: {
		"list": function(){ Views.mainView.showListView() },
		"edit/:id": function(id){ Views.mainView.showEditView(id) },
	},
  });

  return DirappRouter;
});
