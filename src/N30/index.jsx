import React from "react";
import n30 from "./lib/N30.js";
import "./index.less";

function Square(props) {
  return (
    <button 
    className={props.color == 0 ? "square white" : "square black"} 
    onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  render() {
    let N = this.props.state.N;
    let arrBoard = [];

    for (let i = 0; i < N; ++i) {
      arrBoard.push(<br/>)
      for (let j = 0; j < N; ++j) {
        arrBoard.push(
          <Square
            color={this.props.state.displayedColor[i][j]}
            value={this.props.state.displayedValue[i][j]}
            onClick={() => this.props.move({ x: i, y: j })}
          />
        )
      }
    }

    let verdict = [];
    const err = (this.props.error && this.props.isEnding == null) ? this.props.error.message : null;
    if (err != null) {
      verdict.push(<span className="error">Nước đi không hợp lệ!</span>);
    }
    else if (this.props.isEnding) {
      verdict.push(<span className="won">QUÁ ĐỈNH!<br/>BẠN LÀ MỘT ANH HÙNG!</span>)
    }

    return (
      <div className="n30">
        {arrBoard}
        <br/><br/>
        <button className="restart" onClick={this.props.restart}>Bắt đầu lại</button> 
        <br/><br/>
        {verdict}
      </div>
    );
  }
}

export default Board;
