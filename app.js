let boxes = document.querySelectorAll(".box");

let resetBtn = document.querySelector(".Reset");
let startBtn = document.querySelector("#start-btn");
let newGameBtn = document.querySelector("#new-btn");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let gameOver = false;

const WinPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Handle box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (gameOver || box.innerText !== "") {
            return;
        }

        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }

        box.disabled = true;

        checkWinner();
    });
});

// Display winner or draw message
const showMessage = (message) => {
    msg.innerText = message;
    msgContainer.classList.remove("hide");
    gameOver = true;

    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Check winning combinations
const checkWinner = () => {

    for (let pattern of WinPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (
            pos1Val !== "" &&
            pos1Val === pos2Val &&
            pos2Val === pos3Val
        ) {
            showMessage(
                `Congratulations! Winner is ${pos1Val}`
            );
            return;
        }
    }

    // Check whether all boxes are filled
    let isDraw = [...boxes].every((box) => {
        return box.innerText !== "";
    });

    if (isDraw) {
        showMessage("It's a Draw!");
    }
};

// Reset the game
const resetGame = () => {
    turn0 = true;
    gameOver = false;

    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });

    msgContainer.classList.add("hide");
    msg.innerText = "";
};

// Reset Game button
resetBtn.addEventListener("click", () => {
    resetGame();
});

// Start New Game button
startBtn.addEventListener("click", () => {
    resetGame();
});

// Start another game after a win or draw
newGameBtn.addEventListener("click", () => {
    resetGame();
});