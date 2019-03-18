"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const TowerOfHanoi = {
  /**
   * Initialize the default properties of 3 piles of plate, including:
   * - height of each pile
   * - the initial state of each pile
   */
  default(props = { height: 4 }) {
    const piles = [[], [], []];
    for (let i = props.height; i > 0; --i) {
      // Initialize the radius of each plate
      piles[0].push(i);
    }
    return { piles };
  },

  actions: {
    async move(state, { x, y }) {
      --x, --y;
      const all = [0, 1, 2];
      // Check if the pile being modified does not exist
      if (!all.includes(x) || !all.includes(y)) {
        throw new Error("Invalid params");
      }
      if (x === y) {
        throw new Error("Cannot move to same pile");
      }
      // Create a copy of state.piles
      const piles = state.piles.map(v => v.slice());
      if (piles[x].length === 0) {
        throw new Error("Empty source pile");
      }
      const piece = piles[x].pop();
      if (piles[y].length > 0 && piles[y][piles[y].length - 1] < piece) {
        throw new Error(
          "Top piece on destination pile is smaller than moving piece"
        );
      }
      piles[y].push(piece);
      return { piles };
    }
  },

  isValid(state) {
    const piles = state.piles;
    if (!(piles instanceof Array)) return false;
    if (piles.length !== 3) return false;
    const Piles = [];
    for (const pile of piles) {
      if (!(pile instanceof Array)) return false;
      Piles.push(pile);
    }
    // Each number should appear only once
    const set = new Set();
    const total = Piles[0].length + Piles[1].length + Piles[2].length;
    for (let i = 1; i <= total; ++i) set.add(i);
    for (const pile of Piles) {
      for (let i = 0; i < pile.length; ++i) {
        if (!set.has(pile[i])) return false;
        set.delete(pile[i]);
        if (i > 0 && pile[i] > pile[i - 1]) return false;
      }
    }
    return true;
  },

  isEnding(state) {
    if (state.piles[0].length === 0 && state.piles[1].length === 0)
      return "won";
    // continue
    return null;
  }
};
exports.default = TowerOfHanoi;
