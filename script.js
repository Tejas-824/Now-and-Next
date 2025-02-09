const checkBoxes = document.querySelectorAll(".check-box");
const inputFields = document.querySelectorAll(".input-text");
const progressLabel = document.querySelector(".progress-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

const allQuotes = [
    "Challenge yourself and make your goals happen!",
    "Just one more step, keep pushing!",
    "Just a little more to go, keep moving!",
    "Every goal checked off! Now it's time to relax!"
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length;

function updateProgress() {
    const totalGoals = Object.keys(allGoals).length || 1;
    progressValue.style.width = `${(completedGoalCount / totalGoals) * 100}%`;
    progressValue.firstElementChild.innerText = `${completedGoalCount}/${totalGoals} Achieved`;
    progressLabel.innerText = allQuotes[Math.min(completedGoalCount, allQuotes.length - 1)];
}

updateProgress();

checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener("click", () => {
        const goalContainer = checkBox.closest(".goal-container");
        const inputField = goalContainer.querySelector(".input-text");
        const inputId = checkBox.nextElementSibling.id;

        if (inputField.value.trim() !== "") {
            goalContainer.classList.toggle("completed");

            if (!allGoals[inputId]) {
                allGoals[inputId] = { name: inputField.value, completed: false };
            }
            allGoals[inputId].completed = !allGoals[inputId].completed;

            completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length;
            updateProgress();

            localStorage.setItem("allGoals", JSON.stringify(allGoals));
        } else {
            progressBar.classList.add("show-error");
        }
    });
});

inputFields.forEach((input) => {
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name;
        if (allGoals[input.id].completed) {
            input.parentElement.classList.add("completed");
        }
    }
    input.addEventListener("focus", () => {
        progressBar.classList.remove("show-error");
    });

    input.addEventListener("input", (e) => {
        if (allGoals[input.id]?.completed) {
            e.target.value = allGoals[input.id].name;
            return;
        }
        if (!allGoals[input.id]) {
            allGoals[input.id] = { name: "", completed: false };
        }

        allGoals[input.id].name = input.value;
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
    });
});
