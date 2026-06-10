const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
}


// Hero image slideshow
const heroImages = [
    "images/bali.png",
    "images/kyoto.png",
    "images/ella.png",
    "images/santorini.png",
    "images/cape-town.png",
    "images/monaco.png"
];

let currentImage = 0;
const heroSlide = document.getElementById("heroSlide");

function changeHeroImage() {
    if (heroSlide)
    {
        currentImage++;

        if (currentImage >= heroImages.length) {
            currentImage = 0;
        }

        heroSlide.src = heroImages[currentImage];
    }
}

setInterval(changeHeroImage, 5000);

// Destination of the Day
const destinations = [
    {
        name: "Bali, Indonesia",
        image: "images/bali.png",
        description: "A tropical island famous for beaches, temples, rice terraces and relaxing holidays.",
    },
    {
        name: "Kyoto, Japan",
        image: "images/kyoto.png",
        description: "A cultural city known for temples, gardens, traditional streets and cherry blossoms.",
    },
    {
        name: "Ella, Sri Lanka",
        image: "images/ella.png",
        description: "A beautiful hill-country destination with tea plantations, waterfalls and mountain views.",
    },
    {
        name: "Santorini, Greece",
        image: "images/santorini.png",
        description: "A scenic island popular for white buildings, blue domes and amazing sunset views.",
    },
    {
        name: "Cape Town, South Africa",
        image: "images/cape-town.png",
        description: "A coastal city offering beaches, mountains, wildlife and adventure activities.",
    },
    {
        name: "Monaco, Monaco",
        image: "images/monaco.png",
        description: "A glamorous city-state known for luxury, yacht-filled harbor and Formula 1 Grand Prix.",
    }
];

function showDestinationOfTheDay() {
    const today = new Date();
    const dayNumber = today.getDate();
    const destinationIndex = dayNumber % destinations.length;
    const destination = destinations[destinationIndex];

    document.getElementById("dayImage").src = destination.image;
    document.getElementById("dayImage").alt = destination.name;
    document.getElementById("dayName").textContent = destination.name;
    document.getElementById("dayDescription").textContent = destination.description;
}

showDestinationOfTheDay();

const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterMessage = document.getElementById("newsletterMessage");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = newsletterEmail.value.trim();

        if (email === "") {
            newsletterMessage.textContent = "Please enter your email.";
            newsletterMessage.style.color = "red";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            newsletterMessage.textContent = "Please enter a valid email.";
            newsletterMessage.style.color = "red";
            return;
        }

        localStorage.setItem("newsletterEmail", email);

        newsletterMessage.textContent = "Thank you for subscribing.";
        newsletterMessage.style.color = "white";

        newsletterForm.reset();
    });
}