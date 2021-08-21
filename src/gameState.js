"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserInteraction = void 0;
var constants_1 = require("./constants");
var debugger_1 = __importDefault(require("./debugger"));
var ui_1 = require("./ui");
var utils_1 = require("./utils");
var gameState = {
    current: constants_1.GAME_STATE.INIT,
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
    toggleDebugging: function () {
        if (this.debug) {
            debugger_1.default.cleanUp();
        }
        else {
            debugger_1.default.init();
        }
        this.debug = !this.debug;
    },
    debugTick: function (count) {
        if (!this.debug) {
            return;
        }
        debugger_1.default.updateTicker(count.toString());
    },
    debugMsg: function (msg) {
        if (!this.debug) {
            return;
        }
        debugger_1.default.updateMsg(msg);
    },
    tick: function () {
        if (this.isPaused) {
            return;
        }
        this.clock++;
        this.debugTick(this.clock);
        if (this.clock === this.wakeTime) {
            this.wake();
        }
        else if (this.clock === this.hungryTime) {
            this.getHungry();
        }
        else if (this.clock === this.dieTime) {
            this.die();
        }
        else if (this.clock === this.poopTime) {
            this.poop();
        }
        else if (this.clock === this.startCelebrationTime) {
            this.startCelebration();
        }
        else if (this.clock === this.endCelebrationTime) {
            this.endCelebration();
        }
        else if (this.clock === this.sleepTime) {
            this.sleep();
        }
        return this.clock;
    },
    togglePause: function () {
        this.isPaused = !this.isPaused;
    },
    clearTimers: function () {
        this.wakeTime = -1;
        this.sleepTime = -1;
        this.hungryTime = -1;
        this.dieTime = -1;
        this.poopTime = -1;
        this.startCelebrationTime = -1;
        this.endCelebrationTime = -1;
    },
    startGame: function () {
        if (this.debug) {
            debugger_1.default.cleanUp();
        }
        this.current = constants_1.GAME_STATE.HATCHING;
        this.clearTimers();
        this.wakeTime = this.clock + 3;
        ui_1.modFox(constants_1.GAME_STATE.HATCHING);
        ui_1.modScene(constants_1.SCENE_STATES.DAY);
        this.debugMsg('Start Game: Hatching  🥚');
    },
    wake: function () {
        this.current = constants_1.GAME_STATE.IDLE;
        this.wakeTime = -1;
        this.scene = Math.random() > constants_1.RAIN_CHANCE ? 0 : 1;
        ui_1.modScene(constants_1.WEATHER_STATES[this.scene]);
        this.determineFoxState();
        this.sleepTime = this.clock + constants_1.DAY_LENGTH;
        this.hungryTime = this.clock + utils_1.getHungryTime();
        this.debugMsg("Awake \u2600\uFE0F <br /> will get hungry " + this.hungryTime);
    },
    sleep: function () {
        this.current = constants_1.GAME_STATE.SLEEPING;
        this.clearTimers();
        ui_1.togglePoopBag(false);
        this.wakeTime = this.clock + constants_1.NIGHT_LENGTH;
        ui_1.modFox(constants_1.GAME_STATE.SLEEPING);
        ui_1.modScene(constants_1.SCENE_STATES.NIGHT);
        this.debugMsg('Sleepy Time 💤');
    },
    getHungry: function () {
        this.current = constants_1.GAME_STATE.HUNGRY;
        this.hungryTime = -1;
        ui_1.modFox(constants_1.GAME_STATE.HUNGRY);
        this.dieTime = this.clock + utils_1.getDieTime();
        this.debugMsg("Hungry Fox \uD83D\uDE3E <br/> dieTime: " + this.dieTime);
    },
    startCelebration: function () {
        this.current = constants_1.GAME_STATE.CELEBRATING;
        this.startCelebrationTime = -1;
        this.endCelebrationTime = this.clock + 2;
        ui_1.modFox(constants_1.GAME_STATE.CELEBRATING);
        this.debugMsg("celebration \uD83C\uDF89<br /> ending celebration in " + this.endCelebrationTime);
    },
    endCelebration: function () {
        this.current = constants_1.GAME_STATE.IDLE;
        this.endCelebrationTime = -1;
        this.determineFoxState();
        ui_1.togglePoopBag(false);
    },
    poop: function () {
        this.current = constants_1.GAME_STATE.POOPING;
        this.poopTime = -1;
        ui_1.modFox(constants_1.GAME_STATE.POOPING);
        this.dieTime = this.clock + utils_1.getPoopTime();
        this.debugMsg("POOPED \uD83D\uDCA9 <br /> die time: " + this.dieTime);
    },
    die: function () {
        var stateAtDeath = this.current;
        this.current = constants_1.GAME_STATE.DEAD;
        this.sleepTime = -1;
        ui_1.modFox(constants_1.GAME_STATE.DEAD);
        ui_1.modScene(constants_1.SCENE_STATES.DEAD);
        ui_1.writeModal("Your fox has died!  <br /> Press middle button to start over");
        this.debugMsg("FOX HAS DIED \uD83D\uDC80 <br /> Cause of death: " + stateAtDeath);
    },
    changeWeather: function () {
        this.debugMsg('change the weather');
        this.scene = (this.scene + 1) % constants_1.WEATHER_STATES.length;
        this.debugMsg("this.scene = " + this.scene);
        ui_1.modScene(constants_1.WEATHER_STATES[this.scene]);
        this.determineFoxState();
    },
    cleanUpPoop: function () {
        if (this.current !== constants_1.GAME_STATE.POOPING) {
            return;
        }
        this.current = constants_1.GAME_STATE.IDLE;
        this.dieTime = -1;
        ui_1.togglePoopBag(true);
        this.startCelebration();
        this.hungryTime = this.clock + utils_1.getHungryTime();
    },
    feed: function () {
        if (this.current !== constants_1.GAME_STATE.HUNGRY) {
            return;
        }
        this.current = constants_1.GAME_STATE.EATING;
        this.dieTime = -1;
        this.startCelebrationTime = this.clock + 2;
        this.poopTime = this.clock + utils_1.getPoopTime();
        ui_1.modFox(constants_1.GAME_STATE.EATING);
        this.debugMsg("Feeding \uD83C\uDF56 <br /> will startCelebration at " + this.startCelebrationTime + " and time to poop " + this.poopTime);
    },
    determineFoxState: function () {
        if (this.current !== constants_1.GAME_STATE.IDLE) {
            return;
        }
        if (this.scene === 1) {
            ui_1.modFox(constants_1.SCENE_STATES.RAIN);
        }
        else {
            ui_1.modFox(constants_1.GAME_STATE.IDLE);
        }
    },
    handleUserInteraction: function (icon) {
        var unactionableStates = [
            constants_1.GAME_STATE.SLEEPING,
            constants_1.GAME_STATE.EATING,
            constants_1.GAME_STATE.CELEBRATING,
            constants_1.GAME_STATE.HATCHING,
        ];
        if (unactionableStates.includes(this.current)) {
            return;
        }
        if (this.current === constants_1.GAME_STATE.INIT || this.current === constants_1.GAME_STATE.DEAD) {
            this.startGame();
            ui_1.writeModal();
            return;
        }
        switch (icon) {
            case constants_1.ICON_NAMES.WEATHER: {
                this.changeWeather();
                break;
            }
            case constants_1.ICON_NAMES.POOP: {
                this.cleanUpPoop();
                break;
            }
            case constants_1.ICON_NAMES.FISH: {
                this.feed();
                break;
            }
        }
    },
};
window.__GAME_STATE__ = gameState;
exports.handleUserInteraction = gameState.handleUserInteraction.bind(gameState);
exports.default = gameState;
