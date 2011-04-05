(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __slice = Array.prototype.slice;
  Backbone.Atlas = (function() {
    function Atlas() {}
    Atlas.Collection = (function() {
      function Collection() {
        Collection.__super__.constructor.apply(this, arguments);
      }
      __extends(Collection, Backbone.Collection);
      Collection.prototype.update_attributes = function(nested_attributes) {
        return this.refresh(nested_attributes);
      };
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
      Model.prototype.update_attributes = function(nested_attributes) {
        return this.set(nested_attributes);
      };
      Model.prototype.set = function() {
        var args, attributes, attrs, key, options, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        _ref = [args[0], args.slice(1)], attrs = _ref[0], options = _ref[1];
        for (key in attrs) {
          attributes = attrs[key];
          if (this.get(key) != null) {
            if (this.get(key).update_attributes != null) {
              this.get(key).update_attributes(attributes);
            }
            if (this.get(key).cid === attributes.cid) {
              this.attributes[key] = attributes;
            }
          } else {
            this.attributes[key] = attributes;
          }
          if (key in this.relations.has) {
            this.attributes[key] = new this.relations.has[key](attributes);
            delete attrs[key];
          }
        }
        Model.__super__.set.call(this, attrs, options);
        return this.propagate_attributes();
      };
      return Model;
    })();
    return Atlas;
  })();
}).call(this);
