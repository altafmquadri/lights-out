import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5
  }
  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard()
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let {nrows, ncols} = this.props
    let random
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let r=0; r < nrows; r++) {
      board.push([0])
      for (let c=0; c < ncols; c++) {
        random = Math.floor(Math.random() * 2)
        random = random === 1 ? true : false
        board[r][c] = random
      }
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround = (coord) => {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y,x)
    flipCell(y+1,x)
    flipCell(y-1,x)
    flipCell(y,x-1)
    flipCell(y,x+1)
  
    // win when every cell is turned off
    // TODO: determine is the game has been won
    let isWinner = this.state.board
    console.log(isWinner)
    let hasWon = isWinner.flat(Infinity).includes(true) ? false : true

    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {
    const renderboard = () => {
      return this.state.board
      .map((r, y) =><tr key={y}>
        {r.map((c, x) =><Cell key={`${y+'-'+x}`} isLit={c}
        flipCellsAroundMe={this.flipCellsAround} coord={`${y+'-'+x}`}/>)}</tr>)
    }
    console.log(renderboard())
    console.log(this.state.hasWon)
      return (
        this.state.hasWon ? <h1>You Win!!</h1> : 
        <table className="Board">
        <tbody>
            {renderboard()}
        </tbody>
      </table>
    )
    // if the game is won, just show a winning msg & render nothing else
    
    // TODO
    
    // make table board
    
    // TODO
  }
}


export default Board;
