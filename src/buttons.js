import { ICONS, INTERACTIVE_CLASS_NAMES as CN } from './constants';

const toggleHighlighted = (icon, show) => {
  const btn = document.querySelector(`.${ICONS[icon]}-icon`);
  if (!btn) {
    return;
  }

  btn.classList.toggle(CN.HIGHLIGHTED, show);
};

export default function initButtons(userInteractionHandler) {
  let selectedIcon = 0;

  function buttonClick(ev) {
    const { target } = ev;
    const htmlClassNames = target.classList;

    if (htmlClassNames.contains(CN.LEFT_BUTTON)) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (2 + selectedIcon) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else if (htmlClassNames.contains(CN.RIGHT_BUTTON)) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (1 + selectedIcon) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else {
      userInteractionHandler(ICONS[selectedIcon]);
    }
  }

  document
    .querySelector(`.${CN.BUTTONS}`)
    .addEventListener('click', buttonClick);
}
