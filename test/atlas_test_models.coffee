class @Comment extends Backbone.Atlas.Model
  initialize: (attributes) ->
    @has attributes,
      commentable: Comment
      comments: CommentList
      author: User

class @CommentList extends Backbone.Atlas.Collection
  model: Comment

class @Post extends Backbone.Atlas.Model
  initialize: (attributes) ->
    @has      attributes, comments: CommentList, created_by: User

class @User extends Backbone.Atlas.Model
