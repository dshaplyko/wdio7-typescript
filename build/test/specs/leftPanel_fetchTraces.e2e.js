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
describe("Left Panel - Fetch traces section", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page_1.default.openPage("/");
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
    }));
    it("'Fetch' button functioning, [@smoke, @high, @jira(BLMBMON-14243)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(2);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.checkIfDisplayed();
        const selectedItems = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
        const openedTabs = yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.getTextArray();
        (0, utils_1.expectArraysEqual)(selectedItems, openedTabs);
    }));
    it("Nodes field_Content, [@smoke, @critical, @jira(BLMBMON-13942)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.click();
        const firstGraphNodes = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.click();
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Security, "123");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.click();
        const secondGraphNodes = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
        (0, utils_1.expectArraysEqual)(firstGraphNodes, secondGraphNodes, true);
    }));
    it("Default view for loaded graph case, [@criticalPath, @high, @jira(BLMBMON-13934)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.graph.waitForDisplayed();
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.checkIfDisplayed();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.checkIfDisplayed();
        yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.checkIfDisplayed();
        yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.checkIfDisplayed();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.checkIfDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.isExpanded(), false);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.isExpanded(), true);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.buttonFetch.isButtonDisabled(), true);
    }));
    it("Period field_Default value, [@criticalPath, @high, @jira(BLMBMON-14023)]", () => __awaiter(void 0, void 0, void 0, function* () {
        let dateFrom = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
        let dateTo = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
        (0, utils_1.expectEquality)((0, utils_1.getTimeInterval)(dateFrom, dateTo), 5);
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Security, "222");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        dateFrom = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
        dateTo = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
        (0, utils_1.expectEquality)((0, utils_1.getTimeInterval)(dateFrom, dateTo), 5);
    }));
    it("Period field_Validation_Valid values, [@criticalPath, @high, @jira(BLMBMON-13939)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const dateTo = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
        const dateFrom = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
        (0, utils_1.verifyDatesValid)([dateFrom, dateTo]);
    }));
    it("Nodes field_Filtering, [@criticalPath, @high, @jira(BLMBMON-13948)]", () => __awaiter(void 0, void 0, void 0, function* () {
        /**
         * get default list of nodes
         */
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.click();
        const defaultNodes = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
        /**
         * execute some search
         */
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.textField.setInputValue("api");
        const newNodes = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
        (0, utils_1.expectArrayIncludes)(newNodes, "api", true);
        /**
         * clear the input
         */
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.textField.clearInputValue();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.click();
        const purgedNodes = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
        (0, utils_1.expectArraysEqual)(defaultNodes, purgedNodes);
        /**
         * type a non existing value
         */
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.textField.setInputValue("1234");
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenu.getText(), "No options");
    }));
    it("Nodes field_Choosing options, [@criticalPath, @high, @jira(BLMBMON-13949)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        const selectedItem = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.click();
        const nodes = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
        (0, utils_1.expectArrayIncludes)(nodes, selectedItem[0], true, false);
    }));
    it("Nodes field_Removing an option, [@criticalPath, @high, @jira(BLMBMON-13950)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.buttonsClear.clickByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.buttonsClear.clickByIndex(1);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.nodesDropdown.textField.getInputValue(), "");
    }));
    it("Nodes field_Removing all options, [@criticalPath, @high, @jira(BLMBMON-13951)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.buttonsClear.clickByIndex(1);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.nodesDropdown.textField.getInputValue(), "");
    }));
    it("Fetch button_Enabled state, [@criticalPath, @high, @jira(BLMBMON-13963)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.buttonFetch.isButtonDisabled(), false);
    }));
    it("Build graph & Fetch traces sections_Expanding /collapsing sections, [@extended, @medium, @jira(BLMBMON-13935), @jira(BLMBMON-13902)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.buttonExpand.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.isExpanded(), true);
        yield page_1.default.leftPanel.fetchTraces.buttonExpand.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.isExpanded(), false);
    }));
    it("Nodes field_Typing node name, [@extended, @medium, @jira(BLMBMON-13953)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.click();
        const items = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.textField.setInputValue(items[0]);
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        (0, utils_1.expectArrayContainsItem)(yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray(), items[0]);
    }));
    it("Nodes field_Sorting, [@extended, @medium, @jira(BLMBMON-14009)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.click();
        const items = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
        (0, utils_1.expectArraySortedAlphabetically)(items);
    }));
    it("Nodes field_Field after graph reload, [@extended, @medium, @jira(BLMBMON-14662)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Security, "123");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        (0, utils_1.expectElementIncludesText)(yield page_1.default.leftPanel.fetchTraces.nodesDropdown.textField.getPlaceholder(), global.osType.message);
    }));
    //TODO: Re-check after styles are fixed
    it.skip("Nodes field_Notification on how to select nodes on graph, [@extended, @low, @jira(BLMBMON-18507), @jira(BLMBMON-18508)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodeInfoIcon.hover();
        yield page_1.default.leftPanel.fetchTraces.toolTip.waitForDisplayed();
        const tooltipText = yield page_1.default.leftPanel.fetchTraces.toolTip.getText();
        (0, utils_1.expectElementIncludesText)(tooltipText, global.osType.message);
        (0, utils_1.expectElementIncludesText)(tooltipText, global.osType.tooltipMessage);
    }));
    it("'Fetch' button_Disabled state_1 from 2 fields is filled, [@extended, @low, @jira(BLMBMON-13977)]", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.buttonFetch.isButtonDisabled(), true);
    }));
});
