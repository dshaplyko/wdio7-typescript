"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_component_1 = __importDefault(require("./basic/button.component"));
const element_component_1 = __importDefault(require("./basic/element.component"));
class Modal extends element_component_1.default {
    get buttonOverwrite() {
        return new button_component_1.default(`${this.selector} .ui-button.large.primary`);
    }
    get buttonClear() {
        return new button_component_1.default(`${this.selector} .ui-button.large.primary`);
    }
    get buttonSkip() {
        return new button_component_1.default(`${this.selector} .ui-button.default`);
    }
    get buttonCancel() {
        return new button_component_1.default(`${this.selector} .ui-button.default`);
    }
    get buttonClose() {
        return new button_component_1.default(`${this.selector} button.close-button`);
    }
    get content() {
        return new element_component_1.default(`${this.selector} .confirm-content__text`);
    }
}
exports.default = Modal;
