
// // create an empty array for the empty squares
// var board = ["", "", "", "", "", "", "", "", ""];
// //create a variable for the starting player and keep track of starting player
// var currentPlayer = "X";
// //select all element from the html where the shapes/images will go
// var squares = document.querySelectorAll('.square');
// //loop through each element in squares array, for each square an event listernet is added for a click event
// squares.forEach(function(square) {
//   square.addEventListener('click', function() {
//     //array.from creats a new shallow-copied array then indexOf returns the first index found in the array
//     var index = Array.from(squares).indexOf(square);
//     //if square is occupied by player do nothing otherwise set the board to the current players value x or o depending whos turn it is
//     if (board[index] === "") {
//       board[index] = currentPlayer;
//       // switch players for each turn
//       currentPlayer = currentPlayer === "X" ? "O" : "X";
//       // check for winner
//       if (checkWinner(board)) {
//         alert(currentPlayer + " wins!");
//         // reset game
//         board = ["", "", "", "", "", "", "", "", ""];
//         currentPlayer = "X";
//       } else if (checkTie(board)) {
//         alert("Tie game!");
//         // reset game
//         board = ["", "", "", "", "", "", "", "", ""];
//         currentPlayer = "X";
//       } else {
//         // switch to AI player's turn
//         currentPlayer = "O";
//         var aiIndex = aiMove(board);
//         board[aiIndex] = currentPlayer;
//         // check for winner
//         if (checkWinner(board)) {
//           alert(currentPlayer + " wins!");
//           // reset game
//           board = ["", "", "", "", "", "", "", "", ""];
//           currentPlayer = "X";
//         } else if (checkTie(board)) {
//           alert("Tie game!");
//           // reset game
//           board = ["", "", "", "", "", "", "", "", ""];
//           currentPlayer = "X";
//         } else {
//           // switch back to human player's turn
//           currentPlayer = "X";
//         }
//         // display updated board
//         displayBoard(board);
//       }
//     }
//   });
// });

// function checkWinner(board) {
// }
// function checkTie(board) {
//   // same as before
// }
// function displayBoard(board) {
//   squares.forEach(function(square, index) {
//     var image = square.querySelector("img");
//     if (board[index] === "X") {
//       image.src = "images/favpng_planet-euclidean-vector.png";
//     } else if (board[index] === "O") {
//       image.src = "images/favpng_jupiter-planet-mercury-uranus-clip-art.png";
//     } else {
//       image.src = "";
//     }
//   });
// }
// function aiMove(board) {
//     // check for winning moves for the player
//     for (var i = 0; i < board.length; i++) {
//       if (board[i] === "") {
//         board[i] = "X";
//         if (checkWinner(board)) {
//           board[i] = "O";
//           return i;
//         }
//         board[i] = "";
//       }
//     }
  
//     // check for winning moves for the AI
//     for (var i = 0; i < board.length; i++) {
//       if (board[i] === "") {
//         board[i] = "O";
//         if (checkWinner(board)) {
//           board[i] = "O";
//           return i;
//         }
//         board[i] = "";
//       }
//     }
  
//     // if no winning moves are available, block the player's moves
//     var corners = [0, 2, 6, 8];
//     var sides = [1, 3, 5, 7];
//     var emptyCorners = corners.filter(i => board[i] === "");
//     var emptySides = sides.filter(i => board[i] === "");
  
//     if (emptyCorners.length > 0) {
//       return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
//     } else if (board[4] === "") {
//       return 4;
//     } else if (emptySides.length > 0) {
//       return emptySides[Math.floor(Math.random() * emptySides.length)];
//     }
//   }


// Create a variable and select all the elements in html that have the class of square(Using querySelectorAll creates an array and is put into the variable squares)
const squares = document.querySelectorAll(".square");
//Create two variables that will use an image in place of the X's and O's for the game
const playerX = new Image();
playerX.src = "images/favpng_jupiter-planet-mercury-uranus-clip-art.png"; 
const playerO = new Image();
playerO.src = "images/favpng_planet-euclidean-vector.png";
// Start with player X
let currentPlayer = playerX; 
// Set to true when game is over
let gameIsOver = false; 
//create a variable and select the h2 with the class of playerOutcome in the html that will display the player outcome
const playerOutcome = document.querySelector(".playerOutcome"); 
//Attach a click event and function to each square on the board(Using a for loop to iterate through each square element in the square array)
squares.forEach((square) => {
  square.addEventListener("click", handleClick);
});
//Function for above
function handleClick(event) {
  //The square that was clicked is obtained from the event object using event.target
  const square = event.target;
  //The index of the square is obtained using square.getAttribute("id")
  const index = square.getAttribute("id");
//Add if statement to check is the square is occupied or if the game is over. If either condition is true, the function returns without doing anything.
  if (square.innerHTML !== "" || gameIsOver) {
    return;
  }
//If the square is empty and the game is still going on, the currentPlayer image is appended to the square using square.appendChild(currentPlayer.cloneNode()).
  square.appendChild(currentPlayer.cloneNode()); // Appends the Image element
//function that checks for winner If there is a winner, the name of the winning player is determined and an outcome message is created with the template literal 
//${winnerName} wins!. The outcome message is then displayed in the playerOutcome element and the gameIsOver variable is set to true.
  if (checkForWinner()) {
    const winnerName = currentPlayer === playerX ? "Uranus" : "Saturn";
    const outcomeMessage = `${winnerName} wins!`;
    playerOutcome.textContent = outcomeMessage; // Update the h2 tag with the outcome message
    gameIsOver = true; // Game is over
    return;
  }
//Create function for tie games
//
  if (checkForTie()) {
    const outcomeMessage = "It's a tie!";
    playerOutcome.textContent = outcomeMessage; // Update the h2 tag with the outcome message
    gameIsOver = true; // Game is over
    return;
  }
//If there is a tie, an outcome message is created with the string "It's a tie!" and displayed in the playerOutcome element. The gameIsOver variable is also set to true.
//If there is no winner or tie, the currentPlayer variable is switched to the other player, so that the next move is made by the other player.  
currentPlayer = currentPlayer === playerX ? playerO : playerX; // Switch players
}

function checkForWinner() {
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

  return winningCombinations.some((combination) => {
    return (
      squares[combination[0]].innerHTML === currentPlayer.outerHTML &&
      squares[combination[1]].innerHTML === currentPlayer.outerHTML &&
      squares[combination[2]].innerHTML === currentPlayer.outerHTML
    );
  });
}

function checkForTie() {
  return Array.from(squares).every((square) => {
    return square.innerHTML !== "";
  });
}

function resetGame() {
  squares.forEach((square) => {
    square.innerHTML = "";
  });

  currentPlayer = playerX;
  playerOutcome.textContent = ""; // Clear the outcome message
  gameIsOver = false; // Reset game status
}

document.querySelector(".button").addEventListener("click", playAgain);

 function playAgain(){
     location.reload();
 }
  