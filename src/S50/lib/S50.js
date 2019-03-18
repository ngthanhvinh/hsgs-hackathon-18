"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


const emoji = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮',
              '🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣',
              '🐥','🦆','🦅','🦉','🦇','🐺','🐗','🦄','🦍','🦐','🦀','🐡','🐠',
              '🐟','🐬','🐳','🐋','🐊','🐆','🐘','🦏','🐪','🐫','🐂','🐀','🐿️',
              '🕊️','🐇','🐈','🐩','🐕','🦌','🐐','🐉','🐲'];

function random(N) {
  return Math.floor(Math.random() * N);
}

function random_shuffle(arr) {
  let N = arr.length;
  
  for (let i = 0; i < (N - 1); ++i) {
    let j = i + random(N - i);
    let tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
  }
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



function get(mask, pos) {
  return !((1 << pos) & mask);
}

function upd(mask, pos) {
  mask += 1 << pos;
}

let cnt = 0;

function back(row, mask1, mask2, mask3, check, board, n, m) {
  //console.log(row + ' ' + S.length + ' ' + mask1 + ' ' + mask2 + ' ' + mask3);
  if(check.has({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 0}))
    return 0;
  else if(check.has({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 1}))
    return 1;
  else if(row == n + 1) {
    check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 0});
    return 0;
  }
  else if(row == n && !mask1 && mask2 == (1 << m) - 1 && mask3 == (1 << m) - 1) {
    check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 1});
    return 1;
  }
  else if(mask3 == (1 << m) - 1) {
    let row1 = row + 1, m1 = 0, m2 = mask1, m3 = mask2;
    let val = back(row1, m1, m2, m3, check, board, n, m);
    check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: val});
    return val;
  }
  else {
  let cand = []; 
  for(let i = 0; i < m; ++i) {
    // 0
    if(
      i < m - 2 &&
      get(mask3, i) &&
      get(mask3, i + 1) && 
      get(mask3, i + 2) && 
      get(mask2, i)
    ) {
      let new1 = mask1, new2 = mask2, new3 = mask3;
      new3 += 1 << i;
      new3 += 1 << (i + 1);
      new3 += 1 << (i + 2);
      new2 += 1 << i;
      cand.push({type: 0, col: i, new1: new1, new2: new2, new3: new3});
    }
    // 1
    if(
      i < m - 2 &&
      get(mask3, i) &&
      get(mask2, i) && 
      get(mask2, i + 1) && 
      get(mask2, i + 2)
    ) {
      let new1 = mask1, new2 = mask2, new3 = mask3;
      new3 += 1 << i;
      new2 += 1 << i;
      new2 += 1 << (i + 1);
      new2 += 1 << (i + 2);
      cand.push({type: 1, col: i, new1: new1, new2: new2, new3: new3});
    }
    // 2
    if(
      i < m - 1 &&
      get(mask3, i) &&
      get(mask2, i) && 
      get(mask1, i) && 
      get(mask1, i + 1)
    ) {
      let new1 = mask1, new2 = mask2, new3 = mask3;
      new3 += 1 << i;
      new2 += 1 << i;
      new1 += 1 << i;
      new1 += 1 << (i + 1);
      cand.push({type: 2, col: i, new1: new1, new2: new2, new3: new3});
    }
    // 3
    if(
      i > 0 &&
      get(mask3, i) &&
      get(mask2, i) && 
      get(mask1, i) && 
      get(mask1, i - 1)
    ) {
      let new1 = mask1, new2 = mask2, new3 = mask3;
      new3 += 1 << i;
      new2 += 1 << i;
      new1 += 1 << i;
      new1 += 1 << (i - 1);
      cand.push({type: 3, col: i, new1: new1, new2: new2, new3: new3});
    }
    // 4
    if(
      i > 1 &&
      get(mask3, i) &&
      get(mask2, i) && 
      get(mask2, i - 1) && 
      get(mask2, i - 2)
    ) {
      let new1 = mask1, new2 = mask2, new3 = mask3;
      new3 += 1 << i;
      new2 += 1 << i;
      new2 += 1 << (i - 1);
      new2 += 1 << (i - 2);
      cand.push({type: 4, col: i, new1: new1, new2: new2, new3: new3});
    }
    // 5
    if(
      i > 1 &&
      get(mask3, i) &&
      get(mask3, i - 1) && 
      get(mask3, i - 2) && 
      get(mask2, i)
    ) {
      let new1 = mask1, new2 = mask2, new3 = mask3;
      new3 += 1 << i;
      new3 += 1 << (i - 1);
      new3 += 1 << (i - 2);
      new2 += 1 << i;
      cand.push({type: 5, col: i, new1: new1, new2: new2, new3: new3});
    }
    // 6
    if(
      i > 0 &&
      get(mask3, i) &&
      get(mask3, i - 1) && 
      get(mask2, i) && 
      get(mask1, i)
    ) {
      let new1 = mask1, new2 = mask2, new3 = mask3;
      new3 += 1 << i;
      new3 += 1 << (i - 1);
      new2 += 1 << i;
      new1 += 1 << i;
      cand.push({type: 6, col: i, new1: new1, new2: new2, new3: new3});

    }
    // 7
    if(
      i < m - 1 &&
      get(mask3, i) &&
      get(mask3, i + 1) && 
      get(mask2, i) && 
      get(mask1, i)
    ) {
      let new1 = mask1, new2 = mask2, new3 = mask3;
      new3 += 1 << i;
      new3 += 1 << (i + 1);
      new2 += 1 << i;
      new1 += 1 << i;
      cand.push({type: 7, col: i, new1: new1, new2: new2, new3: new3});
    }
  }
  random_shuffle(cand);
  for(let j = 0; j < cand.length; ++j) {
    let row1 = row, m1 = cand[j].new1, m2 = cand[j].new2, m3 = cand[j].new3;
    let i = cand[j].col;
    if(back(row, m1, m2, m3, check, board, n, m) != 1) continue;
    //console.log(cand[j].col + ' ' + cand[j].new1 + ' ' + cand[j].new2 + ' ' + cand[j].new3);
    if(cand[j].type == 0) {
      ++cnt;
      board[row - 2][i] = cnt;
      board[row - 2][i + 1] = cnt;
      board[row - 2][i + 2] = cnt;
      board[row - 1][i] = cnt;
      check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 1});
      return 1;
    }
    else if(cand[j].type == 1) {
      ++cnt;
      board[row - 2][i] = cnt;
      board[row - 1][i] = cnt;
      board[row - 1][i + 1] = cnt;
      board[row - 1][i + 2] = cnt;
      check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 1});
      return 1;
    }
    else if(cand[j].type == 2) {
      ++cnt;
      board[row - 2][i] = cnt;
      board[row - 1][i] = cnt;
      board[row][i] = cnt;
      board[row][i + 1] = cnt;
      check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 1});
      return 1;
    }
    else if(cand[j].type == 3) {
      ++cnt;
        board[row - 2][i] = cnt;
        board[row - 1][i] = cnt;
        board[row][i] = cnt;
        board[row][i - 1] = cnt;
        check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 1});
        return 1;
    }
    else if(cand[j].type == 4) {
      ++cnt;
      board[row - 2][i] = cnt;
        board[row - 1][i] = cnt;
        board[row - 1][i - 1] = cnt;
        board[row - 1][i - 2] = cnt;
        check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 1});
        return 1;
    }
    else if(cand[j].type == 5) {
      ++cnt;
        board[row - 2][i] = cnt;
        board[row - 2][i - 1] = cnt;
        board[row - 2][i - 2] = cnt;
        board[row - 1][i] = cnt;
        check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 1});
        return 1;
    }
    else if(cand[j].type == 6) {
      ++cnt;
        board[row - 2][i] = cnt;
        board[row - 2][i - 1] = cnt;
        board[row - 1][i] = cnt;
        board[row][i] = cnt;
        check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 1});
        return 1;
    }
    else if(cand[j].type == 7) {
      ++cnt;
        board[row - 2][i] = cnt;
        board[row - 2][i + 1] = cnt;
        board[row - 1][i] = cnt;
        board[row][i] = cnt;
        check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 1});
        return 1;
    }
  }
  check.add({row: row, mask1: mask1, mask2: mask2, mask3: mask3, val: 0});      
  return 0;
}
}

