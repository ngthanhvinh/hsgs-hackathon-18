import React from "react";
import s01 from "./lib/S01.js";
import "./index.less";

class Original extends React.Component {
  render() {
    if (parseInt(this.props.ovalue) != this.props.ovalue && parseInt(this.props.nvalue) == this.props.nvalue) {
      return (
        <span className={"original"}>{this.props.ovalue}</span>
      );
    }
    return (
      <span></span>
    );
  }
}

class Column extends React.Component {
  render() {
    let array = [];
    for (let i = 0; i <= this.props.N; ++i) {
      if (this.props.glow[i] == 1) {
        // this cell is glowing
        array.push(
          <td className={"glow"}>{this.props.col[i]}
          <br/><Original ovalue={this.props.board[i]} nvalue={this.props.col[i]}/>
          </td>
        );
        continue;
      }
      if (i < this.props.N)
        array.push(
          <td className={this.props.type == 0 ? "" : "lastCol"}>
            {this.props.col[i]}
            <br/><Original ovalue={this.props.board[i]} nvalue={this.props.col[i]}/>
          </td>
        );
      else
        array.push(
          <td className={this.props.type == 0 ? "lastRow" : "lastRow lastCol"}>
            {this.props.col[i]}
            <br/><Original ovalue={this.props.board[i]} nvalue={this.props.col[i]}/>
          </td>
        );
    }
    return <tr>{array}</tr>;
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Array(10).fill(null)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  async setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve));
  }

  async handleFocus(event) {
    let value = event.target.value;
    let name = event.target.name;
    let arr = this.state.value.slice();
    arr[name] = value;

    await this.setStateAsync({ value: arr });

    let N = this.props.state.value.length;
    let variChar = String.fromCharCode(65 + parseInt(name));
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        if (this.props.state.board[i][j] == variChar) {
          this.props.state.glow[i][j] = 1; // turn on
        } else {
          this.props.state.glow[i][j] = 0; // turn off
        }
      }
    }

    this.props.move({ x: this.state });
  }

  async handleChange(event) {
    let value = event.target.value;
    if (parseInt(value) != value && value != "") return null;
    let name = event.target.name;
    let arr = this.state.value.slice();
    arr[name] = value;

    await this.setStateAsync({ value: arr });

    let N = this.props.state.value.length;
    let variChar = String.fromCharCode(65 + parseInt(name));

    for (let i = 0; i <= N; ++i)
      for (let j = 0; j <= N; ++j) {
        if (this.props.state.board[i][j] == variChar) {
          if (value) {
            if (
              parseInt(this.props.state.board2[i][j]) ==
              this.props.state.board2[i][j]
            ) {
              this.props.state.board2[N][j] =
                parseInt(this.props.state.board2[N][j]) +
                parseInt(this.props.state.board2[i][j]);
              this.props.state.board2[i][N] =
                parseInt(this.props.state.board2[i][N]) +
                parseInt(this.props.state.board2[i][j]);
            }
            this.props.state.board2[i][j] = value;
            if (
              parseInt(this.props.state.board2[i][j]) ==
              this.props.state.board2[i][j]
            ) {
              this.props.state.board2[N][j] =
                parseInt(this.props.state.board2[N][j]) -
                parseInt(this.props.state.board2[i][j]);
              this.props.state.board2[i][N] =
                parseInt(this.props.state.board2[i][N]) -
                parseInt(this.props.state.board2[i][j]);
            }
          } else {
            if (
              parseInt(this.props.state.board2[i][j]) ==
              this.props.state.board2[i][j]
            ) {
              this.props.state.board2[N][j] =
                parseInt(this.props.state.board2[N][j]) +
                parseInt(this.props.state.board2[i][j]);
              this.props.state.board2[i][N] =
                parseInt(this.props.state.board2[i][N]) +
                parseInt(this.props.state.board2[i][j]);
            }
            this.props.state.board2[i][j] = variChar;
            if (
              parseInt(this.props.state.board2[i][j]) ==
              this.props.state.board2[i][j]
            ) {
              this.props.state.board2[N][j] =
                parseInt(this.props.state.board2[N][j]) -
                parseInt(this.props.state.board2[i][j]);
              this.props.state.board2[i][N] =
                parseInt(this.props.state.board2[i][N]) -
                parseInt(this.props.state.board2[i][j]);
            }
          }
        }
      }

    this.props.move({ x: this.state });
  }

  render() {
    let N = this.props.state.value.length;

    // board building
    let arrBoard = [];
    for (let i = 0; i <= N; ++i) {
      arrBoard.push(
        <Column
          col={this.props.state.board2[i]}
          glow={this.props.state.glow[i]}
          type={i < N ? 0 : 1}
          N={N}
          board={this.props.state.board[i]}
        />
      );
    }

    let arrVariable = [];
    for (let i = 0; i < N; ++i) {
      let tmp = String.fromCharCode(65 + i);
      arrVariable.push(
        <td className="submit-form tab">
          <span>
            {tmp} ={" "}
            <input
              name={i}
              type="text"
              maxlength="1"
              value={this.state.value[i]}
              onFocus={this.handleFocus}
              onChange={this.handleChange}
            />
          </span>
        </td>
      );
    }

    return (
      <div className="s01">
        <table>
          <tbody>
            {arrBoard}

            <tr className="submit-form">{arrVariable}</tr>
          </tbody>
        </table>

        <h1 className="result">
          {this.props.isEnding === "won" ? "WOW! BẠN THẬT QUÁ ĐỈNH!" : ""}
        </h1>
      </div>
    );
  }
}

export default Board;
