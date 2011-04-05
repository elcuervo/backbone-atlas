class @Comment extends Backbone.Atlas.Model
  initialize: (attributes) ->
    @has attributes,
      commentable: Comment
      comments: CommentList
      author: User

  validate: (attrs) ->
    throw new Error("Comment: body required") if !attrs.body

class @CommentList extends Backbone.Atlas.Collection
  model: Comment

class @Post extends Backbone.Atlas.Model
  initialize: (attributes) ->
    @has      attributes, {
      comments: CommentList
      created_by: User
    }

class @User extends Backbone.Atlas.Model
