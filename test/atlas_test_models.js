(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  this.Comment = (function() {
    function Comment() {
      Comment.__super__.constructor.apply(this, arguments);
    }
    __extends(Comment, Backbone.Atlas.Model);
    Comment.prototype.initialize = function(attributes) {
      return this.has(attributes, {
        comments: CommentList,
        author: User
      });
    };
    return Comment;
  })();
  this.CommentList = (function() {
    function CommentList() {
      CommentList.__super__.constructor.apply(this, arguments);
    }
    __extends(CommentList, Backbone.Atlas.Collection);
    CommentList.prototype.model = Comment;
    return CommentList;
  })();
  this.Post = (function() {
    function Post() {
      Post.__super__.constructor.apply(this, arguments);
    }
    __extends(Post, Backbone.Atlas.Model);
    Post.prototype.initialize = function(attributes) {
      return this.has(attributes, {
        comments: CommentList,
        created_by: User
      });
    };
    return Post;
  })();
  this.User = (function() {
    function User() {
      User.__super__.constructor.apply(this, arguments);
    }
    __extends(User, Backbone.Atlas.Model);
    return User;
  })();
}).call(this);
