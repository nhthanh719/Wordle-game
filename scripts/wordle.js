const letter = document.querySelectorAll('.score-board-letter');
const loadingDiv = document.querySelector('.loader');

const init = async() => {
  



  document.addEventListener('keydown', function handleKeyPress(event) {
    const action = event.key;

    if (action === 'Enter') {
      submit(); // TODO: create submit function
    } else if (action === 'Backspace') {
      erase(); // TODO: create erase function
    } else if (isLetter(action)) { // TODO: create isLetter function
      addLetter(action.toUpperCase()); // TODO: create addLetter function
    } else {
      // do nothing
    }
  })
}

init();