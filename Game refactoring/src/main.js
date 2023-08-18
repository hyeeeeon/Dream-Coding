'use strict';

import pop_up from './pop_up.js';
import * as sound from './sound.js';
import {GameBuilder, Reason} from './game.js';

const gameFinishBanner = new pop_up();
const game = new GameBuilder()
    .withGameDuration(10)
    .withCarrotCount(10)
    .withBugCount(12)
    .build();


game.setGameStopListener(reason => {
    let message;
    switch (reason) {
        case Reason.win:
         message = 'YOU WIN 👏';
         sound.playWin();
         break;
        case Reason.lose:
         message = 'YOU LOST 😝';
         sound.playBug();
         break;
        default:
            message = 'Replay ❔';
            sound.playAlert();
            break;
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener( () => {
    game.start();
});