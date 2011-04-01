Atlas
=====

The name is from this [atlas](http://en.wikipedia.org/wiki/Atlas_(anatomy%29) and in a clear reference to [Backbone](https://github.com/documentcloud/backbone)

![Atlas Backbone](http://upload.wikimedia.org/wikipedia/commons/5/54/Gray_111_-_Vertebral_column-coloured.png)

Description
-----------

First of all this is written in Coffeescript but it also provides a Javascript compiled version.
Its main purpose is to give Backbone the ability to load nested models from json, also gives some sugar to access the .get(attribute) values.

### Example

#### Creating classes

    class @Comment extends Backbone.Atlas.Model
      initialize: (attributes) ->
        @has attributes,
          comments: CommentList
          author: User

    class @CommentList extends Backbone.Atlas.Collection
      model: Comment

    class @Post extends Backbone.Atlas.Model
      initialize: (attributes) ->
        @has attributes, comments: CommentList, created_by: User

    class @User extends Backbone.Atlas.Model

This can be translated to [Rails](https://github.com/rails/rails) ActiveRecord like this:

    class Comment < ActiveRecord::Base
      has_many :comments
      has_one :author, class_name: "User"
    end

    class Post < ActiveRecord::Base
      has_one :created_by, class_name: "User"
      has_many :comments
    end

    class User < ActiveRecord::Base
    end

#### Creating and loading instances

As we are talking of javascript objects we need to load data in them, so:

    post = new Post(
      {
        'title': "Test Title",
        'body': "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus vitae risus vitae lorem iaculis placerat.",
        'created_by': {
          'id': 1
          'name': "Zeus"
        },
        'comments': [
          {
            'id': 4,
            'body': "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus vitae risus vitae lorem iaculis placerat.",
            'comments': [
              {
                'id': 54,
                'body': "Hello from Valhala",
                'author': { 'id': 90, 'name': "Odin"}
              }
            ],
            'author': {
              'id': 2,
              'name': "Hermes",
            }
          },
          {
            'id': 5,
            'body': "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus vitae risus vitae lorem iaculis placerat.",
            'author': {
              'id': 3,
              'name': "Persefone",
            }
          }
        ]
      }
    );

So using Backbone.Atlas as you will use Rails:

    post.title
    => "Test Title"

    post.comments.first()
    => Comment()

    post.comments.last().id
    => 5

    post.comments.first().comments.first().author.name
    => "Odin"


