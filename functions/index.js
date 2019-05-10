// The IMDB Application is initialized here
// Server starts here, and connects to Firebase database
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const firebase = require("firebase");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const path = require("path");

const firebaseApp = firebase.initializeApp(functions.config().firebase);

var serviceAccount = require(".//serviceAccountKey.json");

var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://imdb-60248.firebaseio.com/"
});

const db = admin.firestore();
var database = firebaseAdmin.database();

app.set("view-engine", "ejs");
app.use(express.static("views"));
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");

const port = 3000;
app.listen(port, () => {
  console.log("index.js is listening on port: " + port);
});

app.get("/", (req, res) => {
  db.collection("Users")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
      });
      res.render("user.ejs", { User: snapshot });
    })
    .catch(error => {
      console.log(error);
    });
});

 app.get("/user", (req, res) => {
 res.render("user.ejs");
  
});

app.get("/admin", (req, res) => {
  
  res.render("admin.ejs");
    
});
