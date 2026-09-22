// Score state variables
let humanScore = 0;
let computerScore = 0;

// Query DOM elements
const buttons = document.querySelectorAll("#buttons button");
const roundResult = document.querySelector("#round-result");
const scoreDisplay = document.querySelector("#score");
const finalWinner = document.querySelector("#final-winner");
const resetBtn = document.querySelector("#reset-btn");

// Return random choice for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const humanChoice = button.id;
        const computerChoice = getComputerChoice();

        playRound(humanChoice, computerChoice);
    });
});

function getHumanChoice() {
    const userInput = prompt("Enter your choice: rock, paper, or scissors");
    return userInput ? userInput.toLowerCase() : "";
}

function playRound(humanChoice, computerChoice) {
    const human = humanChoice.toLowerCase();
    const computer = computerChoice;

    // Tie condition
    if(human === computer) {
        console.log(`It's a tie! Both chose ${human}`);
            return;
    }

    // Win condition for human
    if(
        (human === "rock" && computer === "scissors") ||
        (human === "paper" && computer === "rock") ||
        (human === "scissors" && computer === "paper")
    ) {
        humanScore++;
        roundResult.textContent = `You win! ${human} beats ${computer}.`;
    } else {
        computerScore++;
        roundResult.textContent = `You lose! ${computer} beats ${human}.`;
    }

    // Update current scores on screen
    scoreDisplay.textContent = `Player: ${humanScore} | Computer: ${computerScore}`;

    checkWinner();
}

// Check if someone reached 5 points to end the game
function checkWinner() {
    if(humanScore === 5 || computerScore === 5) {
        if(humanScore === 5) {
            finalWinner.textContent = "🎉 Congratulations! You won the game!";
            finanWinner.style.color = "green";
        } else {
            finalWinner.textContent = "💀 Game Over! The computer won the game!";
            finalWinner.style.color = "red";
        }

        // Disable all weapon buttons so player cannot click anymore
        buttons.forEach((button) => {
            button.disabled = true;
        });

        // Show the reset button
        resetBtn.style.display = "inline-block";
    }
}

// Reset the game state back to round 1
function resetGame() {
    humanScore = 0;
    computerScore = 0;

    scoreDisplay.textContent = "Player: 0 | Computer: 0";
    roundResult.textContent = "Choose your weapon to start the game!";
    finalWinner.textContent = "";

    // Re-enable weapon buttons
    buttons.forEach((button) => {
        button.disabled = false;
    });

    // Hide the reset button again
    resetBtn.style.display = "none";
}

// Add click event listener to reset button
resetBtn.addEventListener("click", resetGame);

playGame();