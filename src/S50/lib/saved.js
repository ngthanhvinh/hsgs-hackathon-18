"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function random(N) {
  return Math.floor(Math.random() * N);
}

const L = [
  [[-1, 0], [0, 0], [0, 1], [0, 2]],
  [[1, 0], [0, 0], [0, 1], [0, 2]],
  [[1, 0], [2, 0], [0, 0], [0, 1]],
  [[1, 0], [2, 0], [0, 0], [0, -1]],
  [[1, 0], [0, 0], [0, -1], [0, -2]],
  [[-1, 0], [0, 0], [0, -1], [0, -2]],
  [[-1, 0], [-2, 0], [0, 0], [0, -1]],
  [[-1, 0], [-2, 0], [0, 0], [0, 1]]
]


const S50 = {
  default({N, M}) {
    let board = [];
    for(let i = 0; i < N; ++i) {
      board.push(Array(M).fill(0));
    }
    let glow = board;
    let label = board;
    let stone = board.map(v => v.slice());
    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < M; ++j) {
        //stone[i][j] = random(2);
      }
    }
    let type = 0;
    let numL = 0;
    return {
      board: board,
      stone: stone,
      label: label,
      glow: glow,
      type: type,
      numL: numL
    };
  },

  actions: {
    async changeMouseOver(state, {row, col}) {
      let N = state.board.length;
      let M = state.board[0].length;
      let board = state.board.map(v => v.slice());
      let stone = state.stone.map(v => v.slice());
      let label = state.label.map(v => v.slice());
      let glow = state.glow.map(v => v.slice());
      let type = state.type;
      let numL = state.numL;
      let t = 1;
      let cntStone = 0;
      for(let i = 0; i < 4; ++i) {
        let x = row + L[type][i][0];
        let y = col + L[type][i][1];
        if(x < 0 || y < 0 || x >= N || y >= M) {
          t = 2;
        }
        else if(label[x][y] != 0) {
          t = 2;
        }
        else if(stone[x][y] == 1) cntStone++;
      }
      //if(cntStone != 1) t = 2;
      for(let i = 0; i < 4; ++i) {
        let x = row + L[type][i][0];
        let y = col + L[type][i][1];
        if(x < 0 || y < 0 || x >= N || y >= M) continue;
        else if(label[x][y] != 0) continue;
        glow[x][y] = t;
      }
      return {
        board: board,
        stone: stone,
        label: label,
        glow: glow,
        type: type,
        numL: numL
      };
    },

    async changeMouseOut(state, {row, col}) {
      let N = state.board.length;
      let M = state.board[0].length;
      let board = state.board.map(v => v.slice());
      let stone = state.stone.map(v => v.slice());
      let label = state.label.map(v => v.slice());
      let glow = state.glow.map(v => v.slice());
      let type = state.type;
      let numL = state.numL;
      for(let i = 0; i < 4; ++i) {
        let x = row + L[type][i][0];
        let y = col + L[type][i][1];
        if(x < 0 || y < 0 || x >= N || y >= M) continue;
        if(label[x][y] != 0) continue;
        glow[x][y] = 0;
      }
      return {
        board: board,
        stone: stone,
        label: label,
        glow: glow,
        type: type,
        numL: numL
      };
    },

    async rotate(state) {
      let board = state.board.map(v => v.slice());
      let stone = state.stone.map(v => v.slice());
      let label = state.label.map(v => v.slice());
      let glow = state.glow.map(v => v.slice());
      let type = state.type;
      let numL = state.numL;
      type += 2; type %= 8;
      return {
        board: board,
        stone: stone,
        label: label,
        glow: glow,
        type: type,
        numL: numL
      };
    },

    async flip(state) {
      let board = state.board.map(v => v.slice());
      let stone = state.stone.map(v => v.slice());
      let label = state.label.map(v => v.slice());
      let glow = state.glow.map(v => v.slice());
      let type = state.type;
      let numL = state.numL;
      type ^= 1;
      return {
        board: board,
        stone: stone,
        label: label,
        glow: glow,
        type: type,
        numL: numL
      };
    },

    async apply(state, {row, col}) {
      let N = state.board.length;
      let M = state.board[0].length;
      let board = state.board.map(v => v.slice());
      let stone = state.stone.map(v => v.slice());
      let label = state.label.map(v => v.slice());
      let glow = state.glow.map(v => v.slice());
      let type = state.type;
      let numL = state.numL;
      numL++;
      let cntStone = 0;
      for(let i = 0; i < 4; ++i) {
        let x = row + L[type][i][0];
        let y = col + L[type][i][1];
        if(x < 0 || y < 0 || x >= N || y >= M) {
          throw new Error("Hình đã đè lên biên");
        }
        if(label[x][y] != 0) {
          throw new Error("Hình đã đè lên một hình chữ L khác");
        }
        if(stone[x][y] == 1) cntStone++;
        label[x][y] = numL;
        glow[x][y] = 0;
      }
      /*
      if(cntStone != 1) {
        throw new Error("Hình không đè lên đúng một viên sỏi");
      }
      */
      return {
        board: board,
        stone: stone,
        label: label,
        glow: glow,
        type: type,
        numL: numL
      };
    },

    async myUndo(state) {
      let N = state.board.length;
      let M = state.board[0].length;
      let board = state.board.map(v => v.slice());
      let stone = state.stone.map(v => v.slice());
      let label = state.label.map(v => v.slice());
      let glow = state.glow.map(v => v.slice());
      let type = state.type;
      let numL = state.numL;
      if(numL == 0) {
        throw new Error("");
      }
      for(let i = 0; i < N; ++i) {
        for(let j = 0; j < M; ++j) {
          if(label[i][j] == numL) {
            label[i][j] = 0;
          }
        }
      }
      numL--;
      return {
        board: board,
        stone: stone,
        label: label,
        glow: glow,
        type: type,
        numL: numL
      };
    }
  },

  isValid(state) {
  // nothing to do here ?
  },

  isEnding(state) {
    let N = state.board.length;
    let M = state.board[0].length;
    let board = state.board.map(v => v.slice());
    let stone = state.stone.map(v => v.slice());
    let label = state.label.map(v => v.slice());
    let glow = state.glow.map(v => v.slice());
    let type = state.type;
    let numL = state.numL;
    if(numL == N * M / 4) return "won";
    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < M; ++j) {
        if(label[i][j] != 0) continue;
        for(let k = 0; k < 8; ++k) {
          let doable = 1;
          for(let l = 0; l < 4; ++l) {
            let x = i + L[k][l][0];
            let y = j + L[k][l][1];
            if(x < 0 || y < 0 || x >= N || y >= M) doable = 0;
            else if(label[x][y] != 0) doable = 0;
          }
          if(doable == 1) return null;
        }
      }
    }
    return "lose";
  }
}

exports.default = S50;