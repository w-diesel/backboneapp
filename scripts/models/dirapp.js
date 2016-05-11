
define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var Worker = Backbone.Model.extend({
    url: '/server/worker/',

    defaults: {
		id: "",
		name: "",
		surname: "",
		age: ""
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    }
  });


  var Collection = Backbone.Collection.extend({
  	model: Worker
  });


  return {
	  Worker: Worker,
	  Collection: Collection,
  };

});
