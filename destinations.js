const destinationList =
[
    {
        name: "Bali",
        country: "Indonesia",
        continent: "Asia",
        image: "images/bali.png",
        description: "Bali is a beautiful island destination famous for beaches, temples and rice terraces.",
        attractions: ["Ubud Rice Terraces", "Uluwatu Temple", "Seminyak Beach"],
        costs:
        [
            { type: "Budget", price: "$40 - $70 per day" },
            { type: "Standard", price: "$80 - $150 per day" },
            { type: "Luxury", price: "$200+ per day" }
        ]
    },
    {
        name: "Kyoto",
        country: "Japan",
        continent: "Asia",
        image: "images/kyoto.png",
        description: "Kyoto is a cultural city known for temples, gardens and traditional streets.",
        attractions: ["Fushimi Inari Shrine", "Arashiyama Bamboo Grove", "Kiyomizu-dera Temple"],
        costs:
        [
            { type: "Budget", price: "$50 - $90 per day" },
            { type: "Standard", price: "$100 - $180 per day" },
            { type: "Luxury", price: "$250+ per day" }
        ]
    },
    {
        name: "Ella",
        country: "Sri Lanka",
        continent: "Asia",
        image: "images/ella.png",
        description: "Ella is a scenic hill-country destination with tea plantations and mountain views.",
        attractions: ["Nine Arch Bridge", "Little Adam's Peak", "Ravana Falls"],
        costs:
        [
            { type: "Budget", price: "$25 - $50 per day" },
            { type: "Standard", price: "$60 - $120 per day" },
            { type: "Luxury", price: "$180+ per day" }
        ]
    },
    {
        name: "Santorini",
        country: "Greece",
        continent: "Europe",
        image: "images/santorini.png",
        description: "Santorini is famous for white buildings, blue domes and beautiful sunset views.",
        attractions: ["Oia Sunset", "Red Beach", "Fira Town"],
        costs:
        [
            { type: "Budget", price: "$70 - $120 per day" },
            { type: "Standard", price: "$150 - $250 per day" },
            { type: "Luxury", price: "$350+ per day" }
        ]
    },
    {
        name: "Cape Town",
        country: "South Africa",
        continent: "Africa",
        image: "images/cape-town.png",
        description: "Cape Town is a coastal city with beaches, mountains and adventure activities.",
        attractions: ["Table Mountain", "Cape Point", "V&A Waterfront"],
        costs:
        [
            { type: "Budget", price: "$45 - $80 per day" },
            { type: "Standard", price: "$90 - $170 per day" },
            { type: "Luxury", price: "$250+ per day" }
        ]
    },
    {
        name: "Monaco",
        country: "Monaco",
        continent: "Europe",
        image: "images/monaco.png",
        description: "Monaco is known for luxury, yachts and the Formula 1 Grand Prix.",
        attractions: ["Monaco Grand Prix", "Monaco Cathedral", "Port Hercule"],
        costs:
        [
            { type: "Budget", price: "$100 - $180 per day" },
            { type: "Standard", price: "$200 - $350 per day" },
            { type: "Luxury", price: "$500+ per day" }
        ]
    }
];

const destinationGrid = document.getElementById("destinationGrid");
const continentFilter = document.getElementById("continentFilter");

const modal = document.getElementById("destinationModal");
const closeModal = document.getElementById("closeModal");
const modalName = document.getElementById("modalName");
const modalDescription = document.getElementById("modalDescription");
const modalAttractions = document.getElementById("modalAttractions");
const modalCosts = document.getElementById("modalCosts");

function displayDestinations(list)
{
    destinationGrid.innerHTML = "";

    for (let i = 0; i < list.length; i++)
    {
        const destination = list[i];

        const card = document.createElement("div");
        card.className = "destination-item";

        const image = document.createElement("img");
        image.src = destination.image;
        image.alt = destination.name;

        const name = document.createElement("h2");
        name.textContent = destination.name;

        const country = document.createElement("p");
        country.textContent = destination.country + " / " + destination.continent;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(country);

        card.addEventListener("click", function ()
        {
            openModal(destination);
        });

        destinationGrid.appendChild(card);
    }
}

function filterByContinent()
{
    const selectedContinent = continentFilter.value;

    if (selectedContinent === "all")
    {
        displayDestinations(destinationList);
    } else
    {
        const filteredList = [];

        for (let i = 0; i < destinationList.length; i++)
        {
            if (destinationList[i].continent === selectedContinent)
            {
                filteredList.push(destinationList[i]);
            }
        }
        displayDestinations(filteredList);
    }
}

function openModal(destination)
{
    modalName.textContent = destination.name + ", " + destination.country;
    modalDescription.textContent = destination.description;

    modalAttractions.innerHTML = "";

    for (let i = 0; i < destination.attractions.length; i++)
    {
        const item = document.createElement("li");
        item.textContent = destination.attractions[i];
        modalAttractions.appendChild(item);
    }

    modalCosts.innerHTML = "";

    for (let i = 0; i < destination.costs.length; i++)
    {
        const row = document.createElement("tr");

        const typeCell = document.createElement("td");
        typeCell.textContent = destination.costs[i].type;

        const priceCell = document.createElement("td");
        priceCell.textContent = destination.costs[i].price;

        row.appendChild(typeCell);
        row.appendChild(priceCell);

        modalCosts.appendChild(row);
    }
    modal.style.display = "block";
}

continentFilter.addEventListener("change", filterByContinent);

closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event)
{
    if (event.target === modal)
    {
        modal.style.display = "none";
    }
});

displayDestinations(destinationList);
