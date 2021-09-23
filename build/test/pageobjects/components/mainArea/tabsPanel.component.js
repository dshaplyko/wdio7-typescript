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
const element_component_1 = __importDefault(require("../basic/element.component"));
const elements_component_1 = __importDefault(require("../basic/elements.component"));
class TabsPanel extends element_component_1.default {
    get tabs() {
        return new elements_component_1.default(`${this.selector} .tab-label`);
    }
    get buttonsCloseTab() {
        return new elements_component_1.default(`${this.selector} .tab-label a`);
    }
    get navigationController() {
        return new element_component_1.default(`${this.selector} .scrollbar-navigation-control:not(.disabled)`);
    }
    getClassAttribute(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const tab = yield this.tabs.selectByIndex(index);
            return tab.getAttribute("class");
        });
    }
    isTabActive(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const classAttribute = yield this.getClassAttribute(index);
            return classAttribute.includes("active");
        });
    }
    waitUntilActive(index) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser.waitUntil(() => __awaiter(this, void 0, void 0, function* () {
                yield this.tabs.clickByIndex(index);
                return this.isTabActive(index);
            }), {
                timeout: 20000,
                timeoutMsg: "the tab is still not active after 20s",
            });
        });
    }
}
exports.default = TabsPanel;
