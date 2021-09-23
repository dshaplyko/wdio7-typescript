import { Values, PostData } from "../config/const";
import {
  getTimeInterval,
  captureRequest,
  verifyFetchRequest,
  getNodesFetchRequest,
  expectEquality,
  expectArrayContainsItem,
} from "../utils";
import Page from "../pageobjects/page";

describe("Left Panel - Fetch traces section - Requests", () => {
  beforeEach(async () => {
    Page.openPage("/");
    await Page.leftPanel.buildGraph.addToQuery(Values.Trace, "111");
    await Page.leftPanel.buildGraph.buttonLoadData.click();
  });

  it("Requests format, [@criticalPath, @high, @jira(BLMBMON-14244)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    const selectedItems: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
    Page.leftPanel.fetchTraces.buttonFetch.click();
    const request: PostData | string = await captureRequest("trace");
    verifyFetchRequest(request, "trace 111", selectedItems[0]);
  });

  it("Rerequesting the same data, [@criticalPath, @high, @jira(BLMBMON-14247)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();

    try {
      Page.leftPanel.fetchTraces.buttonFetch.click();
      await captureRequest("/trace");
    } catch (error) {
      expectEquality(error, "no such request");
    }
  });

  it("Requests_Rerequesting data_New period, [@criticalPath, @high, @jira(BLMBMON-14249)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    const selectedItems: string[] = await Page.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();

    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    Page.leftPanel.fetchTraces.buttonFetch.click();
    const request: PostData | string = await captureRequest("trace");
    expectArrayContainsItem(getNodesFetchRequest(request), selectedItems[0], false);
  });

  it("Rerequesting data_Some new nodes, [@criticalPath, @high, @jira(BLMBMON-14248)]", async () => {
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);

    Page.leftPanel.fetchTraces.buttonFetch.click();
    const firstRequest: PostData = await captureRequest("/trace");
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonNextTimePeriod.click();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonFetch.click();

    Page.modal.buttonOverwrite.click();
    const secondRequest: PostData = await captureRequest("/trace");
    expectEquality(getTimeInterval(firstRequest.startTime, secondRequest.startTime), 0, true);
    expectEquality(getTimeInterval(firstRequest.endTime, secondRequest.endTime), 0, true);
  });
});
