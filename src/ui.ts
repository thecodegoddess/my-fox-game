import { FOX_STATE_CLASSES, INTERACTIVE_CLASS_NAMES as CN } from './constants';

export function modFox(state: string) {
  const fox = document.querySelector(`.${CN.FOX}`);
  if (!fox) {
    return;
  }
  fox.className = `${CN.FOX} ${FOX_STATE_CLASSES[state]}`;
}

export function modScene(state: string) {
  const game = document.querySelector(`.${CN.GAME}`);
  if (!game) {
    return;
  }
  game.className = `${CN.GAME} ${state}`;
}

export function togglePoopBag(show: boolean) {
  const poopBag = document.querySelector(`.${CN.POOP_BAG}`);
  if (!poopBag) {
    return
  }
  poopBag.classList.toggle(CN.HIDDEN, !show);
}

export function writeModal(text = '') {
  const modalElement = document.querySelector('.modal');
  if (!modalElement) {
    return
  }
  modalElement.innerHTML = `<div class="modal-inner">${text}</div>`;

}
