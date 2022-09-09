const form = document.querySelector(".form-loan");
const spinner = document.querySelector(".spinner-border");
const result = document.querySelector(".result");

form.addEventListener("submit", function (e) {
  result.style.display = "none";
  spinner.style.display = "block";
  setTimeout(calculate, 2000);
  e.preventDefault();
});

function calculate() {
  const loanAmount = document.querySelector(".form-loan__amount");
  const interest = document.querySelector(".form-loan__interest");
  const years = document.querySelector(".form-loan__years");
  const resultMonthly = document.querySelector(".result__monthly");
  const restultTotalPayment = document.querySelector(".result__total");
  const restultTotalInterest = document.querySelector(".result__interest");

  const k = parseFloat(loanAmount.value);
  const r = parseFloat(interest.value);
  const yourYears = parseFloat(years.value);

  const q = r / 100 / 12 + 1;

  const yourMonthlyResult =
    k *
    Math.pow(q, 12 * yourYears) *
    ((q - 1) / (Math.pow(q, 12 * yourYears) - 1));

  const yourTotalPayment = yourMonthlyResult * yourYears * 12;

  const yourTotalInterest = yourTotalPayment - k;

  if (isFinite(yourMonthlyResult)) {
    resultMonthly.value = yourMonthlyResult.toFixed(2);
    restultTotalPayment.value = yourTotalPayment.toFixed(2);
    restultTotalInterest.value = yourTotalInterest.toFixed(2);
    spinner.style.display = "none";
    result.style.display = "block";
  } else {
    showError("Please check your input data");
    spinner.style.display = "none";
  }
  setTimeout(removeAlert, 3000);
}

function showError(message) {
  const alert = document.createElement("div");
  alert.classList.add("alert", "alert-warning");
  alert.setAttribute("role", "alert");
  alert.innerText = message;

  const card = document.querySelector(".card-body");
  const cardTitle = document.querySelector(".card-title");

  card.insertBefore(alert, cardTitle);
}

function removeAlert() {
  const alert = document.querySelector(".alert");

  alert.remove();
}
