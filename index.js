const signup = (event) => {
  event.preventDefault();
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        uid: user.uid,
      };

      const db = firebase.firestore();
      db.collection("users")
        .doc(user.uid)
        .set(userData)
        .then(() => {
          window.location.href = "./login/login.html";
          alert("succesfully Registerd!")
        })
        .catch((error) => {
          console.log( error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
