import { Values, defaultQuery, nodeInfoItems, colorLegendOptions } from "../config/const";
import { expectElementIncludesText, expectEquality } from "../utils";
import Page from "../pageobjects/page";
import {
  expectArraysEqual,
  getNodesFromTheResponse,
  expectArrayIncludesItemsFromArray,
  expectArrayFilled,
  expectArrayContainsItem,
} from "../utils";

describe("Graph building", () => {
  beforeEach(async () => {
    Page.openPage("/");
  });

  it("Node info, [@smoke, @critical, @jira(BLMBMON-10883)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.mainArea.graph.waitForExist();
    await Page.mainArea.clickGraphNode();
    await Page.mainArea.nodeInfo.checkIfDisplayed();

    const infoListItems: string[] = await Page.mainArea.nodeInfo.infoListItems.getTextArray();
    const infoListContents: string[] = await Page.mainArea.nodeInfo.infoListContents.getTextArray();
    expectArraysEqual(infoListItems, nodeInfoItems);
    expectArrayFilled(infoListContents);
  });

  it("Node unselect, [@criticalPath, @high, @jira(BLMBMON-10885)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.mainArea.graph.waitForExist();
    await Page.mainArea.clickGraphNode();
    await Page.mainArea.nodeInfo.checkIfExists();

    await Page.mainArea.clickOutsideGraph();
    await Page.mainArea.nodeInfo.checkIfExists(false);
  });

  it("Clicked node inclusion into the all nodes list, [@criticalPath, @high, @jira(BLMBMON-9731)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.mainArea.graph.waitForExist();
    await Page.mainArea.clickGraphNode();
    await Page.leftPanel.fetchTraces.nodesDropdown.click();
    const defaultNodes: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
    const nodeName: string = (await Page.mainArea.nodeInfo.infoListContents.getTextArray())[1];
    expectArrayContainsItem(defaultNodes, nodeName);
  });

  it("Node info popup closure, [@extended, @medium, @jira(BLMBMON-10884)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.mainArea.graph.waitForExist();
    await Page.mainArea.clickGraphNode();
    await Page.mainArea.nodeInfo.buttonClose.click();
    await Page.mainArea.nodeInfo.checkIfExists(false);
  });

  it("Color legend - order of node types, [@extended, @low, @jira(BLMBMON-10950)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.mainArea.graph.waitForExist();
    await Page.mainArea.colorLegend.click();
    const legend: string[] = await Page.mainArea.colorLegend.options.getTextArray();
    expectArrayIncludesItemsFromArray(colorLegendOptions, legend);
  });

  it("Graph view, [@smoke, @critical, @jira(BLMBMON-10871)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.mainArea.graph.waitForExist();
    await Page.mainArea.graph.checkIfDisplayed();
    expectEquality(await Page.leftPanel.order.buttonVerticalOrder.isButtonSelected(), true);
    expectEquality(await Page.leftPanel.order.buttonHorizontalOrder.isButtonSelected(), false);
  });

  it("Invalid values, [@criticalPath, @high, @jira(BLMBMON-10867)]", async () => {
    const nodes1: string[] = await getNodesFromTheResponse("security=aaa");
    const nodes2: string[] = await getNodesFromTheResponse("security=response_1");
    expectArraysEqual(nodes1, nodes2);
  });

  it("Correct first parameter + value, second invalid, [@criticalPath, @high, @jira(BLMBMON-10868)]", async () => {
    const nodes1: string[] = await getNodesFromTheResponse(defaultQuery);
    const nodes2: string[] = await getNodesFromTheResponse(`${defaultQuery}, fdkgk=@#$%43G`);
    expectArraysEqual(nodes1, nodes2);
  });

  it("Correct first and second parameters + values, third invalid parameter, [@criticalPath, @high, @jira(BLMBMON-10869)]", async () => {
    const nodes1: string[] = await getNodesFromTheResponse(`${defaultQuery}, tvi_trace=6473726354`);
    const nodes2: string[] = await getNodesFromTheResponse(`${defaultQuery}, tvi_trace=6473726354, fdkgk=@#$%43G`);
    expectArraysEqual(nodes1, nodes2);
  });

  it("Correct first and second parameters + values, third valid parameter + invalid value, [@criticalPath, @high, @jira(BLMBMON-10870)]", async () => {
    const nodes1: string[] = await getNodesFromTheResponse(
      `${defaultQuery}, tvi_trace=6473726354, security=response_1`
    );
    const nodes2: string[] = await getNodesFromTheResponse(`${defaultQuery}, tvi_trace=6473726354, security=@#$%43G`);
    expectArraysEqual(nodes1, nodes2);
  });

  it("Color legend default view, [@criticalPath, @high, @jira(BLMBMON-10877)]", async () => {
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    expectEquality(await Page.mainArea.colorLegend.isCollapsed(), true);
  });

  it("Color legend popup view, [@criticalPath, @high, @jira(BLMBMON-10878)]", async () => {
    /**
     * Get returned nodes
     */
    const nodes: string[] = await getNodesFromTheResponse(defaultQuery);

    /*
     * Review color options and compare them with nodes
     */
    await Page.leftPanel.buildGraph.textArea.setInputValue(defaultQuery);
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.mainArea.colorLegend.click();
    expectEquality(await Page.mainArea.colorLegend.isCollapsed(), false);

    const colorOptions: string[] = await Page.mainArea.colorLegend.options.getTextArray();
    expectArrayIncludesItemsFromArray(nodes, colorOptions);
  });

  describe("UI related scenarios", () => {
    beforeEach(async () => {
      await Page.leftPanel.buildGraph.textArea.setInputValue(defaultQuery);
      await Page.leftPanel.buildGraph.buttonLoadData.click();
    });

    it("Show path through node default state, [@criticalPath, @high, @jira(BLMBMON-10881)]", async () => {
      await Page.mainArea.graph.waitForExist();
      await Page.header.buttonShowPath.checkIfDisplayed();
    });

    it("Show path through node ON, [@criticalPath, @high, @jira(BLMBMON-10882)]", async () => {
      await Page.mainArea.graph.waitForExist();
      expectElementIncludesText(await Page.getCurrentUrl(), "show_path=false");

      await Page.header.buttonShowPath.click();
      expectElementIncludesText(await Page.getCurrentUrl(), "show_path=true");
    });

    it("Hierarchical view reset, [@extended, @medium, @jira(BLMBMON-10974)]", async () => {
      await Page.leftPanel.order.buttonHorizontalOrder.click();
      await Page.mainArea.spinner.waitForDisplayed(true);
      await Page.leftPanel.buildGraph.buttonExpand.click();
      await Page.leftPanel.buildGraph.buttonLoadData.click();
      await Page.mainArea.spinner.waitForDisplayed(true);
      expectEquality(await Page.leftPanel.order.buttonVerticalOrder.isButtonSelected(), true);
    });
  });
});
