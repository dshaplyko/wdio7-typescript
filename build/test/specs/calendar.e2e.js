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
const const_1 = require("../config/const");
const utils_1 = require("../utils");
const page_1 = __importDefault(require("../pageobjects/page"));
describe("Left panel - Fetch traces section - Calendar:", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page_1.default.openPage("/");
        yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(const_1.defaultQuery);
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(false);
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
    }));
    it("Calendar button hover state, [@extended, @low, @jira(BLMBMON-14711)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.hover();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.buttonCalendar.getButtonBackgroundColor(), const_1.orangeColor);
    }));
    it.skip("Calendar days, [@extended, @low, @jira(BLMBMON-14707)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.calendar.firstDayOfCalendar.checkIfDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.calendar.weekRows.getElementsCount(), const_1.weeksNumber);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.buttonCalendar.getButtonBackgroundColor(), const_1.orangeColor);
    }));
    it("Calendar overview, [@criticalPath, @high, @jira(BLMBMON-14706)]", () => __awaiter(void 0, void 0, void 0, function* () {
        // await Page.leftPanel.calendar.previousMonth.checkIfDisplayed();
        // await Page.leftPanel.calendar.nextMonth.checkIfDisplayed();
        yield page_1.default.leftPanel.calendar.checkIfDisplayed();
        yield page_1.default.leftPanel.calendar.timePeriodField.checkIfDisplayed();
        yield page_1.default.leftPanel.calendar.buttonApply.checkIfDisplayed();
        yield page_1.default.leftPanel.calendar.selectedMonthYear.checkIfDisplayed();
    }));
    it("Apply button states, [@criticalPath, @high, @jira(BLMBMON-14701)]", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.calendar.buttonApply.isButtonDisabled(), false);
        yield page_1.default.leftPanel.calendar.todayDay.click();
        yield page_1.default.leftPanel.calendar.inputPeriodFromTo.clearValue();
        yield page_1.default.leftPanel.calendar.inputPeriodFromTo.setInputValue(const_1.endTimePeriod);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.calendar.buttonApply.isButtonDisabled(), true);
    }));
    it.skip("Month arrows, [@criticalPath, @high, @jira(BLMBMON-14692)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.calendar.previousMonth.checkIfDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.calendar.nextMonth.isButtonDisabled(), true);
        yield page_1.default.leftPanel.calendar.previousMonth.click();
        yield page_1.default.leftPanel.calendar.nextMonth.checkIfDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.calendar.previousMonth.isButtonDisabled(), true);
    }));
    it.skip("Single day period, [@criticalPath, @high, @jira(BLMBMON-14686)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const calendarActiveDay = yield page_1.default.leftPanel.calendar.todayDay.getText();
        const periodActiveDay = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue(const_1.ExtractorType.Num);
        (0, utils_1.expectEquality)(calendarActiveDay, periodActiveDay);
    }));
    //TODO: re-check after styles are fixed
    it.skip("Single day period_Clicking a new day, [@criticalPath, @high, @jira(BLMBMON-14689)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const datePeriodFromBeforeSelected = yield page_1.default.leftPanel.calendar.inputPeriodFromTo.getInputValue(const_1.ExtractorType.Time);
        const datePeriodToBeforeSelected = yield page_1.default.leftPanel.calendar.inputPeriodFromTo.getInputValue(const_1.ExtractorType.TimeTo);
        yield page_1.default.leftPanel.calendar.todayDay.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.calendar.todayDay.getBackgroundColor(), const_1.orangeColor);
        const datePeriodFromAfterSelected = yield page_1.default.leftPanel.calendar.inputPeriodFromTo.getInputValue(const_1.ExtractorType.Time);
        const datePeriodToAfterSelected = yield page_1.default.leftPanel.calendar.inputPeriodFromTo.getInputValue(const_1.ExtractorType.TimeTo);
        (0, utils_1.expectEquality)(datePeriodFromBeforeSelected, datePeriodFromAfterSelected);
        (0, utils_1.expectEquality)(datePeriodToBeforeSelected, datePeriodToAfterSelected);
    }));
    it.skip("Applying period time and day chosen in the calendar, [@criticalPath, @high, @jira(BLMBMON-14712)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.calendar.timePeriodArrowLeft.click();
        yield page_1.default.leftPanel.calendar.clickPreviousDay();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        const dateFrom = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue(const_1.ExtractorType.Time);
        const dateTo = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue(const_1.ExtractorType.Time);
        const datePeriodFrom = yield page_1.default.leftPanel.calendar.inputPeriodFromTo.getInputValue(const_1.ExtractorType.Time);
        const datePeriodTo = yield page_1.default.leftPanel.calendar.inputPeriodFromTo.getInputValue(const_1.ExtractorType.TimeTo);
        (0, utils_1.expectEquality)(dateFrom, datePeriodFrom);
        (0, utils_1.expectEquality)(dateTo, datePeriodTo);
        const calendarSelectedDay = yield page_1.default.leftPanel.calendar.getTextPreviousDay();
        const dateFromNum = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue(const_1.ExtractorType.Num);
        const dateToNum = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue(const_1.ExtractorType.Num);
        (0, utils_1.expectEquality)(calendarSelectedDay, dateFromNum);
        (0, utils_1.expectEquality)(calendarSelectedDay, dateToNum);
    }));
    //TODO: re-check after styles are fixed
    it.skip("Purging time period, [@extended, @medium, @jira(BLMBMON-14693)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.calendar.inputPeriodFromTo.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.calendar.inputPeriodFromTo.getBorderColor(), const_1.whiteColor);
        yield page_1.default.leftPanel.calendar.inputPeriodFromTo.clearValue();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.calendar.inputPeriodFromTo.getInputValue(const_1.ExtractorType.EmptyValue), const_1.emptyValuePeriod);
    }));
    //TODO: re-check after styles are fixed
    it.skip("Active and inactive days, [@extended, @medium, @jira(BLMBMON-14708)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const activeDays = yield page_1.default.leftPanel.calendar.getActiveDaysCount();
        (0, utils_1.expectEquality)(activeDays, const_1.calendarActiveDays);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.calendar.nextElementColor(), const_1.grayColor);
    }));
});
