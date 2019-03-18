import React from "react";
import s51 from "./lib/S51.js";
import "./index.less";

class Square extends React.Component {
  render() {
    let className = "square";
    if (this.props.type == 1) className += " red";
    if (this.props.type == 2) className += " green";
    return (
      <span>
        <button 
          onClick={e => this.props.onClick(e)}
          className = {className}
        >
          {this.props.value == '1'? '⚫': null}
        </button>
      </span>
    );
  }
}

class Board extends React.Component {
  
  async handleClick(event, row, col) {
    if(this.props.state.type[0] != -1 && this.props.state.glow[row][col] == 0 && this.props.state.board[row][col] == 1) {
      this.props.undo();
    }
    this.props.move({row: row, col: col});
  }

  async handleUndo() {
    if(this.props.state.type[0] != -1) {
      await this.props.undo();
    }
    if(this.props.state.board != this.props.state.Oboard) {
      await this.props.undo();
    }
    if(this.props.state.board != this.props.state.Oboard) {
      await this.props.undo();
    }
  }

  render() {

    if(this.props.state._done == 1) {
      this.props.undo();
      this.props.undo();
      this.props.state._done = 0;
    }

    let N = this.props.state.board.length;
    let M = this.props.state.board[0].length;
    //console.log(N + ' ' + M);
    let arrBoard = [];
    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < M; ++j) {
        arrBoard.push(
          <Square
            type={this.props.state.glow[i][j]}
            value={this.props.state.board[i][j]}
            onClick={e => this.handleClick(e, i, j)}
          />
        );
      }
      arrBoard.push(<br/>);
    }

    const err = this.props.error ? this.props.error.message : null;
    let error = [];
    if (err !== null) error.push(JSON.stringify(err));

    let log = [];
    if (this.props.isEnding == "won") {
      log.push(<span className="won">{"Tốt lắm! Bạn xứng đáng là Học sinh Giỏi!"}</span>)
    }
    else if (this.props.isEnding == "lose") {
      log.push(<span className="error">{"Tiếc quá! Không còn nước đi nữa rồi!"}</span>)
    }
    else if (error.length != 0) {
      log.push(<span className="error">{error}</span>)
    }
    
    
    let result = [];
    result.push(<span></span>);
    if (log.length != 0) {
      result.push(<div className="log">{log}</div>)
    }


    return (
      <div className="s51">
        <br/><br/>
        {arrBoard}
        <br/>

        <span className="log">
          <button
            className="undo"
            onClick={e => this.handleUndo()}
          >
            Quay lại
          </button>
        </span>
        <span className="log">
          <button
            className="restart"
            onClick={() => this.props.restart()}
          >
            Bắt đầu lại
          </button>
        </span>
        <br/><br/>
        {result}
      </div>
    );
  }
}

export default Board;

