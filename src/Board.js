import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

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

  createBoard() {
    let {nrows, ncols} = this.props
    let random
    let board = [];

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

  flipCellsAround = (coord) => {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    
    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x)
    flipCell(y+1,x)
    flipCell(y-1,x)
    flipCell(y,x-1)
    flipCell(y,x+1)

    let isWinner = this.state.board
    let hasWon = isWinner.flat(Infinity).includes(true) ? false : true

    this.setState({board, hasWon});
  }

  render() {
    const renderboard = () => {
      return this.state.board
      .map((r, y) =><tr key={y}>
        {r.map((c, x) =><Cell key={`${y+'-'+x}`} isLit={c}
        flipCellsAroundMe={this.flipCellsAround} coord={`${y+'-'+x}`}/>)}</tr>)
    }
      return (
        this.state.hasWon ? <h1>You Win!!</h1> : 
        <table className="Board">
        <tbody>
            {renderboard()}
        </tbody>
      </table>
    )
  }
}


export default Board;
