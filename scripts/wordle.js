const letters = document.querySelectorAll(".score-board-letter");
const loadingDiv = document.querySelector(".loader");
const ANSWER_LENGTH = 5;
const ROUNDS = 6;

const init = async () => {
  let currentGuess = "";
  let currentRow = 0;
  let done = false;

  //get the word of the day
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");

  setLoading(false);

  const addLetter = (letter) => {
    if (currentGuess.length < ANSWER_LENGTH) {
      // add letter to the end
      currentGuess += letter;
    } else {
      // replace the last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText =
      letter;
  };

  const submit = async () => {
    if (currentGuess.length !== ANSWER_LENGTH) {
      return;
    }

    setLoading(true);

    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });
    const resObj = await res.json();
    const { validWord } = resObj;

    setLoading(false);

    if (!validWord) {
      markInvalid();
      return;
    }

    guessParts = currentGuess.split("");
    const map = makeMap(wordParts);

    // Mark each letter "correct", "close" or "wrong"
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      //correct
      if (guessParts[i] === wordParts[i]) {
        letters[ANSWER_LENGTH * currentRow + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      //correct
      if (guessParts[i] === wordParts[i]) {
        //do nothing cause already did above
      }
      //close
      else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        letters[ANSWER_LENGTH * currentRow + i].classList.add("close");
        map[guessParts[i]]--;
      }
      //invalid
      else {
        letters[ANSWER_LENGTH * currentRow + i].classList.add("wrong");
      }
    }

    //Go to next row
    currentRow++;

    //If win
    if (currentGuess === word) {
      window.alert("Congratulations");
      done = true;
      document.querySelector(".header").classList.add("winner");
      return;
    }

    //If lose
    else if (currentRow === ROUNDS) {
      alert("Losing in life is hard but you get a lesson, try again");
      done = true;
    }
    //Erase currentGuess
    currentGuess = "";
  };

  const backspace = () => {
    // remove last letter from current guess
    currentGuess = currentGuess.slice(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
  };

  const markInvalid = () => {
    // alert("Not a valid word");
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      console.log("Current letter is" + letters[i]);
      letters[ANSWER_LENGTH * currentRow + i].classList.remove("invalid");

      setTimeout(() => {
        letters[ANSWER_LENGTH * currentRow + i].classList.add("invalid");
      }, 10);
    }
  };

  //Handle keyboard presses
  document.addEventListener(
    "keydown",
    (handleKeyPress = (event) => {
      const action = event.key;
      if (done === true) {
        // do nothing
      } else if (action === "Enter") {
        submit();
      } else if (action === "Backspace") {
        backspace();
      } else if (isLetter(action)) {
        addLetter(action.toUpperCase());
      } else {
        // do nothing
      }
    })
  );
};

const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
};

const setLoading = (isLoading) => {
  loadingDiv.classList.toggle("show", isLoading);
};

const makeMap = (array) => {
  let obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
};

init();
