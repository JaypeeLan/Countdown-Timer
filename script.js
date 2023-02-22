const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateElem = document.getElementById("date-picker");

// Set date input minimum to today's date
const today = new Date().toISOString().split("T")[0];

dateElem.setAttribute("min", today);
