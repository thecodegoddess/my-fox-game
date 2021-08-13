import { GAME_STATE } from "./constants";

const gameState = {
  current: GAME_STATE.INIT,
  clock: 1,
  tick() {
    this.clock++;
    console.log("clock", this.clock);
    return this.clock;
  },
};

export default gameState;
