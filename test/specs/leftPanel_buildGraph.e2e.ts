import { Values, Constants } from "../config/const";
import {
  captureRequest,
  verifyDataflowRequest,
  emulateNetworkError,
  expectArraysEqual,
  expectEquality,
  expectElementIncludesText,
} from "../utils";
import Page from "../pageobjects/page";

describe("Left Panel - Build graph section", () => {
  beforeEach(() => Page.openPage("/"));

  it("Home Page - default view, [@smoke, @critical, @jira(BLMBMON-10824)]", async () => {
    await Page.leftPanel.panel.checkIfDisplayed();
    await Page.leftPanel.logo.checkIfDisplayed();
    await Page.header.buttonCopyUrl.checkIfDisplayed();
    expectEquality(await Page.mainArea.infoMessage.getText(), "Please load data");
  });

  it("Default view, [@smoke, @critical, @jira(BLMBMON-10824)]", async () => {
    await Page.leftPanel.buildGraph.checkIfDisplayed();
    await Page.leftPanel.fetchTraces.checkIfDisplayed();
    await Page.leftPanel.order.checkIfDisplayed();
    await Page.leftPanel.applicationVersion.checkIfDisplayed();
  });

  it("Build graph section default view, [@criticalPath, @high, @jira(BLMBMON-10825)]", async () => {
    expectEquality(await Page.leftPanel.buildGraph.isExpanded(), true);
    expectEquality(await Page.leftPanel.fetchTraces.isExpanded(), false);
    expectEquality(
      await Page.leftPanel.buildGraph.filterDropdown.textField.getPlaceholder(),
      "Type or select parameter"
    );
    expectEquality(await Page.leftPanel.buildGraph.fieldInput.getPlaceholder(), "Enter value");
    expectEquality(await Page.leftPanel.buildGraph.textArea.getPlaceholder(), "Type any parameter");
    await Page.leftPanel.buildGraph.buttonAddToQuery.checkIfDisplayed();
    await Page.leftPanel.buildGraph.buttonClearAll.checkIfDisplayed();
    await Page.leftPanel.buildGraph.buttonLoadData.checkIfDisplayed();
  });

  it("Parameter dropdown options, [@criticalPath, @high, @jira(BLMBMON-10828)]", async () => {
    await Page.leftPanel.buildGraph.filterDropdown.click();
    await Page.leftPanel.buildGraph.filterDropdown.selectMenu.checkIfDisplayed();
    const items: string[] = await Page.leftPanel.buildGraph.filterDropdown.selectMenuItems.getTextArray();
    expectArraysEqual(Constants.dropdownValues, items);
  });

  it("Clearing the data by pressing Bloomberg button, [@criticalPath, @high]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "123");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.mainArea.graph.waitForExist();
    await Page.mainArea.graph.checkIfDisplayed();

    await Page.leftPanel.logo.click();
    await Page.mainArea.graph.checkIfExists(false);
    expectEquality(await Page.leftPanel.buildGraph.textArea.getInputValue(), "");
  });

  it("Collapsed view, [@extended, @low, @jira(BLMBMON-10827)]", async () => {
    await Page.leftPanel.buttonCollapse.click();
    expectEquality(await Page.leftPanel.isSideBarExpanded(), false);

    await Page.leftPanel.buttonCollapse.click();
    expectEquality(await Page.leftPanel.isSideBarExpanded(), true);
  });

  it("Value input field, [@criticalPath, @high, @jira(BLMBMON-10832)]", async () => {
    await Page.leftPanel.buildGraph.filterDropdown.click();
    await Page.leftPanel.buildGraph.filterDropdown.selectMenuItem(Values.ExByte);
    await Page.leftPanel.buildGraph.fieldInput.setInputValue("123");
    expectEquality(await Page.leftPanel.buildGraph.fieldInput.getInputValue(), "123");

    await Page.leftPanel.buildGraph.fieldInput.buttonClear.click();
    expectEquality(await Page.leftPanel.buildGraph.fieldInput.getInputValue(), "");
  });

  it("Clearing dropdown field, [@criticalPath, @high, @jira(BLMBMON-10831)]", async () => {
    await Page.leftPanel.buildGraph.filterDropdown.click();
    await Page.leftPanel.buildGraph.filterDropdown.selectMenuItem(Values.ExByte);
    expectEquality(await Page.leftPanel.buildGraph.filterDropdown.textField.getInputValue(), "ExByte");

    await Page.leftPanel.buildGraph.filterDropdown.buttonsClear.clickByIndex(1);
    expectEquality(await Page.leftPanel.buildGraph.filterDropdown.textField.getInputValue(), "");
  });

  it("Clearing value input field, [@criticalPath, @high, @jira(BLMBMON-10835)]", async () => {
    await Page.leftPanel.buildGraph.fieldInput.setInputValue("123");
    expectEquality(await Page.leftPanel.buildGraph.fieldInput.getInputValue(), "123");

    await Page.leftPanel.buildGraph.fieldInput.buttonClear.click();
    expectEquality(await Page.leftPanel.buildGraph.fieldInput.getInputValue(), "");
  });

  it("Add to query button - both fields filled, [@criticalPath, @high, @jira(BLMBMON-10836)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.ExByte, "123");
    expectElementIncludesText(await Page.leftPanel.buildGraph.textArea.getInputValue(), "exbyte=123");
  });

  it("Add to query button - 1 parameter with 2 values, [@criticalPath, @high, @jira(BLMBMON-10840)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.ExByte, "111");
    await Page.leftPanel.buildGraph.addToQuery(Values.ExByte, "222");
    expectElementIncludesText(await Page.leftPanel.buildGraph.textArea.getInputValue(), ["exbyte=111", "exbyte=222"]);
  });

  it("Add to query button - 2 parameters with different values, [@criticalPath, @high, @jira(BLMBMON-10841)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.addToQuery(Values.Security, "222");
    expectElementIncludesText(await Page.leftPanel.buildGraph.textArea.getInputValue(), ["trace=111", "security=222"]);
  });

  it("Add to query button - 3 parameters, different value, [@criticalPath, @high, @jira(BLMBMON-10842)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.addToQuery(Values.Security, "222");
    await Page.leftPanel.buildGraph.addToQuery(Values.ExByte, "333");
    expectElementIncludesText(await Page.leftPanel.buildGraph.textArea.getInputValue(), [
      "trace=111",
      "security=222",
      "exbyte=333",
    ]);
  });

  it("Correct the query manually, [@criticalPath, @high, @jira(BLMBMON-10843)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.textArea.setInputValue("222");
    expectElementIncludesText(await Page.leftPanel.buildGraph.textArea.getInputValue(), "trace=111222");
  });

  it("Load data button request, [@criticalPath, @high, @jira(BLMBMON-10847)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    Page.leftPanel.buildGraph.buttonLoadData.click();
    const request: any = await captureRequest("/dataflow");
    verifyDataflowRequest(request, "trace=111");
  });

  it("Parameter manual enter+No options, [@extended, @low, @jira(BLMBMON-10829)]", async () => {
    await Page.leftPanel.buildGraph.filterDropdown.textField.setInputValue("EB34YE");
    expectEquality(await Page.leftPanel.buildGraph.filterDropdown.selectMenu.getText(), "No options");

    await Page.leftPanel.buildGraph.fieldInput.click();
    expectEquality(
      await Page.leftPanel.buildGraph.filterDropdown.textField.getPlaceholder(),
      "Type or select parameter"
    );
  });

  it("Sections state when data response returns an error, [@extended, @medium, @jira(BLMBMON-13936)]", async () => {
    await emulateNetworkError("/dataflow", "Failed");
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    expectEquality(await Page.mainArea.infoMessage.getText(), "Please change query");
    expectEquality(await Page.leftPanel.buildGraph.isExpanded(), true);
    expectEquality(await Page.leftPanel.fetchTraces.isExpanded(), false);
  });

  it("Clear all button, [@extended, @medium, @jira(BLMBMON-14510)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonClearAll.click();
    expectEquality(await Page.leftPanel.buildGraph.textArea.getInputValue(), "");
  });

  it("Value input field validation - alphanumeric symbols + special symbols, [@extended, @low, @jira(BLMBMON-10834)]", async () => {
    const query = "1234!@#$";
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, query);
    expectElementIncludesText(await Page.leftPanel.buildGraph.textArea.getInputValue(), query);
  });

  it("Add to query button - empty parameter field, [@extended, @low, @jira(BLMBMON-10837)]", async () => {
    await Page.leftPanel.buildGraph.fieldInput.setInputValue("123");
    await Page.leftPanel.buildGraph.buttonAddToQuery.click();
    expectEquality(await Page.leftPanel.buildGraph.filterDropdown.isStateEqual("invalid"), true);
    expectEquality(await Page.leftPanel.buildGraph.textArea.getInputValue(), "");
  });

  it("Add to query button - empty value input field, [@extended, @low, @jira(BLMBMON-10838)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "");
    expectEquality(await Page.leftPanel.buildGraph.fieldInput.isStateEqual("invalid", true), true);
    expectEquality(await Page.leftPanel.buildGraph.textArea.getInputValue(), "");
  });

  it("Add to query button - both fields empty, [@extended, @low, @jira(BLMBMON-10839)]", async () => {
    await Page.leftPanel.buildGraph.buttonAddToQuery.click();
    expectEquality(await Page.leftPanel.buildGraph.filterDropdown.isStateEqual("invalid"), true);
    expectEquality(await Page.leftPanel.buildGraph.fieldInput.isStateEqual("invalid", true), true);
    expectEquality(await Page.leftPanel.buildGraph.textArea.getInputValue(), "");
  });

  it("'Load data' button - blank query, [@extended, @low, @jira(BLMBMON-10833)]", async () => {
    expectEquality(await Page.leftPanel.buildGraph.buttonLoadData.isButtonDisabled(), true);
  });
});

describe("Left Panel - Order section", () => {
  beforeEach(() => Page.openPage("/"));

  it("Not loaded yet graph, [@extended, @medium, @jira(BLMBMON-10826)]", async () => {
    await Page.leftPanel.order.buttonHorizontalOrder.checkIfDisplayed();
    await Page.leftPanel.order.buttonVerticalOrder.checkIfDisplayed();
    expectEquality(await Page.leftPanel.order.buttonHorizontalOrder.isButtonDisabled(), true);
    expectEquality(await Page.leftPanel.order.buttonVerticalOrder.isButtonDisabled(), true);
  });

  it("Loaded graph, [@extended, @medium, @jira(BLMBMON-10826)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.mainArea.graph.waitForExist();
    expectEquality(await Page.leftPanel.order.buttonHorizontalOrder.isButtonDisabled(), false);
    expectEquality(await Page.leftPanel.order.buttonVerticalOrder.isButtonDisabled(), false);
  });
});
