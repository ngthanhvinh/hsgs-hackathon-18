"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const PERCENTAGE = 50.0 / 100.0; // displayed values / total

function rand() {
  const RANDOM_TIME = 5;
  let r = 0;
  for (let ntime = 0; ntime < RANDOM_TIME; ++ntime) {
    r = Math.random();
  }
  return r;
}

function genBoard(N, adjvalue) {
  /* An efficient algorithm generating the board */
  // Split the board into multiple 3x3 subsquares and
  // random in those subsquares

  let value = []
  for (let i = 0; i < N; ++i) {
    value.push(new Array(N));
  }
  for (let i = 0; i < N; i += 3) {
    for (let j = 0; j < N; j += 3) {
      for (let k = i; k < i + 3; ++k) {
        for (let l = j; l < j + 3; ++l) {
          if (k < 0 || k >= N || l < 0 || l >= N) continue;
          let r = rand();
          if (r <= PERCENTAGE) {
            value[k][l] = adjvalue[k][l];
          } else {
            value[k][l] = null;
          }
        }
      }
    }
  }
  return value;
}

function checkBoard(N, value) {
  /* ========= Check whether the board is 'good' ======== */
  let good = true;
  // 1st Quality: the number of unknown squares must be greater
  // than or equal to NxN / 2
  let unknown = 0;
  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      if (value[i][j] == null) ++unknown;
    }
  }
  if (unknown < N * N * 0.5) good = false;

  // 2nd Quality: all rows and columns must have at least
  // one displayed value
  let cntRow = new Array(N), cntCol = new Array(N);
  for (let i = 0; i < N; ++i) {
    cntRow[i] = cntCol[i] = 0;
  }
  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      if (value[i][j] != null) {
        cntRow[i]++;
        cntCol[j]++;
      }
    }
  }
  for (let i = 0; i < N; ++i) {
    if (cntRow[i] <= 1) good = false;
    if (cntCol[i] <= 1) good = false;
  }

  // 3rd Quality: there are at least one displayed value in
  // each 3x3 subsquare
  for (let i = 0; i < N - 2; ++i) {
    for (let j = 0; j < N - 2; ++j) {
      let cnt = 0;
      for (let k = i; k < i + 3; ++k) {
        for (let l = j; l < j + 3; ++l) {
          if (value[k][l] != null) ++cnt;
        }
      }
      if (cnt == 0) good = false;
    }
  }

  // 4th Quality: the distance between two consecutive displayed values 
  // in the same row or column must be smaller than N / 2
  for (let i = 0; i < N; ++i) {
    let consecutive = 0;
    for (let j = 0; j < N; ++j) {
      if (value[i][j] == null) ++consecutive;
      else consecutive = 0;
      if (consecutive >= N / 2) good = false;
    }
  }

  for (let j = 0; j < N; ++j) {
    let consecutive = 0;
    for (let i = 0; i < N; ++i) {
      if (value[i][j] == null) ++consecutive;
      else consecutive = 0;
      if (consecutive >= N / 2) good = false;
    }
  }
  
  // Board valuation done!
  return good;
}

function doAlert(N, value) {
  let msg = "";
  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      msg += value[i][j] + ' ';
    }
    msg += '\n';
  }
  alert(msg);
}

const N30 = {
  default(props) {
    let N = props.N;

    while(true) {
      let color = [], displayedColor = [], displayedValue = [], value = [];
      for (let i = 0; i < N; ++i) {
        displayedColor.push(new Array(N)); // displayed colors
        color.push(new Array(N)); // the color of squares
        displayedValue.push(new Array(N)); // displayed values
        value.push(new Array(N)); // adjacent values
      }

      // generate the color of squares
      for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
          let r = rand();
          if (r > 0.5) color[i][j] = 1; // black, else white
          else color[i][j] = 0;
          displayedColor[i][j] = 0;
        }
      }

      // find value[][]
      for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
          value[i][j] = 0;
          for (let di = -1; di <= +1; ++di) {
            for (let dj = -1; dj <= +1; ++dj) {
              if (Math.abs(di) + Math.abs(dj) != 1) continue;
              let ni = i + di, nj = j + dj;
              if (ni >= 0 && ni < N && nj >= 0 && nj < N && color[ni][nj] == 1) {
                value[i][j]++;
              }
            }
          }
        }
      }

      // generate value[][] (with an effective random algorithm)
      displayedValue = genBoard(N, value);
      if (!checkBoard(N, displayedValue)) continue;

      value = displayedValue.map(v => v.slice());

      return {
        N: N, 
        value: value,
        displayedColor: displayedColor,
        displayedValue: displayedValue 
      };
    }
  },

  actions: {
    async move(state, {x, y}) {
      let N = state.N;
      let value = state.value.map(v => v.slice());
      let displayedValue = state.displayedValue.map(v => v.slice());
      let displayedColor = state.displayedColor.map(v => v.slice());
      
      displayedColor[x][y] ^= 1;
      // recalculate displayedValue[][]
      for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
          let adj = 0;
          for (let di = -1; di <= +1; ++di) {
            for (let dj = -1; dj <= +1; ++dj) {
              if (Math.abs(di) + Math.abs(dj) != 1) continue;
              let ni = i + di, nj = j + dj;
              if (ni >= 0 && ni < N && nj >= 0 && nj < N && displayedColor[ni][nj] == 1) {
                adj++;
              }
            }
          }
          if (value[i][j] != null) {
            let tmp = value[i][j] - adj;
            if (tmp < 0) {
              // the number in each square cannot be negative
              throw new Error("Invalid move! Check it again!");
            }
            displayedValue[i][j] = tmp;
          } else {
            displayedValue[i][j] = null;
          }
        }
      }
      //doAlert(N, value);

      return {
        N: N, 
        value: value,
        displayedColor: displayedColor,
        displayedValue: displayedValue 
      };
    },

    async restart(state) {
      let N = state.N;
      let displayedColor = [];
      for (let i = 0; i < N; ++i) {
        displayedColor.push(Array(N).fill(0));
      }
      return {
        N: N,
        value: state.value,
        displayedColor: displayedColor,
        displayedValue: state.value
      }
    },
  },

  isValid(state) {
    // nothing to do here?
  },

  isEnding(state) {
    let N = state.N;
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        if (state.value[i][j] != null) {
          if (state.displayedValue[i][j] != 0) return null;
        }
      }
    }
    return "won";
  }
}

exports.default = N30;
