const words = [
    { word: "apple", hint: "A fruit" },
    { word: "javascript", hint: "A programming language" },
    { word: "giraffe", hint: "An animal with a long neck" },
];

const maxLives = 6;
let lives = maxLives;
let selectedWordData = words[Math.floor(Math.random() * words.length)];
let word = selectedWordData.word.toUpperCase();
let hint = selectedWordData.hint;
let guessedLetters = [];

const hintText = document.getElementById("hint-text");
const livesCount = document.getElementById("lives-count");
const wordContainer = document.getElementById("word-container");
const lettersContainer = document.getElementById("letters-container");
const hangmanDrawing = document.getElementById("hangman-drawing");
const ctx = hangmanDrawing.getContext("2d");

hintText.textContent = hint;

function drawHangman(livesLeft) {
    ctx.clearRect(0, 0, hangmanDrawing.width, hangmanDrawing.height);
    ctx.lineWidth = 2;

    // Base
    if (livesLeft <= 5) ctx.strokeRect(20, 180, 160, 10);

    // Pole
    if (livesLeft <= 4) ctx.strokeRect(50, 20, 10, 160);

    // Beam
    if (livesLeft <= 3) {
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.lineTo(120, 20);
        ctx.stroke();
    }

    // Rope
    if (livesLeft <= 2) {
        ctx.beginPath();
        ctx.moveTo(120, 20);
        ctx.lineTo(120, 50);
        ctx.stroke();
    }

    // Head
    if (livesLeft <= 1) {
        ctx.beginPath();
        ctx.arc(120, 70, 20, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Body
    if (livesLeft <= 0) {
        ctx.beginPath();
        ctx.moveTo(120, 90);
        ctx.lineTo(120, 140);
        ctx.stroke();
        // Arms
        ctx.moveTo(120, 110);
        ctx.lineTo(100, 120);
        ctx.stroke();
        ctx.moveTo(120, 110);
        ctx.lineTo(140, 120);
        ctx.stroke();
        // Legs
        ctx.moveTo(120, 140);
        ctx.lineTo(100, 160);
        ctx.stroke();
        ctx.moveTo(120, 140);
        ctx.lineTo(140, 160);
        ctx.stroke();
    }
}

function renderWord() {
    wordContainer.innerHTML = "";
    word.split("").forEach((letter) => {
        const letterSpan = document.createElement("span");
        letterSpan.className = "word";
        letterSpan.textContent = guessedLetters.includes(letter) ? letter : "";
        wordContainer.appendChild(letterSpan);
    });
}

function renderLetters() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    lettersContainer.innerHTML = "";
    alphabet.split("").forEach((letter) => {
        const button = document.createElement("button");
        button.className = "letter";
        button.textContent = letter;
        button.disabled = guessedLetters.includes(letter);
        button.addEventListener("click", () => handleGuess(letter));
        lettersContainer.appendChild(button);
    });
}

function handleGuess(letter) {
    guessedLetters.push(letter);
    if (word.includes(letter)) {
        renderWord();
        checkWin();
    } else {
        lives--;
        livesCount.textContent = lives;
        drawHangman(lives);
        checkLoss();
    }
    renderLetters();
}

function checkWin() {
    const wordGuessed = word.split("").every((letter) => guessedLetters.includes(letter));
    if (wordGuessed) {
        alert("Congratulations! You guessed the word!");
        resetGame();
    }
}

function checkLoss() {
    if (lives === 0) {
        alert(`Game Over! The word was: ${word}`);
        resetGame();
    }
}

function resetGame() {
    lives = maxLives;
    livesCount.textContent = lives;
    guessedLetters = [];
    selectedWordData = words[Math.floor(Math.random() * words.length)];
    word = selectedWordData.word.toUpperCase();
    hint = selectedWordData.hint;
    hintText.textContent = hint;
    renderWord();
    renderLetters();
    drawHangman(maxLives);
}

// Initialize game
renderWord();
renderLetters();