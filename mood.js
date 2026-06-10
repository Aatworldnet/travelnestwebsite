const beachBtn = document.getElementById("beachBtn");
const forestBtn = document.getElementById("forestBtn");
const cityBtn = document.getElementById("cityBtn");

const beachSound = document.getElementById("beachSound");
const forestSound = document.getElementById("forestSound");
const citySound = document.getElementById("citySound");

const soundStatus = document.getElementById("soundStatus");
const trackerGrid = document.getElementById("trackerGrid");
const storedTrackerBox = document.getElementById("storedTrackerBox");

let currentSound = "";

const moodDestinations = [
    {
        name: "Bali",
        country: "Indonesia",
        image: "images/bali.png"
    },
    {
        name: "Kyoto",
        country: "Japan",
        image: "images/kyoto.png"
    },
    {
        name: "Ella",
        country: "Sri Lanka",
        image: "images/ella.png"
    },
    {
        name: "Santorini",
        country: "Greece",
        image: "images/santorini.png"
    },
    {
        name: "Cape Town",
        country: "South Africa",
        image: "images/cape-town.png"
    },
    {
        name: "Monaco",
        country: "Monaco",
        image: "images/monaco.png"
    }
];

function stopAllSounds() {
    beachSound.pause();
    forestSound.pause();
    citySound.pause();

    beachSound.currentTime = 0;
    forestSound.currentTime = 0;
    citySound.currentTime = 0;

    beachBtn.classList.remove("active-sound");
    forestBtn.classList.remove("active-sound");
    cityBtn.classList.remove("active-sound");

    soundStatus.textContent = "No sound playing.";
    currentSound = "";
}

function playSound(soundName) {
    if (currentSound === soundName) {
        stopAllSounds();
        return;
    }

    stopAllSounds();

    if (soundName === "beach") {
        beachSound.play();
        beachBtn.classList.add("active-sound");
        soundStatus.textContent = "Beach sound is playing.";
        currentSound = "beach";
    } else if (soundName === "forest") {
        forestSound.play();
        forestBtn.classList.add("active-sound");
        soundStatus.textContent = "Forest sound is playing.";
        currentSound = "forest";
    } else if (soundName === "city") {
        citySound.play();
        cityBtn.classList.add("active-sound");
        soundStatus.textContent = "City sound is playing.";
        currentSound = "city";
    }
}

beachBtn.addEventListener("click", function () {
    playSound("beach");
});

forestBtn.addEventListener("click", function () {
    playSound("forest");
});

cityBtn.addEventListener("click", function () {
    playSound("city");
});

function displayTrackerCards() {
    trackerGrid.innerHTML = "";

    let trackedDestinations = JSON.parse(localStorage.getItem("trackedDestinations")) || {};

    for (let i = 0; i < moodDestinations.length; i++) {
        const destination = moodDestinations[i];

        let status = trackedDestinations[destination.name];

        if (status === undefined) {
            status = "Not selected";
        }

        const card = document.createElement("div");
        card.className = "tracker-card";

        const image = document.createElement("img");
        image.src = destination.image;
        image.alt = destination.name;

        const name = document.createElement("h3");
        name.textContent = destination.name;

        const country = document.createElement("p");
        country.textContent = destination.country;

        const statusText = document.createElement("p");
        statusText.className = "status-text";
        statusText.textContent = "Status: " + status;

        const visitedBtn = document.createElement("button");
        visitedBtn.textContent = "Visited";

        const plannedBtn = document.createElement("button");
        plannedBtn.textContent = "Planned";

        visitedBtn.addEventListener("click", function () {
            saveDestinationStatus(destination.name, "Visited");
        });

        plannedBtn.addEventListener("click", function () {
            saveDestinationStatus(destination.name, "Planned");
        });

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(country);
        card.appendChild(statusText);
        card.appendChild(visitedBtn);
        card.appendChild(plannedBtn);

        trackerGrid.appendChild(card);
    }
}

function saveDestinationStatus(destinationName, status) {
    let trackedDestinations = JSON.parse(localStorage.getItem("trackedDestinations")) || {};

    trackedDestinations[destinationName] = status;

    localStorage.setItem("trackedDestinations", JSON.stringify(trackedDestinations));

    displayTrackerCards();
    displayStoredTracker();

    alert(destinationName + " saved as " + status + ".");
}

function displayStoredTracker() {
    let trackedDestinations = JSON.parse(localStorage.getItem("trackedDestinations")) || {};

    storedTrackerBox.innerHTML = "";

    const destinationNames = Object.keys(trackedDestinations);

    if (destinationNames.length === 0) {
        storedTrackerBox.innerHTML = "<p>No destination status saved yet.</p>";
        return;
    }

    for (let i = 0; i < destinationNames.length; i++) {
        const destinationName = destinationNames[i];
        const status = trackedDestinations[destinationName];

        const item = document.createElement("div");
        item.className = "stored-tracker-item";

        const title = document.createElement("h3");
        title.textContent = destinationName;

        const statusText = document.createElement("p");
        statusText.textContent = "Saved Status: " + status;

        item.appendChild(title);
        item.appendChild(statusText);

        storedTrackerBox.appendChild(item);
    }
}

displayTrackerCards();
displayStoredTracker();