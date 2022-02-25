const prompt = require('prompt');

const Player = require('./Player');
const Board = require('./Board');

class Game {
  constructor() {
    this._board = new Board();
    
  }

  askForNameAndShape() {
    return new Promise(resolve => {
      prompt.start()
      prompt.get(['name', 'shape'], (err, result) => resolve(result))
    })
  }

  async createPlayer(message) {
    console.log('\n' + message);
    let player = null;
    do {
      try {
        const { name, shape } = await this.askForNameAndShape();
        const player = new Player(name, shape);
      } catch(err) {
        console.log(err.message)
      }
    } while (!player)
    return player;
  }
  
  askPlayerForCell(player,row,col) {
    while(true) {
				
      console.log("Enter a row number (0, 1, or 2): ");
      row = row;
      console.log("Enter a column number (0, 1, or 2): ");
      col = col;
      if(row < 0 || col < 0 || row > 2 || col > 2) {
        alert("This position is off the bounds of the board! Try again.");
      } else if(_board[row][col] != '') {
        console.log("Someone has already made a move at this position! Try again.");
      } else {
        break;
      }
    
    }

  }
    playerHasWon(){
      for(var i = 0; i < 3; i++) {
        if(_board[i][0] == _board[i][1] && _board[i][1] == _board[i][2] && _board[i][0] != '-') {
          return _board[i][0];
        }
      }
      for(var j = 0; j < 3; j++) {
        if(_board[0][j] == _board[1][j] && _board[1][j] == _board[2][j] && _board[0][j] != '-') {
          return _board[0][j];
        }
      }
      if(_board[0][0] == _board[1][1] && _board[1][1] == _board[2][2] && _board[0][0] != '-') {
        return _board[0][0];
      }
      if(_board[2][0] == _board[1][1] && _board[1][1] ==  _board[0][2] && _board[2][0] != '-') {
        return _board[2][0];
      }
  
      return ' ';
    }
  isOver() {
    if(playerHasWon(_board) == 'x') {
      console.log(_player1+ " has won!");
      return 1;
    } else if(playerHasWon(_board) == 'o') {
      console.log(_player2 + " has won!");
      return 2;
    } else {
      if(isFull(_board)) {
        console.log("It's a tie!");
        return 0;
      } 

    }

  }
    // returns 1 if player 1 is winner,
    // returns 2 if player 0 is winner,
    // return 0 if a tie
    // checks if Board is full or if Board has a straight line with a specific shape
  

  async start() {
    this._player1 = await this.createPlayer('Player1');
    this._player2 = await this.createPlayer('Player2');
    // ask player1 for name and shape
    // ask player2 for name and shape

    // promopt player1 and 2 alternatively for choices
    // check winner every time
    
    // endGame
    
  }
}

const game = new Game();
game.start()
