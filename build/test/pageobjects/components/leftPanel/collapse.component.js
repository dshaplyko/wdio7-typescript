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
const dropdown_component_1 = __importDefault(require("../basic/dropdown.component"));
const field_component_1 = __importDefault(require("../basic/field.component"));
const button_component_1 = __importDefault(require("../basic/button.component"));
const element_component_1 = __importDefault(require("../basic/element.component"));
class Collapse extends element_component_1.default {
    get buttonExpand() {
        return new button_component_1.default(`${this.selector} .drop-header__title`);
    }
    get filterDropdown() {
        return new dropdown_component_1.default("[data-testid='select'].filter__param");
    }
    get nodesDropdown() {
        return new dropdown_component_1.default("[data-testid='select']:not(.filter__param)");
    }
    get fieldInput() {
        return new field_component_1.default(".filter__param-value input");
    }
    get buttonLoadData() {
        return new button_component_1.default(`${this.selector} .load-data button`);
    }
    get buttonFetch() {
        return new button_component_1.default(`${this.selector} .fetch-button`);
    }
    get buttonAddToQuery() {
        return new button_component_1.default(`${this.selector} .filter__param-value ~ button`);
    }
    get buttonClearAll() {
        return new button_component_1.default(`${this.selector} .clear-all-container button`);
    }
    get buttonCalendar() {
        return new button_component_1.default(`${this.selector} .period-calendar-icon`);
    }
    get textArea() {
        return new field_component_1.default(`${this.selector} .ui-textarea`);
    }
    get inputPeriodFrom() {
        return new field_component_1.default("input.masked-input:nth-child(1)");
    }
    get inputPeriodTo() {
        return new field_component_1.default("input.masked-input:nth-child(2)");
    }
    get nodeInfoIcon() {
        return new element_component_1.default(`${this.selector} .nodes-tip`);
    }
    get toolTip() {
        return new element_component_1.default(`${this.selector} #tooltip9`);
    }
    isExpanded() {
        return __awaiter(this, void 0, void 0, function* () {
            const classAttribute = yield $(this.selector).getAttribute("class");
            return classAttribute.includes("active");
        });
    }
    addToQuery(filter, value) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * To check if the menu is collapsed/expanded
             */
            if (!(yield this.isExpanded()))
                yield this.buttonExpand.click();
            /**
             * submit the form
             */
            yield this.filterDropdown.click();
            yield this.filterDropdown.selectMenuItem(filter);
            yield this.fieldInput.setInputValue(value);
            return this.buttonAddToQuery.click();
        });
    }
}
exports.default = Collapse;
