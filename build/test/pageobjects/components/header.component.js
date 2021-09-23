"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_component_1 = __importDefault(require("./basic/button.component"));
const element_component_1 = __importDefault(require("./basic/element.component"));
class Header extends element_component_1.default {
    get buttonCopyUrl() {
        return new button_component_1.default(`${this.selector} .copy-button`);
    }
    get buttonShowPath() {
        return new button_component_1.default(`${this.selector} .switch__track`);
    }
    get copyTooltip() {
        return new element_component_1.default(`${this.selector} [id*='copy-button']`);
    }
}
exports.default = Header;
