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
describe("Left Panel - Build graph section", () => {
    beforeEach(() => page_1.default.openPage("/"));
    it("Home Page - default view, [@smoke, @critical, @jira(BLMBMON-10824)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.panel.checkIfDisplayed();
        yield page_1.default.leftPanel.logo.checkIfDisplayed();
        yield page_1.default.header.buttonCopyUrl.checkIfDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.infoMessage.getText(), "Please load data");
    }));
    it("Default view, [@smoke, @critical, @jira(BLMBMON-10824)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.checkIfDisplayed();
        yield page_1.default.leftPanel.fetchTraces.checkIfDisplayed();
        yield page_1.default.leftPanel.order.checkIfDisplayed();
        yield page_1.default.leftPanel.applicationVersion.checkIfDisplayed();
    }));
    it("Build graph section default view, [@criticalPath, @high, @jira(BLMBMON-10825)]", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.isExpanded(), true);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.isExpanded(), false);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.filterDropdown.textField.getPlaceholder(), "Type or select parameter");
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.fieldInput.getPlaceholder(), "Enter value");
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.textArea.getPlaceholder(), "Type any parameter");
        yield page_1.default.leftPanel.buildGraph.buttonAddToQuery.checkIfDisplayed();
        yield page_1.default.leftPanel.buildGraph.buttonClearAll.checkIfDisplayed();
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.checkIfDisplayed();
    }));
    it("Parameter dropdown options, [@criticalPath, @high, @jira(BLMBMON-10828)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.filterDropdown.click();
        yield page_1.default.leftPanel.buildGraph.filterDropdown.selectMenu.checkIfDisplayed();
        const items = yield page_1.default.leftPanel.buildGraph.filterDropdown.selectMenuItems.getTextArray();
        (0, utils_1.expectArraysEqual)(const_1.Constants.dropdownValues, items);
    }));
    it("Clearing the data by pressing Bloomberg button, [@criticalPath, @high]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "123");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.mainArea.graph.waitForExist();
        yield page_1.default.mainArea.graph.checkIfDisplayed();
        yield page_1.default.leftPanel.logo.click();
        yield page_1.default.mainArea.graph.checkIfExists(false);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.textArea.getInputValue(), "");
    }));
    it("Collapsed view, [@extended, @low, @jira(BLMBMON-10827)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buttonCollapse.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.isSideBarExpanded(), false);
        yield page_1.default.leftPanel.buttonCollapse.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.isSideBarExpanded(), true);
    }));
    it("Value input field, [@criticalPath, @high, @jira(BLMBMON-10832)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.filterDropdown.click();
        yield page_1.default.leftPanel.buildGraph.filterDropdown.selectMenuItem(const_1.Values.ExByte);
        yield page_1.default.leftPanel.buildGraph.fieldInput.setInputValue("123");
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.fieldInput.getInputValue(), "123");
        yield page_1.default.leftPanel.buildGraph.fieldInput.buttonClear.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.fieldInput.getInputValue(), "");
    }));
    it("Clearing dropdown field, [@criticalPath, @high, @jira(BLMBMON-10831)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.filterDropdown.click();
        yield page_1.default.leftPanel.buildGraph.filterDropdown.selectMenuItem(const_1.Values.ExByte);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.filterDropdown.textField.getInputValue(), "ExByte");
        yield page_1.default.leftPanel.buildGraph.filterDropdown.buttonsClear.clickByIndex(1);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.filterDropdown.textField.getInputValue(), "");
    }));
    it("Clearing value input field, [@criticalPath, @high, @jira(BLMBMON-10835)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.fieldInput.setInputValue("123");
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.fieldInput.getInputValue(), "123");
        yield page_1.default.leftPanel.buildGraph.fieldInput.buttonClear.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.fieldInput.getInputValue(), "");
    }));
    it("Add to query button - both fields filled, [@criticalPath, @high, @jira(BLMBMON-10836)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.ExByte, "123");
        (0, utils_1.expectElementIncludesText)(yield page_1.default.leftPanel.buildGraph.textArea.getInputValue(), "exbyte=123");
    }));
    it("Add to query button - 1 parameter with 2 values, [@criticalPath, @high, @jira(BLMBMON-10840)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.ExByte, "111");
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.ExByte, "222");
        (0, utils_1.expectElementIncludesText)(yield page_1.default.leftPanel.buildGraph.textArea.getInputValue(), ["exbyte=111", "exbyte=222"]);
    }));
    it("Add to query button - 2 parameters with different values, [@criticalPath, @high, @jira(BLMBMON-10841)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Security, "222");
        (0, utils_1.expectElementIncludesText)(yield page_1.default.leftPanel.buildGraph.textArea.getInputValue(), ["trace=111", "security=222"]);
    }));
    it("Add to query button - 3 parameters, different value, [@criticalPath, @high, @jira(BLMBMON-10842)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Security, "222");
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.ExByte, "333");
        (0, utils_1.expectElementIncludesText)(yield page_1.default.leftPanel.buildGraph.textArea.getInputValue(), [
            "trace=111",
            "security=222",
            "exbyte=333",
        ]);
    }));
    it("Correct the query manually, [@criticalPath, @high, @jira(BLMBMON-10843)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.textArea.setInputValue("222");
        (0, utils_1.expectElementIncludesText)(yield page_1.default.leftPanel.buildGraph.textArea.getInputValue(), "trace=111222");
    }));
    it("Load data button request, [@criticalPath, @high, @jira(BLMBMON-10847)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        const request = yield (0, utils_1.captureRequest)("/dataflow");
        (0, utils_1.verifyDataflowRequest)(request, "trace=111");
    }));
    it("Parameter manual enter+No options, [@extended, @low, @jira(BLMBMON-10829)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.filterDropdown.textField.setInputValue("EB34YE");
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.filterDropdown.selectMenu.getText(), "No options");
        yield page_1.default.leftPanel.buildGraph.fieldInput.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.filterDropdown.textField.getPlaceholder(), "Type or select parameter");
    }));
    it("Sections state when data response returns an error, [@extended, @medium, @jira(BLMBMON-13936)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, utils_1.emulateNetworkError)("/dataflow", "Failed");
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.infoMessage.getText(), "Please change query");
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.isExpanded(), true);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.fetchTraces.isExpanded(), false);
    }));
    it("Clear all button, [@extended, @medium, @jira(BLMBMON-14510)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonClearAll.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.textArea.getInputValue(), "");
    }));
    it("Value input field validation - alphanumeric symbols + special symbols, [@extended, @low, @jira(BLMBMON-10834)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = "1234!@#$";
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, query);
        (0, utils_1.expectElementIncludesText)(yield page_1.default.leftPanel.buildGraph.textArea.getInputValue(), query);
    }));
    it("Add to query button - empty parameter field, [@extended, @low, @jira(BLMBMON-10837)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.fieldInput.setInputValue("123");
        yield page_1.default.leftPanel.buildGraph.buttonAddToQuery.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.filterDropdown.isStateEqual("invalid"), true);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.textArea.getInputValue(), "");
    }));
    it("Add to query button - empty value input field, [@extended, @low, @jira(BLMBMON-10838)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "");
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.fieldInput.isStateEqual("invalid", true), true);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.textArea.getInputValue(), "");
    }));
    it("Add to query button - both fields empty, [@extended, @low, @jira(BLMBMON-10839)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.buttonAddToQuery.click();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.filterDropdown.isStateEqual("invalid"), true);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.fieldInput.isStateEqual("invalid", true), true);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.textArea.getInputValue(), "");
    }));
    it("'Load data' button - blank query, [@extended, @low, @jira(BLMBMON-10833)]", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.buildGraph.buttonLoadData.isButtonDisabled(), true);
    }));
});
describe("Left Panel - Order section", () => {
    beforeEach(() => page_1.default.openPage("/"));
    it("Not loaded yet graph, [@extended, @medium, @jira(BLMBMON-10826)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.order.buttonHorizontalOrder.checkIfDisplayed();
        yield page_1.default.leftPanel.order.buttonVerticalOrder.checkIfDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.order.buttonHorizontalOrder.isButtonDisabled(), true);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.order.buttonVerticalOrder.isButtonDisabled(), true);
    }));
    it("Loaded graph, [@extended, @medium, @jira(BLMBMON-10826)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.mainArea.graph.waitForExist();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.order.buttonHorizontalOrder.isButtonDisabled(), false);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.order.buttonVerticalOrder.isButtonDisabled(), false);
    }));
});
