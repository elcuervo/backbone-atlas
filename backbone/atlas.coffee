# Usage example:
#
# class @User extends Backbone.Atlas.Model
#
# class @Comment extends Backbone.Model
#   url: "/users"
#
# class @CommentList extends Backbone.Collection
#   model: Comment
#
# class @Post extends Backbone.Atlas.Model
#   initialize: ->
#     @has comments: CommentList, created_by: User
#

class Backbone.Atlas
  class @Model extends Backbone.Model

    propagate_attributes: -> _.extend this, this.attributes

    has: (relations) ->
      for relation_key, relation_class of relations
        extended_relation = {}
        extended_relation[relation_key] = new relation_class

        _.extend(this.attributes, extended_relation)

      this.propagate_attributes()

    update_attributes: (nested_attributes) ->
      this.attributes[key].refresh? nested_attributes
      this.attributes[key].set? nested_attributes

    set: (args...) ->
      [attrs, options] = [args[0], args[1..-1]]
      for key, nested_attributes of attrs
        if key of this.attributes
          if this.attributes[key].update_attributes?
            this.attributes[key].update_attributes nested_attributes
            delete attrs[key]

      super attrs, options
      this.propagate_attributes()
