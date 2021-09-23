import { Values } from "../config/const";
import {
  getTimeInterval,
  verifyDatesValid,
  expectArrayIncludes,
  expectArrayContainsItem,
  expectArraySortedAlphabetically,
  expectArraysEqual,
  expectEquality,
  expectElementIncludesText,
} from "../utils";
import Page from "../pageobjects/page";

describe("Left Panel - Fetch traces section", () => {
  beforeEach(async () => {
    Page.openPage("/");
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
  });

  it("'Fetch' button functioning, [@smoke, @high, @jira(BLMBMON-14243)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(2);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.checkIfDisplayed();

    const selectedItems: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
    const openedTabs: string[] = await Page.mainArea.tracesPanel.tabsPanel.tabs.getTextArray();
    expectArraysEqual(selectedItems, openedTabs);
  });

  it("Nodes field_Content, [@smoke, @critical, @jira(BLMBMON-13942)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.click();
    const firstGraphNodes: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();

    await Page.leftPanel.fetchTraces.nodesDropdown.click();
    await Page.leftPanel.buildGraph.addToQuery(Values.Security, "123");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.leftPanel.fetchTraces.nodesDropdown.click();
    const secondGraphNodes: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
    expectArraysEqual(firstGraphNodes, secondGraphNodes, true);
  });

  it("Default view for loaded graph case, [@criticalPath, @high, @jira(BLMBMON-13934)]", async () => {
    await Page.mainArea.graph.waitForDisplayed();
    await Page.leftPanel.fetchTraces.buttonCalendar.checkIfDisplayed();
    await Page.leftPanel.fetchTraces.buttonFetch.checkIfDisplayed();
    await Page.leftPanel.fetchTraces.inputPeriodFrom.checkIfDisplayed();
    await Page.leftPanel.fetchTraces.inputPeriodTo.checkIfDisplayed();
    await Page.leftPanel.fetchTraces.nodesDropdown.checkIfDisplayed();
    expectEquality(await Page.leftPanel.buildGraph.isExpanded(), false);
    expectEquality(await Page.leftPanel.fetchTraces.isExpanded(), true);
    expectEquality(await Page.leftPanel.fetchTraces.buttonFetch.isButtonDisabled(), true);
  });

  it("Period field_Default value, [@criticalPath, @high, @jira(BLMBMON-14023)]", async () => {
    let dateFrom: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
    let dateTo: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
    expectEquality(getTimeInterval(dateFrom, dateTo), 5);

    await Page.leftPanel.buildGraph.addToQuery(Values.Security, "222");
    await Page.leftPanel.buildGraph.buttonLoadData.click();

    dateFrom = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue();
    dateTo = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
    expectEquality(getTimeInterval(dateFrom, dateTo), 5);
  });

  it("Period field_Validation_Valid values, [@criticalPath, @high, @jira(BLMBMON-13939)]", async () => {
    const dateTo: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
    const dateFrom: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
    verifyDatesValid([dateFrom, dateTo]);
  });

  it("Nodes field_Filtering, [@criticalPath, @high, @jira(BLMBMON-13948)]", async () => {
    /**
     * get default list of nodes
     */
    await Page.leftPanel.fetchTraces.nodesDropdown.click();
    const defaultNodes: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();

    /**
     * execute some search
     */
    await Page.leftPanel.fetchTraces.nodesDropdown.textField.setInputValue("api");
    const newNodes: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
    expectArrayIncludes(newNodes, "api", true);

    /**
     * clear the input
     */
    await Page.leftPanel.fetchTraces.nodesDropdown.textField.clearInputValue();
    await Page.leftPanel.fetchTraces.nodesDropdown.click();
    const purgedNodes: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
    expectArraysEqual(defaultNodes, purgedNodes);

    /**
     * type a non existing value
     */
    await Page.leftPanel.fetchTraces.nodesDropdown.textField.setInputValue("1234");
    expectEquality(await Page.leftPanel.fetchTraces.nodesDropdown.selectMenu.getText(), "No options");
  });

  it("Nodes field_Choosing options, [@criticalPath, @high, @jira(BLMBMON-13949)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    const selectedItem: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
    await Page.leftPanel.fetchTraces.nodesDropdown.click();
    const nodes: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
    expectArrayIncludes(nodes, selectedItem[0], true, false);
  });

  it("Nodes field_Removing an option, [@criticalPath, @high, @jira(BLMBMON-13950)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.nodesDropdown.buttonsClear.clickByIndex(1);
    await Page.leftPanel.fetchTraces.nodesDropdown.buttonsClear.clickByIndex(1);
    expectEquality(await Page.leftPanel.fetchTraces.nodesDropdown.textField.getInputValue(), "");
  });

  it("Nodes field_Removing all options, [@criticalPath, @high, @jira(BLMBMON-13951)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.nodesDropdown.buttonsClear.clickByIndex(1);
    expectEquality(await Page.leftPanel.fetchTraces.nodesDropdown.textField.getInputValue(), "");
  });

  it("Fetch button_Enabled state, [@criticalPath, @high, @jira(BLMBMON-13963)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    expectEquality(await Page.leftPanel.fetchTraces.buttonFetch.isButtonDisabled(), false);
  });

  it("Build graph & Fetch traces sections_Expanding /collapsing sections, [@extended, @medium, @jira(BLMBMON-13935), @jira(BLMBMON-13902)]", async () => {
    await Page.leftPanel.buildGraph.buttonExpand.click();
    expectEquality(await Page.leftPanel.buildGraph.isExpanded(), true);

    await Page.leftPanel.fetchTraces.buttonExpand.click();
    expectEquality(await Page.leftPanel.fetchTraces.isExpanded(), false);
  });

  it("Nodes field_Typing node name, [@extended, @medium, @jira(BLMBMON-13953)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.click();
    const items: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
    await Page.leftPanel.fetchTraces.nodesDropdown.textField.setInputValue(items[0]);
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    expectArrayContainsItem(await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray(), items[0]);
  });

  it("Nodes field_Sorting, [@extended, @medium, @jira(BLMBMON-14009)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.click();
    const items: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
    expectArraySortedAlphabetically(items);
  });

  it("Nodes field_Field after graph reload, [@extended, @medium, @jira(BLMBMON-14662)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.buildGraph.addToQuery(Values.Security, "123");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    expectElementIncludesText(
      await Page.leftPanel.fetchTraces.nodesDropdown.textField.getPlaceholder(),
      global.osType.message
    );
  });

  //TODO: Re-check after styles are fixed
  it.skip("Nodes field_Notification on how to select nodes on graph, [@extended, @low, @jira(BLMBMON-18507), @jira(BLMBMON-18508)]", async () => {
    await Page.leftPanel.fetchTraces.nodeInfoIcon.hover();
    await Page.leftPanel.fetchTraces.toolTip.waitForDisplayed();
    const tooltipText: string = await Page.leftPanel.fetchTraces.toolTip.getText();
    expectElementIncludesText(tooltipText, global.osType.message);
    expectElementIncludesText(tooltipText, global.osType.tooltipMessage);
  });

  it("'Fetch' button_Disabled state_1 from 2 fields is filled, [@extended, @low, @jira(BLMBMON-13977)]", async () => {
    expectEquality(await Page.leftPanel.fetchTraces.buttonFetch.isButtonDisabled(), true);
  });
});
