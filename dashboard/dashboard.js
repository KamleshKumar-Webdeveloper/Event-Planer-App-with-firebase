const getEvents = () => {
  const db = firebase.firestore();
  const eventsContainer = document.getElementById("events-container");

  db.collection("events")
    .get()
    .then((querySnapshot) => {
      eventsContainer.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const event = doc.data();

        const eventCard = document.createElement("div");
        eventCard.className = "event-card";

        const img = document.createElement("img");
        img.setAttribute("src", event.imageurl);
        img.alt = "Event Image";
        img.setAttribute("class", "image");
        eventCard.appendChild(img);

        const category = document.createElement("p");
        category.innerText = event.category;
        category.className = "category";
        eventCard.appendChild(category);

        const title = document.createElement("h3");
        let isTitleExpanded = false;
        const titleText = event.title;
        
        const shortTitle = 
          titleText.length > 25 
            ? titleText.slice(0, 25) + "...." 
            : titleText;

        title.innerText = shortTitle;
        title.setAttribute("class", "title");

        if (titleText.length > 25) {
          title.style.cursor = "pointer";
          title.setAttribute("aria-expanded", "false");
          title.setAttribute("title", "Click to expand");

          title.addEventListener("click", () => {
            if (isTitleExpanded) {
              title.innerText = shortTitle;
              title.setAttribute("aria-expanded", "false");
            } else {
              title.innerText = titleText;
              title.setAttribute("aria-expanded", "true");
            }
            isTitleExpanded = !isTitleExpanded;
          });
        }

        eventCard.appendChild(title);

        const description = document.createElement("p");
        let isExpanded = false;
        const descriptionText = event.description;

        const shortText =
          descriptionText.length > 40
            ? descriptionText.slice(0, 40) + "...."
            : descriptionText;

        description.innerText = shortText;
        description.setAttribute("class", "description");

        if (descriptionText.length > 20) {
          description.style.cursor = "pointer";
          description.setAttribute("aria-expanded", "false");
          description.setAttribute("title", "Click to expand");

          description.addEventListener("click", () => {
            if (isExpanded) {
              description.innerText = shortText;
              description.setAttribute("aria-expanded", "false");
            } else {
              description.innerText = descriptionText;
              description.setAttribute("aria-expanded", "true");
            }
            isExpanded = !isExpanded;
          });
        }

        eventCard.appendChild(description);

        const time = document.createElement("p");
        time.innerText = event.time;
        time.setAttribute("class", "time");
        eventCard.appendChild(time);

        const date = document.createElement("p");
        date.innerText = event.date;
        date.setAttribute("class", "date");
        eventCard.appendChild(date);

        eventsContainer.appendChild(eventCard);
      });
    })
    .catch((error) => {
      console.log(error);
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
