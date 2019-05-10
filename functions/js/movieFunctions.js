// Global variable needed
var strSel;


//Function to add/create a movie to Firebase db
function addMovie() {
    var movieName;
    var genre;
    var director;
    // need more clarity on how image is supposed to work
    var year;
    var synopsis;
    // we need test to get the test id
    var movieId;
    //var x = 0;
    var elementNumFromGetSelItem;
    var cast = [];
    var cast0, cast1, cast2;
  
    var elementNumFromGetSelItem = parseInt(strSel, 10);
  
    // Getting input for whether or not question is MC and the question itself
    movieName = document.getElementById("movieName").value;
    console.log(movieName);
  
    genre = document.getElementById("genre").value;
    console.log(genre);
  
    // Getting input for the answer
    director = document.getElementById("director").value;
    console.log(director);

    year = document.getElementById("year").value;
    console.log(year);

    synopsis = document.getElementById("synopsis").value;
    console.log(synopsis);

  
    // Getting input for the different kinds of answers, do this and then clear the text fields!
    if (elementNumFromGetSelItem == 1) {
      cast0 = document.getElementById("0").value;
      console.log(cast0);

      cast.push(cast0);
  
      // clear text fields
      document.getElementById("movieName").value = "";
      document.getElementById("genre").value = "";
      document.getElementById("director").value = "";
      document.getElementById("year").value = "";
      document.getElementById("synopsis").value = "";
      document.getElementById("0").value = "";
    
    } else if (elementNumFromGetSelItem == 2) {
      cast0 = document.getElementById("0").value;
      console.log(cast0);
  
      cast1 = document.getElementById("1").value;
      console.log(cast1);

      //Pushing values to the choices array
      cast.push(cast0, cast1);
  
      // clear text fields
      document.getElementById("movieName").value = "";
      document.getElementById("genre").value = "";
      document.getElementById("director").value = "";
      document.getElementById("year").value = "";
      document.getElementById("synopsis").value = "";
      document.getElementById("0").value = "";
      document.getElementById("1").value = "";

    } else if (elementNumFromGetSelItem == 3) {
      cast0 = document.getElementById("0").value;
      console.log(cast0);
  
      cast1 = document.getElementById("1").value;
      console.log(cast1);

      cast2 = document.getElementById("2").value;
      console.log(cast2);

  
      //Pushing values to the choices array
      cast.push(cast0, cast1, cast2);
  
      // clear text fields
      document.getElementById("movieName").value = "";
      document.getElementById("genre").value = "";
      document.getElementById("director").value = "";
      document.getElementById("year").value = "";
      document.getElementById("synopsis").value = "";
      document.getElementById("0").value = "";
      document.getElementById("1").value = "";
      document.getElementById("2").value = "";

    } 

    console.log(cast);
  
    // Database steps
    var db = firebase.firestore();
    var doc = db.collection("Movies").doc();
 
 
      var movies = {
        createdBy: firebase.auth().currentUser.uid,
        movieName: movieName,
        director: director,
        cast: cast,
        movieId: doc.id,
        genre: genre,
        year: year,
        synopsis: synopsis,
        dateCreated: new Date(),
        dateUpdated: new Date()
      };
  
    doc.set(movies);
  
    if (elementNumFromGetSelItem == 1) {
    
      document.getElementById("0").remove();

    } else if (elementNumFromGetSelItem == 2) {
      document.getElementById("0").remove();
      document.getElementById("1").remove();
      
   } else if (elementNumFromGetSelItem == 3) {
    document.getElementById("0").remove();
    document.getElementById("1").remove();
    document.getElementById("2").remove();
    
 } 
    // This will disable the get selected item button
    document.getElementById("clicky").disabled = false;
}

