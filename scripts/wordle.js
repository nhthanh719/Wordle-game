const letters = document.querySelectorAll(".score-board-letter");
const loadingDiv = document.querySelector(".loader");
const ANSWER_LENGTH = 5;

const init = async () => {
  let currentGuess = "";
  let currentRow = 0;

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
    
    guessParts = currentGuess.split("");
    
    // TODO: mark each letter "correct", "close" or "invalid"
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      //correct
      if (guessParts[i] === wordParts[i]) {
        letters[ANSWER_LENGTH * currentRow + i].classList.add("correct");
      }
      //close
      else if (wordParts.includes(guessParts[i])) {
        letters[ANSWER_LENGTH * currentRow + i].classList.add("close"); 
      } 
      //invalid
      else {
        letters[ANSWER_LENGTH * currentRow + i].classList.add("wrong"); 
      }
    }
    // TODO: validate word


    //TODO: check if the user wins or loses

    currentRow++;
    currentGuess = "";
  };

  const backspace = () => {
    // remove last letter from current guess
    currentGuess = currentGuess.slice(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
  };

  document.addEventListener(
    "keydown",
    (handleKeyPress = (event) => {
      const action = event.key;

      if (action === "Enter") {
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

init();
