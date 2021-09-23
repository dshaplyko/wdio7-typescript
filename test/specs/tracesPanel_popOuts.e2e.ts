import { defaultQuery } from "../config/const";
import { expectArrayIncludes, expectElementIncludesText, expectEquality } from "../utils";
import Page from "../pageobjects/page";

describe("Traces panel_Pop-outs", () => {
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
    await Page.mainArea.tracesPanel.buttonPopOut.click();
  });

  afterEach(async () => {
    await Page.closePopOuts();
  });

  it("Should open the Pop Out window, [@smoke, @high]", async () => {
    await Page.switchWindow(2);
    const openedWindows: string[] = await Page.getAllOpenedWindows();
    expectEquality(openedWindows.length, 2);
  });

  it("Overwriting_Changing period and confirming overwrite, [@criticalPath, @high, @jira(BLMBMON-15362)]", async () => {
    const dateFrom: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
    const dateTo: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();

    await Page.switchWindow(2);
    expectElementIncludesText(dateFrom, await Page.tracesPopOut.timeStart.getText());
    expectElementIncludesText(dateTo, await Page.tracesPopOut.timeEnd.getText());

    await Page.switchWindow(1);
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.modal.buttonOverwrite.click();
    const dateFromNew: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
    const dateToNew: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();

    await Page.switchWindow(2);
    expectElementIncludesText(dateFromNew, await Page.tracesPopOut.timeStart.getText());
    expectElementIncludesText(dateToNew, await Page.tracesPopOut.timeEnd.getText());
  });

  it("Overwriting_Changing period and cancelling overwrite, [@criticalPath, @high, @jira(BLMBMON-15361)]", async () => {
    const dateFrom: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
    const dateTo: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();

    await Page.switchWindow(2);
    const timeStart: string = await Page.tracesPopOut.timeStart.getText();
    const timeEnd: string = await Page.tracesPopOut.timeEnd.getText();
    expectElementIncludesText(dateFrom, timeStart);
    expectElementIncludesText(dateTo, timeEnd);

    await Page.switchWindow(1);
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.modal.buttonSkip.click();
    await Page.switchWindow(2);
    const timeStartNew: string = await Page.tracesPopOut.timeStart.getText();
    const timeEndNew: string = await Page.tracesPopOut.timeEnd.getText();
    expectElementIncludesText(dateFrom, timeStartNew);
    expectElementIncludesText(dateTo, timeEndNew);
  });

  it("Overwriting_Changing period and closing confirmation, [@criticalPath, @high, @jira(BLMBMON-14431)]", async () => {
    const dateFrom: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
    const dateTo: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();

    await Page.switchWindow(2);
    const timeStart: string = await Page.tracesPopOut.timeStart.getText();
    const timeEnd: string = await Page.tracesPopOut.timeEnd.getText();
    expectElementIncludesText(dateFrom, timeStart);
    expectElementIncludesText(dateTo, timeEnd);

    await Page.switchWindow(1);
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.modal.buttonClose.click();
    const dateFromNew: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
    const dateToNew: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
    await Page.modal.checkIfExists(false);

    await Page.switchWindow(2);
    const timeStartNew: string = await Page.tracesPopOut.timeStart.getText();
    const timeEndNew: string = await Page.tracesPopOut.timeEnd.getText();
    expectElementIncludesText(dateFromNew, timeStartNew, true);
    expectElementIncludesText(dateToNew, timeEndNew, true);
  });

  it("Adding new nodes+No confirmation if nothing to overwrite, [@extended, @medium, @jira(BLMBMON-14419)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.addSeveralItems(3);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.modal.checkIfExists(false);
    const openedTabs: string[] = await Page.mainArea.tracesPanel.tabsPanel.tabs.getTextArray();
    expectArrayIncludes(openedTabs, selectedNodes[0], false, false);

    await Page.switchWindow(2);
    const tabName: string = await Page.tracesPopOut.panelName.getText();
    expectEquality(tabName, selectedNodes[0]);
  });

  it("Panel state after popping in_Single tab, [@extended, @low, @jira(BLMBMON-17891)]", async () => {
    await Page.switchWindow(2);
    await Page.tracesPopOut.buttonPopIn.click();
    await Page.switchWindow(1, false);
    const openedWindows: string[] = await Page.getAllOpenedWindows();
    expectEquality(openedWindows.length, 1);
    expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), true);
  });
});
