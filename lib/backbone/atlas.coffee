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

  class @Model extends Backbone.Model
    relations:
      has: {}

    toJSON: ->
      json = {}
      for k, v of _.clone this.attributes
        json[k] = if v?.toJSON? then v.toJSON() else v if v?
      json

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

    set: (attrs, options) ->
      if attrs?
        for relation_key, builder of this.relations.has
          if attrs[relation_key]
            if attrs[relation_key].constructor is builder
              this.attributes[relation_key] = attrs[relation_key]
            else
              this.attributes[relation_key] = new builder(attrs[relation_key])
            delete attrs[relation_key]

      super attrs, options if !_.isEmpty(attrs)
      this.propagate_attributes()
