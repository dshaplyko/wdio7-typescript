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
const tracesPanel_component_1 = __importDefault(require("./mainArea/tracesPanel.component"));
const nodeInfo_component_1 = __importDefault(require("./mainArea/nodeInfo.component"));
const button_component_1 = __importDefault(require("./basic/button.component"));
const element_component_1 = __importDefault(require("./basic/element.component"));
const spinner_component_1 = __importDefault(require("./basic/spinner.component"));
const colorLegend_component_1 = __importDefault(require("./mainArea/colorLegend.component"));
class MainArea extends element_component_1.default {
    get buttonDeleteAll() {
        return new button_component_1.default(`${this.selector} button[data-tip='Delete all']`);
    }
    get buttonCollapse() {
        return new button_component_1.default(`${this.selector} button[data-tip='Collapse']`);
    }
    get spinner() {
        return new spinner_component_1.default(`${this.selector} .spinner__wrapper`);
    }
    get tracesPanel() {
        return new tracesPanel_component_1.default(`${this.selector} .collapsible__traces-panel`);
    }
    get nodeInfo() {
        return new nodeInfo_component_1.default(".node-info");
    }
    get colorLegend() {
        return new colorLegend_component_1.default(".countries-map");
    }
    get graph() {
        return new element_component_1.default(`${this.selector} .graph-wrapper canvas`);
    }
    get infoMessage() {
        return new element_component_1.default(`${this.selector} .text`);
    }
    get headerTitle() {
        return new element_component_1.default(`${this.selector} h2.panel-header__title"`);
    }
    clickGraphNode() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser.pause(1000);
            const canvas = yield $(this.graph.selector);
            yield canvas.click({ x: 2, y: 34 });
        });
    }
    clickOutsideGraph() {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = yield $(this.graph.selector);
            yield canvas.click({ x: 0, y: 25 });
        });
    }
}
exports.default = MainArea;