//Function to delete a movie from Firebase db
function deleteMovie() {

    var elementId = "delete-movie-list";

    removeContentMovie(elementId);

    var movieId;
    var db = firebase.firestore();
    
    var movieToDelete;
    var moviesRef = db.collection("Movies");
  

    movieId = document.getElementById("deleteMovieID").value;
    console.log(movieID);

    //clear the fields
    document.getElementById("deleteMovieID").value = "";
  
    var allMovies = moviesRef.get().then(snapshot => {
      var foundMovieToDelete = false;
      snapshot.forEach(doc => {
        console.log(doc.data().movieID);
  
        if (doc.data().movieId == movieId) {
          foundMovieToDelete = true;
          movieToDelete = doc;
  
          doc.ref
            .delete()
            .then(() => {
              console.log("Movie successfully deleted!");
          
            })
            .catch(function(error) {
              console.error("Error removing movie: ", error);
            });


            var nodeDeleteMovie = document.createElement("li"); // Create a <li> node
            nodeDeleteMovie.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );


           // Create a text node
           var movieDeleteText = document.createTextNode("Movie Successfully Deleted: " + movieId); 
           nodeDeleteMovie.appendChild(movieDeleteText); // Append the text to <li>
           // Append <li> to <ul> with id="movie-list"
           document.getElementById("delete-movie-list").appendChild(nodeDeleteMovie); 

        }
      });

      if(!foundMovieToDelete) {

        var nodeMovieToDeleteNotFound = document.createElement("li"); // Create a <li> node
        nodeMovieToDeleteNotFound.setAttribute(
              "class",
              "list-group-item d-flex justify-content-between align-items-center"
        );
  
        var movieDeleteErrorText = document.createTextNode("Error deleting movie, movieID invalid. "); 
        nodeMovieToDeleteNotFound.appendChild(movieDeleteErrorText); // Append the text to <li>
            document.getElementById("delete-movie-list").appendChild(nodeMovieToDeleteNotFound); 

      }
    });
  }


  function removeContentMovie(elementId) {
    document.getElementById(elementId).innerHTML = "";
  }

