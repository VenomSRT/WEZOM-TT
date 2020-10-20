'use strict';

function showMenu() {
  document.querySelector('.header__menu').style.display = 'block';
}

document.querySelector('.header__menu-button')
  .addEventListener('click', showMenu);
