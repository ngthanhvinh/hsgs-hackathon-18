"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

// ======================== GEN DATA ===========================
function include(oldvec, ele) {
  let vec = oldvec.slice();
  for (let i = 0; i < vec.length; ++i) {
    if (ele.x == vec[i].x && ele.y == vec[i].y) return true;
  }
  return false;
}

function checkSubsquare(oldvec, ele) {
  let vec = oldvec.slice();
  vec.push(ele);
  for (let i = ele.x - 1; i <= ele.x; ++i) {
    for (let j = ele.y - 1; j <= ele.y; ++j) {
      if (!include(vec, { x: i, y: j })) continue;
      if (!include(vec, { x: i + 1, y: j })) continue;
      if (!include(vec, { x: i, y: j + 1 })) continue;
      if (!include(vec, { x: i + 1, y: j + 1 })) continue;
      vec.pop();
      return false;
    }
  }
  vec.pop();
  return true;
}

// ======================== DISPLAY ===========================
function getDisplay(N, oldpath, oldboard) {
  let path = oldpath.slice();
  let board = oldboard.map(v => v.slice());
  let visited = getVisited(N, path);
  let adj = getAdj(N, visited);

  let display = [];
  let invalid = false;
  for (let i = 0; i < N; ++i) {
    display.push(Array(N).fill(0));
    for (let j = 0; j < N; ++j) {
      if (board[i][j] == "" || board[i][j] == "gem") {
        display[i][j] = board[i][j];
      } else {
        display[i][j] = parseInt(board[i][j]) - adj[i][j];
        if (display[i][j] < 0) invalid = true;
      }
    }
  }
  return {
    invalid: invalid,
    display: display
  }
}

function getCandidates(N, oldpath, cur, board) {
  let path = oldpath.slice();
  let candidates = [];
  for (let dx = -1; dx <= +1; ++dx) {
    for (let dy = -1; dy <= +1; ++dy) {
      if (Math.abs(dx) + Math.abs(dy) != 1) continue;
      let nx = cur.x + dx, ny = cur.y + dy;
      let nxt = {x: nx, y: ny};
      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue; // outside the board

      if (!include(path, nxt) 
      && checkSubsquare(path, nxt) 
      && (board[nx][ny] == "" || parseInt(board[nx][ny]) != board[nx][ny])) {
        path.push(nxt);
        let gDisplay = getDisplay(N, path, board);
        path.pop();
        if (gDisplay.invalid == true) continue;
        candidates.push(nxt);
      }
    }
  }
  return candidates;
}

function genPath(N, MINLEN) {
  let c = [];
  // borders
  for (let i = 1; i < N - 1; ++i) {
    c.push({x: 0, y: i});
    c.push({x: i, y: 0});
    c.push({x: N - 1, y: i});
    c.push({x: i, y: N - 1});
  }

  let board = [];
  for (let i = 0; i < N; ++i) {
    board.push(Array(N).fill(""));
  }

  while(true) {
    let id = Math.floor(Math.random() * c.length);
    let start = c[id], cur = c[id];
    let path = [start];
    
    while(true) {
      if ((cur.x != start.x || cur.y != start.y) && path.length >= MINLEN && include(c, cur)) break; // reach the borders
      let candidates = getCandidates(N, path, cur, board);
      if (candidates.length == 0) break; // invalid path

      let id = Math.floor(Math.random() * candidates.length);
      cur = candidates[id];
      path.push(cur);
    }

    if (path.length < MINLEN || !include(c, path[path.length - 1])) continue;
    return path;
  }
}

var genData = function(N, MINLEN) {
  let path = genPath(N, MINLEN);
  let start = path[0];
  let end = path[path.length - 1];
  return {
    path: path,
    candidates: [start],
    end: end,
  }
}

// ======================== GEN BOARD ==========================
function getVisited(N, path) {
  let visited = [];
  for (let i = 0; i < N; ++i) {
    visited.push(Array(N).fill(0));
  }
  for (let i = 0; i < path.length; ++i) {
    visited[path[i].x][path[i].y] = 1;
  }
  return visited;
}

