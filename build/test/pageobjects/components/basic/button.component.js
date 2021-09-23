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
const element_component_1 = __importDefault(require("./element.component"));
class Button extends element_component_1.default {
    isButtonDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const attribute = yield $(this.selector).getAttribute("disabled");
            return !!attribute;
        });
    }
    isButtonSelected() {
        return __awaiter(this, void 0, void 0, function* () {
            const className = yield $(this.selector).getAttribute("class");
            return className.includes("selected");
        });
    }
    getButtonBackgroundColor() {
        return __awaiter(this, void 0, void 0, function* () {
            const elem = yield $(this.selector);
            return (yield elem.getCSSProperty("background-color")).parsed.hex;
        });
    }
}
exports.default = Button;
