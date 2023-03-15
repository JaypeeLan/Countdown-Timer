"use strict";
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateElem = document.getElementById("date-picker");
const countdownElem = document.getElementById("countdown");
const countdownElemTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeElem = document.getElementById("complete");
const completeElemInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");
let countdownTitle = "";
let countdownDate = "";
let countdownValue;
let countdownActive;
let savedCountdown;
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
    countdownActive = setInterval(() => {
        // now constant is today's date from Jan 1 1970 in millisecs
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        // Hide input
        inputContainer.hidden = true;
        // if countdown  has ended
        if (distance < 0) {
            countdownElem.hidden = true;
            clearInterval(countdownActive);
            completeElemInfo.textContent = `${countdownTitle} finished on  ${countdownDate}`;
            completeElem.hidden = false;
        }
        else {
            // show countdown in progress
            countdownElemTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            // hide complete UI
            completeElem.hidden = true;
            // ---------
            countdownElem.hidden = false;
        }
    }, second);
};
// values from form
const updateCountdown = (e) => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem("countdown", JSON.stringify(savedCountdown));
    // Get number of version of current Date since 190 jan 1 in millisecs to this sec while checking for valid date
    if (countdownDate === "") {
        alert("please select a valid date");
    }
    else {
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
};
const reset = () => {
    // hide countdowns and show form
    countdownElem.hidden = true;
    completeElem.hidden = true;
    inputContainer.hidden = false;
    // stop the countdown
    clearInterval(countdownActive);
    // reset values
    countdownTitle = " ";
    countdownDate = "";
    localStorage.removeItem("countdown");
};
const restorePreviousCountdown = () => {
    if (localStorage.getItem("countdown")) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem("countdown") || "");
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
};
// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);
// on page load, check local storage
restorePreviousCountdown();
