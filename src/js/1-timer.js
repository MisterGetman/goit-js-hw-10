import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const inputElem = document.querySelector('#datetime-picker');
const buttonElem = document.querySelector('[data-start]');

disableButtonElem();
enableInputElem();

buttonElem.addEventListener('click', startCountdown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates);
  },
};

flatpickr('#datetime-picker', options);

function handleDateSelection(selectedDates) {
  if (isFutureDate(selectedDates[0])) {
    userSelectedDate = selectedDates[0];
    enableButtonElem();
  } else {
    disableButtonElem();
    iziToast.show({
      title: '<b>Error:</b>',
      message: 'Please choose a date in the future',
      backgroundColor: 'tomato',
      position: 'topRight',
    });
  }
}

function isFutureDate(selectedDate) {
  return selectedDate.getTime() > Date.now();
}

function startCountdown() {
  disableButtonElem();
  disableInputElem();

  let msLeft = userSelectedDate - Date.now();

  const countdownId = setInterval(() => tick((msLeft -= 1000)), 1000);
  setTimeout(() => finishCountdown(countdownId), msLeft);
}

function finishCountdown(id) {
  clearInterval(id);
  enableInputElem();
}

function tick(msLeft) {
  const timeObj = convertMs(msLeft);
  for (const key in refs) {
    refs[key].textContent = timeObj[key].toString().padStart(2, '0');
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function disableButtonElem() {
  buttonElem.disabled = true;
  buttonElem.classList.remove('btn-enabled');
}

function enableButtonElem() {
  buttonElem.disabled = false;
  buttonElem.classList.add('btn-enabled');
}

function disableInputElem() {
  inputElem.disabled = true;
  inputElem.classList.remove('inp-enabled');
}

function enableInputElem() {
  inputElem.disabled = false;
  inputElem.classList.add('inp-enabled');
}
