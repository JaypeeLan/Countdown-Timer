const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateElem = document.getElementById("date-picker");

const countdownElem = document.getElementById("countdown");
const countdownElemTtle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

// -------------------
let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;

const second = 1000; // 1 second = 1000 millisecs
const minute = second * 60; // get minutes ins millisecs
const hour = minute * 60;
const day = hour * 24;

// Set date input minimum to today's date
const today = new Date().toISOString().split("T")[0];
dateElem.setAttribute("min", today);

// ----------------------
// *  new Date(Today's Date).getTime() gets the date from Jan 1 1970 to the the today's date which is passed in the the Date API

// ----------------------
// ? To calculate the countdown time and update the DOM with the calculated time

const updateDom = () => {
  // now constant is today's date from Jan 1 1970 in millisecs
  const now = new Date().getTime();
  const distance = countdownValue - now;

  const days = Math.floor(distance / day);

  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);

  console.log(now, days, hours, minutes, seconds);
};

// values from form
const updateCountdown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  // Get number of version of current Date since 190 jan 1 in millisecs to this sec
  countdownValue = new Date(countdownDate).getTime();

  updateDom();
};

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
