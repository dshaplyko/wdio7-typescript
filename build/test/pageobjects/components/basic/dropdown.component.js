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
const field_component_1 = __importDefault(require("./field.component"));
const element_component_1 = __importDefault(require("./element.component"));
const elements_component_1 = __importDefault(require("./elements.component"));
class Dropdown extends element_component_1.default {
    get textField() {
        return new field_component_1.default(`${this.selector} .select__value input`);
    }
    get selectMenu() {
        return new element_component_1.default(`${this.selector} .select__menu`);
    }
    get buttonsClear() {
        return new elements_component_1.default(`${this.selector} .icon-close`);
    }
    get selectMenuItems() {
        return new elements_component_1.default(`${this.selector} .select__option`);
    }
    get selectedItems() {
        return new elements_component_1.default(`${this.selector} .select__control-selected-value-wrapper`);
    }
    selectMenuItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const menuItems = yield $$(this.selectMenuItems.selector);
            return menuItems[item].click();
        });
    }
    selectMenuItemByIndex(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectMenuExists = yield $(this.selectMenu.selector).isExisting();
            if (!selectMenuExists)
                yield $(this.selector).click();
            return this.selectMenuItems.clickByIndex(index);
        });
    }
    addSeveralItems(count) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 1; i < count; i++) {
                yield this.selectMenuItemByIndex(1);
            }
        });
    }
}
exports.default = Dropdown;
