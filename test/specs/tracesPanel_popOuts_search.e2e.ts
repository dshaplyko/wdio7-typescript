import { searchQuery, defaultQuery, ExtractorType, lightBlueColor, orangeColor } from "../config/const";
import {
  expectArrayIncludes,
  regexpMap,
  expectLabelWorksAgainstRegexp,
  expectEquality,
  expectElementIncludesText,
  expectArraysEqual,
} from "../utils";
import Page from "../pageobjects/page";

describe("Traces panel_Pop-outs_Search", () => {
  beforeEach(async () => {
    Page.openPage("/");
    await Page.leftPanel.buildGraph.textArea.setInputValue(`${defaultQuery},option_key=10000`);
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(false);
    await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
  });

  it("Search results correctness, [@smoke, @critical, @jira(BLMBMON-16723)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("Symbol");
    await Page.mainArea.tracesPanel.log.waitUntilLogContainsQuery("Symbol");
    expectArrayIncludes(await Page.mainArea.tracesPanel.log.logData.getTextArray(), "Symbol");

    await Page.mainArea.tracesPanel.searchInput.buttonClear.click();
    await Page.mainArea.tracesPanel.searchInput.setInputValue("abc");
    await Page.mainArea.tracesPanel.log.waitUntilLogContainsQuery("abc");
    expectArrayIncludes(await Page.mainArea.tracesPanel.log.logData.getTextArray(), "abc");
  });

  it("Search keyword with spaces and special symbols, [@criticalPath, @high, @jira(BLMBMON-18235)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue(searchQuery);
    await Page.mainArea.tracesPanel.log.waitUntilLogContainsQuery(searchQuery);
    expectArrayIncludes(await Page.mainArea.tracesPanel.log.logData.getTextArray(), searchQuery);
  });

  it("No matches_Up to 10000 available traces, [@criticalPath, @high, @jira(BLMBMON-17914)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("asdasdasdasd");
    await Page.mainArea.tracesPanel.log.noResultsLabel.waitForExist();
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
    expectEquality(await Page.mainArea.tracesPanel.log.noResultsLabel.getText(), "No matches");
  });

  it("No matches_Editing search to get no matches instead of search results, [@criticalPath, @high, @jira(BLMBMON-15317)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("FN10");
    await Page.mainArea.tracesPanel.log.waitUntilLogContainsQuery("FN10");
    expectArrayIncludes(await Page.mainArea.tracesPanel.log.logData.getTextArray(), "FN10");

    await Page.mainArea.tracesPanel.searchInput.setInputValue("asd");
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
  });

  it("No matches_Stop and resume search when 10000 traces available, [@criticalPath, @high, @jira(BLMBMON-15317), @jira(BLMBMON-15297)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("asda");
    await Page.mainArea.tracesPanel.log.spinner.waitForDisplayed();
    await Page.mainArea.tracesPanel.log.buttonStopSearch.click();
    await Page.mainArea.tracesPanel.log.buttonContinueSearch.click();
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
  });

  it("'X' button, [@extended, @low, @jira(BLMBMON-16480)]", async () => {
    const initialResults: string[] = await Page.mainArea.tracesPanel.log.logData.getTextArray();
    await Page.mainArea.tracesPanel.searchInput.setInputValue("asdasd");
    await Page.mainArea.tracesPanel.log.noResultsLabel.waitForDisplayed();
    await Page.mainArea.tracesPanel.searchInput.buttonClear.click();
    await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
    const results: string[] = await Page.mainArea.tracesPanel.log.logData.getTextArray();
    expectArraysEqual(initialResults, results);
  });

  it("Search results highlighting, [@extended, @low, @jira(BLMBMON-16725)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("FN10");
    await Page.mainArea.tracesPanel.log.waitUntilLogContainsQuery("FN10");
    const highlightedText: string[] = await Page.mainArea.tracesPanel.log.highlightedText.getElementsBackgroundColors();
    expectArrayIncludes(highlightedText, orangeColor);
  });

  it("Download button when no search results, [@extended, @low, @jira(BLMBMON-17765)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("asdasd");
    await Page.mainArea.tracesPanel.log.noResultsLabel.waitForDisplayed();
    expectEquality(await Page.mainArea.tracesPanel.buttonDownload.isButtonDisabled(), true);
  });
});

