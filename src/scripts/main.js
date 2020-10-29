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
    if (event.target.tagName === 'INPUT') {
      const elemClass = event.target.className;

      document.querySelectorAll('.goods-filter__form')
        .forEach(elem => {
          elem.style.display = 'none';
        });

      document.getElementById(elemClass.split('--')[1]).style.display = 'flex';
    }
  });

document.querySelector('.header__enter-description')
  .addEventListener('click', () => {
    document.querySelector('.enter-popup').style.transform = 'translate(0, 0)';
  });

document.querySelector('.enter-popup__cross-container')
  .addEventListener('click', () => {
    document.querySelector('.enter-popup')
      .style.transform = 'translate(0, -100%)';
  });

document.querySelector('.main__callback-button')
  .addEventListener('click', () => {
    document.querySelector('.callback-popup')
      .style.transform = 'translate(0, 0)';
  });

document.querySelector('#telephone')
  .addEventListener('focusout', () => {
    document.querySelector('.callback-popup')
      .style.transform = 'translate(0, -100%)';
  });

function emailValidator() {
  const emailInputs = document.querySelectorAll('input[type="email"]');

  function validateEmail(email) {
    const re = /[0-9a-z_A-Z]+@[0-9a-z_A-Z^.]+\.[a-zA-Z]{2,4}/i;

    return re.test(String(email).toLowerCase());
  }

  emailInputs.forEach(input => {
    input.addEventListener('input', (event) => {
      if (!validateEmail(event.target.value)) {
        event.target.style.backgroundColor = '#ffbaba';
      } else {
        event.target.style.backgroundColor = '#baffba';
      }
    });
  });
}

function passwordValidator() {
  const passwordInput = document.querySelector('#password');

  function validatePassword(password) {
    const re = /[\w\d]{4,}/i;

    return re.test(String(password).toLowerCase());
  }

  passwordInput.addEventListener('input', (event) => {
    if (!validatePassword(event.target.value)) {
      event.target.style.backgroundColor = '#ffbaba';
    } else {
      event.target.style.backgroundColor = '#baffba';
    }
  });
}

function priceValidatior() {
  const priceInputs = document.querySelectorAll('.form__price-input');

  priceInputs.forEach(input => {
    input.addEventListener('input', (event) => {
      if (+event.target.value < 0 || isNaN(event.target.value)) {
        event.target.style.backgroundColor = '#ffbaba';
      } else {
        event.target.style.backgroundColor = '#baffba';
      }
    });
  });
}

function telephoneValidator() {
  const telephoneInput = document.querySelector('#telephone');

  telephoneInput.addEventListener('input', (event) => {
    const currentValue = event.target.value;

    event.target.value = `+38(0${currentValue}`;
  });
}

function addToComparison() {
  const compareLinks = document.querySelectorAll('.card__tocompare-link');

  compareLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const counterLabel = document.querySelector('#comparison');

      if (event.target.textContent === 'Сравнить товар') {
        event.target.textContent = 'В сравнении';
        counterLabel.textContent = +counterLabel.textContent + 1;
      } else {
        event.target.textContent = 'Сравнить товар';
        counterLabel.textContent = +counterLabel.textContent - 1;
      }

      if (+counterLabel.textContent > 0) {
        counterLabel.style.display = 'block';
      } else {
        counterLabel.style.display = 'none';
      }
    });
  });
}

function addToFavourite() {
  const favouriteLinks = document.querySelectorAll('.card__tofavourite-link');

  favouriteLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const favouriteLabel = document.querySelector('#favourites');

      if (event.target.textContent === 'В избранное') {
        event.target.textContent = 'В избранном';
        favouriteLabel.textContent = +favouriteLabel.textContent + 1;
      } else {
        event.target.textContent = 'В избранное';
        favouriteLabel.textContent = +favouriteLabel.textContent - 1;
      }

      if (+favouriteLabel.textContent > 0) {
        favouriteLabel.style.display = 'block';
      } else {
        favouriteLabel.style.display = 'none';
      }
    });
  });
}

emailValidator();
passwordValidator();
priceValidatior();
telephoneValidator();
addToComparison();
addToFavourite();
