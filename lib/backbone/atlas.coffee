# Usage example:
#
# class @Comment extends Backbone.Atlas.Model
#   initialize: (attributes) ->
#     @has attributes,
#       comments: CommentList
#       author: User
#
# class @CommentList extends Backbone.Atlas.Collection
#   model: Comment
#
# class @Post extends Backbone.Atlas.Model
#   initialize: (attributes) ->
#     @has attributes, comments: CommentList, created_by: User
#
# class @User extends Backbone.Atlas.Model
#

class Backbone.Atlas
  class @Collection extends Backbone.Collection
    update_attributes: (nested_attributes) ->
      this.refresh nested_attributes

  class @Model extends Backbone.Model

    propagate_attributes: -> _.extend this, this.attributes

    has: (attributes, relations) ->
      extended_relation = {}
      for relation_key, relation_class of relations
        extended_relation[relation_key] = new relation_class()

      _.extend(this.attributes, extended_relation)
      this.propagate_attributes()
      this.set attributes if attributes?

    update_attributes: (nested_attributes) ->
      this.set nested_attributes

    set: (args...) ->
      [attrs, options] = [args[0], args[1..-1]]
      for key, nested_attributes of attrs
        if key of this.attributes
          if this.get(key).update_attributes?
            this.get(key).update_attributes nested_attributes
            delete attrs[key]

      super attrs, options
      this.propagate_attributes()
