//Function to add/create a movie to Firebase db
function createReview() {

    var reviewerName;
    var residence;
    var star;
    var reviewBody;
    var movieId;
  
  
    reviewerName = document.getElementById("reviewerName").value;
  
    residence = document.getElementById("residence").value;
    
    reviewBody = document.getElementById("reviewBody").value;
    
    movieId = document.getElementById("reviewMovieId").value;

    star = document.getElementById("reviewStars").value;
    
  
      // clear text fields
      document.getElementById("reviewerName").value = "";
      document.getElementById("residence").value = "";
      document.getElementById("reviewBody").value = "";
      document.getElementById("reviewMovieId").value = "";
      document.getElementById("reviewStars").value = "";

  
    // Database logic
    var db = firebase.firestore();
    var doc = db.collection("Reviews").doc();
 
 
      var reviews = {
        reviewerName: reviewerName,
        residence: residence,
        reviewId: doc.id,
        movieId: movieId,
        star: star,
        reviewBody: reviewBody,
        dateCreated: new Date()
      };
  
    doc.set(reviews);
   
}


//Function to remove last Review search 
function removeContentReview(elementId) {
document.getElementById(elementId).innerHTML = "";
}


    //Function to delete an Actor from Firebase db
function deleteReview() {

  var elementId = "delete-user-review-list";

  removeContentReview(elementId);

    var reviewId;

    var db = firebase.firestore();
    var reviewsRef = db.collection("Reviews");

    reviewId = document.getElementById("deleteReviewID").value;


    //clear the fields
    document.getElementById("deleteReviewID").value = "";
  
    var allReviews = reviewsRef.get().then(snapshot => {
      var foundReviewToDelete = false;
      snapshot.forEach(doc => {
  
        if (doc.data().reviewId == reviewId) {
          foundReviewToDelete = true;
          doc.ref
            .delete()
            .then(() => {
              console.log("Review successfully deleted!");
          
            })
            .catch(function(error) {
              console.error("Error removing actor: ", error);
            });

            var nodeDeleteReview = document.createElement("li"); // Create a <li> node
            nodeDeleteReview.setAttribute(
            "class",
            "list-group-item d-flex justify-content-between align-items-center"
          );


           // Create a text node
           var reviewDeleteText = document.createTextNode("Review Successfully Deleted: " + reviewId); 
           nodeDeleteReview.appendChild(reviewDeleteText); 
           
           document.getElementById("delete-user-review-list").appendChild(nodeDeleteReview);

        }
      });

      if(!foundReviewToDelete) {

        var nodeReviewToDeleteNotFound = document.createElement("li"); // Create a <li> node
        nodeReviewToDeleteNotFound.setAttribute(
              "class",
              "list-group-item d-flex justify-content-between align-items-center"
        );
  
        var reviewDeleteErrorText = document.createTextNode("Error deleting movie review, reviewID invalid. "); 
        nodeReviewToDeleteNotFound.appendChild(reviewDeleteErrorText); // Append the text to <li>
            document.getElementById("delete-user-review-list").appendChild(nodeReviewToDeleteNotFound); 

      }

    });
  }



// Function to get/retrieve movie from the DB
function retrieveReviews(movieID) {

  var elementId = "review-list";
  

  removeContentReview(elementId);

  //document.getElementById("review-list").remove();

  var movieId = movieID;

  var db = firebase.firestore();
  var reviewsRef = db.collection("Reviews");


  var allReviews = reviewsRef.get().then(snapshot => {
    var foundReview = false;
      snapshot.forEach(doc => {
        //console.log(doc.data().movieName);

        if (doc.data().movieId == movieId) {
        
        foundReview = true;

        //var movieId = doc.data().movieId;
        var reviewerName = doc.data().reviewerName;
        var residence = doc.data().residence;
        var star = doc.data().star;
        var reviewBody = doc.data().reviewBody;
        var dateCreated = doc.data().dateCreated;
        var reviewId = doc.data().reviewId;
  

        var reviewNode = document.createElement("li"); // Create a <li> node
        reviewNode.setAttribute(
          "class",
          "list-group-item d-flex justify-content-between align-items-center"
        );

        var reviewNode2 = document.createElement("li"); // Create a <li> node
        reviewNode2.setAttribute(
          "class",
          "list-group-item d-flex justify-content-between align-items-center"
        );

        var reviewNode3 = document.createElement("li"); // Create a <li> node
        reviewNode3.setAttribute(
          "class",
          "list-group-item d-flex justify-content-between align-items-center"
        );

        var reviewNode4 = document.createElement("li"); // Create a <li> node
        reviewNode4.setAttribute(
          "class",
          "list-group-item d-flex justify-content-between align-items-center"
        );

        var reviewNode5 = document.createElement("li"); // Create a <li> node
        reviewNode5.setAttribute(
          "class",
          "list-group-item d-flex justify-content-between align-items-center"
        );

        var reviewNode6 = document.createElement("li"); // Create a <li> node
        reviewNode6.setAttribute(
          "class",
          "list-group-item d-flex justify-content-between align-items-center"
        );




        // Create a text node
        var reviewIdText = document.createTextNode("Review_Id: " + reviewId); 
        reviewNode.appendChild(reviewIdText); // Append the text to <li>
        document.getElementById("review-list").appendChild(reviewNode); 

        var reviewerNameText = document.createTextNode("Reviewer Name: " + reviewerName); 
        reviewNode2.appendChild(reviewerNameText); // Append the text to <li>
        document.getElementById("review-list").appendChild(reviewNode2); 

        var residenceText = document.createTextNode("Residence: " + residence); 
        reviewNode3.appendChild(residenceText); // Append the text to <li>
        document.getElementById("review-list").appendChild(reviewNode3); 

        var starText = document.createTextNode("# Of Stars: " + star); 
        reviewNode4.appendChild(starText); // Append the text to <li>
        document.getElementById("review-list").appendChild(reviewNode4);

        var reviewBodyText = document.createTextNode("Review: " + reviewBody);
        reviewNode5.appendChild(reviewBodyText); // Append the text to <li>
        document.getElementById("review-list").appendChild(reviewNode5); 

        var blankReviewText = document.createTextNode(""); 
        reviewNode6.appendChild(blankReviewText); // Append the text to <li>
        document.getElementById("review-list").appendChild(reviewNode6);
      }
  });

  if(!foundReview) {

    var reviewNotFound = document.createElement("li"); // Create a <li> node
        reviewNotFound.setAttribute(
          "class",
          "list-group-item d-flex justify-content-between align-items-center"
        );

    var noReviewText = document.createTextNode("No one has written a review for this movie yet!"); 
    reviewNotFound.appendChild(noReviewText); // Append the text to <li>
        document.getElementById("review-list").appendChild(reviewNotFound);

  }
  
  })}

  

    