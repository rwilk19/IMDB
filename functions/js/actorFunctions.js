// Global variable needed
//Used when creating an actor for the drop-down input fields for their filmography
var strSel2;


//Function to add/create a movie to Firebase db
function addActor() {
    var actorName;
    var birthday;
    var biography;
    var actorId;

    var elementNumFromGetSelItem2;
    var movies = [];
    var movie0, movie1, movie2, movie3, movie4;
  
    var elementNumFromGetSelItem2 = parseInt(strSel2, 10);
  

    actorName = document.getElementById("actorName").value;
    console.log(actorName);
  
    birthday = document.getElementById("birthday").value;
    console.log(birthday);

    biography = document.getElementById("bio").value;
    console.log(biography);


    // Getting input for the movie stars associated with the movie, then clear text fields
    if (elementNumFromGetSelItem2 == 5) {
      movie0 = document.getElementById("4").value;
      console.log(movie0);

      movies.push(movie0);
  
      // clear text fields
      document.getElementById("actorName").value = "";
      document.getElementById("bio").value = "";
      document.getElementById("birthday").value = "";
      document.getElementById("4").value = "";
    
    } else if (elementNumFromGetSelItem2 == 6) {
        movie0 = document.getElementById("4").value;
        console.log(movie0);
  
        movie1 = document.getElementById("5").value;
        console.log(movie1);

      //Pushing values to the choices array
      movies.push(movie0, movie1);
  
       // clear text fields
       document.getElementById("actorName").value = "";
       document.getElementById("bio").value = "";
       document.getElementById("birthday").value = "";
       document.getElementById("4").value = "";
       document.getElementById("5").value = "";

    } else if (elementNumFromGetSelItem2 == 7) {
        movie0 = document.getElementById("4").value;
        console.log(movie0);
  
        movie1 = document.getElementById("5").value;
        console.log(movie1);

        movie2 = document.getElementById("6").value;
        console.log(movie2);

  
      //Pushing values to the choices array
      movies.push(movie0, movie1, movie2);
  
       // clear text fields
       document.getElementById("actorName").value = "";
       document.getElementById("bio").value = "";
       document.getElementById("birthday").value = "";
       document.getElementById("4").value = "";
       document.getElementById("5").value = "";
       document.getElementById("6").value = "";

    }else if (elementNumFromGetSelItem2 == 8) {
        movie0 = document.getElementById("4").value;
        console.log(movie0);
  
        movie1 = document.getElementById("5").value;
        console.log(movie1);

        movie2 = document.getElementById("6").value;
        console.log(movie2);

        movie3 = document.getElementById("7").value;
        console.log(movie3);

  
      //Pushing values to the choices array
      movies.push(movie0, movie1, movie2, movie3);
  
       // clear text fields
       document.getElementById("actorName").value = "";
       document.getElementById("bio").value = "";
       document.getElementById("birthday").value = "";
       document.getElementById("4").value = "";
       document.getElementById("5").value = "";
       document.getElementById("6").value = "";
       document.getElementById("7").value = "";

    }else if (elementNumFromGetSelItem2 == 9) {
        movie0 = document.getElementById("4").value;
        console.log(movie0);
  
        movie1 = document.getElementById("5").value;
        console.log(movie1);

        movie2 = document.getElementById("6").value;
        console.log(movie2);

        movie3 = document.getElementById("7").value;
        console.log(movie3);

        movie4 = document.getElementById("8").value;
        console.log(movie4);

  
      //Pushing values to the choices array
      movies.push(movie0, movie1, movie2, movie3, movie4);
  
       // clear text fields
       document.getElementById("actorName").value = "";
       document.getElementById("bio").value = "";
       document.getElementById("birthday").value = "";
       document.getElementById("4").value = "";
       document.getElementById("5").value = "";
       document.getElementById("6").value = "";
       document.getElementById("7").value = "";
       document.getElementById("8").value = "";

    }

    console.log(movies);
  
    // Database steps
    var db = firebase.firestore();
    var doc = db.collection("Actors").doc();
 
 
      var actors = {
        createdBy: firebase.auth().currentUser.uid,
        name: actorName,
        movies: movies,
        actorId: doc.id,
        birthday: birthday,
        bio: biography,
        dateCreated: new Date(),
        dateUpdated: new Date()
      };
  
    doc.set(actors);
  
    if (elementNumFromGetSelItem2 == 5) {
    
        document.getElementById("4").remove();

    }else if (elementNumFromGetSelItem2 == 6) {
        document.getElementById("4").remove();
        document.getElementById("5").remove();
      
    }else if (elementNumFromGetSelItem2 == 7) {
    document.getElementById("4").remove();
    document.getElementById("5").remove();
    document.getElementById("6").remove();

    }else if (elementNumFromGetSelItem2 == 8) {
        document.getElementById("4").remove();
        document.getElementById("5").remove();
        document.getElementById("6").remove();
        document.getElementById("7").remove();
    }else if (elementNumFromGetSelItem2 == 5) {
        document.getElementById("4").remove();
        document.getElementById("5").remove();
        document.getElementById("6").remove();
        document.getElementById("7").remove();
        document.getElementById("8").remove();
    }  
    // This will disable the get selected item button
    document.getElementById("clicky2").disabled = false;

       document.getElementById("actorName").value = "";
       document.getElementById("bio").value = "";
       document.getElementById("birthday").value = "";
}


