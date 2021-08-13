import { GAME_STATE } from "./constants";

const gameState = {
  current: GAME_STATE.INIT,
  clock: 1,
  tick() {
    this.clock++;
    console.log('clock', this.clock);
    return this.clock;
  },
  handleUserInteraction(icon) {
    console.log(`This icon ${icon}`);
  },
};

export default gameState;
