(function() {
  $(document).ready(function() {
    var json, post;
    post = new Post();
    json = {
      title: "Test Title",
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus vitae risus vitae lorem iaculis placerat.",
      created_by: {
        id: 1,
        name: "Zeus"
      },
      comments: [
        {
          id: 4,
          body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus vitae risus vitae lorem iaculis placerat.",
          comments: [
            {
              id: 54,
              body: "Hello from Valhala",
              author: {
                id: 90,
                name: "Odin"
              }
            }
          ],
          author: {
            id: 2,
            name: "Hermes"
          }
        }, {
          id: 5,
          body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus vitae risus vitae lorem iaculis placerat.",
          author: {
            id: 3,
            name: "Persefone"
          }
        }
      ]
    };
    post.set(json);
    module("Testing First level relations");
    test("should match setters", function() {
      equals(post.title, "Test Title");
      equals(post.created_by, post.get("created_by"));
      return equals(post.comments.length, 2);
    });
    module("Testing chained relations");
    test("should chain correctly", function() {
      equals(post.comments.first().id, 4);
      return ok(post.comments.first().author.constructor === User);
    });
    module("Multiple nesting");
    test("should be able to access comments comments", function() {
      equals(post.created_by.id, 1);
      equals(post.comments.last().author.name, "Persefone");
      equals(post.comments.first().author.name, "Hermes");
      return equals(post.comments.first().comments.first().author.id, 90);
    });
    module("Type Checking");
    return test("should be correclty instanced the models", function() {
      ok(post.constructor === Post);
      ok(post.created_by.constructor === User);
      ok(post.comments.constructor === CommentList);
      ok(post.comments.first().constructor === Comment);
      return ok(post.comments.last().author.constructor === User);
    });
  });
}).call(this);
