import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('form');

const generatePromise = ({ delay, state }) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });
};

const handleSubmit = e => {
  e.preventDefault();

  generatePromise({
    delay: formElem.delay.value,
    state: formElem.state.value,
  })
    .then(delay => {
      iziToast.show({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        backgroundColor: 'limegreen',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        backgroundColor: 'tomato',
        position: 'topRight',
      });
    });
};

formElem.addEventListener('submit', handleSubmit);
