'use strict';

let menuDisplay = 'none';

function toggleMenu() {
  if (menuDisplay === 'none') {
    document.querySelector('.header__menu').style.display = 'block';
    menuDisplay = 'block';
  } else {
    document.querySelector('.header__menu').style.display = 'none';
    menuDisplay = 'none';
  }
}

document.querySelector('.header__menu-button')
  .addEventListener('click', toggleMenu);
