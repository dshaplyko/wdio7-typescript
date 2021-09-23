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
describe("Traces panel", () => {
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
    }));
    it("Expanded panel view, [@smoke, @critical, @jira(BLMBMON-14257)]", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.title.parseNumber(), 1);
        (0, utils_1.expectElementIncludesText)(yield page_1.default.mainArea.tracesPanel.title.getText(), "TRACES");
        yield page_1.default.mainArea.tracesPanel.buttonTrash.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.buttonCollapse.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.checkIfDisplayed();
    }));
    it("Tab content, [@smoke, @critical, @jira(BLMBMON-14260)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.dateStart.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.timeStart.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.dateEnd.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.timeEnd.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.searchInput.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.buttonDownload.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.buttonPopOut.checkIfDisplayed();
    }));
    it("Tab content_Log format, [@criticalPath, @high, @jira(BLMBMON-14262)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const timeStamps = yield page_1.default.mainArea.tracesPanel.log.timeStamps.getTextArray();
        (0, utils_1.verifyDatesValid)(timeStamps);
    }));
    it("Tab content_Period update, [@criticalPath, @high, @jira(BLMBMON-14263)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const timeStart = yield page_1.default.mainArea.tracesPanel.timeStart.getText();
        const timeEnd = yield page_1.default.mainArea.tracesPanel.timeEnd.getText();
        const dateFrom = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
        const dateTo = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
        (0, utils_1.expectElementIncludesText)(dateFrom, timeStart);
        (0, utils_1.expectElementIncludesText)(dateTo, timeEnd);
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.modal.buttonOverwrite.click();
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
        const timeStartNew = yield page_1.default.mainArea.tracesPanel.timeStart.getText();
        const timeEndNew = yield page_1.default.mainArea.tracesPanel.timeEnd.getText();
        const dateFromNew = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
        const dateToNew = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
        (0, utils_1.expectElementIncludesText)(dateFromNew, timeStartNew);
        (0, utils_1.expectElementIncludesText)(dateToNew, timeEndNew);
    }));
    it("Tab content_Period update+some new nodes, [@criticalPath, @high, @jira(BLMBMON-14478)]", () => __awaiter(void 0, void 0, void 0, function* () {
        /**
         *  Select node(s) in Fetch traces section.
         *  Push 'Fetch' button.
         */
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        /**
         * Pop-out some nodes tabs.
         */
        yield page_1.default.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.clickByIndex(1);
        const timeStart = yield page_1.default.mainArea.tracesPanel.timeStart.getText();
        const timeEnd = yield page_1.default.mainArea.tracesPanel.timeEnd.getText();
        let tabsCount = yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.getElementsCount();
        (0, utils_1.expectEquality)(tabsCount, 1);
        /**
         * Add some nodes and change period.
         * Fetch
         * Skip overwriting.
         */
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.modal.buttonSkip.click();
        const timeStartSkipped = yield page_1.default.mainArea.tracesPanel.timeStart.getText();
        const timeEndSkipped = yield page_1.default.mainArea.tracesPanel.timeEnd.getText();
        tabsCount = yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.getElementsCount();
        (0, utils_1.expectEquality)(tabsCount, 3);
        (0, utils_1.expectEquality)(timeStart, timeStartSkipped);
        (0, utils_1.expectEquality)(timeEnd, timeEndSkipped);
        /**
         * Change period
         * Confirm overwriting
         */
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.modal.buttonOverwrite.click();
        const timeStartConfirmed = yield page_1.default.mainArea.tracesPanel.timeStart.getText();
        const timeEndConfirmed = yield page_1.default.mainArea.tracesPanel.timeEnd.getText();
        tabsCount = yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.getElementsCount();
        (0, utils_1.expectEquality)(tabsCount, 3);
        (0, utils_1.expectEquality)(timeStart, timeStartConfirmed, true);
        (0, utils_1.expectEquality)(timeEnd, timeEndConfirmed, true);
    }));
    it("Collapsed panel view, [@criticalPath, @high, @jira(BLMMON-14266)]", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), true);
        yield page_1.default.mainArea.tracesPanel.buttonCollapse.click();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(true);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), false);
        (0, utils_1.expectElementIncludesText)(yield page_1.default.mainArea.tracesPanel.title.getText(), "TRACES");
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.title.parseNumber(), 1);
        yield page_1.default.mainArea.tracesPanel.buttonTrash.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.buttonCollapse.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.checkIfDisplayed();
    }));
    it("Context menu options for download button, [@criticalPath, @high, @jira(BLMBMON-14258)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.buttonDownload.click();
        const options = yield page_1.default.mainArea.tracesPanel.downloadOptions.getTextArray();
        (0, utils_1.expectArrayIncludesItemsFromArray)(options, ["json", "csv"]);
    }));
    it("'Clear traces' modal - 'Clear' button, [@criticalPath, @high, @jira(BLMBMON-14277)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.checkIfExists();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(false);
        yield page_1.default.mainArea.tracesPanel.buttonTrash.click();
        yield page_1.default.modal.waitForExist();
        yield page_1.default.modal.buttonClear.click();
        yield page_1.default.mainArea.tracesPanel.checkIfExists(false);
        const selectedItems = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
        (0, utils_1.expectEquality)(selectedItems[0], selectedNodes[0]);
    }));
    it("'Clear traces' modal - 'Cancel' button, [@criticalPath, @high, @jira(BLMBMON-14278)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.checkIfExists();
        yield page_1.default.mainArea.tracesPanel.buttonTrash.click();
        yield page_1.default.modal.waitForExist();
        yield page_1.default.modal.buttonCancel.click();
        yield page_1.default.mainArea.tracesPanel.checkIfExists();
        const selectedItems = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
        (0, utils_1.expectEquality)(selectedItems[0], selectedNodes[0]);
    }));
    it("Overwriting_Changing period and canceling overwrite, [@criticalPath, @high, @jira(BLMBMON-14424), @jira(BLMBMON-14053)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.clickByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.modal.buttonSkip.click();
        const tabsCount = yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.getElementsCount();
        (0, utils_1.expectEquality)(tabsCount, 2);
    }));
    it("Overwriting_Changing period and confirming overwrite, [@criticalPath, @high, @jira(BLMBMON-14422)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.clickByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.modal.buttonOverwrite.click();
        const tabsCount = yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.getElementsCount();
        (0, utils_1.expectEquality)(tabsCount, 2);
    }));
    it("Panel state after data rerequesting without overwrite, [@extended, @medium, @jira(BLMBMON-14267), @jira(BLMBMON-17842)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), true);
        yield page_1.default.mainArea.tracesPanel.buttonCollapse.click();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(true);
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(false);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), true);
    }));
    it("Tabs quantity, [@extended, @medium, @jira(BLMBMON-14270)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.title.parseNumber(), 2);
        yield page_1.default.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.clickByIndex(1);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.title.parseNumber(), 1);
    }));
    it("Clear traces pop-up format, [@extended, @medium, @jira(BLMBMON-14276)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.buttonTrash.click();
        yield page_1.default.modal.waitForExist();
        yield page_1.default.modal.buttonClear.checkIfDisplayed();
        yield page_1.default.modal.buttonCancel.checkIfDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.modal.content.getText(), "Clear traces history?");
    }));
    it("Overwrite confirmation_Pop-up view, [@extended, @medium, @jira(BLMBMON-14420)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.modal.buttonOverwrite.checkIfDisplayed();
        yield page_1.default.modal.buttonSkip.checkIfDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.modal.content.getText(), "Overwrite existing traces for new period?");
    }));
    it("Overwrite confirmation_Panel State_Expanded panel+Confirm overwrite, [@extended, @medium, @jira(BLMBMON-14429)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), true);
    }));
    it("Clicking a tab on collapsed panel, [@extended, @medium, @jira(BLMBMON-14501)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.tabsPanel.isTabActive(2), true);
        yield page_1.default.mainArea.tracesPanel.buttonCollapse.click();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(true);
        yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.clickByIndex(1);
        yield page_1.default.mainArea.tracesPanel.tabsPanel.waitUntilActive(1);
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(false);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), true);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.tabsPanel.isTabActive(1), true);
    }));
    it("Clicking a tab on collapsed panel after panel reopening, [@extended, @medium, @jira(BLMBMON-17888)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.buttonTrash.click();
        yield page_1.default.modal.waitForExist();
        yield page_1.default.modal.buttonClear.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.buttonCollapse.click();
        yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.clickByIndex(1);
        yield page_1.default.mainArea.tracesPanel.tabsPanel.waitUntilActive(1);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), true);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.tabsPanel.isTabActive(1), true);
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.buttonCollapse.click();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(true);
        yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.clickByIndex(1);
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(false);
        yield page_1.default.mainArea.tracesPanel.tabsPanel.waitUntilActive(1);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), true);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.tabsPanel.isTabActive(1), true);
    }));
    it("Many tabs_Shortened tabs, [@extended, @medium, @jira(BLMBMON-14679)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.tabsPanel.navigationController.checkIfExists(false);
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.addSeveralItems(9);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.checkIfDisplayed(false);
        yield page_1.default.mainArea.tracesPanel.tabsPanel.navigationController.checkIfDisplayed();
    }));
    it("Panel state after panel reopening, [@extended, @medium, @jira(BLMBMON-17889)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.buttonTrash.click();
        yield page_1.default.modal.waitForExist();
        yield page_1.default.modal.buttonClear.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(false);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), true);
    }));
    it("Panel state after panel reopening with new nodes, [@extended, @medium, @jira(BLMBMON-17890)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.buttonTrash.click();
        yield page_1.default.modal.waitForExist();
        yield page_1.default.modal.buttonClear.click();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.addSeveralItems(3);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(false);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), true);
    }));
    const testMap = [
        {
            type: "json",
            index: 1,
        },
        {
            type: "csv",
            index: 2,
        },
    ];
    testMap.forEach(({ type, index }) => {
        it(`${type} log download+downloaded file data correctness, [@extended, @low, @jira(BLMBMON-14259)]`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("FN10");
            yield page_1.default.mainArea.tracesPanel.log.waitUntilLogContainsQuery("FN10");
            const results = yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray();
            yield page_1.default.mainArea.tracesPanel.buttonDownload.click();
            yield page_1.default.mainArea.tracesPanel.downloadOptions.clickByIndex(index);
            const fileName = (0, utils_1.generateFileName)(yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.getTextByIndex(1), yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue(const_1.ExtractorType.Date), yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue(), type);
            const data = yield (0, utils_1.readFile)(fileName);
            const fileContent = data.map(({ data }) => data);
            (0, utils_1.expectArrayIncludesItemsFromArray)(fileContent, results);
        }));
    });
});
