// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the burger
  app.get("/api/burgers", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burgers.findAll({}).then(function(data) {
      // We have access to the burger as an argument inside of the callback function
      res.json(data);
    });
  });

  // POST route for saving a new burger
  app.post("/api/burgers", function(req, res) {
    db.Burgers.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(data) {
      // We have access to the new burger as an argument inside of the callback function
      res.json(data);
    });
  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/burgers", function(req, res) {
    console.log(req.body)
    db.Burgers.update({
      devoured: req.body.devoured
    }, {
    where:{
      id: req.body.id
    }
    }).then(function(data) {
      // now you see me...
      res.json(data);
    })
  });




//==========================Extra===============================
//   app.delete("/api/todos/:id", function(req, res) {
//     // Use the sequelize destroy method to delete a record from our table with the
//     // id in req.params.id. res.json the result back to the user
//     db.Todo.destroy({
//       where:{
//         id: req.params.id
//       }
//     }).then(function(dbTodo) {
//       // now you see me...
//       res.json(dbTodo);
//     })
//   });

//   // PUT route for updating todos. We can get the updated todo data from req.body
//   app.put("/api/todos", function(req, res) {
//     // Use the sequelize update method to update a todo to be equal to the value of req.body
//     // req.body will contain the id of the todo we need to update
//     db.Todo.update({
//       text: req.body.text,
//       complete: req.body.complete
//     }, {
//       where:{
//         id: req.body.id
//       }
//     }).then(function(dbTodo) {
//       // now you see me...
//       res.json(dbTodo);
//     })
//   });

};
