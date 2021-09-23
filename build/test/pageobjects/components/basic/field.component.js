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
const utils_1 = require("../../../utils");
const element_component_1 = __importDefault(require("./element.component"));
const button_component_1 = __importDefault(require("./button.component"));
class Field extends element_component_1.default {
    get buttonClear() {
        const buttonSelector = "[data-testid='clear.input']";
        return new button_component_1.default(`${this.selector}~${buttonSelector}`);
    }
    getInputValue(decodeType) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield $(this.selector).getValue();
            return decodeType ? utils_1.regexpMap[decodeType](value) : value;
        });
    }
    setInputValue(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForExist();
            yield this.waitForClickable();
            return $(this.selector).setValue(text);
        });
    }
    clearInputValue() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.click();
            return $(this.selector).clearValue();
        });
    }
    pasteFromClipboard() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.click();
            return browser.keys([global.osType.button, "v"]);
        });
    }
}
exports.default = Field;
