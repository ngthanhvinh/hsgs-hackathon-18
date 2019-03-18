"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const S01 = {
  default(props) {
    let N = props.N;    
    
    while (1) {
      let board = [], glow = [];
      for (let i = 0; i <= N; ++i) {
        board.push(new Array(N + 1));
        glow.push(new Array(N + 1))
      }
      for (let i = 0; i < N; ++i) {
        board[i][N] = board[N][i] = 0;
      }
      board[N][N] = null; 
      for (let i = 0; i <= N; ++i) {
        for (let j = 0; j <= N; ++j) {
          glow[i][j] = 0;
        }
      }
      
      // generate the board
      let visit = new Array(N);
      for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
          let k = Math.floor(Math.random() * N);
          board[i][j] = String.fromCharCode(65 + k);
          visit[k] = 1;
        }
      }

      let fail = 0;
      for (let i = 0; i < N; ++i) {
        if (visit[i] == 0) fail = 1;
      }
      if (fail == 1) continue;

      let value = new Array(N); value.fill(null);
      let tmpValue = new Array(N);

      for (let i = 0; i < N; ++i) {
        tmpValue[i] = Math.floor(Math.random() * 10);
        //tmpValue[i] = 1;
      }

      for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
          let id = board[i][j].charCodeAt(0) - 'A'.charCodeAt(0);
          board[i][N] = parseInt(board[i][N]) + parseInt(tmpValue[id]);
          board[N][j] = parseInt(board[N][j]) + parseInt(tmpValue[id]);
        }
      }

      let board2 = board.map(v => v.slice());
      return { glow: glow, board2: board2, board : board, value : value };
    }
  },

  actions: {
    async move(state, {x}) {
      let N = state.value.length;
      let board = state.board.map(v => v.slice());
      let board2 = state.board2.map(v => v.slice()); 
      let value = x.value.slice(0, N);
      let glow = state.glow.map(v => v.slice())
      return {glow: glow, board2: board2, board: board, value: value};
    }
  },

  isValid(state) {
  // nothing to do here ?
  },

  isEnding(state) {
    let N = state.value.length;

    for(let i = 0; i < N; ++i) {
      if(parseInt(state.value[i]) != state.value[i]) return null;
    }

    let sumRow = Array(N); sumRow.fill(0);
    let sumCol = Array(N); sumCol.fill(0);

    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        let id = state.board[i][j].charCodeAt(0) - 'A'.charCodeAt(0);
        sumRow[j] = parseInt(sumRow[j]) + parseInt(state.value[id]);
        sumCol[i] = parseInt(sumCol[i]) + parseInt(state.value[id]);
      }
    }

    for (let i = 0; i < N; ++i) state.value[i] = null;

    for (let i = 0; i < N; ++i) {
      if (sumRow[i] != state.board[N][i]) return null;
    }

    for (let i = 0; i < N; ++i) {
      if (sumCol[i] != state.board[i][N]) return null;
    }
    
    return "won";
  }
}

exports.default = S01;
