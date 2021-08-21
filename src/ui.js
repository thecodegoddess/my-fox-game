"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeModal = exports.togglePoopBag = exports.modScene = exports.modFox = void 0;
var constants_1 = require("./constants");
function modFox(state) {
    var fox = document.querySelector("." + constants_1.INTERACTIVE_CLASS_NAMES.FOX);
    if (!fox) {
        return;
    }
    fox.className = constants_1.INTERACTIVE_CLASS_NAMES.FOX + " " + constants_1.FOX_STATE_CLASSES[state];
}
exports.modFox = modFox;
function modScene(state) {
    var game = document.querySelector("." + constants_1.INTERACTIVE_CLASS_NAMES.GAME);
    if (!game) {
        return;
    }
    game.className = constants_1.INTERACTIVE_CLASS_NAMES.GAME + " " + state;
}
exports.modScene = modScene;
function togglePoopBag(show) {
    var poopBag = document.querySelector("." + constants_1.INTERACTIVE_CLASS_NAMES.POOP_BAG);
    if (!poopBag) {
        return;
    }
    poopBag.classList.toggle(constants_1.INTERACTIVE_CLASS_NAMES.HIDDEN, !show);
}
exports.togglePoopBag = togglePoopBag;
function writeModal(text) {
    if (text === void 0) { text = ''; }
    var modalElement = document.querySelector('.modal');
    if (!modalElement) {
        return;
    }
    modalElement.innerHTML = "<div class=\"modal-inner\">" + text + "</div>";
}
exports.writeModal = writeModal;
