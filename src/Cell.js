import React, {Component} from 'react'
import "./Cell.css"

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(coord) {
    this.props.flipCellsAroundMe(coord);
  }
  render() {
    let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");
    return (
        <td className={classes} onClick={() => this.handleClick(this.props.coord)} />
    )
  }
}

export default Cell