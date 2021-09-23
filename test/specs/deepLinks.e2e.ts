import { expectArraysEqual, decodeUrl, expectElementIncludesText, expectEquality } from "../utils";
import { defaultQuery, ExtractorType } from "../config/const";
import Page from "../pageobjects/page";

describe("Deep links", () => {
  beforeEach(async () => Page.openPage("/"));

  describe("URL", () => {
    it("Save the query with 1 parameter, [@criticalPath, @high, @jira(BLMBMON-10967)]", async () => {
      await Page.leftPanel.buildGraph.textArea.setInputValue(defaultQuery);
      await Page.leftPanel.buildGraph.buttonLoadData.click();
      await Page.refreshPage();
      await Page.mainArea.graph.waitForExist();
      const currentUrl: string = await Page.getDecodedUrl();

      expectElementIncludesText(currentUrl, defaultQuery);
      await Page.mainArea.graph.checkIfDisplayed();
    });

    it("Save the query with multiple parameters, [@criticalPath, @high, @jira(BLMBMON-10968)]", async () => {
      const searchQuery2: string = "tvi_trace=6473726354";
      const searchQuery3: string = "security=response_1";
      await Page.leftPanel.buildGraph.textArea.setInputValue(`${defaultQuery},${searchQuery2},${searchQuery3}`);
      await Page.leftPanel.buildGraph.buttonLoadData.click();
      await Page.refreshPage();
      await Page.mainArea.graph.waitForExist();
      const currentUrl: string = await Page.getDecodedUrl();

      expectElementIncludesText(currentUrl, [defaultQuery, searchQuery2, searchQuery3]);
      await Page.mainArea.graph.checkIfDisplayed();
    });

    it("Copy URL - button view, [@extended, @medium, @jira(BLMBMON-10964)]", async () => {
      await Page.header.buttonCopyUrl.checkIfDisplayed();

      await Page.leftPanel.buildGraph.textArea.setInputValue(defaultQuery);
      await Page.leftPanel.buildGraph.buttonLoadData.click();
      await Page.mainArea.graph.waitForExist();
      await Page.header.buttonCopyUrl.checkIfDisplayed();
    });

    it("Save graph view and direction, [@extended, @medium, @jira(BLMBMON-10968)]", async () => {
      await Page.leftPanel.buildGraph.textArea.setInputValue(defaultQuery);
      await Page.leftPanel.buildGraph.buttonLoadData.click();
      await Page.refreshPage();
      await Page.mainArea.graph.waitForExist();
      expectElementIncludesText(await Page.getDecodedUrl(), "hierarchicalUD");

      await Page.leftPanel.order.buttonHorizontalOrder.click();
      await Page.mainArea.spinner.waitForExist(true);
      await Page.refreshPage();
      await Page.mainArea.graph.waitForExist();
      expectElementIncludesText(await Page.getDecodedUrl(), "hierarchicalLR");
    });

    it("Save selected node and info pop-up state, [@extended, @medium, @jira(BLMBMON-10970)]", async () => {
      await Page.leftPanel.buildGraph.textArea.setInputValue(defaultQuery);
      await Page.leftPanel.buildGraph.buttonLoadData.click();
      await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
      await Page.leftPanel.fetchTraces.buttonFetch.click();
      await Page.refreshPage();
      await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
      await Page.mainArea.tracesPanel.waitUntilCollapsed(false);
      expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), true);

      await Page.mainArea.tracesPanel.buttonCollapse.click();
      await Page.refreshPage();
      await Page.mainArea.graph.waitForExist();
      await Page.mainArea.tracesPanel.waitUntilCollapsed(true);
      expectEquality(await Page.mainArea.tracesPanel.isPanelExpanded(), false);
    });

    it("Copy URL -button functioning_with saved selected node, [@extended, @medium, @jira(BLMBMON-10971)]", async () => {
      await Page.leftPanel.buildGraph.textArea.setInputValue(defaultQuery);
      await Page.leftPanel.buildGraph.buttonLoadData.click();
      await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
      const selectedItems: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();

      await Page.leftPanel.fetchTraces.buttonFetch.click();
      await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
      await Page.header.buttonCopyUrl.click();
      await Page.header.copyTooltip.waitForDisplayed();
      await Page.mainArea.tracesPanel.searchInput.pasteFromClipboard();
      const pastedUrl: string = decodeUrl(await Page.mainArea.tracesPanel.searchInput.getInputValue());
      expectElementIncludesText(pastedUrl, selectedItems[0]);
    });

    it("Closing tabs, [@extended, @medium, @jira(BLMBMON-14646)]", async () => {
      await Page.leftPanel.buildGraph.textArea.setInputValue(defaultQuery);
      await Page.leftPanel.buildGraph.buttonLoadData.click();
      await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
      await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
      const selectedItems: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();

      await Page.leftPanel.fetchTraces.buttonFetch.click();
      await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
      await Page.mainArea.tracesPanel.tabsPanel.buttonsCloseTab.clickByIndex(2);
      await Page.refreshPage();
      await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
      expectElementIncludesText(await Page.getDecodedUrl(), `${selectedItems[0]}_T_`);
      expectElementIncludesText(await Page.getDecodedUrl(), `${selectedItems[1]}_T_`, true);
    });
  });

  describe("Left Panel and Traces Panel", () => {
    beforeEach(async () => {
      await Page.leftPanel.buildGraph.textArea.setInputValue(defaultQuery);
      await Page.leftPanel.buildGraph.buttonLoadData.click();
    });

    afterEach(async () => {
      await Page.closePopOuts();
    });

    it("URL - start datetime, end datetime, [@criticalPath, @high, @jira(BLMBMON-14519)]", async () => {
      await Page.refreshPage();
      await Page.mainArea.graph.waitForExist();
      const currentUrl: string = await Page.getDecodedUrl();
      const dateStart: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue(ExtractorType.Date);
      const dateEnd: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue();
      expectElementIncludesText(currentUrl, [dateStart, dateEnd]);
    });

    it("URL - URL - list of nodes, [@criticalPath, @high, @jira(BLMBMON-14521)]", async () => {
      await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
      await Page.refreshPage();
      await Page.mainArea.graph.waitForExist();
      const currentUrl: string = await Page.getDecodedUrl();
      const selectedNodes: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();

      expectElementIncludesText(currentUrl, selectedNodes[0]);
    });

    it("URL - active tab, [@criticalPath, @high, @jira(BLMBMON-14524)]", async () => {
      await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
      await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
      await Page.leftPanel.fetchTraces.buttonFetch.click();
      await Page.mainArea.graph.waitForExist();
      const selectedItems: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
      expectElementIncludesText(await Page.getDecodedUrl(), `tr_active=${selectedItems[0]}`);

      await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
      await Page.mainArea.tracesPanel.tabsPanel.tabs.clickByIndex(2);
      await Page.mainArea.tracesPanel.tabsPanel.waitUntilActive(2);
      expectElementIncludesText(await Page.getDecodedUrl(), `tr_active=${selectedItems[1]}`);
    });

    it("URL - Deep link with pop-outs, [@criticalPath, @high, @jira(BLMBMON-14526)]", async () => {
      await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
      await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
      await Page.leftPanel.fetchTraces.buttonFetch.click();
      await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
      const selectedItems: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
      await Page.mainArea.tracesPanel.buttonPopOut.click();
      const currentUrl: string = await Page.getDecodedUrl();

      await Page.openNewWindow();
      await Page.openPage(currentUrl);
      await Page.mainArea.graph.waitForExist();
      const tabs: string[] = await Page.mainArea.tracesPanel.tabsPanel.tabs.getTextArray();
      expectArraysEqual(selectedItems, tabs);
    });

    it("URL - List of tabs, [@criticalPath, @high, @jira(BLMBMON-17893)]", async () => {
      await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
      await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
      await Page.leftPanel.fetchTraces.buttonFetch.click();
      await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
      const selectedItems: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
      const currentUrl: string = await Page.getDecodedUrl();

      await Page.openNewWindow();
      await Page.openPage(currentUrl);
      await Page.mainArea.graph.waitForExist();
      const tabs: string[] = await Page.mainArea.tracesPanel.tabsPanel.tabs.getTextArray();
      expectArraysEqual(selectedItems, tabs);
    });
  });
});
