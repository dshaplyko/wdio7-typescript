"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_component_1 = __importDefault(require("./leftPanel/order.component"));
const collapse_component_1 = __importDefault(require("./leftPanel/collapse.component"));
const calendar_component_1 = __importDefault(require("./leftPanel/calendar.component"));
const button_component_1 = __importDefault(require("./basic/button.component"));
const element_component_1 = __importDefault(require("./basic/element.component"));
class LeftPanel extends element_component_1.default {
    get panel() {
        return new element_component_1.default(`${this.selector}`);
    }
    get order() {
        return new order_component_1.default("div.order");
    }
    get buildGraph() {
        return new collapse_component_1.default(".build-graph-container .rc-collapse-item");
    }
    get fetchTraces() {
        return new collapse_component_1.default(".fetch-traces-container .rc-collapse-item");
    }
    get calendar() {
        return new calendar_component_1.default(".calendar__modal");
    }
    get buttonCollapse() {
        return new button_component_1.default(`${this.selector} .side-bar-button.stretch`);
    }
    get logo() {
        return new button_component_1.default(`${this.selector} a.navbar-header-logo`);
    }
    get applicationVersion() {
        return new element_component_1.default(`${this.selector} .frontend-version`);
    }
    isSideBarExpanded() {
        return __awaiter(this, void 0, void 0, function* () {
            const attributes = yield $(this.selector).getAttribute("class");
            return attributes.includes("expanded");
        });
    }
}
exports.default = LeftPanel;
