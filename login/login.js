const login = (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(user);

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          const currentUser = {
            email:email,
            password: password,
            uid: uid,
          };
          console.log(currentUser);
          const db = firebase.firestore();
          db.collection("currentUser")
            .doc(user.uid)
            .set(currentUser)
            .then(() => {
              alert("Login successful");
              window.location.href = "../dashboard/dashboard.html";
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("User is signed out");
        }
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log( errorMessage);
    });
};

const forgotPassword = (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset email sent! Please check your inbox.");
    })
    .catch((error) => {
      console.log(error);
      alert("Error: " + error.message);
    });
};
