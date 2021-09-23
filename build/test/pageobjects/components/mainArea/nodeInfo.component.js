"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const element_component_1 = __importDefault(require("../basic/element.component"));
const elements_component_1 = __importDefault(require("../basic/elements.component"));
const button_component_1 = __importDefault(require("../basic/button.component"));
class NodeInfo extends element_component_1.default {
    get buttonClose() {
        return new button_component_1.default(`${this.selector} .ui-button`);
    }
    get infoListItems() {
        return new elements_component_1.default(`${this.selector} .info-list__item`);
    }
    get infoListContents() {
        return new elements_component_1.default(`${this.selector} .info-list__content`);
    }
}
exports.default = NodeInfo;
