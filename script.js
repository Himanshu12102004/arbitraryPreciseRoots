const answer = document.getElementById("answer");
answer.style.maxWidth = innerWidth - 100 + "px";
function checkThePlace(a, b) {
  return a !== b;
}

function calulateRoot() {
  let previousNo = "";
  const n = document.getElementById("number").value;
  let myNo = new Decimal(n);
  const pow = document.getElementById("pow").value;
  let myPower = new Decimal(pow);
  let presentNo = new Decimal(Math.pow(n, 1 / pow));
  const decimalDigits = parseInt(document.getElementById("decimal").value);
  let one = new Decimal(1);
  Decimal.set({ precision: decimalDigits });
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
    answer.innerHTML = presentNo.toString();

    if (checkThePlace(previousNo.toString(), presentNo.toString())) {
      setTimeout(() => performIteration(i + 1), 0); // Execute the next iteration asynchronously after a short delay
    } else {
      console.log(presentNo.toString()); // Output the final value of presentNo
      answer.innerHTML = "Your Answer=<br>" + presentNo.toString(); // Update the final value in the DOM
    }
  }

  performIteration(0); // Start the loop
}

document.getElementById("submit").addEventListener("click", calulateRoot);
