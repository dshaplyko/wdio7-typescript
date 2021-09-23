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
const utils_1 = require("../utils");
const const_1 = require("../config/const");
const page_1 = __importDefault(require("../pageobjects/page"));
describe("Deep links", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () { return page_1.default.openPage("/"); }));
    describe("URL", () => {
        it("Save the query with 1 parameter, [@criticalPath, @high, @jira(BLMBMON-10967)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(const_1.defaultQuery);
            yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
            yield page_1.default.refreshPage();
            yield page_1.default.mainArea.graph.waitForExist();
            const currentUrl = yield page_1.default.getDecodedUrl();
            (0, utils_1.expectElementIncludesText)(currentUrl, const_1.defaultQuery);
            yield page_1.default.mainArea.graph.checkIfDisplayed();
        }));
        it("Save the query with multiple parameters, [@criticalPath, @high, @jira(BLMBMON-10968)]", () => __awaiter(void 0, void 0, void 0, function* () {
            const searchQuery2 = "tvi_trace=6473726354";
            const searchQuery3 = "security=response_1";
            yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(`${const_1.defaultQuery},${searchQuery2},${searchQuery3}`);
            yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
            yield page_1.default.refreshPage();
            yield page_1.default.mainArea.graph.waitForExist();
            const currentUrl = yield page_1.default.getDecodedUrl();
            (0, utils_1.expectElementIncludesText)(currentUrl, [const_1.defaultQuery, searchQuery2, searchQuery3]);
            yield page_1.default.mainArea.graph.checkIfDisplayed();
        }));
        it("Copy URL - button view, [@extended, @medium, @jira(BLMBMON-10964)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.header.buttonCopyUrl.checkIfDisplayed();
            yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(const_1.defaultQuery);
            yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
            yield page_1.default.mainArea.graph.waitForExist();
            yield page_1.default.header.buttonCopyUrl.checkIfDisplayed();
        }));
        it("Save graph view and direction, [@extended, @medium, @jira(BLMBMON-10968)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(const_1.defaultQuery);
            yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
            yield page_1.default.refreshPage();
            yield page_1.default.mainArea.graph.waitForExist();
            (0, utils_1.expectElementIncludesText)(yield page_1.default.getDecodedUrl(), "hierarchicalUD");
            yield page_1.default.leftPanel.order.buttonHorizontalOrder.click();
            yield page_1.default.mainArea.spinner.waitForExist(true);
            yield page_1.default.refreshPage();
            yield page_1.default.mainArea.graph.waitForExist();
            (0, utils_1.expectElementIncludesText)(yield page_1.default.getDecodedUrl(), "hierarchicalLR");
        }));
        it("Save selected node and info pop-up state, [@extended, @medium, @jira(BLMBMON-10970)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(const_1.defaultQuery);
            yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
            yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
            yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
            yield page_1.default.refreshPage();
            yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
            yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(false);
            (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), true);
            yield page_1.default.mainArea.tracesPanel.buttonCollapse.click();
            yield page_1.default.refreshPage();
            yield page_1.default.mainArea.graph.waitForExist();
            yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(true);
            (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.isPanelExpanded(), false);
        }));
        it("Copy URL -button functioning_with saved selected node, [@extended, @medium, @jira(BLMBMON-10971)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(const_1.defaultQuery);
            yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
            yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
            const selectedItems = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
            yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
            yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
            yield page_1.default.header.buttonCopyUrl.click();
            yield page_1.default.header.copyTooltip.waitForDisplayed();
            yield page_1.default.mainArea.tracesPanel.searchInput.pasteFromClipboard();
            const pastedUrl = (0, utils_1.decodeUrl)(yield page_1.default.mainArea.tracesPanel.searchInput.getInputValue());
            (0, utils_1.expectElementIncludesText)(pastedUrl, selectedItems[0]);
        }));
        it("Closing tabs, [@extended, @medium, @jira(BLMBMON-14646)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(const_1.defaultQuery);
            yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
            yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
            yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
            const selectedItems = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
            yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
            yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
            yield page_1.default.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.clickByIndex(2);
            yield page_1.default.refreshPage();
            yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
            (0, utils_1.expectElementIncludesText)(yield page_1.default.getDecodedUrl(), `${selectedItems[0]}_T_`);
            (0, utils_1.expectElementIncludesText)(yield page_1.default.getDecodedUrl(), `${selectedItems[1]}_T_`, true);
        }));
    });
    describe("Left Panel and Traces Panel", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(const_1.defaultQuery);
            yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.closePopOuts();
        }));
        it("URL - start datetime, end datetime, [@criticalPath, @high, @jira(BLMBMON-14519)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.refreshPage();
            yield page_1.default.mainArea.graph.waitForExist();
            const currentUrl = yield page_1.default.getDecodedUrl();
            const dateStart = yield page_1.default.leftPanel.fetchTraces.inputPeriodFrom.getInputValue(const_1.ExtractorType.Date);
            const dateEnd = yield page_1.default.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
            (0, utils_1.expectElementIncludesText)(currentUrl, [dateStart, dateEnd]);
        }));
        it("URL - URL - list of nodes, [@criticalPath, @high, @jira(BLMBMON-14521)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
            yield page_1.default.refreshPage();
            yield page_1.default.mainArea.graph.waitForExist();
            const currentUrl = yield page_1.default.getDecodedUrl();
            const selectedNodes = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
            (0, utils_1.expectElementIncludesText)(currentUrl, selectedNodes[0]);
        }));
        it("URL - active tab, [@criticalPath, @high, @jira(BLMBMON-14524)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
            yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
            yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
            yield page_1.default.mainArea.graph.waitForExist();
            const selectedItems = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
            (0, utils_1.expectElementIncludesText)(yield page_1.default.getDecodedUrl(), `tr_active=${selectedItems[0]}`);
            yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
            yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.clickByIndex(2);
            yield page_1.default.mainArea.tracesPanel.tabsPanel.waitUntilActive(2);
            (0, utils_1.expectElementIncludesText)(yield page_1.default.getDecodedUrl(), `tr_active=${selectedItems[1]}`);
        }));
        it("URL - Deep link with pop-outs, [@criticalPath, @high, @jira(BLMBMON-14526)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
            yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
            yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
            yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
            const selectedItems = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
            yield page_1.default.mainArea.tracesPanel.buttonPopOut.click();
            const currentUrl = yield page_1.default.getDecodedUrl();
            yield page_1.default.openNewWindow();
            yield page_1.default.openPage(currentUrl);
            yield page_1.default.mainArea.graph.waitForExist();
            const tabs = yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.getTextArray();
            (0, utils_1.expectArraysEqual)(selectedItems, tabs);
        }));
        it("URL - List of tabs, [@criticalPath, @high, @jira(BLMBMON-17893)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
            yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
            yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
            yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
            const selectedItems = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
            const currentUrl = yield page_1.default.getDecodedUrl();
            yield page_1.default.openNewWindow();
            yield page_1.default.openPage(currentUrl);
            yield page_1.default.mainArea.graph.waitForExist();
            const tabs = yield page_1.default.mainArea.tracesPanel.tabsPanel.tabs.getTextArray();
            (0, utils_1.expectArraysEqual)(selectedItems, tabs);
        }));
    });
});
