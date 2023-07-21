const answer = document.getElementById("answer");
const wait = document.getElementById("wait");
let isNegative = false;
answer.style.maxWidth = innerWidth - 30 + "px";
function checkThePlace(a, b) {
  return a !== b;
}
function calulateRoot() {
  isNegative = false;

  answer.style.display = "block";

  document.body.style.overflow = "hidden";
  wait.style.display = "flex";
  let previousNo = "";
  let n = document.getElementById("number").value;

  const pow = document.getElementById("pow").value;
  if (n < 0 && pow % 2 === 1) {
    isNegative = true;
    n = n * -1;
  }
  if (n < 0 && pow % 2 === -1) {
    isNegative = true;
    n = n * -1;
  }

  let myNo = new Decimal(n);
  let myPower = new Decimal(pow);
  const decimalDigits = parseInt(document.getElementById("decimal").value);
  if (decimalDigits < 0) {
    wait.style.display = "none";
    document.body.style.overflow = "auto";
    answer.innerHTML = `<div style="color:red; border-color:red">Number of decimal digits cannot be negative</div>`;
    return;
  }
  let presentNo = new Decimal(Math.pow(n, 1 / pow));
  if (parseFloat(presentNo.toString()) % 1 === 0) {
    if (isNegative) {
      answer.innerHTML =
        `<div style="color:#ffe700;display:inline-block">Your Answer for -${n}<sup style="font-size:10px">1/${pow}</sup>=</div>` +
        "-" +
        presentNo.toFixed(decimalDigits).toString();
    } else
      answer.innerHTML =
        `<div style="color:#ffe700;display:inline-block">Your Answer for ${n}<sup style="font-size:10px">1/${pow}</sup>=</div>` +
        presentNo.toFixed(decimalDigits).toString();
    wait.style.display = "none";
    document.body.style.overflow = "auto";

    return;
  }
  let one = new Decimal(1);
  Decimal.set({ precision: decimalDigits + 1 + 5 });

  function performIteration(i) {
    let powMinusOne = myPower.minus(one);
    let reciprocalOfPower = one.div(myPower);
    let raisedToPower = presentNo.pow(powMinusOne);
    let fraction = myNo.div(raisedToPower);
    let product = powMinusOne.times(presentNo);
    let sum = product.plus(fraction);
    previousNo = presentNo;
    presentNo = reciprocalOfPower.times(sum);
    if (isNegative) {
      answer.innerHTML =
        `<div style="color:#ffe700;display:inline-block">Your Answer for -${n}<sup style="font-size:10px">1/${pow}</sup>=</div>` +
        "-" +
        presentNo.toFixed(decimalDigits).toString();
    } else
      answer.innerHTML =
        `<div style="color:#ffe700;display:inline-block">Your Answer for ${n}<sup style="font-size:10px">1/${pow}</sup>=</div>` +
        presentNo.toFixed(decimalDigits).toString();
    if (checkThePlace(previousNo.toString(), presentNo.toString())) {
      setTimeout(() => performIteration(i + 1), 0);
    } else {
      wait.style.display = "none";
      document.body.style.overflow = "auto";
      if (isNegative) {
        answer.innerHTML =
          `<div style="color:#ffe700;display:inline-block">Your Answer for -${n}<sup style="font-size:10px">1/${pow}</sup>=</div>` +
          "-" +
          presentNo.toFixed(decimalDigits).toString();
      } else
        answer.innerHTML =
          `<div style="color:#ffe700;display:inline-block">Your Answer for ${n}<sup style="font-size:10px">1/${pow}</sup>=</div>` +
          presentNo.toFixed(decimalDigits).toString();
    }
  }

  performIteration(0);
}

document.getElementById("submit").addEventListener("click", calulateRoot);
