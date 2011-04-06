(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Backbone.Atlas = (function() {
    function Atlas() {}
    Atlas.Collection = (function() {
      function Collection() {
        Collection.__super__.constructor.apply(this, arguments);
      }
      __extends(Collection, Backbone.Collection);
      return Collection;
    })();
    Atlas.Model = (function() {
      function Model() {
        Model.__super__.constructor.apply(this, arguments);
      }
      __extends(Model, Backbone.Model);
      Model.prototype.relations = {
        has: {}
      };
      Model.prototype.propagate_attributes = function() {
        return _.extend(this, this.attributes);
      };
      Model.prototype.generate_relation = function(attributes, related_models) {
        var extended_relation, relation_class, relation_key;
        extended_relation = {};
        for (relation_key in related_models) {
          relation_class = related_models[relation_key];
          if (!(this.get(relation_key) != null)) {
            extended_relation[relation_key] = null;
          }
        }
        _.extend(this.attributes, extended_relation);
        if (attributes != null) {
          return this.set(attributes);
        }
      };
      Model.prototype.has = function(attributes, related_models) {
        this.relations.has = related_models;
        return this.generate_relation(attributes, related_models);
      };
      Model.prototype.set = function(attrs, options) {
        var builder, relation_key, _ref;
        if (attrs != null) {
          _ref = this.relations.has;
          for (relation_key in _ref) {
            builder = _ref[relation_key];
            if (attrs[relation_key]) {
              this.attributes[relation_key] = new builder(attrs[relation_key]);
              delete attrs[relation_key];
            }
          }
        }
        if (!_.isEmpty(attrs)) {
          Model.__super__.set.call(this, attrs, options);
        }
        return this.propagate_attributes();
      };
      return Model;
    })();
    return Atlas;
  })();
}).call(this);
