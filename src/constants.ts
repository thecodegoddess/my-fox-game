enum GAME_STATE {
  INIT = 'INIT',
  HATCHING = 'HATCHING',
  IDLE = 'IDLE',
  SLEEPING = 'SLEEPING',
  EATING = 'EATING',
  POOPING = 'POOPING',
  HUNGRY = 'HUNGRY',
  CELEBRATING = 'CELEBRATING',
  DEAD = 'DEAD',
}

enum ICON_NAMES {
  FISH = 'fish',
  POOP = 'poop',
  WEATHER = 'weather',
}

const ICONS: ICON_NAMES[] = [
  ICON_NAMES.FISH,
  ICON_NAMES.POOP,
  ICON_NAMES.WEATHER,
];

const TICK_RATE: number = 3000;

export const DAY_LENGTH: number = 60;
export const NIGHT_LENGTH: number = 10;

enum INTERACTIVE_CLASS_NAMES {
  HIGHLIGHTED = 'highlighted',
  LEFT_BUTTON = 'left-btn',
  RIGHT_BUTTON = 'right-btn',
  BUTTONS = 'buttons',
  FOX = 'fox',
  POOP_BAG = 'poop-bag',
  GAME = 'game',
  HIDDEN = 'hidden',
}

enum SCENE_STATES {
  DAY = 'day',
  RAIN = 'rain',
  NIGHT = 'night',
  DEAD = 'dead',
}

const WEATHER_STATES: SCENE_STATES[] = [SCENE_STATES.DAY, SCENE_STATES.RAIN];

const FOX_STATE_CLASSES: {
  [key: string]: string;
} = {
  [GAME_STATE.POOPING]: 'fox-pooping',
  [GAME_STATE.CELEBRATING]: 'fox-celebrate',
  [SCENE_STATES.RAIN]: 'fox-rain',
  [GAME_STATE.HUNGRY]: 'fox-hungry',
  [GAME_STATE.EATING]: 'fox-eating',
  [GAME_STATE.HATCHING]: 'fox-egg',
  [GAME_STATE.SLEEPING]: 'fox-sleep',
  [GAME_STATE.IDLE]: 'fox-idling',
  [SCENE_STATES.DAY]: 'fox-idling',
  [GAME_STATE.DEAD]: 'fox-dead',
};

export const RAIN_CHANCE: number = 0.4;

export {
  WEATHER_STATES,
  FOX_STATE_CLASSES,
  GAME_STATE,
  ICONS,
  ICON_NAMES,
  TICK_RATE,
  INTERACTIVE_CLASS_NAMES,
  SCENE_STATES,
};
