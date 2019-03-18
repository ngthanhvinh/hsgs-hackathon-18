import React from "react";
import n31 from "./lib/N31.js";
import "./index.less";

class Square extends React.Component {
  render() {
    let className="square";
    if (this.props.hidden == 0) {
      className += " hidden";
    }
    className += (this.props.parity == 0 ? " white" : " black");
    return (
      <span>
        <input 
          className={className}
          type="text"
          maxLength="2"
          value={this.props.value}
          onChange={e => this.props.onChange(e)}  
        />  
      </span>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
  
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, row, col) {
    let value = event.target.value;
    if (value !== "") value--;
    this.props.move({value: value, row: row, col: col});
    event.target.value = null;
  }
  
  render() {
    let N = this.props.state.board.length;
    let arrBoard = [];
    for (let i = 0; i < N; ++i) {
    arrBoard.push(<br/>);
    arrBoard.push(<span className="invisible"></span>);
      for (let j = 0; j < N; ++j) {
        let value = this.props.state.board[i][j];
        if (value !== "") value++;
        arrBoard.push(
          <Square
            value={value}
            hidden={this.props.state.hidden[i][j]}
            parity={(i + j) % 2}
            onChange={e => this.handleChange(e, i, j)}
          />
        );
      }
    }

    const err = (this.props.error && this.props.isEnding != "won") ? this.props.error.message : null;
    let error = [];
    if (err !== null) error.push(JSON.stringify(err));

    let log = [];
    if (error.length != 0) {
      log.push(<span className="error">{error}</span>)
    }
    if (this.props.isEnding == "won" && err == null) {
      log.push(<span className="won">{"NAISU! BẠN CÓ TÀI MÀ!"}</span>)
    }
    
    let result = [];
    result.push(<span className="invisible forLog"></span>);
    if (log.length != 0) {
      result.push(<div className="log">{log}</div>)
    }

    return(
      <div className="n31">
        {arrBoard}
        
        <br/>
        <br/>
        {result}
      </div>
    );
  }
}

export default Board;