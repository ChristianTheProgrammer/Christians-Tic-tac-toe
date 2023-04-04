//create a variable that selects all the elements in the html with the class square and create an array
const squares = document.querySelectorAll(".square");
//create a variable for player X and player O and use the image of uranus of X and saturn for O
const playerX = new Image();
playerX.src = "images/favpng_jupiter-planet-mercury-uranus-clip-art.png"; 
const playerO = new Image();
playerO.src = "images/favpng_planet-euclidean-vector.png";
//the starting current player will always be player X(aka uranus)
let currentPlayer = playerX; 
//create a variable for when the game is over for later use
let gameIsOver = false; 
//create a variable to select the element in the html with class of .playerOutcome so we can insert the winner or state a tie
const playerOutcome = document.querySelector(".playerOutcome"); 
//create a loop that will loop through each square and add event listener with an event of click(Use forEach to loop through each element in the array)
squares.forEach((square) => {
  square.addEventListener("click", handleClick);
});
//create a function for the click event
function handleClick(event) {
  // The square that was clicked is obtained from the event object using event.target
  const square = event.target;
  // The index of the square is obtained using square.getAttribute("id")
  const index = square.getAttribute("id");
  // Add if statement to check is the square is occupied or if the game is over. If either condition is true, the function returns without doing anything.
  if (square.innerHTML !== "" || gameIsOver) {
    return;
  }

  // If the square is empty and the game is still going on, the currentPlayer image is inserted(appended) to the square using square.appendChild(currentPlayer.cloneNode()).
  square.appendChild(currentPlayer.cloneNode()); // Appends the Image element

  // Disable pointer events on the square
  square.style.pointerEvents = "none";

  // Function that checks for winner If there is a winner, the name of the winning player is determined and an outcome message is created with the template literal 
  // ${winnerName} wins!. The outcome message is then displayed in the playerOutcome element and the gameIsOver variable is set to true.
  if (checkForWinner()) {
    const winnerName = currentPlayer === playerX ? "Uranus" : "Saturn";//Use ternary operator to make it more dry
    const outcomeMessage = `${winnerName} wins!`;
    playerOutcome.textContent = outcomeMessage; // Update the h2 tag with the outcome message
    gameIsOver = true; // Game is over
    return;
  }

  // Create function for tie games
  if (checkForTie()) {
    const outcomeMessage = "It's a tie!";
    playerOutcome.textContent = outcomeMessage; // Update the h2 tag with the outcome message
    gameIsOver = true; // Game is over
    return;
  }

  // If there is no winner or tie, the currentPlayer variable is switched to the other player, so that the next move is made by the other player.
  currentPlayer = currentPlayer === playerX ? playerO : playerX; // Switch players

  // AI turn
  currentPlayer = playerO;
  const emptySquares = Array.from(squares).filter((square) => square.innerHTML === "");
  if (emptySquares.length === 0) {
    return;
  }
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  const randomSquare = emptySquares[randomIndex];
  randomSquare.appendChild(playerO.cloneNode());

  // Disable pointer events on the AI's square
  randomSquare.style.pointerEvents = "none";

  // Check if AI wins
  if (checkForWinner()) {
    const winnerName = currentPlayer === playerX ? "Uranus" : "Saturn";
    const outcomeMessage = `${winnerName} wins!`;
    playerOutcome.textContent = outcomeMessage;
    gameIsOver = true;
    return;
  }

  // Switch back to Uranus
  currentPlayer = playerX;
}



//create a function that checks for winner
function checkForWinner() {
  //create a variable with an array that checks for all possible winning combinations for winnning
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
//return winningCombinations but check to see if elements in the array pass the test in the function(use .some())
  return winningCombinations.some((combination) => { //this is an array of arrays, each inner array represents a winning combinations of squares
    return (
      squares[combination[0]].innerHTML === currentPlayer.outerHTML && 
      squares[combination[1]].innerHTML === currentPlayer.outerHTML &&
      squares[combination[2]].innerHTML === currentPlayer.outerHTML
    );
  });
}
//create a function that will check for ties
function checkForTie() {
  return Array.from(squares).every((square) => {
    return square.innerHTML !== "";
  });
}
//create a function that will reset the game
function resetGame() {
  squares.forEach((square) => {
    square.innerHTML = "";
  });

  currentPlayer = playerX;
  playerOutcome.textContent = "";
  gameIsOver = false;
}
//Make it so when the Play again in the html is clicked it reloads the page
document.querySelector(".button").addEventListener("click", playAgain);

function playAgain(){
  location.reload();
}