describe("Traces panel_Pop-outs_Search_No Matches with 20000 results", () => {
  beforeEach(async () => {
    Page.openPage("/");
    await Page.leftPanel.buildGraph.textArea.setInputValue(`${defaultQuery},option_key=20000`);
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(false);
    await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
  });

  it("Continue search until all traces are loaded, [@extended, @medium, @jira(BLMBMON-17916)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("asdasd");
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
    await Page.mainArea.tracesPanel.log.buttonContinueSearch.click();
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
  });

  it("Hidden no matches if there is a search result, [@extended, @medium, @jira(BLMBMON-17918)]", async () => {
    const results1: string[] = await Page.mainArea.tracesPanel.log.logData.getTextArray();
    const searchQuery: string = regexpMap[ExtractorType.Id](results1[0]);

    await Page.mainArea.tracesPanel.searchInput.setInputValue(searchQuery);
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    expectArrayIncludes(await Page.mainArea.tracesPanel.log.logData.getTextArray(), searchQuery);

    await Page.mainArea.tracesPanel.log.buttonContinueSearch.click();
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    expectArrayIncludes(await Page.mainArea.tracesPanel.log.logData.getTextArray(), searchQuery);
  });

  it("Editing search to get no matches instead of no matches in 10000 traces, [@extended, @medium, @jira(BLMBMON-17921)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("asd");
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    expectElementIncludesText(
      await Page.mainArea.tracesPanel.log.noResultsLabel.getText(),
      "No matches in 10000 traces"
    );

    await Page.mainArea.tracesPanel.searchInput.setInputValue("asd");
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
    expectEquality(await Page.mainArea.tracesPanel.log.noResultsLabel.getText(), "No matches");
  });

  it("Editing search to get no matches instead of no matches, [@extended, @medium, @jira(BLMBMON-17925)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("asd");
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();

    await Page.mainArea.tracesPanel.searchInput.setInputValue("asd");
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
    await Page.mainArea.tracesPanel.searchInput.setInputValue("qweqweqwe");
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
    await Page.mainArea.tracesPanel.log.spinner.checkIfExists(false);
  });

  it("Editing search to get search results instead of no matches, [@extended, @medium, @jira(BLMBMON-17926)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("asd");
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();

    await Page.mainArea.tracesPanel.searchInput.setInputValue("asd");
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
    await Page.mainArea.tracesPanel.searchInput.buttonClear.click();
    await Page.mainArea.tracesPanel.searchInput.setInputValue("FN10");
    await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
    expectArrayIncludes(await Page.mainArea.tracesPanel.log.logData.getTextArray(), "FN10");
  });

  it("Continue search_Stop and resume search when at least 11000 traces available, [@extended, @medium, @jira(BLMBMON-18223)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("asdaa");
    await Page.mainArea.tracesPanel.log.buttonContinueSearch.waitForDisplayed();
    await Page.mainArea.tracesPanel.log.buttonContinueSearch.click();
    await Page.mainArea.tracesPanel.log.buttonStopSearch.waitForDisplayed();
    await Page.mainArea.tracesPanel.log.buttonStopSearch.click();
    await Page.mainArea.tracesPanel.log.buttonContinueSearch.click();
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    await Page.mainArea.tracesPanel.log.noResultsLabel.checkIfDisplayed();
  });

  it("Stop and resume search when 15000 traces available and there are search results, [@extended, @medium, @jira(BLMBMON-18228)]", async () => {
    const results1: string[] = await Page.mainArea.tracesPanel.log.logData.getTextArray();
    const searchQuery: string = regexpMap[ExtractorType.Id](results1[0]);

    await Page.mainArea.tracesPanel.searchInput.setInputValue(searchQuery);
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    await Page.mainArea.tracesPanel.log.buttonContinueSearch.click();
    await Page.mainArea.tracesPanel.log.buttonStopSearch.waitForDisplayed();
    await Page.mainArea.tracesPanel.log.buttonStopSearch.click();
    await Page.mainArea.tracesPanel.log.buttonContinueSearch.click();
    await Page.mainArea.tracesPanel.log.spinner.waitForDisappear();
    expectArrayIncludes(await Page.mainArea.tracesPanel.log.logData.getTextArray(), searchQuery);
  });

  it("Stop search if no matching results before, [@extended, @medium, @jira(BLMBMON-17228)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.setInputValue("asdaa");
    await Page.mainArea.tracesPanel.log.spinner.waitForDisplayed();
    await Page.mainArea.tracesPanel.log.buttonStopSearch.click();
    await Page.mainArea.tracesPanel.log.buttonContinueSearch.checkIfDisplayed();
    expectLabelWorksAgainstRegexp(await Page.mainArea.tracesPanel.log.noResultsLabel.getText());
    expectEquality(await Page.mainArea.tracesPanel.searchInput.getInputValue(), "asdaa");
  });

  it("Search field ghost text, [@extended, @low, @jira(BLMBMON-16477)]", async () => {
    await Page.mainArea.tracesPanel.searchInput.click();
    expectEquality(await Page.mainArea.tracesPanel.searchInput.isStateEqual("active", true), true);
    expectEquality(await Page.mainArea.tracesPanel.searchInput.getBorderColor(), lightBlueColor);
    expectEquality(await Page.mainArea.tracesPanel.searchInput.getPlaceholder(), "Search in traces");
  });
});
