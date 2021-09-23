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
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("../../../utils/expect");
class Elements {
    constructor(selector) {
        this.selector = selector;
    }
    getTextArray() {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = yield $$(this.selector);
            const textArr = [];
            if (elements.length > 0)
                yield elements[0].waitForExist();
            for (const element of elements) {
                textArr.push(yield element.getText());
            }
            return textArr;
        });
    }
    selectByIndex(index) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForDisplayed();
            return $$(this.selector)[index - 1];
        });
    }
    getTextByIndex(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.selectByIndex(index);
            return element.getText();
        });
    }
    clickByIndex(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.selectByIndex(index);
            yield element.waitForClickable();
            return element.click();
        });
    }
    checkIfDisplayed(option = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = yield $$(this.selector);
            return (0, expect_1.isElementDisplayed)(elements, option);
        });
    }
    getElementsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = yield $$(this.selector);
            return elements.length;
        });
    }
    waitForExist(reverse = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield $$(this.selector)[0].waitForExist({ reverse });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    waitForDisplayed(reverse = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield $$(this.selector)[0].waitForExist({ reverse });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    getElementsBackgroundColors() {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = yield $$(this.selector);
            const textArr = [];
            if (elements.length > 0)
                yield this.waitForExist();
            for (const element of elements) {
                const color = yield element.getCSSProperty("background-color");
                textArr.push(color.parsed.hex);
            }
            return textArr;
        });
    }
}
exports.default = Elements;
