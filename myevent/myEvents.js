const getmyEvents = () => {
  const db = firebase.firestore();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      const eventContainer = document.getElementById("events-container");

      eventContainer.innerHTML = "";
      db.collection("events")
        .where("uid", "==", uid)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {  
            eventContainer.innerHTML = "<p>You haven't created any events.</p>";
            return;
          }

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(data);

            const event = document.createElement("div");
            event.classList.add("event");
            eventContainer.appendChild(event);

            const eventImage = document.createElement("img");
            eventImage.setAttribute("src", data.imageurl);
            eventImage.setAttribute("alt", "Event Image");
            event.appendChild(eventImage);

            const eventCategory = document.createElement("p");
            eventCategory.innerHTML = data.category;
            event.appendChild(eventCategory);

            const eventTitle = document.createElement("h2");
            eventTitle.innerHTML = data.title;
            event.appendChild(eventTitle);

            const eventDescription = document.createElement("p");
            eventDescription.innerHTML = data.description;
            event.appendChild(eventDescription);

            const eventDate = document.createElement("p");
            eventDate.innerHTML = data.date;
            event.appendChild(eventDate);

            const eventTime = document.createElement("p");
            eventTime.innerHTML = data.time;
            event.appendChild(eventTime);
          });
        })

        .catch((error) => {
          console.log(   error);
          eventContainer.innerHTML =
            "<p>Error loading events. Please try again later.</p>";
        });
    } else {
      window.location.href = "../index.html";
    }
  });
};

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "../index.html";
    });
};
