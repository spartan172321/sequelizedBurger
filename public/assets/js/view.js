var x;

$(document).ready(function() {
  // Getting a reference to the input field where user adds a new burger
  var newItemInput = $("#addBurger");
  // Our new burger will go inside the burgerContainer
  var burgerContainer = $(".burger-container");

  var devouredContainer = $(".devoured-container");

  // Adding event listeners for deleting, editing, and adding burger
  $(document).on("click", "button.devour", toggleDevoured);
  $(document).on("submit", "#burgerInput", insertBurger);

  // Our initial burgers array
  var burgers;

  // Getting burgers from database when page loads
  getBurgers();

  // This function resets the burgers displayed with new burgers from the database
  function initializeRows() {
    burgerContainer.empty();
    devouredContainer.empty();

    var burgerToAdd = [];
    var devouredToAdd = [];

    // console.log(burgers);

    for (var i = 0; i < burgers.length; i++) {
      if(burgers[i].devoured === false){
        burgerToAdd.push(createBurgerRow(burgers[i]));
        console.log("burger info:" + burgers[i]);
      }
      // obj keys for burgers[i]: id, burger_name, devoured, createdAt, updatedAt
      else if(burgers[i].devoured === true){
        devouredToAdd.push(createDevourRow(burgers[i]));
      }
    }

    // console.log(burgerToAdd);
    // console.log(devouredToAdd)


    burgerContainer.prepend(burgerToAdd);
    devouredContainer.prepend(devouredToAdd);
  }

  // This function grabs burgers from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      console.log("Burgers", data);
      burgers = data;
      initializeRows();
    });
  }

 // This function sets a burgers devoured attribute to the opposite of what it is
  // and then runs the updateTodo function
  function toggleDevoured() {
    var burger = $(this).parents(".newBurger").data("burger")
      // .data("burgers");
    console.log("toggled: " + burger)
    burger.devoured = true;

    updateBurgers(burger);
  }

// This function updates a todo in our database
  function updateBurgers(burger) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burger
    })
    .done(function() {
      getBurgers();
    });
  }

  // This function constructs a todo-item row
  function createBurgerRow(bur) {
    console.log("Row info:" + bur)
    var newBurgerRow = $("<li>").data("burger", bur);
    newBurgerRow.addClass("newBurger");
    
    var newForm = $("<form>");
    newBurgerRow.append(newForm);

    var newInput = $("<input>");
    newInput.attr({
      type: "text",
      readonly: true,
      value: bur.id + ". " + bur.burger_name
    });
    newForm.append(newInput);

    var devourBtn = $("<button>");
    devourBtn.addClass("devour");
    devourBtn.attr("type", "button")
    devourBtn.text("Devour It!");
    newForm.append(devourBtn);

    console.log("Data in row: " + newBurgerRow.data("burger"))
    
    x = newBurgerRow

    return newBurgerRow;
  }

  // This function constructs a todo-item row
  function createDevourRow(burger) {
    var newDevourRow = $("<li>");
    newDevourRow.addClass("devoured");
    
    var newForm = $("<form>");
    newDevourRow.append(newForm);

    var newInput = $("<input>");
    newInput.attr({
      type: "text",
      readonly: true,
      value: burger.id + ". " + burger.burger_name
    });
    newForm.append(newInput);

    newDevourRow.data("burger", burger);
    console.log(newDevourRow)
    return newDevourRow;
  }


  // This function inserts a new todo into our database and then updates the view
  function insertBurger(event) {
    event.preventDefault();
    // if (!newItemInput.val().trim()) {   return; }
    console.log("inserting")

    var burger = {
      burger_name: newItemInput
        .val()
        .trim(),
      devoured: false
    };

    // Posting the new burger, calling getBurgers when done
    $.post("/api/burgers", burger, function() {
      getBurgers();
    });
    newItemInput.val("");
  }

  // This function deletes a todo when the user clicks the delete button
  // function deleteBurger() {
  //   var id = $(this).data("id");
  //   $.ajax({
  //     method: "DELETE",
  //     url: "/api/burgers/" + id
  //   })
  //   .done(function() {
  //     getBurgers();
  //   });
  // }

 

  // This function handles showing the input box for a user to edit a todo
  // function editTodo() {
  //   var currentTodo = $(this).data("todo");
  //   $(this)
  //     .children()
  //     .hide();
  //   $(this)
  //     .children("input.edit")
  //     .val(currentTodo.text);
  //   $(this)
  //     .children("input.edit")
  //     .show();
  //   $(this)
  //     .children("input.edit")
  //     .focus();
  // }

  // This function starts updating a todo in the database if a user hits the
  // "Enter Key" While in edit mode
  // function finishEdit(event) {
  //   var updatedTodo;
  //   if (event.key === "Enter") {
  //     updatedTodo = {
  //       id: $(this)
  //         .data("todo")
  //         .id,
  //       text: $(this)
  //         .children("input")
  //         .val()
  //         .trim()
  //     };
  //     $(this).blur();
  //     updateTodo(updatedTodo);
  //   }
  // }

  

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  // function cancelEdit() {
  //   var currentTodo = $(this).data("todo");
  //   $(this)
  //     .children()
  //     .hide();
  //   $(this)
  //     .children("input.edit")
  //     .val(currentTodo.text);
  //   $(this)
  //     .children("span")
  //     .show();
  //   $(this)
  //     .children("button")
  //     .show();
  // }



});
