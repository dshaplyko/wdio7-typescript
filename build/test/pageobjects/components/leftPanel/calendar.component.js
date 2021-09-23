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
const button_component_1 = __importDefault(require("../basic/button.component"));
const element_component_1 = __importDefault(require("../basic/element.component"));
const elements_component_1 = __importDefault(require("../basic/elements.component"));
const field_component_1 = __importDefault(require("../basic/field.component"));
const const_1 = require("../../../config/const");
class Calendar extends element_component_1.default {
    get buttonApply() {
        return new button_component_1.default(`${this.selector} button.calendar__apply-button`);
    }
    get buttonNextTimePeriod() {
        return new button_component_1.default(`${this.selector} button[data-for="icon-button-tooltip-single-arrow-right"]`);
    }
    get weekRows() {
        return new elements_component_1.default(`${this.selector} .react-datepicker__week`);
    }
    get firstDayOfCalendar() {
        return new element_component_1.default(`${this.selector} .react-datepicker__week:nth-of-type(1) .react-datepicker__day:nth-of-type(1)[aria-label*="1st"]`);
    }
    get lastDayOfPreviousMonth() {
        return new element_component_1.default(`${this.selector} .react-datepicker__week:nth-of-type(6) .react-datepicker__day:nth-of-type(7)`);
    }
    get previousMonth() {
        return new button_component_1.default(`${this.selector} button[data-for="icon-button-tooltip-single-arrow-up"]`);
    }
    get nextMonth() {
        return new button_component_1.default(`${this.selector} button[data-for="icon-button-tooltip-single-arrow-down"]`);
    }
    get timePeriodField() {
        return new field_component_1.default(`${this.selector} .calendar__time-wrapper`);
    }
    get timePeriodArrowRight() {
        return new button_component_1.default(`${this.selector} button[data-for="icon-button-tooltip-single-arrow-right"]`);
    }
    get timePeriodArrowLeft() {
        return new button_component_1.default(`${this.selector} button[data-for="icon-button-tooltip-single-arrow-left"]`);
    }
    get selectedMonthYear() {
        return new element_component_1.default(`${this.selector} .calendar-header__title`);
    }
    get todayDay() {
        return new element_component_1.default(`${this.selector} .react-datepicker__day--today`);
    }
    get everyDay() {
        return new element_component_1.default(`${this.selector} .react-datepicker__day`);
    }
    get selectedMonth() {
        return new element_component_1.default(`${this.selector} .react-datepicker__month`);
    }
    get inputPeriodFromTo() {
        return new field_component_1.default(`${this.selector} input.masked-input`);
    }
    get activeDays() {
        return new elements_component_1.default(`${this.selector} .react-datepicker__day[aria-disabled="false"]`);
    }
    get disabledDay() {
        return new elements_component_1.default(`${this.selector} .react-datepicker__day--disabled`);
    }
    getTextPreviousDay() {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.todayDay.previousElement();
            yield element.waitForExist();
            return element.getText();
        });
    }
    nextElementColor() {
        return __awaiter(this, void 0, void 0, function* () {
            const nextDay = yield this.todayDay.nextElement();
            const color = yield nextDay.getCSSProperty("color");
            return color.parsed.hex;
        });
    }
    clickPreviousDay() {
        return __awaiter(this, void 0, void 0, function* () {
            const dayToday = parseInt(yield this.todayDay.getText());
            if (dayToday === 1) {
                yield this.previousMonth.click();
                yield this.lastDayOfPreviousMonth.click();
            }
            else {
                const previousDay = yield this.todayDay.previousElement();
                yield previousDay.waitForExist();
                return previousDay.click();
            }
        });
    }
    clickNextDay() {
        return __awaiter(this, void 0, void 0, function* () {
            const nextDay = yield this.todayDay.nextElement();
            yield nextDay.click();
        });
    }
    getActiveDaysCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const activeDaysCurrentMonth = yield this.activeDays.getElementsCount();
            if (activeDaysCurrentMonth < const_1.calendarActiveDays) {
                yield this.previousMonth.click();
                return this.activeDays.getElementsCount();
            }
            return activeDaysCurrentMonth;
        });
    }
}
exports.default = Calendar;
