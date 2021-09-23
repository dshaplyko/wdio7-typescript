"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_component_1 = __importDefault(require("../basic/button.component"));
const element_component_1 = __importDefault(require("../basic/element.component"));
class Order extends element_component_1.default {
    get buttonVerticalOrder() {
        return new button_component_1.default(`${this.selector} [data-for="icon-button-tooltip-graph-order-vert"]`);
    }
    get buttonHorizontalOrder() {
        return new button_component_1.default(`${this.selector} [data-for="icon-button-tooltip-graph-order-hor"]`);
    }
}
exports.default = Order;
