import { defaultQuery, ExtractorType } from "../config/const";
import {
  verifyDatesValid,
  expectArrayIncludesItemsFromArray,
  expectElementIncludesText,
  expectEquality,
  generateFileName,
  readFile,
} from "../utils";
import Page from "../pageobjects/page";

describe("Traces panel", () => {
  let selectedNodes: string[];

  beforeEach(async () => {
    Page.openPage("/");
    await Page.leftPanel.buildGraph.textArea.setInputValue(defaultQuery);
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    selectedNodes = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(false);
    await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
  });

  it("Expanded panel view, [@smoke, @critical, @jira(BLMBMON-14257)]", async () => {
    expectEquality(await Page.mainArea.tracesPanel.title.parseNumber(), 1);
    expectElementIncludesText(await Page.mainArea.tracesPanel.title.getText(), "TRACES");
    await Page.mainArea.tracesPanel.buttonTrash.checkIfDisplayed();
    await Page.mainArea.tracesPanel.buttonCollapse.checkIfDisplayed();
    await Page.mainArea.tracesPanel.tabsPanel.tabs.checkIfDisplayed();
    await Page.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.checkIfDisplayed();
  });

  it("Tab content, [@smoke, @critical, @jira(BLMBMON-14260)]", async () => {
    await Page.mainArea.tracesPanel.dateStart.checkIfDisplayed();
    await Page.mainArea.tracesPanel.timeStart.checkIfDisplayed();
    await Page.mainArea.tracesPanel.dateEnd.checkIfDisplayed();
    await Page.mainArea.tracesPanel.timeEnd.checkIfDisplayed();
    await Page.mainArea.tracesPanel.searchInput.checkIfDisplayed();
    await Page.mainArea.tracesPanel.buttonDownload.checkIfDisplayed();
    await Page.mainArea.tracesPanel.buttonPopOut.checkIfDisplayed();
  });

  it("Tab content_Log format, [@criticalPath, @high, @jira(BLMBMON-14262)]", async () => {
    const timeStamps: string[] = await Page.mainArea.tracesPanel.log.timeStamps.getTextArray();
    verifyDatesValid(timeStamps);
  });

  it("Tab content_Period update, [@criticalPath, @high, @jira(BLMBMON-14263)]", async () => {
    const timeStart: string = await Page.mainArea.tracesPanel.timeStart.getText();
    const timeEnd: string = await Page.mainArea.tracesPanel.timeEnd.getText();
    const dateFrom: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
    const dateTo: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
    expectElementIncludesText(dateFrom, timeStart);
    expectElementIncludesText(dateTo, timeEnd);

    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.modal.buttonOverwrite.click();
    await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
    const timeStartNew: string = await Page.mainArea.tracesPanel.timeStart.getText();
    const timeEndNew: string = await Page.mainArea.tracesPanel.timeEnd.getText();
    const dateFromNew: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
    const dateToNew: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();

    expectElementIncludesText(dateFromNew, timeStartNew);
    expectElementIncludesText(dateToNew, timeEndNew);
  });

  it("Tab content_Period update+some new nodes, [@criticalPath, @high, @jira(BLMBMON-14478)]", async () => {
    /**
     *  Select node(s) in Fetch traces section.
     *  Push 'Fetch' button.
     */
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    /**
     * Pop-out some nodes tabs.
     */
    await Page.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.clickByIndex(1);
    const timeStart: string = await Page.mainArea.tracesPanel.timeStart.getText();
    const timeEnd: string = await Page.mainArea.tracesPanel.timeEnd.getText();
    let tabsCount: number = await Page.mainArea.tracesPanel.tabsPanel.tabs.getElementsCount();
    expectEquality(tabsCount, 1);
    /**
     * Add some nodes and change period.
     * Fetch
     * Skip overwriting.
     */
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.modal.buttonSkip.click();
    const timeStartSkipped: string = await Page.mainArea.tracesPanel.timeStart.getText();
    const timeEndSkipped: string = await Page.mainArea.tracesPanel.timeEnd.getText();
    tabsCount = await Page.mainArea.tracesPanel.tabsPanel.tabs.getElementsCount();
    expectEquality(tabsCount, 3);
    expectEquality(timeStart, timeStartSkipped);
    expectEquality(timeEnd, timeEndSkipped);
    /**
     * Change period
     * Confirm overwriting
     */
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.modal.buttonOverwrite.click();
    const timeStartConfirmed: string = await Page.mainArea.tracesPanel.timeStart.getText();
    const timeEndConfirmed: string = await Page.mainArea.tracesPanel.timeEnd.getText();
    tabsCount = await Page.mainArea.tracesPanel.tabsPanel.tabs.getElementsCount();
    expectEquality(tabsCount, 3);
    expectEquality(timeStart, timeStartConfirmed, true);
    expectEquality(timeEnd, timeEndConfirmed, true);
  });

  it("Collapsed panel view, [@criticalPath, @high, @jira(BLMMON-14266)]", async () => {
    expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), true);

    await Page.mainArea.tracesPanel.buttonCollapse.click();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(true);
    expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), false);
    expectElementIncludesText(await Page.mainArea.tracesPanel.title.getText(), "TRACES");
    expectEquality(await Page.mainArea.tracesPanel.title.parseNumber(), 1);
    await Page.mainArea.tracesPanel.buttonTrash.checkIfDisplayed();
    await Page.mainArea.tracesPanel.buttonCollapse.checkIfDisplayed();
    await Page.mainArea.tracesPanel.tabsPanel.tabs.checkIfDisplayed();
    await Page.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.checkIfDisplayed();
  });

  it("Context menu options for download button, [@criticalPath, @high, @jira(BLMBMON-14258)]", async () => {
    await Page.mainArea.tracesPanel.buttonDownload.click();
    const options: string[] = await Page.mainArea.tracesPanel.downloadOptions.getTextArray();
    expectArrayIncludesItemsFromArray(options, ["json", "csv"]);
  });

  it("'Clear traces' modal - 'Clear' button, [@criticalPath, @high, @jira(BLMBMON-14277)]", async () => {
    await Page.mainArea.tracesPanel.checkIfExists();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(false);
    await Page.mainArea.tracesPanel.buttonTrash.click();
    await Page.modal.waitForExist();
    await Page.modal.buttonClear.click();
    await Page.mainArea.tracesPanel.checkIfExists(false);
    const selectedItems: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
    expectEquality(selectedItems[0], selectedNodes[0]);
  });

  it("'Clear traces' modal - 'Cancel' button, [@criticalPath, @high, @jira(BLMBMON-14278)]", async () => {
    await Page.mainArea.tracesPanel.checkIfExists();
    await Page.mainArea.tracesPanel.buttonTrash.click();
    await Page.modal.waitForExist();
    await Page.modal.buttonCancel.click();
    await Page.mainArea.tracesPanel.checkIfExists();
    const selectedItems: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
    expectEquality(selectedItems[0], selectedNodes[0]);
  });

  it("Overwriting_Changing period and canceling overwrite, [@criticalPath, @high, @jira(BLMBMON-14424), @jira(BLMBMON-14053)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.clickByIndex(1);
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.modal.buttonSkip.click();
    const tabsCount = await Page.mainArea.tracesPanel.tabsPanel.tabs.getElementsCount();
    expectEquality(tabsCount, 2);
  });

  it("Overwriting_Changing period and confirming overwrite, [@criticalPath, @high, @jira(BLMBMON-14422)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.clickByIndex(1);
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.modal.buttonOverwrite.click();
    const tabsCount = await Page.mainArea.tracesPanel.tabsPanel.tabs.getElementsCount();
    expectEquality(tabsCount, 2);
  });

  it("Panel state after data rerequesting without overwrite, [@extended, @medium, @jira(BLMBMON-14267), @jira(BLMBMON-17842)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
    expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), true);

    await Page.mainArea.tracesPanel.buttonCollapse.click();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(true);
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(false);
    expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), true);
  });

  it("Tabs quantity, [@extended, @medium, @jira(BLMBMON-14270)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
    expectEquality(await Page.mainArea.tracesPanel.title.parseNumber(), 2);

    await Page.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.clickByIndex(1);
    expectEquality(await Page.mainArea.tracesPanel.title.parseNumber(), 1);
  });

  it("Clear traces pop-up format, [@extended, @medium, @jira(BLMBMON-14276)]", async () => {
    await Page.mainArea.tracesPanel.buttonTrash.click();
    await Page.modal.waitForExist();
    await Page.modal.buttonClear.checkIfDisplayed();
    await Page.modal.buttonCancel.checkIfDisplayed();
    expectEquality(await Page.modal.content.getText(), "Clear traces history?");
  });

  it("Overwrite confirmation_Pop-up view, [@extended, @medium, @jira(BLMBMON-14420)]", async () => {
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.modal.buttonOverwrite.checkIfDisplayed();
    await Page.modal.buttonSkip.checkIfDisplayed();
    expectEquality(await Page.modal.content.getText(), "Overwrite existing traces for new period?");
  });

  it("Overwrite confirmation_Panel State_Expanded panel+Confirm overwrite, [@extended, @medium, @jira(BLMBMON-14429)]", async () => {
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), true);
  });

  it("Clicking a tab on collapsed panel, [@extended, @medium, @jira(BLMBMON-14501)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
    expectEquality(await Page.mainArea.tracesPanel.tabsPanel.isTabActive(2), true);

    await Page.mainArea.tracesPanel.buttonCollapse.click();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(true);
    await Page.mainArea.tracesPanel.tabsPanel.tabs.clickByIndex(1);
    await Page.mainArea.tracesPanel.tabsPanel.waitUntilActive(1);
    await Page.mainArea.tracesPanel.waitUntilCollapsed(false);
    expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), true);
    expectEquality(await Page.mainArea.tracesPanel.tabsPanel.isTabActive(1), true);
  });

  it("Clicking a tab on collapsed panel after panel reopening, [@extended, @medium, @jira(BLMBMON-17888)]", async () => {
    await Page.mainArea.tracesPanel.buttonTrash.click();
    await Page.modal.waitForExist();
    await Page.modal.buttonClear.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.buttonCollapse.click();
    await Page.mainArea.tracesPanel.tabsPanel.tabs.clickByIndex(1);
    await Page.mainArea.tracesPanel.tabsPanel.waitUntilActive(1);
    expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), true);
    expectEquality(await Page.mainArea.tracesPanel.tabsPanel.isTabActive(1), true);

    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.buttonCollapse.click();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(true);
    await Page.mainArea.tracesPanel.tabsPanel.tabs.clickByIndex(1);
    await Page.mainArea.tracesPanel.waitUntilCollapsed(false);
    await Page.mainArea.tracesPanel.tabsPanel.waitUntilActive(1);
    expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), true);
    expectEquality(await Page.mainArea.tracesPanel.tabsPanel.isTabActive(1), true);
  });

  it("Many tabs_Shortened tabs, [@extended, @medium, @jira(BLMBMON-14679)]", async () => {
    await Page.mainArea.tracesPanel.tabsPanel.navigationController.checkIfExists(false);
    await Page.leftPanel.fetchTraces.nodesDropdown.addSeveralItems(9);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.checkIfDisplayed(false);
    await Page.mainArea.tracesPanel.tabsPanel.navigationController.checkIfDisplayed();
  });

  it("Panel state after panel reopening, [@extended, @medium, @jira(BLMBMON-17889)]", async () => {
    await Page.mainArea.tracesPanel.buttonTrash.click();
    await Page.modal.waitForExist();
    await Page.modal.buttonClear.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(false);
    expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), true);
  });

  it("Panel state after panel reopening with new nodes, [@extended, @medium, @jira(BLMBMON-17890)]", async () => {
    await Page.mainArea.tracesPanel.buttonTrash.click();
    await Page.modal.waitForExist();
    await Page.modal.buttonClear.click();
    await Page.leftPanel.fetchTraces.nodesDropdown.addSeveralItems(3);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(false);
    expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), true);
  });

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
    it(`${type} log download+downloaded file data correctness, [@extended, @low, @jira(BLMBMON-14259)]`, async () => {
      await Page.mainArea.tracesPanel.searchInput.setInputValue("FN10");
      await Page.mainArea.tracesPanel.log.waitUntilLogContainsQuery("FN10");
      const results: string[] = await Page.mainArea.tracesPanel.log.logData.getTextArray();
      await Page.mainArea.tracesPanel.buttonDownload.click();
      await Page.mainArea.tracesPanel.downloadOptions.clickByIndex(index);

      const fileName: string = generateFileName(
        await Page.mainArea.tracesPanel.tabsPanel.tabs.getTextByIndex(1),
        await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue(ExtractorType.Date),
        await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue(),
        type
      );
      const data = await readFile(fileName);
      const fileContent: string[] = data.map(({ data }) => data);
      expectArrayIncludesItemsFromArray(fileContent, results);
    });
  });
});
