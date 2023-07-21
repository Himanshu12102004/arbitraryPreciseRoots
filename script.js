const answer = document.getElementById("answer");
const wait = document.getElementById("wait");
answer.style.maxWidth = innerWidth - 30 + "px";
function checkThePlace(a, b) {
  return a !== b;
}
function calulateRoot() {
  answer.style.display = "block";

  document.body.style.overflow = "hidden";
  wait.style.display = "flex";
  let previousNo = "";
  const n = document.getElementById("number").value;
  let myNo = new Decimal(n);
  const pow = document.getElementById("pow").value;
  let myPower = new Decimal(pow);
  const decimalDigits = parseInt(document.getElementById("decimal").value);
  let presentNo = new Decimal(Math.pow(n, 1 / pow));
  if (parseFloat(presentNo.toString()) % 1 === 0) {
    answer.innerHTML =
      `<div style="color:#ffe700;display:inline-block">Your Answer for ${n}<sup style="font-size:10px">1/${pow}</sup>=</div>` +
      presentNo.toFixed(decimalDigits).toString(); // Update the final value in the DOM
    wait.style.display = "none";
    document.body.style.overflow = "auto";

    return;
  }
  let one = new Decimal(1);
  Decimal.set({ precision: decimalDigits + 1 });
  console.log(presentNo.toString());

  function performIteration(i) {
    console.log(i);
    let powMinusOne = myPower.minus(one);
    let reciprocalOfPower = one.div(myPower);
    let raisedToPower = presentNo.pow(powMinusOne);
    let fraction = myNo.div(raisedToPower);
    let product = powMinusOne.times(presentNo);
    let sum = product.plus(fraction);
    previousNo = presentNo;
    console.log(previousNo.toString());
    presentNo = reciprocalOfPower.times(sum);
    answer.innerHTML =
      `<div style="color:#ffe700;display:inline-block">Your Answer for ${n}<sup style="font-size:10px">1/${pow}</sup>=</div>` +
      presentNo.toString(); // Update the final value in the DOM

    if (checkThePlace(previousNo.toString(), presentNo.toString())) {
      setTimeout(() => performIteration(i + 1), 0); // Execute the next iteration asynchronously after a short delay
    } else {
      wait.style.display = "none";
      document.body.style.overflow = "auto";
      console.log(presentNo.toString()); // Output the final value of presentNo
      answer.innerHTML =
        `<div style="color:#ffe700;display:inline-block">Your Answer for ${n}<sup style="font-size:10px">1/${pow}</sup>=</div>` +
        presentNo.toString(); // Update the final value in the DOM
    }
  }

  performIteration(0); // Start the loop
}

document.getElementById("submit").addEventListener("click", calulateRoot);
