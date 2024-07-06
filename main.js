const form = document.forms[0];
const amount = document.querySelector(".amount");
const term = document.querySelector(".term");
const interestRate = document.querySelector(".interest-rate");
const clearAll = document.querySelector(".clear-all");
const radioButtons = document.querySelectorAll(".radio-buttons input");
const radioLabels = document.querySelectorAll(".radio-buttons label");
const radioerrors = document.querySelector(".radio-buttons .err-msg");
const resultShower = document.querySelector(".result-shower");
const inputText = document.querySelectorAll(".input-text");
const inputTextError = document.querySelectorAll(".field-err");

radioButtons.forEach((btn) =>
  btn.addEventListener("change", function () {
    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].parentElement.classList.remove("checked");
    }
    btn.parentElement.classList.add("checked");
    radioerrors.style.opacity = "0";
  })
);

for (let i = 0; i < inputText.length; i++) {
  inputText[i].addEventListener("change", function () {
    if (inputText[i].value || !isNaN(inputText[i].value)) {
      inputTextError[i].style.opacity = "0";
      inputText[i].classList.remove("error");
    }
  });
}

function main() {
  let mortgageAmount = parseFloat(amount.value); // P
  let mortgageTerm = parseInt(term.value);
  let interestPer = parseFloat(interestRate.value);
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i].value == "") {
      inputText[i].classList.add("error");
      inputTextError[i].style.opacity = "1";
      return;
    } else if (isNaN(inputText[i].value)) {
      inputText[i].classList.add("error");
      inputTextError[i].textContent = "Only numbers are allowed.";
      inputTextError[i].style.opacity = "1";
      return;
    } else {
      inputText[i].classList.remove("error");
      inputTextError[i].style.opacity = "0";
    }
  }

  // total interest rate
  let totalInterestRate = (mortgageAmount * interestPer) / 100;

  // number of month
  let totalMonth = mortgageTerm * 12;

  // monthly rate
  let monRate = totalInterestRate / totalMonth;

  // calculate total repayment
  let totalRepayment = mortgageAmount + totalInterestRate;

  // calculate monthly payment
  let monthlyPaymentAmount = totalRepayment / totalMonth;

  // showed total repayment as result
  let result1;
  let result2;
  if (radioButtons[0].checked) {
    result1 = monthlyPaymentAmount;
    result2 = totalRepayment;
  } else if (radioButtons[1].checked) {
    result1 = monRate;
    result2 = totalInterestRate;
  } else {
    radioerrors.style.opacity = "1";
    return;
  }

  const result = `
            <h2>Your results</h2>
            <p>
              Your results are shown below based on the information you provided. To
              adjust the results, edit the form and click “calculate repayments”
              again.
            </p>
            <div class="box">
              <div class="monthly">
                <h3>Your monthly repayments</h3>
                <span>$${result1.toFixed(2)}</span>
              </div>
              <div class="total">
                <h3>Total you'll repay over the term</h3>
                <span>$${result2}</span>
              </div>
            </div>
  `;
  resultShower.classList.add("completed");
  resultShower.innerHTML = result;
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  main();
});
clearAll.addEventListener("click", function () {
  // window.location.reload();
  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].parentElement.classList.remove("checked");
  }
  form.reset();
});

// i start handling state error with css
