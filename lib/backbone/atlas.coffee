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
    relations:
      has: {}

    propagate_attributes: -> _.extend this, this.attributes

    generate_relation: (attributes, related_models) ->
      extended_relation = {}
      for relation_key, relation_class of related_models
        if !this.get(relation_key)?
          extended_relation[relation_key] = null

      _.extend this.attributes, extended_relation

      this.set attributes if attributes?

    has: (attributes, related_models) ->
      this.relations.has = related_models
      this.generate_relation attributes, related_models

    update_attributes: (nested_attributes) ->
      this.set nested_attributes

    set: (args...) ->
      [attrs, options] = [args[0], args[1..-1]]
      for key, attributes of attrs
        if this.get(key)?
          if this.get(key).update_attributes?
            this.get(key).update_attributes attributes
          if this.get(key).cid == attributes.cid
            this.attributes[key] = attributes
        else
          this.attributes[key] = attributes

        if key of this.relations.has
          this.attributes[key] = new this.relations.has[key](attributes)
          delete attrs[key]

      super attrs, options
      this.propagate_attributes()
