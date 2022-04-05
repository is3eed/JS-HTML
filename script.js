let guesses = [];
var correctNumber;
window.onload = function () {
  initGame();
  correctNumber = getRandomNumber();
  document.getElementById("number-submit").addEventListener("click", playGame);
  document.getElementById("restart-game").addEventListener("click", initGame)
}

function playGame() {

  var numberGuess = document.getElementById("number-guess").value;
  document.getElementById("actual-number").innerHTML = "nice, you found the number " + correctNumber;
  if (1 <= numberGuess && numberGuess <= 100) {
    saveGuessHistory(numberGuess);
    displayResult(numberGuess);
    displayHistory();
  } else {
    showWrongInput();
  }
}

function initGame() {
  document.getElementById("number-submit").disabled = false;
  correctNumber = getRandomNumber();
  guesses = [];
  resetResultContent();
  displayHistory();
}

function resetResultContent() {
  document.getElementById("result").innerHTML = "";
  document.getElementById("number-guess").value = "";
}

function getRandomNumber() {
  return Math.floor(1 + Math.random() * 100);
}
// if guess is already guessed it doesn't get added to the list
function checkGuess(guess) {
  for (var x = 0; x < guesses.length; x++) {
    if (guesses[x] == guess) {
      return false; // value cannot be added
    }
  }
  return true; // value can be added
}
function saveGuessHistory(guess) {
  if (checkGuess(guess)) {
    guesses.push(guess);
  }
}
function displayResult(numberGuess) {
  if (numberGuess < correctNumber) {
    showNumberBelow();
  } else if (numberGuess > correctNumber) {
    showNumberAbove();
  } else {
    showYouWon();
  }
}
function displayHistory() {
  let index = guesses.length - 1;
  let list = "<ul class='list-group'>";
  while (index >= 0) {
    list += "<li class='list-group-item'> You guessed " + guesses[index] + "</li>";
    index -= 1;
  }
  list += '</ul>';
  document.getElementById("history").innerHTML = list;
}
function getDialog(dialogType, text) {
  let dialog;
  switch (dialogType) {
    case "warning":
      dialog = "<div class='alert alert-warning' role='alert'>"
      break;
    case "won":
      dialog = "<div class='alert alert-success' role='alert'>"
      break;
    case "wrong":
      dialog = "<div class='alert alert-secondary' role = 'alert'>";
      break;
  }
  dialog += text;
  dialog += hint();
  dialog += "</div>"
  return dialog;
}

function showYouWon() {
  var dialog = getDialog("won", "Nice you got it");
  document.getElementById("result").innerHTML = dialog;
  document.getElementById("number-submit").disabled = true;
  document.getElementById("actual-number").innerHTML = "";

}

function showNumberAbove() {
  const text = "Your guess is too high!";
  var dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}
function showNumberBelow() {
  const text = "Your guess is too low!"
  var dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}
function showWrongInput() {
  const text = "Wrong input, enter a number between 1 and 100";
  var dialog = getDialog("wrong", text);
  document.getElementById("result").innerHTML = dialog;
}

function hint() {
  if (guesses.length != 3) {
    return " ";
  }
  var hint = Math.floor(Math.random() * 3);
  switch (hint) {
    case 0:
      return "  Hint: Number is " + ((correctNumber % 2 == 0) ? ("Even") : ("Odd"));
    case 1:
      var secondHint = 3 + (Math.floor(Math.random() * 2) * 2);
      return "  Hint: Number is " + ((correctNumber % secondHint == 0) ? ("") : ("Not ")) + "Divisiable by " + secondHint;
    case 2:
      var sum = 0;
      var value = correctNumber;
      while (value) {
        sum += value % 10;
        value = Math.floor(value / 10);
      }
      return "  Hint: Sum of Number's digits = " + sum;
  }
}
