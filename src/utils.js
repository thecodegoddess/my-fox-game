"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoopTime = exports.getDieTime = exports.getHungryTime = void 0;
function getHungryTime() {
    return Math.floor(Math.random() * 3) + 5;
}
exports.getHungryTime = getHungryTime;
function getDieTime() {
    return Math.floor(Math.random() * 3) + 2;
}
exports.getDieTime = getDieTime;
function getPoopTime() {
    return Math.floor(Math.random() * 3) + 4;
}
exports.getPoopTime = getPoopTime;
