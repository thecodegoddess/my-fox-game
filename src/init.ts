import gameState, { handleUserInteraction } from './gameState';
import initButtons from './buttons';
import { TICK_RATE } from './constants';

async function init() {
  initButtons(handleUserInteraction);

  let nextTimeToTick: number = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      gameState.tick();
      nextTimeToTick = now + TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  nextAnimationFrame();
}

init();