//Need for Click button
function GetSelectedItemForActor(el) {
    var i = 4; 
    var e = document.getElementById(el);
    strSel2 = e.options[e.selectedIndex].value;
    var array = [];
    var answer;
  
    console.log(strSel2);
  
    //Converting selected # to integer value from string
    var integer2 = parseInt(strSel2, 10);
  
    // Input Boxes are created within this loop -- If the boxes already exist, do not create any more
    while (i < integer2) {
      var x;
      var board2 = document.createElement("input");
      //Assigning every box with a unique id
      board2.id = i;
      board2.className = "form-text";
      document.getElementById("board2").appendChild(board2);
  
      i++;
  
  
      //Disables the button once loop is done and breaks
      document.getElementById("clicky2").disabled = true;
  
    }

    return integer2;
  }



//Function to delete an Actor from Firebase db
function deleteActor() {

  var elementId = "delete-actor-list";

  removeContentActor(elementId);

    var actorId;
    var db = firebase.firestore();

    var actorsRef = db.collection("Actors");
  

    actorId = document.getElementById("deleteActorID").value;
    console.log(actorID);



    //clear the fields
    document.getElementById("deleteActorID").value = "";
  
    var allActors = actorsRef.get().then(snapshot => {
      var foundActorToDelete = false;
      snapshot.forEach(doc => {
        console.log(doc.data().actorId);
  
        if (doc.data().actorId == actorId) {
          //actorToDelete = doc;
          foundActorToDelete = true;
  
          doc.ref
            .delete()
            .then(() => {
              console.log("Actor successfully deleted!");
          
            })
            .catch(function(error) {
              console.error("Error removing actor: ", error);
            });

            var nodeDeleteActor = document.createElement("li"); // Create a <li> node
            nodeDeleteActor.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );


           // Create a text node
           var actorDeleteText = document.createTextNode("Actor Successfully Deleted: " + actorId); 
           nodeDeleteActor.appendChild(actorDeleteText); // Append the text to <li>
           // Append <li> to <ul> with id="movie-list"
           document.getElementById("delete-actor-list").appendChild(nodeDeleteActor); 

        }
      });

      if(!foundActorToDelete) {

        var nodeActorToDeleteNotFound = document.createElement("li"); // Create a <li> node
        nodeActorToDeleteNotFound.setAttribute(
              "class",
              "list-group-item d-flex justify-content-between align-items-center"
        );
  
        var actorDeleteErrorText = document.createTextNode("Error deleting actor, actorID invalid. "); 
        nodeActorToDeleteNotFound.appendChild(actorDeleteErrorText); // Append the text to <li>
            document.getElementById("delete-actor-list").appendChild(nodeActorToDeleteNotFound); 

      }
    });
  }

  function removeContentActor(elementId) {

    document.getElementById(elementId).innerHTML = "";

  }

