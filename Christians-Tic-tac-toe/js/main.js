
// create an empty array for the empty squares
var board = ["", "", "", "", "", "", "", "", ""];
//create a variable for the starting player and keep track of starting player
var currentPlayer = "X";
//select all element from the html where the shapes/images will go
var squares = document.querySelectorAll('.square');
//loop through each element in squares array, for each square an event listernet is added for a click event
squares.forEach(function(square) {
  square.addEventListener('click', function() {
    //array.from creats a new shallow-copied array then indexOf returns the first index found in the array
    var index = Array.from(squares).indexOf(square);
    //if square is occupied by player do nothing otherwise set the board to the current players value x or o depending whos turn it is
    if (board[index] === "") {
      board[index] = currentPlayer;
      // switch players for each turn
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      // check for winner
      if (checkWinner(board)) {
        alert(currentPlayer + " wins!");
        // reset game
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
      } else if (checkTie(board)) {
        alert("Tie game!");
        // reset game
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
      } else {
        // switch to AI player's turn
        currentPlayer = "O";
        var aiIndex = aiMove(board);
        board[aiIndex] = currentPlayer;
        // check for winner
        if (checkWinner(board)) {
          alert(currentPlayer + " wins!");
          // reset game
          board = ["", "", "", "", "", "", "", "", ""];
          currentPlayer = "X";
        } else if (checkTie(board)) {
          alert("Tie game!");
          // reset game
          board = ["", "", "", "", "", "", "", "", ""];
          currentPlayer = "X";
        } else {
          // switch back to human player's turn
          currentPlayer = "X";
        }
        // display updated board
        displayBoard(board);
      }
    }
  });
});

function checkWinner(board) {
}
function checkTie(board) {
  // same as before
}
function displayBoard(board) {
  squares.forEach(function(square, index) {
    var image = square.querySelector("img");
    if (board[index] === "X") {
      image.src = "images/favpng_planet-euclidean-vector.png";
    } else if (board[index] === "O") {
      image.src = "images/favpng_jupiter-planet-mercury-uranus-clip-art.png";
    } else {
      image.src = "";
    }
  });
}

document.querySelector(".button").addEventListener("click", playAgain);

function playAgain(){
    location.reload();
}
  
function aiMove(board) {
    // check for winning moves for the player
    for (var i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";
        if (checkWinner(board)) {
          board[i] = "O";
          return i;
        }
        board[i] = "";
      }
    }
  
    // check for winning moves for the AI
    for (var i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        if (checkWinner(board)) {
          board[i] = "O";
          return i;
        }
        board[i] = "";
      }
    }
  
    // if no winning moves are available, block the player's moves
    var corners = [0, 2, 6, 8];
    var sides = [1, 3, 5, 7];
    var emptyCorners = corners.filter(i => board[i] === "");
    var emptySides = sides.filter(i => board[i] === "");
  
    if (emptyCorners.length > 0) {
      return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    } else if (board[4] === "") {
      return 4;
    } else if (emptySides.length > 0) {
      return emptySides[Math.floor(Math.random() * emptySides.length)];
    }
  }
  