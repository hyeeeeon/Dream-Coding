'use strict';

const CARROT_SIZE = 95;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector('.playBtn');
const timerBtn = document.querySelector('.timerBtn');
const scoreBtn = document.querySelector('.scoreBtn');

const pop_up = document.querySelector('.pop-up');
const refreshBtn = document.querySelector('.refreshBtn');
const pop_up_messge = document.querySelector('.pop-up_message');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFiledClick);

playBtn.addEventListener( 'click', () => {
    if (started){
        stopGame();
    } else {
        startGame();
    }
});

refreshBtn.addEventListener('click', ()=> {
    startGame();
    hidePop_up();
});

function startGame(){
    started = true;
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer(); 
    playSound(bgSound);
}

function stopGame(){
    started = false;
    stopGameTimer();
    hideGameBtn();
    showPop_upWithText('REPLAY❔');
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win){
    started = false;
    hidePlayBtn();
    if(win){
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPop_upWithText(win ? 'YOU WON 👏':'YOU LOST 😝');
}

function showStopBtn() {
    playBtn.style.visibility = 'visible';
}

function startGameTimer (){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval( () => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer(){
    clearInterval(timer);
    hidePlayBtn();
    showPop_upWithText('REPLAY ❔');
}

function hidePlayBtn (){
    playBtn.style.visibility = 'hidden';
}

function showPop_upWithText(text){
    pop_up_messge.innerText = text;
    pop_up.classList.remove('pop-up_hide');
    stopSound(bgSound);
}

function hidePop_up(){
    pop_up.classList.add('pop-up_hide');
}

function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerBtn.innerText = `${minutes}:${seconds}`;
}

function RefreshBtn() {
    refreshBtn.addEventListener('click', () => {
        clearInterval(timer);

    });
}

function showTimerAndScore(){
    timerBtn.style.visibility = 'visible';
    scoreBtn.style.visibility = 'visible';
}

function initGame(){
    score = 0;
    field.innerHTML = '';
    scoreBtn.innerText = CARROT_COUNT;
    // 벌레, 당근 생성 후 field에 추가
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFiledClick (){
    if (!started){
        return;
    } 
    const target = event.target;
    if(target.matches('.carrot')){
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(CARROT_COUNT===score){
            finishGame(true);
        }
    } else if (target.matches('.bug')){
        finishGame(false);
        playSound(bugSound);
    }
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}

function updateScoreBoard(){
    scoreBtn.innerText = CARROT_COUNT - score;
}
function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for ( let i = 0; i < count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left =  `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}

