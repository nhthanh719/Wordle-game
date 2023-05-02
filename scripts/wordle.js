const letters = document.querySelectorAll('.score-board-letter');
const loadingDiv = document.querySelector('.loader');
const ANSWER_LENGTH = 5;

const init = async() => {
  let currentGuess = '';
  
  const addLetter = (letter) => {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[currentGuess.length - 1].innerText = letter;
  }


  document.addEventListener('keydown', function handleKeyPress(event) {
    const action = event.key;

    if (action === 'Enter') {
      submit(); // TODO: create submit function
    } else if (action === 'Backspace') {
      erase(); // TODO: create erase function
    } else if (isLetter(action)) { 
      addLetter(action.toUpperCase()); // TODO: create addLetter function
    } else {
      // do nothing
    }
  })
}

const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
}

init();