let boxes = document.querySelectorAll('.box');
let btnreset = document.querySelector('#btnreset');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let newBtn = document.querySelector('#new-btn');
let oScoreSpan = document.querySelector('#o-score');
let xScoreSpan = document.querySelector('#x-score');
let playerONameSpan = document.querySelector('#playerO-name');
let playerXNameSpan = document.querySelector('#playerX-name');
let oScore = 0;
let xScore = 0;
let playerO = "";
let playerX = "";

window.onload = () => {
    playerO = prompt("Enter name for Player O:");
    playerX = prompt("Enter name for Player X:");

    if (!playerO) playerO = "Player O";
    if (!playerX) playerX = "Player X";

    playerONameSpan.innerText = playerO;
    playerXNameSpan.innerText = playerX;

    msg.innerText = `Start the Game!\n${playerO} (O) vs ${playerX} (X)`;
    msgContainer.classList.remove('hide');
};
let turno= true; // true for o and false for x
let count = 0;
// Show "Start the Game!" message when page loads
// window.onload = () => {
//     msg.innerText = "Start the Game!";
//     msgContainer.classList.remove('hide');
// };
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Show "Start the Game!" message when page loads
// window.onload = () => {
//     msg.innerText = "Start the Game!";
//     msgContainer.classList.remove('hide');
// };


const resetGame = () => {
    turno = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add('hide');
};

boxes.forEach(box => {
    box.addEventListener('click', () => {
        msgContainer.classList.add('hide');
        if (turno){
            box.innerText = 'O';
            turno = false;
        }
        else{
            box.innerText = 'X';
            turno = true;
        }
        box.disabled= true;
        count++;
        checkwinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove('win');
    }
};

const showwinner = (winner, pattern) => {
    let winnerName = winner === "O" ? playerO : playerX;

    msg.innerText = `Congratulations ${winnerName}! 🎉`;
    msgContainer.classList.remove('hide');

    // Highlight winning line
    if (pattern) {
        pattern.forEach(index => {
            boxes[index].classList.add('win');
        });
    }

    // Update score
    if (winner === "O") {
        oScore++;
        oScoreSpan.innerText = oScore;
    } else {
        xScore++;
        xScoreSpan.innerText = xScore;
    }

    disableBoxes();
};




const checkwinner = () => {
    for (let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val){
            showwinner(pos1val, pattern);
            return;
        }
    }

    if (count === 9){
        msg.innerText = "It's a Tie!";
        msgContainer.classList.remove('hide');
        disableBoxes();
    }
};


newBtn.addEventListener('click', resetGame);
btnreset.addEventListener('click', resetGame);