const S50 = {
  default({N, M}) {
    cnt = 0;
    let board = [];
    for(let i = 0; i < N; ++i) {
      board.push(Array(M).fill(0));
    }
    let glow = board;
    let stone = board.map(v => v.slice());
    let valueStone = board.map(v => v.slice());

    let label = [];
    for(let i = 0; i < N + 5; ++i) {
      label.push(Array(M + 5).fill(0));
    }
    back(2, 0, 0, 0, new Set(), label, N, M);
    
    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < M; ++j) {
        let cand = [];
        let ready = 0;
        for(let k = 0; k < N; ++k) {
          for(let l = 0; l < M; ++l) {
            if(label[i][j] != label[k][l]) continue;
            if(stone[k][l]) ready = 1;
            cand.push([k, l]);
          }
        }
        if(ready == 1) continue;
        random_shuffle(cand);
        stone[cand[0][0]][cand[0][1]] = 1;
        valueStone[cand[0][0]][cand[0][1]] = emoji[random(emoji.length)];
      }
    }
    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < M; ++j) {
        label[i][j] = 0;
      }
    }
    let type = 0;
    let numL = 0;
    return {
      board: board,
      stone: stone,
      valueStone: valueStone,
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
      if(label[row][col] != 0) return state;
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
      if(cntStone != 1) t = 2;
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
        valueStone: state.valueStone,
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
        valueStone: state.valueStone,
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
        valueStone: state.valueStone,
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
        valueStone: state.valueStone,
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
      if(label[row][col] != 0) {
        let tmp = label[row][col];
        for(let i = 0; i < N; ++i) {
          for(let j = 0; j < M; ++j) {
            if(label[i][j] == tmp) {
              label[i][j] = 0;
            }
          }
        }
        return {
          board: board,
          stone: stone,
          valueStone: state.valueStone,
          label: label,
          glow: glow,
          type: type,
          numL: numL
        };
      }
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
      if(cntStone != 1) {
        throw new Error("Hình không đè lên đúng một viên sỏi");
      }
      return {
        board: board,
        stone: stone,
        valueStone: state.valueStone,
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
        valueStone: state.valueStone,
        label: label,
        glow: glow,
        type: type,
        numL: numL
      };
    },

    async myRestart(state) {
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
          label[i][j] = 0;
        }
      }
      numL = 0;
      return {
        board: board,
        stone: stone,
        valueStone: state.valueStone,
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
  
    let have0 = false;
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < M; ++j) {
        if (label[i][j] == 0) have0 = true;
      }
    }
    if (!have0) return "won";

    for(let i = 0; i < N; ++i) {
      for(let j = 0; j < M; ++j) {
        if(label[i][j] != 0) continue;
        for(let k = 0; k < 8; ++k) {
          let doable = 1;
          let cntStone = 0;
          for(let l = 0; l < 4; ++l) {
            let x = i + L[k][l][0];
            let y = j + L[k][l][1];
            if(x < 0 || y < 0 || x >= N || y >= M) doable = 0;
            else if(label[x][y] != 0) doable = 0;
            else if(stone[x][y]) cntStone++;
          }
          if(cntStone != 1) doable = 0;
          if(doable == 1) return null;
        }
      }
    }
    return "lose";
  }
}

exports.default = S50;