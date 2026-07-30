let inputValue = document.getElementById("userInput");
let submitBtn = document.getElementById("submitBtn");
let attemptCtn = document.getElementById("attempts");
let msg = document.getElementById("message");

const rndNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

submitBtn.addEventListener("click", () => {
    const userGuess = Number(inputValue.value);

    if (userGuess <= 0 || userGuess > 100 || userGuess == "") {
        msg.textContent = "⚠ Please Enter a valid Number!";
        msg.style.color = "red";

        return;
    }

    attempts++;
    attemptCtn.textContent = `Attempts: ${attempts}`;

    if (userGuess === rndNumber) {
        msg.textContent = `Success 🎉! You guessed the correct number (${rndNumber}) in ${attempts} attempts!`;
        msg.style.color = "green";

        inputValue.disabled = true;
        submitBtn.disabled = true;

        const reload = document.createElement("p");
        reload.setAttribute("id", "reloadText");
        reload.innerHTML = "Click <span>here</span> to play again.";
        document.querySelector(".output-group").appendChild(reload);

        document.querySelector("span").addEventListener('click', () => {
            location.reload();
        });
    }

    else if (userGuess > rndNumber) {
        msg.textContent = "Too High 📈! Try again.";
        msg.style.color = "red";
    }

    else {
        msg.textContent = "Too Low 📉! Try again.";
        msg.style.color = "red";
    }
})