const squares = document.querySelectorAll(".square");
const result = document.querySelector("#result");
const score = document.querySelector("#scoreValue");
const highScore = document.querySelector("#highScoreValue");
const lives = document.querySelector("#livesValue");
const timer = document.querySelector("#timerValue");
const resetBtn = document.querySelector("#reset");
const gameOverTxt = document.querySelector("#gameOver");
let color =  "";
let diffColor = "";
let colorDifferenceValue = 20;
var initScore = 0;
var highScoreValue = 0;
var scoreValue = 0;
var livesValue = 5;
var timerValue = 60;
var timerInterval;

reset();
setTimer();
addScoringLogic();
timerInterval = setInterval(checkTimer, 1000)
setHighScore();

function reset() {
    squares.forEach(s => {
        s.removeAttribute("isWrong");
    })
    generateColor();
    setSquareColors();
    setScore();
    setLives();
}

function setScore() {
    score.textContent = scoreValue;
}

function setHighScore() {
    highScore.textContent = highScoreValue;
}



function setLives() {
    lives.textContent = livesValue;
}

function setTimer() {
    timer.textContent = timerValue;
}

function generateColor() {
    let rgbArr = [];
    let rgbArrOther = [];
    let colorChangeIndex = Math.floor(Math.random() * 3);
    let plusOrMinus = Math.random();


    for(let i = 0; i < 3; i++) {
        rgbArr.push(Math.floor(Math.random() * 255))
    }

    for(let x = 0; x < rgbArr.length; x++) {
        rgbArrOther.push(rgbArr[x])
    }

    if (plusOrMinus < 0.5) {
        if(rgbArrOther[colorChangeIndex] - colorDifferenceValue >= 0){
            rgbArrOther[colorChangeIndex] -= colorDifferenceValue;
        } else {
            rgbArrOther[colorChangeIndex] += colorDifferenceValue;
        }
    } else {
        if(rgbArrOther[colorChangeIndex] + colorDifferenceValue <= 255){
            rgbArrOther[colorChangeIndex] += colorDifferenceValue;
        } else {
            rgbArrOther[colorChangeIndex] -= colorDifferenceValue;
        }
    }

    color = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`
    diffColor = `rgb(${rgbArrOther[0]}, ${rgbArrOther[1]}, ${rgbArrOther[2]})`
}

function setSquareColors() {
    let randSquare = Math.floor(Math.random() * squares.length)
    squares.forEach(e => {
        e.style.backgroundColor = color;
    })
    squares[randSquare].style.backgroundColor = diffColor;
}

function resetX() {
    squares.forEach(s => {
        s.textContent = "";
        s.style.cursor = "pointer";
    })
}

function checkTimer() {
    if (livesValue === 5 && timerValue === 60 && scoreValue === 0){
        return;
    }

    if (livesValue !== 0 && timerValue !== 0){
        timerValue -= 1;
    }

    setTimer();
    if(timerValue <= 0) {
        gameOver();
    }
}

function gameOver() {
    squares.forEach(s => {
        s.style.display = "none";
    })
    gameOverTxt.style.opacity = 1;

    if(scoreValue > highScoreValue){
        highScoreValue = scoreValue;
    }
    setHighScore();
}

function addScoringLogic(){
    squares.forEach(s => {
        s.addEventListener("click", function(){
            if(s.style.backgroundColor === diffColor){
                scoreValue += 1;
                reset();
                resetX();
                if (scoreValue % 5 === 0 && scoreValue <= 50) {
                    colorDifferenceValue -= 1;
                    console.log(colorDifferenceValue);
                }
            } else {
                s.setAttribute("isWrong", true)
                s.textContent = "X";
                if(livesValue > 0){
                    livesValue -= 1;
                }
                setLives();
                if(livesValue === 0) {
                    gameOver();
                }
            }
        });
    })
}

resetBtn.addEventListener("click", function(){
    squares.forEach(s => {
        s.style.display = "block";
    })
    colorDifferenceValue = 20
    scoreValue = 0;
    livesValue = 5;
    timerValue = 60;
    reset();
    resetX();
    setTimer();
    gameOverTxt.style.opacity = 0;
})