declare global {
  interface Window {
    __GAME_STATE__: any;
  }
}

import {
  DAY_LENGTH,
  GAME_STATE,
  ICON_NAMES,
  NIGHT_LENGTH,
  RAIN_CHANCE,
  SCENE_STATES,
  WEATHER_STATES,
} from './constants';
import gameDebugger from './debugger';
import { modFox, modScene, togglePoopBag, writeModal } from './ui';
import { getDieTime, getHungryTime, getPoopTime } from './utils';

const gameState = {
  current: GAME_STATE.INIT,
  clock: 1,
  scene: 0,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  poopTime: -1,
  startCelebrationTime: -1,
  endCelebrationTime: -1,
  isPaused: false,
  debug: false,
  toggleDebugging() {
    if (this.debug) {
      gameDebugger.cleanUp();
    } else {
      gameDebugger.init();
    }

    this.debug = !this.debug;
  },
  debugTick(count: number) {
    if (!this.debug) {
      return;
    }

    gameDebugger.updateTicker(count.toString());
  },
  debugMsg(msg: string) {
    if (!this.debug) {
      return;
    }

    gameDebugger.updateMsg(msg);
  },
  tick() {
    if (this.isPaused) {
      return;
    }

    this.clock++;
    this.debugTick(this.clock);

    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    } else if (this.clock === this.poopTime) {
      this.poop();
    } else if (this.clock === this.startCelebrationTime) {
      this.startCelebration();
    } else if (this.clock === this.endCelebrationTime) {
      this.endCelebration();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    }

    return this.clock;
  },
  togglePause() {
    this.isPaused = !this.isPaused;
  },
  clearTimers() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.startCelebrationTime = -1;
    this.endCelebrationTime = -1;
  },
  startGame() {
    if (this.debug) {
      gameDebugger.cleanUp();
    }

    this.current = GAME_STATE.HATCHING;
    this.clearTimers();
    this.wakeTime = this.clock + 3;
    modFox(GAME_STATE.HATCHING);
    modScene(SCENE_STATES.DAY);
    this.debugMsg('Start Game: Hatching  🥚');
  },
  wake() {
    this.current = GAME_STATE.IDLE;
    this.wakeTime = -1;
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(WEATHER_STATES[this.scene]);
    this.determineFoxState();
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = this.clock + getHungryTime();

    this.debugMsg(`Awake ☀️ <br /> will get hungry ${this.hungryTime}`);
  },
  sleep() {
    this.current = GAME_STATE.SLEEPING;
    this.clearTimers();
    togglePoopBag(false);
    this.wakeTime = this.clock + NIGHT_LENGTH;
    modFox(GAME_STATE.SLEEPING);
    modScene(SCENE_STATES.NIGHT);

    this.debugMsg('Sleepy Time 💤');
  },
  getHungry() {
    this.current = GAME_STATE.HUNGRY;
    this.hungryTime = -1;
    modFox(GAME_STATE.HUNGRY);
    this.dieTime = this.clock + getDieTime();
    this.debugMsg(`Hungry Fox 😾 <br/> dieTime: ${this.dieTime}`);
  },
  startCelebration() {
    this.current = GAME_STATE.CELEBRATING;
    this.startCelebrationTime = -1;
    this.endCelebrationTime = this.clock + 2;
    modFox(GAME_STATE.CELEBRATING);
    this.debugMsg(
      `celebration 🎉<br /> ending celebration in ${this.endCelebrationTime}`,
    );
  },
  endCelebration() {
    this.current = GAME_STATE.IDLE;
    this.endCelebrationTime = -1;
    this.determineFoxState();
    togglePoopBag(false);
  },
  poop() {
    this.current = GAME_STATE.POOPING;
    this.poopTime = -1;
    modFox(GAME_STATE.POOPING);
    this.dieTime = this.clock + getPoopTime();
    this.debugMsg(`POOPED 💩 <br /> die time: ${this.dieTime}`);
  },
  die() {
    const stateAtDeath = this.current;
    this.current = GAME_STATE.DEAD;
    this.sleepTime = -1;
    modFox(GAME_STATE.DEAD);
    modScene(SCENE_STATES.DEAD);
    writeModal(`Your fox has died!  <br /> Press middle button to start over`);

    this.debugMsg(`FOX HAS DIED 💀 <br /> Cause of death: ${stateAtDeath}`);
  },
  changeWeather() {
    this.debugMsg('change the weather');
    this.scene = (this.scene + 1) % WEATHER_STATES.length;
    this.debugMsg(`this.scene = ${this.scene}`);
    modScene(WEATHER_STATES[this.scene]);
    this.determineFoxState();
  },
  cleanUpPoop() {
    if (this.current !== GAME_STATE.POOPING) {
      return;
    }

    this.current = GAME_STATE.IDLE;
    this.dieTime = -1;
    togglePoopBag(true);
    this.startCelebration();
    this.hungryTime = this.clock + getHungryTime();
  },
  feed() {
    if (this.current !== GAME_STATE.HUNGRY) {
      return;
    }

    this.current = GAME_STATE.EATING;
    this.dieTime = -1;
    this.startCelebrationTime = this.clock + 2;
    this.poopTime = this.clock + getPoopTime();
    modFox(GAME_STATE.EATING);
    this.debugMsg(
      `Feeding 🍖 <br /> will startCelebration at ${this.startCelebrationTime} and time to poop ${this.poopTime}`,
    );
  },
  determineFoxState() {
    if (this.current !== GAME_STATE.IDLE) {
      return;
    }

    if (this.scene === 1) {
      modFox(SCENE_STATES.RAIN);
    } else {
      modFox(GAME_STATE.IDLE);
    }
  },
  handleUserInteraction(icon: string) {
    const unactionableStates = [
      GAME_STATE.SLEEPING,
      GAME_STATE.EATING,
      GAME_STATE.CELEBRATING,
      GAME_STATE.HATCHING,
    ];

    if (unactionableStates.includes(this.current)) {
      return;
    }

    if (this.current === GAME_STATE.INIT || this.current === GAME_STATE.DEAD) {
      this.startGame();
      writeModal();
      return;
    }

    switch (icon) {
      case ICON_NAMES.WEATHER: {
        this.changeWeather();
        break;
      }
      case ICON_NAMES.POOP: {
        this.cleanUpPoop();
        break;
      }
      case ICON_NAMES.FISH: {
        this.feed();
        break;
      }
    }
  },
};

window.__GAME_STATE__ = gameState;

export const handleUserInteraction =
  gameState.handleUserInteraction.bind(gameState);
export default gameState;
