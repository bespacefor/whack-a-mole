const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const timer = document.querySelector('.timer');
const scoreBoard = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
const playBtn = document.querySelector('.play-btn');
const stopBtn = document.querySelector('.stop-btn');

let lastHole;
let timeIsOver = false;
let score;
let seconds;
let timerId;

//The function of getting a random time.
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//Getting a random hole.
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if (hole === lastHole) {
        return randomHole(holes);
    } else {
        lastHole = hole;
        return hole;
    };
}

//Meeting with a mole.
function peep() {
    const time = randomTime(200, 800);
    const hole = randomHole(holes);
    hole.classList.add('up');

    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeIsOver) peep();
    }, time);
}

//Play function.
function startGame() {
    timeIsOver = false;
    timer.textContent = 10;
    scoreBoard.textContent = 0;
    score = 0;
    seconds = 10;
    peep();

    timerId = setInterval(() => {
        seconds--;
        timer.textContent = seconds;

        if (seconds === 0) {
        clearInterval(timerId);
        timer.textContent = 'Game OVER!!!';

        if (score > highScore.textContent) {
            localStorage.setItem('High Score', score);
            highScore.textContent = localStorage.getItem('High Score');
            console.log('Congratulations! This is a new High Score!');
        } else console.log("Oops... Let's try again!");
        };
    }, 1000);

    setTimeout(() => timeIsOver = true, 10000);
}

//Exit function.
function stopGame() {
    timeIsOver = true;
    clearInterval(timerId);
    timer.textContent = 10;
    scoreBoard.textContent = 0;
    localStorage.removeItem('High Score', score);
    highScore.textContent = 0;
}

//Checking mouse event function.
function whack(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));
playBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
