import React from "react";
import S50 from "./lib/S50.js";
import "./index.less";

function random(N) {
  return Math.floor(Math.random() * N);
}

class Square extends React.Component {
  render() {
    let className = "square";
    if(this.props.glow == 1) className += " allowHovered";
    if(this.props.glow == 2) className += " wrongHovered";
    if(this.props.label != 0) {
      className += " filled";
      if(this.props.top == 1) className += " top";
      else className += " erasetop";
      if(this.props.bottom == 1) className += " bottom";
      else className += " erasebottom";
      if(this.props.left == 1) className += " left";
      else className += " eraseleft";
      if(this.props.right == 1) className += " right";
      else className += " eraseright"
    }
    let stone = "";
    if(this.props.stone == 1) stone = this.props.valueStone;
    return (
      <span>
        <button
          onMouseOver={e => this.props.onMouseOver(e)}
          onMouseOut={e => this.props.onMouseOut(e)}
          onClick={e => this.props.onClick(e)}
          className = {className}
        >
        {stone} 
        </button>
      </span>
    );
  }
}

class Image extends React.Component {
  render() {
    if (this.props.type == 0) {
      return (<img src={require('./img/L0_hover.png')} />);
    }
    if (this.props.type == 1) {
      return (<img src={require('./img/L1_hover.png')} />);
    }
    if (this.props.type == 2) {
      return (<img src={require('./img/L2_hover.png')} />);
    }
    if (this.props.type == 3) {
      return (<img src={require('./img/L3_hover.png')} />);
    }
    if (this.props.type == 4) {
      return (<img src={require('./img/L4_hover.png')} />);
    }
    if (this.props.type == 5) {
      return (<img src={require('./img/L5_hover.png')} />);
    }
    if (this.props.type == 6) {
      return (<img src={require('./img/L6_hover.png')} />);
    }
    if (this.props.type == 7) {
      return (<img src={require('./img/L7_hover.png')} />);
    }
  }
} 

class Board extends React.Component {
  handleOver(event, row, col) {
    this.props.changeMouseOver({row: row, col: col});
  }

  handleOut(event, row, col) {
    this.props.changeMouseOut({row: row, col: col});
  }

  handleRotate(event) {
    this.props.rotate();
  }

  handleFlip(event) {
    this.props.flip();
  }

  handleApply(event, row, col) {
    this.props.apply({row: row, col: col});
  }

  handleRestart(event) {
    if (this.props.state.numL == 0) return;
    this.props.myRestart();
  }

  render() {

    let N = this.props.state.board.length;
    let M = this.props.state.board[0].length;

    let arrBoard = [];
    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < M; ++j) {
        let top = 1, bottom = 1, left = 1, right = 1;
        if(i - 1 >= 0 && this.props.state.label[i][j] == this.props.state.label[i - 1][j])
          top = 0;
        if(i + 1 < N && this.props.state.label[i][j] == this.props.state.label[i + 1][j])
          bottom = 0;
        if(j - 1 >= 0 && this.props.state.label[i][j] == this.props.state.label[i][j - 1])
          left = 0;
        if(j + 1 < M && this.props.state.label[i][j] == this.props.state.label[i][j + 1])
          right = 0;
        arrBoard.push(
          <Square
            bottom={bottom}
            top={top}
            left={left}
            right={right}
            stone={this.props.state.stone[i][j]}
            valueStone={this.props.state.valueStone[i][j]}
            glow={this.props.state.glow[i][j]}
            label={this.props.state.label[i][j]}
            onMouseOver={e => this.handleOver(e, i, j)}
            onMouseOut={e => this.handleOut(e, i, j)}
            onClick={e => this.handleApply(e, i, j)}
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
      log.push(<span className="won">{"Bạn sở hữu trí tuệ đỉnh cao!"}</span>)
    }

    else if (this.props.isEnding == "lose") {
      log.push(<span className="error">{"Bạn không thể điền thêm!"}</span>)
    }
    else if (error.length != 0) {
      log.push(<span className="error">{error}</span>)
    }
    
    let result = [];
    result.push(<span></span>);
    if (log.length != 0) {
      result.push(<div>{log}</div>)
    }
    return (
      <div className={"s50"}>
        <span className="game-play">{arrBoard}</span>
        <span className="log">
          <button className="rotate" onClick={() => this.handleRotate()}>
            Xoay hình 90 độ
          </button>
          <br/><br/>
          <button className="flip" onClick={() => this.handleFlip()}>
            Lật hình
          </button>
        </span>
        <span className="log">
          <Image type={this.props.state.type}/>
        </span>
        <br/>
        <span className="log">
          <button className="restart" onClick={() => this.handleRestart()}>
            Bắt đầu lại
          </button>
        </span>
        <br/>
        {result}
      </div>
    );
  }
}

export default Board;