// Function to get/retrieve movie from the DB
function retrieveMovie() {

  var elementId = "movie-list";
  var reviewElement = "review-list";

  removeContentMovie(elementId);
  removeContentReview(reviewElement);
  
  //document.getElementById("movie-list").innerHTML.remove();
  
    var movieName;
    var movieToFind;

    var db = firebase.firestore();
    var moviesRef = db.collection("Movies");

    movieName = document.getElementById("retrieveMovieName").value;
   // console.log(movieName);

    console.log("Movie to retrieve: " + movieName);

    //clear the fields
    document.getElementById("retrieveMovieName").value = "";
  
    var allMovies = moviesRef.get().then(snapshot => {
      var foundMovie = false;
        snapshot.forEach(doc => {
          console.log(doc.data().movieName);

          if (doc.data().movieName == movieName) {
          //movieToFind = doc;
          foundMovie = true;
  
          var director = doc.data().director;
          var cast = doc.data().cast;
          var genre = doc.data().genre;
          var year = doc.data().year;
          var synopsis = doc.data().synopsis;
          var dateCreated = doc.data().dateCreated;
          var dateUpdated = doc.data().dateUpdated;
          var movieId = doc.data().movieId;
  
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

          var node7 = document.createElement("li"); // Create a <li> node
          node7.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );
          var node8 = document.createElement("li"); // Create a <li> node
          node8.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );
          var node9 = document.createElement("li"); // Create a <li> node
          node9.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );

          // Create a text node
          var movieNameText = document.createTextNode("Movie Name: " + movieName); 
          node.appendChild(movieNameText); // Append the text to <li>
          // Append <li> to <ul> with id="movie-list"
          document.getElementById("movie-list").appendChild(node); 
  
          var directorText = document.createTextNode("Director: " + director); 
          node2.appendChild(directorText); // Append the text to <li>
          // Append <li> to <ul> with id="movie-list"
          document.getElementById("movie-list").appendChild(node2); 
  
          var genreText = document.createTextNode("Genre: " + genre); 
          node3.appendChild(genreText); // Append the text to <li>
          // Append <li> to <ul> with id="movie-list"
          document.getElementById("movie-list").appendChild(node3); 

          var yearText = document.createTextNode("Year: " + year); 
          node4.appendChild(yearText); // Append the text to <li>
          document.getElementById("movie-list").appendChild(node4);

          var synopsisText = document.createTextNode("Synopsis: " + synopsis);
          node5.appendChild(synopsisText); // Append the text to <li>
          document.getElementById("movie-list").appendChild(node5); 

          var castText = document.createTextNode("Cast: " + cast); 
          node6.appendChild(castText); // Append the text to <li>
          document.getElementById("movie-list").appendChild(node6); 
          
          var movieIdText = document.createTextNode("Movie_ID: " + movieId); 
          node7.appendChild(movieIdText); // Append the text to <li>
          document.getElementById("movie-list").appendChild(node7); 

          var blankText = document.createTextNode(""); 
          node8.appendChild(blankText); // Append the text to <li>
          document.getElementById("movie-list").appendChild(node8);

          var movieIdText = document.createTextNode("User Reviews of " + movieName + ": "); 
          node9.appendChild(movieIdText); // Append the text to <li>
          document.getElementById("movie-list").appendChild(node9); 
    
         

          retrieveReviews(movieId);
        }
    });
    
    if(!foundMovie) {

      var nodeMovieNotFound = document.createElement("li"); // Create a <li> node
      nodeMovieNotFound.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
      );

      var movieErrorText = document.createTextNode("Sorry, that Movie isn't in the database! "); 
      nodeMovieNotFound.appendChild(movieErrorText); // Append the text to <li>
          document.getElementById("movie-list").appendChild(nodeMovieNotFound); 


    }

    })

  }

    //Need for Click button
    function GetSelectedItem(el) {
        var i = 0;
        var e = document.getElementById(el);
        strSel = e.options[e.selectedIndex].value;
        var array = [];
        var answer;
      
        console.log(strSel);
      
        //Converting selected # to integer value from string
        var integer = parseInt(strSel, 10);
      
        // Input Boxes are created with this loop. If the boxes already exist, do not create more
        while (i < integer) {
          var x;
          var board = document.createElement("input");
          //Assigning every box with a unique id
          board.id = i;
          board.className = "form-text";
          document.getElementById("board").appendChild(board);
      
          i++;
      
      
          //Disables the button once loop is done and breaks
          document.getElementById("clicky").disabled = true;
      
        }
    
        return integer;
      }

      //Update Movie
      function updateMovie() {

        var fieldToUpdate;
        var movieID;
        var updateString;
    
        var db = firebase.firestore();
        var moviesRef = db.collection("Movies");
    
        movieID = document.getElementById("movieID").value;
        fieldToUpdate = document.getElementById("fieldToUpdate").value;
        updateString = document.getElementById("updateString").value;
    
    
        //Clear the fields
        document.getElementById("movieID").value = "";
        document.getElementById("fieldToUpdate").value = "";
        document.getElementById("updateString").value = "";

        var allMovies = moviesRef.get().then(snapshot => {
          var foundFieldToUpdate = false;
          snapshot.forEach(doc => {
          
            if (doc.data().movieId == movieID && fieldToUpdate == "movieName") {
                doc.ref.update({"movieName": updateString});  
                foundFieldToUpdate = true;
            }else if(doc.data().movieId == movieID && fieldToUpdate == "genre") {
                doc.ref.update({"genre": updateString}); 
                foundFieldToUpdate = true;
            }else if(doc.data().movieId == movieID && fieldToUpdate == "director") {
                doc.ref.update({"director": updateString});
                foundFieldToUpdate = true; 
            }else if(doc.data().movieId == movieID && fieldToUpdate == "year") {
                doc.ref.update({"year": updateString}); 
                foundFieldToUpdate = true;
            }else if(doc.data().movieId == movieID && fieldToUpdate == "synopsis") {
                doc.ref.update({"synopsis": updateString}); 
                foundFieldToUpdate = true;
            }
        
          });

          if(!foundFieldToUpdate) {

            var nodeErrorUpdate = document.createElement("li"); // Create a <li> node
            nodeErrorUpdate.setAttribute(
                  "class",
                  "list-group-item d-flex justify-content-between align-items-center"
            );
      
            var updateErrorText = document.createTextNode("Error updating movie, invalid Field, try again. "); 
            nodeErrorUpdate.appendChild(updateErrorText); // Append the text to <li>
                document.getElementById("update-movie-list").appendChild(nodeErrorUpdate); 
    
          }


        });

        document.getElementById("movieID").value = "";
        document.getElementById("fieldToUpdate").value = "";
        document.getElementById("updateString").value = "";
      }
      