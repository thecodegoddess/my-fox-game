import { FOX_STATE_CLASSES, INTERACTIVE_CLASS_NAMES as CN } from './constants';

export function modFox(state) {
  const fox = document.querySelector(`.${CN.FOX}`);
  fox.className = `${CN.FOX} ${FOX_STATE_CLASSES[state]}`;
}

export function modScene(state) {
  const game = document.querySelector(`.${CN.GAME}`);
  game.className = `${CN.GAME} ${state}`;
}

export function togglePoopBag(show) {
  const poopBag = document.querySelector(`.${CN.POOP_BAG}`);
  poopBag.classList.toggle(CN.HIDDEN, !show);
}

export function writeModal(text = '') {
  document.querySelector(
    '.modal',
  ).innerHTML = `<div class="modal-inner">${text}</div>`;
}
