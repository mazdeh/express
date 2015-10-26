  $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
  });

  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
  };



  var Users = Backbone.Collection.extend({
    url: '/users'
  });

  var User = Backbone.Model.extend({
    urlRoot: '/users'
  });


  var UserListView = Backbone.View.extend({
    el: '.page',
    render: function () {
      var users = new Users();
      var that = this;
      users.fetch({
        success: function(users) {
          console.log(users)
          // underscore
          var template = _.template($('#user-list-template').html(), { users: users.models });
          that.$el.html(template);
        }
      });
    }
  });

  var EditUserView = Backbone.View.extend({
    el: '.page',
    render: function (options) {
      if (options.id) {
        var user = new User({id: options.id});
        var that = this;
        user.fetch({
          success: function(user) {
            var template = _.template($('#edit-user-template').html(), { user: user});
            that.$el.html(template);
          }
        })
      } else {
        var template = _.template($('#edit-user-template').html(), { user: null });
        this.$el.html(template);
      }
    },
    events: {
      'submit .edit-user-form': 'saveUser'
    },
    saveUser: function (ev) {
      var userDetails = $(ev.currentTarget).serializeObject();
      var user = new User(); // instantiate the Model
      user.save(userDetails, {
        success: function(user) {
          console.log('success')
          router.navigate('', { trigger: true });
        }
      });
      return false;
    }
  });
  
  var Router = Backbone.Router.extend({
    routes: {
      "": "home",
      "new": "editUser",
      "edit/:id": "editUser"
    }
  });

  // instantiating Backbone classes
  var router = new Router();
  var userListView = new UserListView();
  var editUserView = new EditUserView();
  
  // watching for specific URL's
  router.on('route:home', function() {
    userListView.render();
  });
  router.on('route:editUser', function(id) {
    editUserView.render({id: id});
  });

  Backbone.history.start();
