import React from "react";

import "./index.less";

class Row extends React.Component {
    render() {
        const array = [];
        for (let id = this.props.N - 1; id >= 0; --id) {
            if (id < this.props.pile.length) {
                array.push(<td key={id}>{this.props.pile[id]}</td>);
            } else {
                array.push(<td key={id}>X</td>);
            }
        }
        console.log(array);
        return <tr>{array}</tr>;
    }
}

class Board extends React.Component {
    render() {
        // Calculate the value of N
        let N = 0;
        for (let i = 0; i < 3; ++i) {
            for (let j of this.props.state.piles[i]) {
                N = Math.max(N, j);
            }
        }
        const moves = [];
        for (let i = 1; i <= 3; ++i)
            for (let j = 1; j <= 3; ++j) {
                moves.push(
                    <div>
                        <button onClick={() => this.props.move({x: i, y: j})}>
                            Move {i} => {j}
                        </button>
                    </div>
                );
            }
        const err = this.props.error ? this.props.error.message : null;
        return (
            <div className="example">
                <table style={{border: "1px solid black"}}>
                    <tbody>
                    <Row N={N} pile={this.props.state.piles[0]}/>
                    <Row N={N} pile={this.props.state.piles[1]}/>
                    <Row N={N} pile={this.props.state.piles[2]}/>
                    </tbody>
                </table>
                <hr/>
                {moves}
                <pre>{JSON.stringify(this.props)}</pre>
                <pre>{JSON.stringify(err)}</pre>
            </div>
        );
    }
}

export default Board;
