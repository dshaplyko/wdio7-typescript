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
const utils_1 = require("../../../utils");
class Element {
    constructor(selector) {
        this.selector = selector;
    }
    click(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForClickable();
            return $(this.selector).click(options);
        });
    }
    clearValue() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForExist();
            yield this.click();
            return $(this.selector).clearValue();
        });
    }
    checkIfDisplayed(option = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield $(this.selector);
            return (0, utils_1.isElementDisplayed)(element, option);
        });
    }
    checkIfExists(option = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield $(this.selector);
            return (0, utils_1.isElementExists)(element, option);
        });
    }
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return $(this.selector).getText();
        });
    }
    parseNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            const text = yield this.getText();
            return parseInt(text.match(/\d+/)[0]);
        });
    }
    waitForExist(reverse = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield $(this.selector).waitForExist({ reverse });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    waitForDisplayed(reverse = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield $(this.selector).waitForDisplayed({ reverse });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    waitForClickable(reverse = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield $(this.selector).waitForClickable({ reverse });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    getAttribute(attribute) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForExist();
            return $(this.selector).getAttribute(attribute);
        });
    }
    getPlaceholder() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getAttribute("placeholder");
        });
    }
    hover() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForExist();
            return $(this.selector).moveTo();
        });
    }
    getElementsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = yield $$(this.selector);
            return elements.length;
        });
    }
    getBackgroundColor() {
        return __awaiter(this, void 0, void 0, function* () {
            const elem = yield $(this.selector);
            return (yield elem.getCSSProperty("background-color")).parsed.hex;
        });
    }
    isElementEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return $(this.selector).isEnabled();
        });
    }
    getBorderColor() {
        return __awaiter(this, void 0, void 0, function* () {
            const rgbColor = (yield $(this.selector).getCSSProperty("border")).value;
            return (0, utils_1.rgbToHex)(rgbColor);
        });
    }
    getBackground() {
        return __awaiter(this, void 0, void 0, function* () {
            const elem = yield $(this.selector);
            return yield elem.getCSSProperty("background").parsed.hex;
        });
    }
    previousElement() {
        return __awaiter(this, void 0, void 0, function* () {
            return $(this.selector).previousElement();
        });
    }
    nextElement() {
        return __awaiter(this, void 0, void 0, function* () {
            return $(this.selector).nextElement();
        });
    }
    parentElement() {
        return __awaiter(this, void 0, void 0, function* () {
            return $(this.selector).parentElement();
        });
    }
    isStateEqual(state, field = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const classAttribute = field
                ? yield (yield this.parentElement()).getAttribute("class")
                : yield this.getAttribute("class");
            return classAttribute.includes(state);
        });
    }
}
exports.default = Element;
