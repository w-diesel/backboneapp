define([
  'jquery',
  'underscore',
  'backbone',
  'models/dirapp'
], function ($, _, Backbone, Models) {
  'use strict';


  var MainView = Backbone.View.extend({
      el: '#dynamics',

      initialize: function(options){
		    this.collection = new Models.Collection();

            for(var i=1; i <= 10; i++){
			  this.collection.add({
                id: i,
                name: "name" +i,
                surname: "surname" +i ,
                age: 40 +i
			  });
            }
	  },

    showListView: function(){
        var view = new ListView({collection: this.collection});
        this.$el.html(view.render().el);
        App.listView = view;
	},

    showEditView: function(id){
		var model = this.collection.get(id);
		model = model ? model : new Models.Worker();
		
        this.$el.html( new EditView({model: model}).render().el ) 
    }
  });



  var ItemView = Backbone.View.extend({
	
	events:  {
		"click": function(id){ location = "#edit/" + this.model.id; } 
	},

	tagName: 'li',

	className: 'list-group-item',

	template: _.template("<span class='group-addon'><input type='checkbox'></span><b><%= name %></b><b> <%= surname %> </b>(<%= age %>)"),

    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
	  this.render();
	},

	render: function(){
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}

  });


  var ListView = Backbone.View.extend({

	tagName: 'ul',

	className: 'list-group',

    events: {
		'click #create_elem': "createNew"
	},

    initialize: function() {
      this.listenTo(this.collection, 'update', this.render);
    },

    render: function() {
      var self = this;
	  self.$el.append('<div class="btn-group" role="group">'+
			    '<button id="create_elem" type="button" class="btn btn-default">create</button>'+
				'<button id="delete_elems" type="button" class="btn btn-default">delete</button>'+
				'</div>');

	  this.collection.forEach(function(model){
		  self.$el.append(new ItemView({model: model}).el);
	  })
	  return this;
    },

	createNew: function(){
		location = "#/edit/0";
	}

  });



  var EditView = Backbone.View.extend({

    tagName: 'form',

    className: 'form-horizontal',

    events: {
		submit: "save"
	},

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },

	template: _.template(
	  '<input type="text" class="form-control" placeholder="NAME" name="name" value="<%= name %>" required=required >'+
	  '<input type="text" class="form-control" placeholder="SURNAME" name="surname" value="<%= surname %>" required=required >'+
	  '<input type="number" class="form-control" placeholder="AGE" name="age" value="<%= age %>" required=required >'+
      '<input type="submit">'
    ),

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

	save: function(e){
		e.preventDefault();
		var obj = {};
		this.$el.serializeArray().forEach(function(el){	
		    obj[el["name"]] = el["value"];
		})
		this.model.save(obj);
        if (! this.model.id ) App.mainView.collection.add(this.model);
		location = "#/list";
	}

  });


  App.mainView = new MainView();
  return {
	  mainView: App.mainView,
	  ListView: ListView,
	  EditView: EditView
  };

});
