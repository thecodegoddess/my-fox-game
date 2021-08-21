"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCENE_STATES = exports.INTERACTIVE_CLASS_NAMES = exports.TICK_RATE = exports.ICON_NAMES = exports.ICONS = exports.GAME_STATE = exports.FOX_STATE_CLASSES = exports.WEATHER_STATES = exports.RAIN_CHANCE = exports.NIGHT_LENGTH = exports.DAY_LENGTH = void 0;
var GAME_STATE;
(function (GAME_STATE) {
    GAME_STATE["INIT"] = "INIT";
    GAME_STATE["HATCHING"] = "HATCHING";
    GAME_STATE["IDLE"] = "IDLE";
    GAME_STATE["SLEEPING"] = "SLEEPING";
    GAME_STATE["EATING"] = "EATING";
    GAME_STATE["POOPING"] = "POOPING";
    GAME_STATE["HUNGRY"] = "HUNGRY";
    GAME_STATE["CELEBRATING"] = "CELEBRATING";
    GAME_STATE["DEAD"] = "DEAD";
})(GAME_STATE || (GAME_STATE = {}));
exports.GAME_STATE = GAME_STATE;
var ICON_NAMES;
(function (ICON_NAMES) {
    ICON_NAMES["FISH"] = "fish";
    ICON_NAMES["POOP"] = "poop";
    ICON_NAMES["WEATHER"] = "weather";
})(ICON_NAMES || (ICON_NAMES = {}));
exports.ICON_NAMES = ICON_NAMES;
var ICONS = [
    ICON_NAMES.FISH,
    ICON_NAMES.POOP,
    ICON_NAMES.WEATHER,
];
exports.ICONS = ICONS;
var TICK_RATE = 3000;
exports.TICK_RATE = TICK_RATE;
exports.DAY_LENGTH = 60;
exports.NIGHT_LENGTH = 10;
var INTERACTIVE_CLASS_NAMES;
(function (INTERACTIVE_CLASS_NAMES) {
    INTERACTIVE_CLASS_NAMES["HIGHLIGHTED"] = "highlighted";
    INTERACTIVE_CLASS_NAMES["LEFT_BUTTON"] = "left-btn";
    INTERACTIVE_CLASS_NAMES["RIGHT_BUTTON"] = "right-btn";
    INTERACTIVE_CLASS_NAMES["BUTTONS"] = "buttons";
    INTERACTIVE_CLASS_NAMES["FOX"] = "fox";
    INTERACTIVE_CLASS_NAMES["POOP_BAG"] = "poop-bag";
    INTERACTIVE_CLASS_NAMES["GAME"] = "game";
    INTERACTIVE_CLASS_NAMES["HIDDEN"] = "hidden";
})(INTERACTIVE_CLASS_NAMES || (INTERACTIVE_CLASS_NAMES = {}));
exports.INTERACTIVE_CLASS_NAMES = INTERACTIVE_CLASS_NAMES;
var SCENE_STATES;
(function (SCENE_STATES) {
    SCENE_STATES["DAY"] = "day";
    SCENE_STATES["RAIN"] = "rain";
    SCENE_STATES["NIGHT"] = "night";
    SCENE_STATES["DEAD"] = "dead";
})(SCENE_STATES || (SCENE_STATES = {}));
exports.SCENE_STATES = SCENE_STATES;
var WEATHER_STATES = [SCENE_STATES.DAY, SCENE_STATES.RAIN];
exports.WEATHER_STATES = WEATHER_STATES;
var FOX_STATE_CLASSES = (_a = {},
    _a[GAME_STATE.POOPING] = 'fox-pooping',
    _a[GAME_STATE.CELEBRATING] = 'fox-celebrate',
    _a[SCENE_STATES.RAIN] = 'fox-rain',
    _a[GAME_STATE.HUNGRY] = 'fox-hungry',
    _a[GAME_STATE.EATING] = 'fox-eating',
    _a[GAME_STATE.HATCHING] = 'fox-egg',
    _a[GAME_STATE.SLEEPING] = 'fox-sleep',
    _a[GAME_STATE.IDLE] = 'fox-idling',
    _a[SCENE_STATES.DAY] = 'fox-idling',
    _a[GAME_STATE.DEAD] = 'fox-dead',
    _a);
exports.FOX_STATE_CLASSES = FOX_STATE_CLASSES;
exports.RAIN_CHANCE = 0.4;
