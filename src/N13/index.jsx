import React from "react";
import n13 from "./lib/N13.js";
import "./index.less";

function include(oldvec, ele) {
  let vec = oldvec.slice();
  for (let i = 0; i < vec.length; ++i) {
    if (ele.x == vec[i].x && ele.y == vec[i].y) return true;
  }
  return false;
}

class Square extends React.Component {
  render() {
    let className = "square";
    if (this.props.isCandidate == true) {
      className += " candidate";
    }
    if (this.props.visited == 1) {
      className += " visited";
    }
    if (this.props.gem == 1) {
      className += " gem";
    }
    return (
      <button className={className} onClick={() => this.props.onClick()}>
      {this.props.value}
      </button>
    ); 
  }
}

class Option extends React.Component {
  render() {
    if (this.props.disabled == false) {
      return (<button className={this.props.type} onClick={() => this.props.onClick()}>{this.props.name}</button>);
    } else {
      return (<button className={this.props.type} onClick={() => this.props.onClick()} disabled>{this.props.name}</button>);
    }
  }
}

function getArrow(N, cell, start, end, arrowStart, arrowEnd) {
  if (cell.x == arrowStart.x && cell.y == arrowStart.y) {
    if (start.x == 0) return '🡫'; if (start.x == N - 1) return '🡩';
    if (start.y == 0) return '🡪'; if (start.y == N - 1) return '🡨';
  }
  if (cell.x == arrowEnd.x && cell.y == arrowEnd.y) {
    if (end.x == N - 1) return '🡫'; if (end.x == 0) return '🡩';
    if (end.y == N - 1) return '🡪'; if (end.y == 0) return '🡨';
  }
  return '';
}

class Board extends React.Component {
  handleClick(x, y) {
    if (this.props.state.modal != null) return;

    if (include(this.props.state.candidates, {x: x, y: y})) { // move
      return this.props.move({x: x, y: y});
    }
  }

  render() {
    let N = this.props.state.N;
    let start = this.props.state.start;
    let end = this.props.state.end;
    let arrowStart = {x: 0, y: 0}, arrowEnd = {x: 0, y: 0};
    if (start.x == 0 || start.x == N - 1) {
      arrowStart = {x: (start.x == 0 ? 0 : (N + 1)), y: start.y + 1};
    }
    if (start.y == 0 || start.y == N - 1) {
      arrowStart = {x: start.x + 1, y: (start.y == 0 ? 0 : (N + 1))};
    }
    if (end.x == 0 || end.x == N - 1) {
      arrowEnd = {x: (end.x == 0 ? 0 : (N + 1)), y: end.y + 1};
    }
    if (end.y == 0 || end.y == N - 1) {
      arrowEnd = {x: end.x + 1, y: (end.y == 0 ? 0 : (N + 1))};
    }
    // console.log(start);
    // console.log(end);
    // console.log(arrowStart);
    // console.log(arrowEnd);
    
    // display Board with arrows
    let arrBoard = [];
    for (let i = 0; i <= N + 1; ++i) { // above the first row
      arrBoard.push(<span className="hidden">{getArrow(N, {x: 0, y: i}, start, end, arrowStart, arrowEnd)}</span>);
    }
    for (let i = 0; i < N; ++i) {
      arrBoard.push(<br/>);
      arrBoard.push(<span className="hidden">{getArrow(N, {x: i + 1, y: 0}, start, end, arrowStart, arrowEnd)}</span>);
      for (let j = 0; j < N; ++j) {
        let visited = include(this.props.state.path, {x: i, y: j});
        let isCandidate = include(this.props.state.candidates, {x: i, y: j});
        arrBoard.push(
        <Square
          isCandidate={isCandidate}
          visited={visited}
          gem={this.props.state.board[i][j] == "gem" ? 1 : 0}
          value={(this.props.state.board[i][j] != "gem" && this.props.state.board[i][j] != "") ? this.props.state.display[i][j] : null}
          onClick={() => this.handleClick(i, j)}
        />);
      }
      arrBoard.push(<span className="hidden">{getArrow(N, {x: i + 1, y: N + 1}, start, end, arrowStart, arrowEnd)}</span>);
    }
    arrBoard.push(<br/>);
    for (let i = 0; i <= N + 1; ++i) { // below the first row
      arrBoard.push(<span className="hidden">{getArrow(N, {x: N + 1, y: i}, start, end, arrowStart, arrowEnd)}</span>);
    }

    // display Verdict
    let verdict = [];
    let err = this.props.isEnding;
    if (err == "cannot move") {
      verdict.push('Bạn không thể đi tiếp được nữa.');
      verdict.push(<br/>);
      verdict.push('Hãy quay lại đi!');
    } else if (err == "not enough gem") {
      verdict.push('Bạn chưa thu thập đủ kim cương.');
    } else if (err == "invalid path") {
      verdict.push('Đường đi không hợp lệ.');
      verdict.push(<br/>);
      verdict.push('Hãy quay lại đi!');
    } else if (err == "won") {
      verdict.push('Chúc mừng!');
      verdict.push(<br/>);
      verdict.push('Bạn quả là một tên trộm tài ba!');
    }
    let sVerdict = [];
    if (verdict.length != 0) {
      sVerdict.push(<span className="verdict"> {verdict} </span>);
    }

    return (
      <div className="n13">
        <br/>
        <span className="game-play">
          {arrBoard}
        </span>


        <span className="log">
          <Option 
            type={"undo"}  
            name={"Quay lại"} 
            disabled={this.props.state.path.length == 0 ? true : false}
            onClick={() => this.props.undo()}
          />
          <br/>
          <br/>
          <Option 
            type={"restart"} 
            name={"Bắt đầu lại"}
            disabled={this.props.state.path.length == 0 ? true : false}
            onClick={() => this.props.restart()}
          />
          <br/><br/>
          {sVerdict}
        </span>
      </div>
    );
  }
}

export default Board;