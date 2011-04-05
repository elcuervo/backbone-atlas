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
    module("Recursion Testing");
    test("should not generate too much recursion", function() {
      var recursion_post;
      recursion_post = new Post;
      recursion_post.set({
        title: "Re-Course",
        comments: [
          {
            id: 11,
            body: "test",
            commentable: {
              id: 10,
              body: "Dude"
            }
          }
        ]
      });
      return ok(recursion_post.comments.first().commentable.constructor === Comment);
    });
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
    test("should be correclty instanced the models", function() {
      ok(post.constructor === Post);
      ok(post.created_by.constructor === User);
      ok(post.comments.constructor === CommentList);
      ok(post.comments.first().constructor === Comment);
      return ok(post.comments.last().author.constructor === User);
    });
    module("Already created models");
    test("should inherit models if instanced backbone models passed", function() {
      var inherit_post, new_user;
      new_user = new User({
        name: "Moe Hawk"
      });
      inherit_post = new Post({
        comments: [
          {
            author: new_user,
            body: "test1"
          }, {
            author: new_user,
            body: "test1"
          }
        ]
      });
      return equals(inherit_post.comments.first().author.cid, new_user.cid);
    });
    module("Error handling");
    return test("Empty relation", function() {
      var wrong_post;
      wrong_post = new Post;
      wrong_post.set({
        title: "wrong",
        comments: []
      });
      equals(wrong_post.title, "wrong");
      ok(wrong_post.comments.constructor === CommentList);
      return equals(wrong_post.comments.length, 0);
    });
  });
}).call(this);
