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
describe("Traces panel_Pop-outs", () => {
    let selectedNodes;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page_1.default.openPage("/");
        yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(const_1.defaultQuery);
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        selectedNodes = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(false);
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
        yield page_1.default.mainArea.tracesPanel.buttonPopOut.click();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.closePopOuts();
    }));
    it("Should open the Pop Out window, [@smoke, @high]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.switchWindow(2);
        const openedWindows = yield page_1.default.getAllOpenedWindows();
        (0, utils_1.expectEquality)(openedWindows.length, 2);
    }));
    it("Overwriting_Changing period and confirming overwrite, [@criticalPath, @high, @jira(BLMBMON-15362)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const dateFrom = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
        const dateTo = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
        yield page_1.default.switchWindow(2);
        (0, utils_1.expectElementIncludesText)(dateFrom, yield page_1.default.tracesPopOut.timeStart.getText());
        (0, utils_1.expectElementIncludesText)(dateTo, yield page_1.default.tracesPopOut.timeEnd.getText());
        yield page_1.default.switchWindow(1);
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.modal.buttonOverwrite.click();
        const dateFromNew = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
        const dateToNew = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
        yield page_1.default.switchWindow(2);
        (0, utils_1.expectElementIncludesText)(dateFromNew, yield page_1.default.tracesPopOut.timeStart.getText());
        (0, utils_1.expectElementIncludesText)(dateToNew, yield page_1.default.tracesPopOut.timeEnd.getText());
    }));
    it("Overwriting_Changing period and cancelling overwrite, [@criticalPath, @high, @jira(BLMBMON-15361)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const dateFrom = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
        const dateTo = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
        yield page_1.default.switchWindow(2);
        const timeStart = yield page_1.default.tracesPopOut.timeStart.getText();
        const timeEnd = yield page_1.default.tracesPopOut.timeEnd.getText();
        (0, utils_1.expectElementIncludesText)(dateFrom, timeStart);
        (0, utils_1.expectElementIncludesText)(dateTo, timeEnd);
        yield page_1.default.switchWindow(1);
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.modal.buttonSkip.click();
        yield page_1.default.switchWindow(2);
        const timeStartNew = yield page_1.default.tracesPopOut.timeStart.getText();
        const timeEndNew = yield page_1.default.tracesPopOut.timeEnd.getText();
        (0, utils_1.expectElementIncludesText)(dateFrom, timeStartNew);
        (0, utils_1.expectElementIncludesText)(dateTo, timeEndNew);
    }));
    it("Overwriting_Changing period and closing confirmation, [@criticalPath, @high, @jira(BLMBMON-14431)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const dateFrom = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
        const dateTo = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
        yield page_1.default.switchWindow(2);
        const timeStart = yield page_1.default.tracesPopOut.timeStart.getText();
        const timeEnd = yield page_1.default.tracesPopOut.timeEnd.getText();
        (0, utils_1.expectElementIncludesText)(dateFrom, timeStart);
        (0, utils_1.expectElementIncludesText)(dateTo, timeEnd);
        yield page_1.default.switchWindow(1);
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.modal.buttonClose.click();
        const dateFromNew = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
        const dateToNew = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
        yield page_1.default.modal.checkIfExists(false);
        yield page_1.default.switchWindow(2);
        const timeStartNew = yield page_1.default.tracesPopOut.timeStart.getText();
        const timeEndNew = yield page_1.default.tracesPopOut.timeEnd.getText();
        (0, utils_1.expectElementIncludesText)(dateFromNew, timeStartNew, true);
        (0, utils_1.expectElementIncludesText)(dateToNew, timeEndNew, true);
    }));
    it("Adding new nodes+No confirmation if nothing to overwrite, [@extended, @medium, @jira(BLMBMON-14419)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.addSeveralItems(3);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.modal.checkIfExists(false);
        const openedTabs = yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.getTextArray();
        (0, utils_1.expectArrayIncludes)(openedTabs, selectedNodes[0], false, false);
        yield page_1.default.switchWindow(2);
        const tabName = yield page_1.default.tracesPopOut.panelName.getText();
        (0, utils_1.expectEquality)(tabName, selectedNodes[0]);
    }));
    it("Panel state after popping in_Single tab, [@extended, @low, @jira(BLMBMON-17891)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.switchWindow(2);
        yield page_1.default.tracesPopOut.buttonPopIn.click();
        yield page_1.default.switchWindow(1, false);
        const openedWindows = yield page_1.default.getAllOpenedWindows();
        (0, utils_1.expectEquality)(openedWindows.length, 1);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), true);
    }));
});
