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
describe("Traces panel_Pop-outs_Search", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page_1.default.openPage("/");
        yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(`${const_1.defaultQuery},option_key=10000`);
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(false);
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
    }));
    it("Search results correctness, [@smoke, @critical, @jira(BLMBMON-16723)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("Symbol");
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogContainsQuery("Symbol");
        (0, utils_1.expectArrayIncludes)(yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray(), "Symbol");
        yield page_1.default.mainArea.tracesPanel.searchInput.buttonClear.click();
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("abc");
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogContainsQuery("abc");
        (0, utils_1.expectArrayIncludes)(yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray(), "abc");
    }));
    it("Search keyword with spaces and special symbols, [@criticalPath, @high, @jira(BLMBMON-18235)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue(const_1.searchQuery);
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogContainsQuery(const_1.searchQuery);
        (0, utils_1.expectArrayIncludes)(yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray(), const_1.searchQuery);
    }));
    it("No matches_Up to 10000 available traces, [@criticalPath, @high, @jira(BLMBMON-17914)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asdasdasdasd");
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.waitForExist();
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.getText(), "No matches");
    }));
    it("No matches_Editing search to get no matches instead of search results, [@criticalPath, @high, @jira(BLMBMON-15317)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("FN10");
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogContainsQuery("FN10");
        (0, utils_1.expectArrayIncludes)(yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray(), "FN10");
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asd");
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
    }));
    it("No matches_Stop and resume search when 10000 traces available, [@criticalPath, @high, @jira(BLMBMON-15317), @jira(BLMBMON-15297)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asda");
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisplayed();
        yield page_1.default.mainArea.tracesPanel.log.buttonStopSearch.click();
        yield page_1.default.mainArea.tracesPanel.log.buttonContinueSearch.click();
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
    }));
    it("'X' button, [@extended, @low, @jira(BLMBMON-16480)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const initialResults = yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray();
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asdasd");
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.waitForDisplayed();
        yield page_1.default.mainArea.tracesPanel.searchInput.buttonClear.click();
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
        const results = yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray();
        (0, utils_1.expectArraysEqual)(initialResults, results);
    }));
    it("Search results highlighting, [@extended, @low, @jira(BLMBMON-16725)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("FN10");
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogContainsQuery("FN10");
        const highlightedText = yield page_1.default.mainArea.tracesPanel.log.highlightedText.getElementsBackgroundColors();
        (0, utils_1.expectArrayIncludes)(highlightedText, const_1.orangeColor);
    }));
    it("Download button when no search results, [@extended, @low, @jira(BLMBMON-17765)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asdasd");
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.waitForDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.buttonDownload.isButtonDisabled(), true);
    }));
});
describe("Traces panel_Pop-outs_Search_No Matches with 20000 results", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page_1.default.openPage("/");
        yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(`${const_1.defaultQuery},option_key=20000`);
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        yield page_1.default.mainArea.tracesPanel.waitUntilCollapsed(false);
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
    }));
    it("Continue search until all traces are loaded, [@extended, @medium, @jira(BLMBMON-17916)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asdasd");
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.log.buttonContinueSearch.click();
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
    }));
    it("Hidden no matches if there is a search result, [@extended, @medium, @jira(BLMBMON-17918)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const results1 = yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray();
        const searchQuery = utils_1.regexpMap[const_1.ExtractorType.Id](results1[0]);
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue(searchQuery);
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        (0, utils_1.expectArrayIncludes)(yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray(), searchQuery);
        yield page_1.default.mainArea.tracesPanel.log.buttonContinueSearch.click();
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        (0, utils_1.expectArrayIncludes)(yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray(), searchQuery);
    }));
    it("Editing search to get no matches instead of no matches in 10000 traces, [@extended, @medium, @jira(BLMBMON-17921)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asd");
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        (0, utils_1.expectElementIncludesText)(yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.getText(), "No matches in 10000 traces");
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asd");
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.getText(), "No matches");
    }));
    it("Editing search to get no matches instead of no matches, [@extended, @medium, @jira(BLMBMON-17925)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asd");
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asd");
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("qweqweqwe");
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.log.spinner.checkIfExists(false);
    }));
    it("Editing search to get search results instead of no matches, [@extended, @medium, @jira(BLMBMON-17926)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asd");
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asd");
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
        yield page_1.default.mainArea.tracesPanel.searchInput.buttonClear.click();
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("FN10");
        yield page_1.default.mainArea.tracesPanel.log.waitUntilLogLoaded();
        (0, utils_1.expectArrayIncludes)(yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray(), "FN10");
    }));
    it("Continue search_Stop and resume search when at least 11000 traces available, [@extended, @medium, @jira(BLMBMON-18223)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asdaa");
        yield page_1.default.mainArea.tracesPanel.log.buttonContinueSearch.waitForDisplayed();
        yield page_1.default.mainArea.tracesPanel.log.buttonContinueSearch.click();
        yield page_1.default.mainArea.tracesPanel.log.buttonStopSearch.waitForDisplayed();
        yield page_1.default.mainArea.tracesPanel.log.buttonStopSearch.click();
        yield page_1.default.mainArea.tracesPanel.log.buttonContinueSearch.click();
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
    }));
    it("Stop and resume search when 15000 traces available and there are search results, [@extended, @medium, @jira(BLMBMON-18228)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const results1 = yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray();
        const searchQuery = utils_1.regexpMap[const_1.ExtractorType.Id](results1[0]);
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue(searchQuery);
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        yield page_1.default.mainArea.tracesPanel.log.buttonContinueSearch.click();
        yield page_1.default.mainArea.tracesPanel.log.buttonStopSearch.waitForDisplayed();
        yield page_1.default.mainArea.tracesPanel.log.buttonStopSearch.click();
        yield page_1.default.mainArea.tracesPanel.log.buttonContinueSearch.click();
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisappear();
        (0, utils_1.expectArrayIncludes)(yield page_1.default.mainArea.tracesPanel.log.logData.getTextArray(), searchQuery);
    }));
    it("Stop search if no matching results before, [@extended, @medium, @jira(BLMBMON-17228)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.setInputValue("asdaa");
        yield page_1.default.mainArea.tracesPanel.log.spinner.waitForDisplayed();
        yield page_1.default.mainArea.tracesPanel.log.buttonStopSearch.click();
        yield page_1.default.mainArea.tracesPanel.log.buttonContinueSearch.checkIfDisplayed();
        (0, utils_1.expectLabelWorksAgainstRegexp)(yield page_1.default.mainArea.tracesPanel.log.noResultsLabel.getText());
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.searchInput.getInputValue(), "asdaa");
    }));
    it("Search field ghost text, [@extended, @low, @jira(BLMBMON-16477)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.mainArea.tracesPanel.searchInput.click();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.searchInput.isStateEqual("active", true), true);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.searchInput.getBorderColor(), const_1.lightBlueColor);
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.tracesPanel.searchInput.getPlaceholder(), "Search in traces");
    }));
});
