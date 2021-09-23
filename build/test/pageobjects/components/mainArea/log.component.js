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
const spinner_component_1 = __importDefault(require("../basic/spinner.component"));
const button_component_1 = __importDefault(require("../basic/button.component"));
const elements_component_1 = __importDefault(require("../basic/elements.component"));
class Log extends element_component_1.default {
    get timeStamps() {
        return new elements_component_1.default(`${this.selector} .log-timestamp`);
    }
    get logData() {
        return new elements_component_1.default(`${this.selector} .log-data`);
    }
    get highlightedText() {
        return new elements_component_1.default(`${this.selector} mark.highlighted-text`);
    }
    get noResultsLabel() {
        return new element_component_1.default(`${this.selector} .trace-log__load-more-container`);
    }
    get buttonContinueSearch() {
        return new button_component_1.default(`${this.selector} button.trace-log__load-more-btn`);
    }
    get buttonStopSearch() {
        return new button_component_1.default(`${this.selector} [data-testid='spinner-icon-button']`);
    }
    get spinner() {
        return new spinner_component_1.default(`${this.selector} .spinner__wrapper`);
    }
    waitUntilLogLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser.waitUntil(() => __awaiter(this, void 0, void 0, function* () { return (yield this.timeStamps.getTextArray())[0] !== undefined; }), {
                timeout: 25000,
                timeoutMsg: "expected log appears after 25s",
            });
        });
    }
    waitUntilLogContainsQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser.waitUntil(() => __awaiter(this, void 0, void 0, function* () {
                const searchResults = yield this.highlightedText.getTextArray();
                return searchResults[0].includes(query);
            }), {
                timeout: 25000,
                timeoutMsg: "expected results are changed after 25s",
            });
        });
    }
}
exports.default = Log;