// Function to get/retrieve actor from the DB
function retrieveActor() {

    var elementId = "actor-list";

    removeContentActor(elementId);
  
    var actorName;
    //var movieToFind;

    var db = firebase.firestore();
    var actorsRef = db.collection("Actors");

    actorName = document.getElementById("retrieveActorName").value;
   // console.log(movieName);
   

    console.log("Actor to retrieve: " + actorName);

    //clear the fields
    document.getElementById("retrieveActorName").value = "";

    
  
    
    var allMovies = actorsRef.get().then(snapshot => {
      var foundActor = false;
        snapshot.forEach(doc => {
          console.log(doc.data().name);

          if (doc.data().name == actorName) {
          
          foundActor = true;
  
          var name = doc.data().name;
          var birthday = doc.data().birthday;
          var bio = doc.data().bio;
          var movies = doc.data().movies;
          //var dateCreated = doc.data().dateCreated;
          //var dateUpdated = doc.data().dateUpdated;
          var actorId = doc.data().actorId;
  
          var node = document.createElement("li"); // Create a <li> node
          node.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );
  
          var node2 = document.createElement("li"); // Create a <li> node
          node2.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );
  
          var node3 = document.createElement("li"); // Create a <li> node
          node3.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );
  
          var node4 = document.createElement("li"); // Create a <li> node
          node4.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );
  
          var node5 = document.createElement("li"); // Create a <li> node
          node5.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );

          var node6 = document.createElement("li"); // Create a <li> node
          node6.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );

  
          var actorNameText = document.createTextNode("Actor Name: " + name); // Create a text node
          node.appendChild(actorNameText); // Append the text to <li>
          document.getElementById("actor-list").appendChild(node); // Append <li> to <ul> with id="myList"
  
          var birthdayText = document.createTextNode("Birthday: " + birthday); // Create a text node
          node2.appendChild(birthdayText); // Append the text to <li>
          document.getElementById("actor-list").appendChild(node2); // Append <li> to <ul> with id="myList"
  
          var bioText = document.createTextNode("Biography: " + bio); // Create a text node
          node3.appendChild(bioText); // Append the text to <li>
          document.getElementById("actor-list").appendChild(node3); // Append <li> to <ul> with id="myList"

          var moviesText = document.createTextNode("Movies: " + movies); // Create a text node
          node4.appendChild(moviesText); // Append the text to <li>
          document.getElementById("actor-list").appendChild(node4); // Append <li> to <ul> with id="myList"

          var actorIdText = document.createTextNode("Actor ID: " + actorId); // Create a text node
          node5.appendChild(actorIdText); // Append the text to <li>
          document.getElementById("actor-list").appendChild(node5); // Append <li> to <ul> with id="myList"

          var blankText = document.createTextNode(""); // Create a text node
          node6.appendChild(blankText); // Append the text to <li>
          document.getElementById("actor-list").appendChild(node6);
        }
    });

    if(!foundActor) {

      var nodeActorNotFound = document.createElement("li"); // Create a <li> node
      nodeActorNotFound.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
      );

      var actorErrorText = document.createTextNode("Sorry, that Actor isn't in the database! "); 
      nodeActorNotFound.appendChild(actorErrorText); // Append the text to <li>
          document.getElementById("actor-list").appendChild(nodeActorNotFound); 


    }
    
    })

  }


      //Update Actor
      function updateActor() {

        var actorFieldToUpdate;
        var actorID;
        var actorUpdateString;
    
        var db = firebase.firestore();
        var actorsRef = db.collection("Actors");
    
        actorID = document.getElementById("actorID").value;
        actorFieldToUpdate = document.getElementById("actorFieldToUpdate").value;
        actorUpdateString = document.getElementById("actorUpdateString").value;
    
    
        //Clear the fields
        document.getElementById("actorID").value = "";
        document.getElementById("actorFieldToUpdate").value = "";
        document.getElementById("actorUpdateString").value = "";

        var allActors = actorsRef.get().then(snapshot => {
          snapshot.forEach(doc => {
          
            if (doc.data().actorId == actorID && actorFieldToUpdate == "actorName") {
                doc.ref.update({"name": actorUpdateString});  
            }else if(doc.data().actorId == actorID && actorFieldToUpdate == "birthday") {
                doc.ref.update({"birthday": actorUpdateString}); 
            }else if(doc.data().actorId == actorID && actorFieldToUpdate == "bio") {
                doc.ref.update({"bio": actorUpdateString}); 
            }
        
          });
        });

        document.getElementById("actorID").value = "";
        document.getElementById("actorFieldToUpdate").value = "";
        document.getElementById("actorUpdateString").value = "";
      }