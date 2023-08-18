'use strict';

export default class pop_up {
    constructor(){
    this.pop_up = document.querySelector('.pop-up');
    this.refreshBtn = document.querySelector('.refreshBtn');
    this.pop_up_messge = document.querySelector('.pop-up_message');
    this.refreshBtn.addEventListener('click', () => {
        this.onClick && this.onClick();
        this.hide();
    });
    }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text){
    this.pop_up_messge.innerText = text;
    this.pop_up.classList.remove('pop-up_hide');
  }
  hide() {
    this.pop_up.classList.add('pop-up_hide');
  }
}