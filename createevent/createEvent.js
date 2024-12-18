const addEvent = (event) => {
  event.preventDefault();

 
  const submitButton = event.target.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const imageurl = document.getElementById("imageurl").value;
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      const eventDetails = {
        imageurl: imageurl,
        title: title,
        category: category,
        description: description,
        date: date,
        time: time,
        uid: uid,
        firebaseTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const db = firebase.firestore();
      db.collection("events")
        .add(eventDetails)
        .then((docRef) => {
          console.log(docRef.id);
          window.location.replace("../dashboard/dashboard.html");
        })
        .catch((error) => {
          console.log( error);
          if (submitButton) submitButton.disabled = false;
        });
    } else {
      alert("Please login to create an event");
    }
  }); 
};


const logout = () => {
  firebase.auth().signOut().then(() => {
    window.location.replace("../login/login.html");
  });
};
