//Login function
function login() {
	var email = document.getElementById('email').value;
	var pass = document.getElementById('password').value;
	firebase
		.auth()
		.signInWithEmailAndPassword(email, pass)
		.then(function() {
			console.log(firebase.auth().currentUser);
		})
		.catch(function(error) {
			console.log(error);
		});
	checkIfLoggedIn();
}

//Sign Out
function signOut() {
	firebase.auth().signOut();
	checkIfLoggedIn();
	window.location.reload();
}
//Check if user is logged in
function checkIfLoggedIn() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (!user && window.location.pathname != '/') {
			window.location.pathname = '/';
		} else if (user != null) {
			var curUser = firebase.auth().currentUser.uid;
			var db = firebase.firestore();
			db.collection('Users').get().then((snap) => {
				var data = snap.docs;
				data.forEach((element) => {
					if (element.data().userId == curUser) {
						console.log(element.data().admin);

						var admin = element.data().admin;

						if (admin && window.location.pathname != '/admin') {
							if (!window.location.pathname.includes('admin')) {
								window.location.pathname = '/admin';
							}
						} else if (!admin) {
							window.location.pathname = '/user';
						}
					}
				});
			});
		}
	});
}

window.onload = function() {
	checkIfLoggedIn();
};
