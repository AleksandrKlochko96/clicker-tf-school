const counter = document.querySelector('.counter');
const result = document.querySelector('.result');
const display = document.querySelector('.display');
const main = document.querySelector('main');
const ShowTimer = document.querySelector('.ShowTimer');
const fieldset = document.querySelector('fieldset');
const form = document.querySelector('form');
const nameUser = document.querySelector('[name="name"]');
const video = document.querySelector('video');
const text = document.querySelector('.text');
const header = document.querySelector('header');

let button = null;
let allclicks = 0;
let clicks = 0;
let timeout = 15000;
let round = 1;
let inputName = null;

// Form

form.addEventListener('submit', formSubmit)

function formSubmit(event) {
    event.preventDefault();
    startGame()
    main.className = "submit_form";
    fieldset.remove();
    inputName = nameUser.value;
    text.remove();
    header.className= "background";
}

// Кнопки начала игры

function startGame() {
    clickBtn();
    buttonSelect();
    startLevel();
    clicks = 0;
  };

function clickBtn() { 
    const btn = document.createElement("button");
    btn.innerHTML = `<img src="/img/111222.gif" class="img" alt="Click">`;
    btn.className = "btn"
    display.append(btn);
}

function buttonSelect() { 
    button = document.querySelector(".btn");
}

// Timer

function timer() {
    let timerTimeout = timeout; 
    setInterval(() => {
    seconds = timerTimeout/1000;
    if (seconds < 0) {
        clearInterval();
        // ShowTimer.remove();
    } else {       
        let strTimer = `${seconds} seconds`;
        ShowTimer.textContent = strTimer;
} 
    timerTimeout = timerTimeout - 10;
}, 10);
}

// Функция самой игры

function startLevel() {
const clikerBtn = button.addEventListener("click", function(){
    counter.textContent = `Round: ${round}, Number of clicks: ${++clicks}`;
});

const randomPositionBtn = button.addEventListener('click', function(){

    function randomIntegerTop(min, max) {
        let rand = min + Math.random() * (max - min)
        rand = Math.round(rand);
        return rand;
      }

      function randomIntegerLeft(min, max) {
        let rand = min + Math.random() * (max - min)
        rand = Math.round(rand);
        return rand;
      }

    button.style.marginTop = randomIntegerTop(1, 65)+"vh";
    button.style.marginLeft = randomIntegerLeft(-80, 80)+"%";
});

const nextLevelOrTryAgainBtn = button.addEventListener("click", newBtn)

function newBtn (){
    button.removeEventListener('click', newBtn);
    timer();
    setTimeout(() => {
        if (clicks >= 10) {
            result.textContent = `${inputName}, YOU WON!!! You made ${clicks} clicks`
            const checkRound = (round === 4) ? theEnd() : newLevelButton()
            button.remove();
            counter.textContent = '';  
        } else {
            result.textContent = `${inputName}, YOU LOSE!!! You made only ${clicks} clicks`
            tryAgainButton();
            button.remove();
            counter.textContent = '';  
        }    
}, timeout);};
}

// Кнопки перехода между уровнями

function newLevelButton() { 
    allclicks += clicks;
    const newLevelbtn = document.createElement("button");
    newLevelbtn.innerHTML = "Next Level";
    newLevelbtn.className = "next_Level";
    newLevelbtn.onclick = function () {
        timeout = timeout - 2000;
        const btnStart = document.createElement("button");
        btnStart.className = "start_btn";
        btnStart.innerHTML = "Start";
        btnStart.onclick = function() { 
            startGame();
            btnStart.remove();
            ++round;
            };
        main.append(btnStart);
        result.textContent = '';
        newLevelbtn.remove();
      };
    display.appendChild(newLevelbtn);
}

function tryAgainButton() { 
    const btn = document.createElement("button");
    btn.innerHTML = "Try again";
    btn.className = "try_again";
    btn.onclick = function () {
        startGame();
        btn.remove();
        result.textContent = '';
        round = 1;
        allclicks = 0;
        timeout = 15000;
    }
    display.appendChild(btn);
}

function theEnd () {
    allclicks += clicks;
    result.textContent = `${inputName}, Victory! In total you made ${allclicks} clicks`;
    tryAgainButton();
}






 







