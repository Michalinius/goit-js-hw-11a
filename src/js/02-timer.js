// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector("button");
const seconds = document.querySelector("[data-seconds]");
const minutes = document.querySelector("[data-minutes]");
const hours = document.querySelector("[data-hours]");
const days = document.querySelector("[data-days]");
let timeleft = 0;
startButton.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log("1", selectedDates[0]);
      timeleft = selectedDates[0]-options.defaultDate;
      console.log(timeleft)

      console.log("2", new Date())
      if (selectedDates[0] < options.defaultDate) {
        startButton.disabled = true;
        window.alert("Please choose a date in the future");}
      else startButton.disabled = false;
    },
  };

flatpickr("#datetime-picker", options)

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = (arg) =>{
  console.log(seconds.textContent)
  return arg.toString().padStart(2, '0');
 }

const countingDown = () => {
  console.log("dupa")
  let interval = setInterval(() =>{
    if (timeleft > 1000) {
      timeleft = timeleft-1000;
      const currentDate = convertMs(timeleft);
      seconds.textContent = addLeadingZero(currentDate.seconds);
      minutes.textContent = addLeadingZero(currentDate.minutes);
      hours.textContent = addLeadingZero(currentDate.hours);
      days.textContent = addLeadingZero(currentDate.days);
      
    }
    else clearInterval(interval)
  },1000)
}

startButton.addEventListener("click", countingDown);

