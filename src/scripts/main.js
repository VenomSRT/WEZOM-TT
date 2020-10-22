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

document.querySelector('.labels-container')
  .addEventListener('click', (event) => {
    if (event.target.tagName === 'LABEL') {
      const elemClass = event.target.className;

      document.querySelectorAll('.goods-filter__form')
        .forEach(elem => {
          elem.style.display = 'none';
        });

      document.getElementById(elemClass.split('--')[1]).style.display = 'flex';
    }
  });
