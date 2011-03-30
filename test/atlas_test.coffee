$(document).ready ->
  post = new Post()
  json = {
    title: "Test Title"
    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus vitae risus vitae lorem iaculis placerat."
    created_by: {
      id: 1
      name: "Zeus"
    }
    comments: [
      {
        id: 4,
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus vitae risus vitae lorem iaculis placerat."
        comments: [
          {
            id: 54
            body: "Hello from Valhala"
            author: { id: 90, name: "Odin"}
          }
        ]
        author: {
          id: 2
          name: "Hermes"
        }
      }
      {
        id: 5,
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus vitae risus vitae lorem iaculis placerat."
        author: {
          id: 3
          name: "Persefone"
        }
      }
    ]
  }

  post.set json

  module "Testing First level relations"
  test "should match setters", ->
    equals post.title, "Test Title"
    equals post.created_by, post.get("created_by")
    equals post.comments.length, 2

  module "Testing chained relations"
  test "should chain correctly", ->
    equals  post.comments.first().id, 4
    ok      post.comments.first().author.constructor is User

  module "Multiple nesting"
  test "should be able to access comments comments", ->
    equals post.created_by.id, 1
    equals post.comments.last().author.name, "Persefone"
    equals post.comments.first().author.name, "Hermes"
    equals post.comments.first().comments.first().author.id, 90

  module "Type Checking"
  test "should be correclty instanced the models", ->
    ok post.constructor is Post
    ok post.created_by.constructor is User
    ok post.comments.constructor is CommentList
    ok post.comments.first().constructor is Comment
    ok post.comments.last().author.constructor is User
