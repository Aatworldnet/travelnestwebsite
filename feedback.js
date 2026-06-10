const feedbackForm = document.getElementById("feedbackForm");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userMessage = document.getElementById("userMessage");
const feedbackMessage = document.getElementById("feedbackMessage");

feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameValue = userName.value.trim();
    const emailValue = userEmail.value.trim();
    const messageValue = userMessage.value.trim();

    if (nameValue === "") {
        feedbackMessage.textContent = "Please enter your name.";
        feedbackMessage.style.color = "red";
        return;
    }

    if (emailValue === "") {
        feedbackMessage.textContent = "Please enter your email.";
        feedbackMessage.style.color = "red";
        return;
    }

    if (!emailValue.includes("@") || !emailValue.includes(".")) {
        feedbackMessage.textContent = "Please enter a valid email address.";
        feedbackMessage.style.color = "red";
        return;
    }

    if (messageValue === "") {
        feedbackMessage.textContent = "Please enter your message.";
        feedbackMessage.style.color = "red";
        return;
    }

    const feedback = {
        name: nameValue,
        email: emailValue,
        message: messageValue
    };

    let feedbackList = JSON.parse(localStorage.getItem("travelFeedback")) || [];

    feedbackList.push(feedback);

    localStorage.setItem("travelFeedback", JSON.stringify(feedbackList));

    feedbackMessage.textContent = "Thank you. Your feedback has been submitted.";
    feedbackMessage.style.color = "green";

    feedbackForm.reset();
});

const faqQuestions = document.getElementsByClassName("faq-question");

for (let i = 0; i < faqQuestions.length; i++) {
    faqQuestions[i].addEventListener("click", function () {
        const answer = this.nextElementSibling;
        answer.classList.toggle("active");
    });
}
