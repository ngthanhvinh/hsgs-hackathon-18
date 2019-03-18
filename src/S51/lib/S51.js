"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function random(N) {
  return Math.floor(Math.random() * N);
}

function random_shuffle(arr) {
  let N = arr.length;
  let buf = arr.slice();
  arr.splice(0, N);

  while (buf.length > 0) {
    let id = random(buf.length);
    arr.push(buf[id]), buf.splice(id, 1);
  }
}

const dir = [[-2, 0], [2, 0], [0, -2], [0, 2]];

const S51 = {
  default({N, M}) {
    let board = [];
    let glow = [];
    for(let i = 0; i < N; ++i) {
      board.push(Array(M).fill(0));
      glow.push(Array(M).fill(0));
    }
    let arr = [];
    arr.push([random(N), random(M)]); 
    board[arr[0][0]][arr[0][1]] = 1;
    let lim = 2 + random(N * M - 2);
    while(arr.length <= lim) {
      random_shuffle(arr);
      let found = false;
      for(let i = 0; i < arr.length; ++i) {
        let dir2 = dir.map(v => v.slice());
        random_shuffle(dir2);
        for(let j = 0; j < 4; ++j) {
          let x = arr[i][0];
          let y = arr[i][1];
          let x1 = x + dir2[j][0];
          let y1 = y + dir2[j][1];
          let x2 = x + dir2[j][0] / 2;
          let y2 = y + dir2[j][1] / 2;
          if(x1 >= N || y1 >= M || x1 < 0 || y1 < 0) continue;
          if(board[x1][y1] == 1 || board[x2][y2] == 1) continue;
          board[x1][y1] = 1;
          board[x2][y2] = 1;
          board[x][y] = 0;
          found = true;
          arr.splice(i, 1);
          arr.push([x1, y1]);
          arr.push([x2, y2]);
          break;
        }
        if(found) break;
      }
      if(!found) break;
    }
    let type = [-1, -1];
    let _done = 0;
    let Oboard = board;
    let Oglow = glow;
    let Otype = type;
    let O_done = _done;
    return {
      Oboard: Oboard,
      Oglow: Oglow,
      Otype: Otype,
      O_done: O_done,
      board: board,
      glow: glow,
      type: type,
      _done: _done
    };
  },

  actions: {
    async restart(state) {
      let Oboard = state.Oboard.map(v => v.slice());
      let Oglow = state.Oglow.map(v => v.slice());
      let Otype = state.Otype.slice();
      let O_done = state.O_done;
      let board = Oboard;
      let glow = Oglow;
      let _done = O_done;
      let type = Otype;
      return {
        Oboard: Oboard,
        Oglow: Oglow,
        Otype: Otype,
        O_done: O_done,
        board: board,
        glow: glow,
        type: type,
        _done: _done
      };
    },

    async move(state, {row, col}) {
      let Oboard = state.Oboard.map(v => v.slice());
      let Oglow = state.Oglow.map(v => v.slice());
      let Otype = state.Otype.slice();
      let O_done = state.O_done;
      let board = state.board.map(v => v.slice());
      let glow = state.glow.map(v => v.slice());
      let type = state.type.slice();
      let N = board.length;
      let M = board[0].length;
      let _done = 0;
      if(type[0] == -1) {
        if(board[row][col] == 0) {
          throw new Error("Nước đi không hợp lệ");
        }
        type = [row, col];
        glow[row][col] = 1;
        for(let i = 0; i < 4; ++i) {
          let x1 = row + dir[i][0];
          let y1 = col + dir[i][1];
          if(x1 >= N || y1 >= M || x1 < 0 || y1 < 0) continue;
          let x2 = row + dir[i][0] / 2;
          let y2 = col + dir[i][1] / 2;
          if(board[x1][y1] == 1) continue;
          if(board[x2][y2] == 0) continue;
          glow[x1][y1] = 2;
        }
      }
      else if(glow[row][col] == 1) {
        _done = 1;
        type = [-1, -1];
        for(let i = 0; i < N; ++i)
          for(let j = 0; j < M; ++j)
            glow[i][j] = 0;
      }
      else if(glow[row][col] == 2) {
          let x = (type[0] + row) / 2;
          let y = (type[1] + col) / 2;
          board[x][y] = 0;
          board[type[0]][type[1]] = 0;
          board[row][col] = 1;
          type = [-1, -1];
          for(let i = 0; i < N; ++i)
            for(let j = 0; j < M; ++j)
              glow[i][j] = 0;
      }
      else if(board[row][col] == 1) {
        for(let i = 0; i < N; ++i)
          for(let j = 0; j < M; ++j)
            glow[i][j] = 0;
        type = [row, col];
        glow[row][col] = 1;
        for(let i = 0; i < 4; ++i) {
          let x1 = row + dir[i][0];
          let y1 = col + dir[i][1];
          if(x1 >= N || y1 >= M || x1 < 0 || y1 < 0) continue;
          let x2 = row + dir[i][0] / 2;
          let y2 = col + dir[i][1] / 2;
          if(board[x1][y1] == 1) continue;
          if(board[x2][y2] == 0) continue;
          glow[x1][y1] = 2;
        }
      }
      else {
        throw new Error("Nước đi không hợp lệ");
      }
      return {
        Oboard: Oboard,
        Oglow: Oglow,
        Otype: Otype,
        O_done: O_done,
        board: board,
        glow: glow,
        type: type,
        _done: _done
      };
    }
  },

  isValid(state) {
  // nothing to do here ?
  },

  isEnding(state) {
    let N = state.board.length;
    let M = state.board[0].length;
    let cnt = 0;
    for(let i = 0; i < N; ++i)
      for(let j = 0; j < M; ++j)
        if(state.board[i][j] == 1)
          cnt++;
    if(cnt == 1) return "won";
    cnt = 0;
    for(let x = 0; x < N; ++x)
      for(let y = 0; y < M; ++y)
        for(let i = 0; i < 4; ++i) {
          let x1 = x + dir[i][0];
          let y1 = y + dir[i][1];
          let x2 = x + dir[i][0] / 2;
          let y2 = y + dir[i][1] / 2;
          if(x1 < 0 || y1 < 0 || x1 >= N || y1 >= M) continue;
          if(state.board[x][y] == 0) continue;
          if(state.board[x1][y1] == 1) continue;
          if(state.board[x2][y2] == 0) continue;
          cnt++;
        }
    if(cnt == 0) return "lose";
    return null;
  }
}

exports.default = S51;
/*
*/