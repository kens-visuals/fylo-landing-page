const btns = document.querySelectorAll('.js-btn');
const items = document.querySelectorAll('.js-item');
const inputs = document.querySelectorAll('.js-input');
const forms = [...document.querySelectorAll('.js-form')];
const contents = document.querySelectorAll('.js-content');

const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

const validateInput = function (e) {
  e.preventDefault();

  const index = forms.indexOf(e.target);
  const input = inputs[index];
  const errorTxt = inputs[index].nextElementSibling;

  if (!emailRegExp.test(input.value) || input.value === '') {
    [input, errorTxt].forEach((el) => el.classList.add('error--is-visible'));
    errorTxt.textContent = 'Please enter a valid email address';
  } else {
    [input, errorTxt].forEach((el) => el.classList.remove('error--is-visible'));
    errorTxt.classList.add('success--is-visible');
    errorTxt.textContent = 'Email address successfully added';

    setTimeout(() => {
      input.value = '';
      errorTxt.classList.remove('success--is-visible');
    }, 1500);
  }
};

const slideOnScroll = function (items) {
  const option = {
    threshold: 0.4,
    rootMargin: '0px 0px -100px 0px',
  };

  const callback = function (entries) {
    entries.forEach((entry) => {
      !entry.isIntersecting || entry.target.classList.add('is-visible');
    });
  };

  const observer = new IntersectionObserver(callback, option);

  items.forEach((item) => observer.observe(item));
};

forms.forEach((form) => form.addEventListener('submit', validateInput));
window.addEventListener('load', () => {
  inputs.forEach((input) => (input.value = ''));
});
window.addEventListener('DOMContentLoaded', () => {
  [items, contents].forEach((el) => slideOnScroll(el));
});
