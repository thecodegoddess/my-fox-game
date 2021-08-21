import { ICONS, INTERACTIVE_CLASS_NAMES as CN } from './constants';

const toggleHighlighted = (icon: number, show: boolean) => {
  const btn = document.querySelector(`.${ICONS[icon]}-icon`);
  if (!btn) {
    return;
  }

  btn.classList.toggle(CN.HIGHLIGHTED, show);
};

export default function initButtons(userInteractionHandler: (icon: string) => void) {
  let selectedIcon = 0;

  function buttonClick(ev: Event) {
    const { target }  = ev;
    if (!target) {
      return;
    }
    const htmlClassNames = (target as Element).classList;

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

  const buttonElement = document.querySelector(`.${CN.BUTTONS}`);
  if (buttonElement) {
    buttonElement.addEventListener('click', buttonClick);
  }
}
