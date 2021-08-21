"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var toggleHighlighted = function (icon, show) {
    var btn = document.querySelector("." + constants_1.ICONS[icon] + "-icon");
    if (!btn) {
        return;
    }
    btn.classList.toggle(constants_1.INTERACTIVE_CLASS_NAMES.HIGHLIGHTED, show);
};
function initButtons(userInteractionHandler) {
    var selectedIcon = 0;
    function buttonClick(ev) {
        var target = ev.target;
        if (!target) {
            return;
        }
        var htmlClassNames = target.classList;
        if (htmlClassNames.contains(constants_1.INTERACTIVE_CLASS_NAMES.LEFT_BUTTON)) {
            toggleHighlighted(selectedIcon, false);
            selectedIcon = (2 + selectedIcon) % constants_1.ICONS.length;
            toggleHighlighted(selectedIcon, true);
        }
        else if (htmlClassNames.contains(constants_1.INTERACTIVE_CLASS_NAMES.RIGHT_BUTTON)) {
            toggleHighlighted(selectedIcon, false);
            selectedIcon = (1 + selectedIcon) % constants_1.ICONS.length;
            toggleHighlighted(selectedIcon, true);
        }
        else {
            userInteractionHandler(constants_1.ICONS[selectedIcon]);
        }
    }
    var buttonElement = document.querySelector("." + constants_1.INTERACTIVE_CLASS_NAMES.BUTTONS);
    if (buttonElement) {
        buttonElement.addEventListener('click', buttonClick);
    }
}
exports.default = initButtons;
