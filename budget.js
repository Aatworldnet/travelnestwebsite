const budgetForm = document.getElementById("budgetForm");
const totalCost = document.getElementById("totalCost");
const budgetStatus = document.getElementById("budgetStatus");
const progressFill = document.getElementById("progressFill");
const saveBudgetBtn = document.getElementById("saveBudgetBtn");
const savedBudgets = document.getElementById("savedBudgets");

let currentBudget = null;

budgetForm.addEventListener("submit", function (event)
{
    event.preventDefault();

    const destination = document.getElementById("destination").value;
    const days = Number(document.getElementById("days").value);
    const dailyBudget = Number(document.getElementById("dailyBudget").value);

    if (destination === "" || days <= 0 || dailyBudget <= 0)
    {
        alert("Please enter valid budget details.");
        return;
    }

    const estimatedTotal = days * dailyBudget;

    let status = "";
    let progressWidth = "";

    if (dailyBudget < 50)
    {
        status = "Low Budget";
        progressWidth = "35%";
    } else if (dailyBudget >= 50 && dailyBudget <= 150) {
        status = "Moderate Budget";
        progressWidth = "70%";
    } else {
        status = "Luxury Budget";
        progressWidth = "100%";
    }

    totalCost.textContent = "Estimated Total Cost: $" + estimatedTotal;
    budgetStatus.textContent = "Budget Status: " + status;
    progressFill.style.width = progressWidth;

    currentBudget = {
        destination: destination,
        days: days,
        dailyBudget: dailyBudget,
        estimatedTotal: estimatedTotal,
        status: status
    };
});

saveBudgetBtn.addEventListener("click", function ()
{
    if (currentBudget === null)
    {
        alert("Please calculate a budget before saving.");
        return;
    }

    let budgetList = JSON.parse(localStorage.getItem("savedTripBudgets")) || [];

    budgetList.push(currentBudget);

    localStorage.setItem("savedTripBudgets", JSON.stringify(budgetList));

    displaySavedBudgets();

    alert("Budget saved successfully.");
});

function displaySavedBudgets() {
    let budgetList = JSON.parse(localStorage.getItem("savedTripBudgets")) || [];

    savedBudgets.innerHTML = "";

    if (budgetList.length === 0)
    {
        savedBudgets.innerHTML = "<p>No saved budgets yet.</p>";
        return;
    }

    for (let i = 0; i < budgetList.length; i++)
    {
        const budget = budgetList[i];

        const card = document.createElement("div");
        card.className = "saved-budget-card";

        const title = document.createElement("h3");
        title.textContent = budget.destination;

        const days = document.createElement("p");
        days.textContent = "Days: " + budget.days;

        const daily = document.createElement("p");
        daily.textContent = "Daily Budget: $" + budget.dailyBudget;

        const total = document.createElement("p");
        total.textContent = "Total Cost: $" + budget.estimatedTotal;

        const status = document.createElement("p");
        status.textContent = "Status: " + budget.status;

        card.appendChild(title);
        card.appendChild(days);
        card.appendChild(daily);
        card.appendChild(total);
        card.appendChild(status);

        savedBudgets.appendChild(card);
    }
}

displaySavedBudgets();
