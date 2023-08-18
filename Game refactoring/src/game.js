'use strict';

import {field, ItemType} from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    default: 'default',
});

export class GameBuilder {
    withGameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    withCarrotCount(num){
        this.carrotCount = num;
        return this;
    }

    withBugCount(num){
        this.bugCount = num;
        return this;
    }

    build(){
        return new Game(
         this.gameDuration,
         this.carrotCount,
         this.bugCount
        );
    }
}

class Game{
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

    this.timerBtn = document.querySelector('.timerBtn');
    this.scoreBtn = document.querySelector('.scoreBtn');
    this.playBtn = document.querySelector('.playBtn');

    this.playBtn.addEventListener( 'click', () => {
        if (this.started){
            this.stop(Reason.default);
        } else {
            this.start();
        }
    });

    this.gameField = new field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
    }
 
    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;

    }

    start(){
        this.started = true;
        this.initGame();
        this.showStopBtn();
        this.showTimerAndScore();
        this.startGameTimer(); 
        sound.playBackground();
    }
    
    stop(reason){
        this.started = false;
        this.stopGameTimer();
        this.hidePlayBtn();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }

    onItemClick = (item) => {
        if (!this.started){
            return;
        } 
        if(item === ItemType.carrot){
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount){
                this.stop(Reason.win);
            }
        } else if (item === ItemType.bug){ 
            this.stop(Reason.lose);
        }
    };

    showStopBtn() {
        this.playBtn.style.visibility = 'visible';
    }

    hidePlayBtn (){
        this.playBtn.style.visibility = 'hidden';
    }

    showTimerAndScore(){
        this.timerBtn.style.visibility = 'visible';
        this.scoreBtn.style.visibility = 'visible';
    }
    
    startGameTimer (){
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval( () => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopGameTimer(){
        clearInterval(this.timer);
    }

    updateTimerText(time){
        this.minutes = Math.floor(time / 60);
        this.seconds = time % 60;
        this.timerBtn.innerText = `${this.minutes}:${this.seconds}`;
    }

    initGame(){
        this.score = 0;
        this.scoreBtn.innerText = this.carrotCount;
        this.gameField.init();
    } 

    updateScoreBoard(){
        this.scoreBtn.innerText = this.carrotCount - this.score;
    }
}