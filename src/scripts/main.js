'use strict';

let cardsContainerHtml = document.querySelector('#cards-container').innerHTML;
const categoryFormsHtml = document
  .querySelector('.goods-filter__category').innerHTML;

priceValidatior();
addToComparison();
addToFavourite();

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

document.querySelector('.header__enter-button')
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

document.querySelector('.callback-popup__submit')
  .addEventListener('click', event => {
    event.preventDefault();

    document.querySelector('.callback-popup')
      .style.transform = 'translate(0, -100%)';
  });

document.querySelector('#telephone')
  .addEventListener('input', event => {
    const inputField = event.target;

    if (inputField.value.match(/\d/g)) {
      inputField.placeholder = inputField.placeholder
        .replace(/-/, inputField.value.match(/\d/g));
    }

    inputField.value = '';
  });

document.querySelector('#telephone')
  .addEventListener('keydown', event => {
    if (event.key === 'Backspace') {
      const inputField = event.target;

      inputField.placeholder = inputField.placeholder
        .replace(/\d(?=[^\d]*$)/, '-');
    }
  });

function emailValidator(event) {
  const regExp = /[0-9a-z_A-Z]+@[0-9a-z_A-Z^.]+\.[a-zA-Z]{2,4}/i;
  const emailInput = event.target;

  if (!regExp.test(String(emailInput.value))) {
    emailInput.style.backgroundColor = '#ffc3c3';
    emailInput.setAttribute('data-valid', '0');
  } else {
    emailInput.style.backgroundColor = '#c3ffc3';
    emailInput.setAttribute('data-valid', '1');
  }
}

function passwordValidator(event) {
  const regExp = /[\w\d]{4,}/i;
  const passwordInput = event.target;

  if (!regExp.test(String(passwordInput.value))) {
    passwordInput.style.backgroundColor = '#ffc3c3';
    passwordInput.setAttribute('data-valid', '0');
  } else {
    passwordInput.style.backgroundColor = '#c3ffc3';
    passwordInput.setAttribute('data-valid', '1');
  }
}

document.querySelector('#submition-input')
  .addEventListener('input', emailValidator);

document.querySelector('#mail')
  .addEventListener('input', emailValidator);

document.querySelector('#password')
  .addEventListener('input', passwordValidator);

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

const resetFormButtons = document.querySelectorAll('.form__reset');

resetFormButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.goods-filter__category')
      .innerHTML = categoryFormsHtml;
  });
});

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

      cardsContainerHtml = document.querySelector('#cards-container').innerHTML;
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

      cardsContainerHtml = document.querySelector('#cards-container').innerHTML;
    });
  });
}

const cardsContainer = document.querySelector('#cards-container');

document.querySelector('.goods-filter__search-container')
  .addEventListener('click', event => {
    if (event.target.className === 'goods-filter__search-button') {
      event.preventDefault();

      const inputField = document.querySelector('#search-bar');

      if (inputField.value.trim().length < 2) {
        cardsContainer.innerHTML = cardsContainerHtml;
        inputField.value = 'Введите минимум два символа!';

        cardsContainer.innerHTML = cardsContainerHtml
          .replace(/<mark>|<\/mark>/g, '');

        addToComparison();
        addToFavourite();

        setTimeout(() => {
          inputField.value = '';
        }, 3000);

        return;
      }

      const regExp = new RegExp(inputField.value, 'gi');
      const allMatches = [...cardsContainerHtml.matchAll(regExp)];

      if (allMatches.length === 0) {
        inputField.value = 'Ничего не найдено';

        setTimeout(() => {
          inputField.value = '';
        }, 2000);

        return;
      }

      const sortedWords = [];

      allMatches.forEach(foundedMatch => {
        if (!sortedWords.includes(foundedMatch[0])) {
          sortedWords.push(foundedMatch[0]);
        }
      });

      sortedWords.forEach(word => {
        const wordRegExp = new RegExp(word, 'g');

        cardsContainer.innerHTML = cardsContainerHtml
          .replace(wordRegExp, `<mark>${word}</mark>`);
      });

      addToComparison();
      addToFavourite();
    }
  });

document.querySelector('.enter-popup__submit')
  .addEventListener('click', event => {
    if (!(+document.querySelector('#password').getAttribute('data-valid')
      && +document.querySelector('#mail').getAttribute('data-valid')
    )) {
      event.preventDefault();
    }
  });

document.querySelector('.footer__form-submit')
  .addEventListener('click', event => {
    const subscriptionPopup = document
      .querySelector('.footer__subscription-popup');

    if (!+document.querySelector('#submition-input')
      .getAttribute('data-valid')) {
      event.preventDefault();
    } else {
      event.preventDefault();

      subscriptionPopup.style.left = '10px';
      subscriptionPopup.style.opacity = '1';

      setTimeout(() => {
        subscriptionPopup.style.left = '-100%';
        subscriptionPopup.style.opacity = '0';
      }, 3000);
    }
  });