function getAdj(N, visited) {
  let adj = [];
  for (let i = 0; i < N; ++i) {
    adj.push(Array(N).fill(0));
  }
  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      for (let di = -1; di <= +1; ++di) {
        for (let dj = -1; dj <= +1; ++dj) {
          if (di == 0 && dj == 0) continue;
          let ni = i + di, nj = j + dj;
          if (ni >= 0 && ni < N && nj >= 0 && nj < N && visited[ni][nj]) {
            ++adj[i][j];
          }
        }
      }
    }
  }
  return adj;
}

function genBoard(N, path) {
  // original displayed board
  const PERCENTAGE_GEM = 40.0 / 100.0;
  const PERCENTAGE_HIDDEN = 50.0 / 100.0;

  let visited = getVisited(N, path);
  let board = getAdj(N, visited);
  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      let r = Math.random();
      if (visited[i][j] == 1) { // on path
        if (r > PERCENTAGE_GEM) {
          board[i][j] = ""; // hidden
        } else {
          board[i][j] = "gem";
        }
      }
      else if (r > PERCENTAGE_HIDDEN) {
        board[i][j] = ""; // hidden
      }
    }
  }
  return board;
}

const N13 = {
  default(props) {
    let N = props.N;
    let MINLEN = (N <= 6) ? (2 * N) : (3 * N);

    let data = genData(N, MINLEN);
    let path = data.path, candidates = data.candidates, end = data.end;
    
    let board = genBoard(N, path);
    let display = board.map(v => v.slice());

    let visited = []; // initially no squares are visited
    for (let i = 0; i < N; ++i) {
      visited.push(Array(N).fill(0));
    }

    return {
      N: N, // size of board
      path: [], // current path
      board: board, // original board
      display: display, // displayed board
      candidates: candidates, // candidates for moves
      cur: null, // current square
      start: candidates[0], // start
      end: end, // destination
    }
  },

  actions: {
    async move(state, {x, y}) {
      let N = state.N;
      let board = state.board.map(v => v.slice());
      let cur = {x: x, y: y};
      let start = state.start;
      let end = state.end;
      let path = state.path.slice(); path.push(cur);
      let candidates = getCandidates(N, path, cur, board);
      let gDisplay = getDisplay(N, path, board);
      let display = gDisplay.display;
      // console.log("MOVE");
      // console.log("path", path);
      // console.log("board", board);
      // console.log("display", display);
      // console.log("cur", cur);
      // console.log("candidates", candidates);
      return {
        N: N, // size of board
        path: path, // current path
        board: board, // original board
        display: display, // displayed board
        candidates: candidates, // candidates for moves
        cur: cur, // current square
        start: start, // start
        end: end, // destination
      }
    },
    async undo(state) {
      if (state.path.length == 0) return;
      let N = state.N;
      let board = state.board.map(v => v.slice());
      let start = state.start;
      let end = state.end;
      let path = state.path.slice(); path.pop();
      let cur = null; if (path.length > 0) cur = path[path.length - 1];
      let gDisplay = getDisplay(N, path, board);
      let display = gDisplay.display;
      let candidates = [start]; if (cur != null) candidates = getCandidates(N, path, cur, board);
      return {
        N: N, // size of board
        path: path, // current path
        board: board, // original board
        display: display, // displayed board
        candidates: candidates, // candidates for moves
        cur: cur, // current square
        start: start, // start
        end: end, // destination
      }
    },
    async restart(state) {
      return {
        N: state.N,
        path: [],
        board: state.board, // original board
        display: state.board, // displayed board
        candidates: [state.start], // candidates for moves
        cur: null, // current square
        start: state.start, // start
        end: state.end, // destination
      }
    }
  },

  isValid(state) {
  // nothing to do here ?
  },

  isEnding(state) {
    let N = state.N;
    if ( (state.cur != null && (state.cur.x != state.end.x || state.cur.y != state.end.y)) && state.candidates.length == 0) { 
      // no candidates -> must undo
      return "cannot move";
    }
    if (state.cur == null) return null;
    if (state.cur.x != state.end.x || state.cur.y != state.end.y) return null; // haven't finished yet

    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        if (parseInt(state.board[i][j]) == state.board[i][j] && state.display[i][j] != 0) {
          return "invalid path";
        }
        if (state.board[i][j] == "gem" && !include(state.path, {x: i, y: j})) {
          return "not enough gem";
        }
      }
    }
    state.candidates = [];
    return "won";
  }
}

exports.default = N13;
