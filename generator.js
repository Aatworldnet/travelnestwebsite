const tripDestinations = [
    {
        name: "Bali",
        country: "Indonesia",
        image: "images/bali.png",
        type: "relaxation",
        budget: "medium",
        description: "Bali is perfect for relaxing beach holidays, temples and peaceful rice terrace views."
    },
    {
        name: "Bali",
        country: "Indonesia",
        image: "images/bali.png",
        type: "nature",
        budget: "medium",
        description: "Bali is also a great nature destination with rice terraces, waterfalls and tropical views."
    },
    {
        name: "Kyoto",
        country: "Japan",
        image: "images/kyoto.png",
        type: "cultural",
        budget: "medium",
        description: "Kyoto is ideal for cultural travellers who enjoy temples, gardens and traditional streets."
    },
    {
        name: "Kyoto",
        country: "Japan",
        image: "images/kyoto.png",
        type: "relaxation",
        budget: "low",
        description: "Kyoto is a peaceful destination for calm walks, gardens and quiet temple visits."
    },
    {
        name: "Ella",
        country: "Sri Lanka",
        image: "images/ella.png",
        type: "nature",
        budget: "low",
        description: "Ella is a beautiful low-budget nature destination with waterfalls and mountain views."
    },
    {
        name: "Ella",
        country: "Sri Lanka",
        image: "images/ella.png",
        type: "adventure",
        budget: "low",
        description: "Ella is great for low-budget adventure with hikes, viewpoints and outdoor activities."
    },
    {
        name: "Santorini",
        country: "Greece",
        image: "images/santorini.png",
        type: "relaxation",
        budget: "high",
        description: "Santorini is a luxury relaxation destination famous for sunset views and blue-domed buildings."
    },
    {
        name: "Santorini",
        country: "Greece",
        image: "images/santorini.png",
        type: "cultural",
        budget: "high",
        description: "Santorini also offers high-budget cultural experiences with villages, history and island traditions."
    },
    {
        name: "Cape Town",
        country: "South Africa",
        image: "images/cape-town.png",
        type: "adventure",
        budget: "medium",
        description: "Cape Town is great for adventure lovers with mountains, beaches and outdoor activities."
    },
    {
        name: "Cape Town",
        country: "South Africa",
        image: "images/cape-town.png",
        type: "nature",
        budget: "high",
        description: "Cape Town is a high-budget nature destination with coastlines, mountains and wildlife experiences."
    },
    {
        name: "Monaco",
        country: "Monaco",
        image: "images/monaco.png",
        type: "cultural",
        budget: "low",
        description: "Monaco can be explored culturally on a lower budget by visiting public landmarks and scenic areas."
    },
    {
        name: "Monaco",
        country: "Monaco",
        image: "images/monaco.png",
        type: "adventure",
        budget: "high",
        description: "Monaco is a high-budget adventure destination for city experiences, events and luxury travel."
    }
];

const travelType = document.getElementById("travelType");
const budgetRange = document.getElementById("budgetRange");
const generateBtn = document.getElementById("generateBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const suggestionCard = document.getElementById("suggestionCard");
const wishlistBox = document.getElementById("wishlistBox");

let selectedDestination = null;

function generateTrip() {
    const selectedType = travelType.value;
    const selectedBudget = budgetRange.value;

    const matchedDestinations = [];

    for (let i = 0; i < tripDestinations.length; i++) {
        if (tripDestinations[i].type === selectedType && tripDestinations[i].budget === selectedBudget) {
            matchedDestinations.push(tripDestinations[i]);
        }
    }

    if (matchedDestinations.length === 0) {
        suggestionCard.innerHTML = `
            <h2>No exact match found</h2>
            <p>Try choosing another travel type or budget range.</p>
        `;
        return;
    }

    const randomNumber = Math.floor(Math.random() * matchedDestinations.length);
    selectedDestination = matchedDestinations[randomNumber];

    suggestionCard.innerHTML = `
        <img src="${selectedDestination.image}" alt="${selectedDestination.name}">
        <h2>${selectedDestination.name}, ${selectedDestination.country}</h2>
        <p>${selectedDestination.description}</p>
        <p><strong>Travel Type:</strong> ${selectedDestination.type}</p>
        <p><strong>Budget:</strong> ${selectedDestination.budget}</p>
        <button id="saveWishlistBtn" type="button">Save to Wishlist</button>
    `;

    suggestionCard.classList.remove("animate");

    setTimeout(function () {
        suggestionCard.classList.add("animate");
    }, 10);

    const saveWishlistBtn = document.getElementById("saveWishlistBtn");

    saveWishlistBtn.addEventListener("click", function () {
        saveToWishlist();
    });
}

function saveToWishlist() {
    if (selectedDestination === null) {
        alert("Please generate a destination first.");
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem("travelWishlist")) || [];

    let alreadySaved = false;

    for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].name === selectedDestination.name) {
            alreadySaved = true;
        }
    }

    if (alreadySaved) {
        alert("This destination is already in your wishlist.");
        return;
    }

    wishlist.push(selectedDestination);

    localStorage.setItem("travelWishlist", JSON.stringify(wishlist));

    displayWishlist();

    alert("Destination saved to wishlist.");
}

function displayWishlist() {
    let wishlist = JSON.parse(localStorage.getItem("travelWishlist")) || [];

    wishlistBox.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistBox.innerHTML = "<p>No destinations saved yet.</p>";
        return;
    }

    for (let i = 0; i < wishlist.length; i++) {
        const item = document.createElement("div");
        item.className = "wishlist-item";

        const title = document.createElement("h3");
        title.textContent = wishlist[i].name + ", " + wishlist[i].country;

        const details = document.createElement("p");
        details.textContent = "Type: " + wishlist[i].type + " | Budget: " + wishlist[i].budget;

        item.appendChild(title);
        item.appendChild(details);

        wishlistBox.appendChild(item);
    }
}

generateBtn.addEventListener("click", generateTrip);
surpriseBtn.addEventListener("click", generateTrip);

displayWishlist();