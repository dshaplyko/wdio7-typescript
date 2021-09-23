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
const utils_2 = require("../utils");
describe("Graph building", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page_1.default.openPage("/");
    }));
    it("Node info, [@smoke, @critical, @jira(BLMBMON-10883)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.mainArea.graph.waitForExist();
        yield page_1.default.mainArea.clickGraphNode();
        yield page_1.default.mainArea.nodeInfo.checkIfDisplayed();
        const infoListItems = yield page_1.default.mainArea.nodeInfo.infoListItems.getTextArray();
        const infoListContents = yield page_1.default.mainArea.nodeInfo.infoListContents.getTextArray();
        (0, utils_2.expectArraysEqual)(infoListItems, const_1.nodeInfoItems);
        (0, utils_2.expectArrayFilled)(infoListContents);
    }));
    it("Node unselect, [@criticalPath, @high, @jira(BLMBMON-10885)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.mainArea.graph.waitForExist();
        yield page_1.default.mainArea.clickGraphNode();
        yield page_1.default.mainArea.nodeInfo.checkIfExists();
        yield page_1.default.mainArea.clickOutsideGraph();
        yield page_1.default.mainArea.nodeInfo.checkIfExists(false);
    }));
    it("Clicked node inclusion into the all nodes list, [@criticalPath, @high, @jira(BLMBMON-9731)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.mainArea.graph.waitForExist();
        yield page_1.default.mainArea.clickGraphNode();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.click();
        const defaultNodes = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItems.getTextArray();
        const nodeName = (yield page_1.default.mainArea.nodeInfo.infoListContents.getTextArray())[1];
        (0, utils_2.expectArrayContainsItem)(defaultNodes, nodeName);
    }));
    it("Node info popup closure, [@extended, @medium, @jira(BLMBMON-10884)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.mainArea.graph.waitForExist();
        yield page_1.default.mainArea.clickGraphNode();
        yield page_1.default.mainArea.nodeInfo.buttonClose.click();
        yield page_1.default.mainArea.nodeInfo.checkIfExists(false);
    }));
    it("Color legend - order of node types, [@extended, @low, @jira(BLMBMON-10950)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.mainArea.graph.waitForExist();
        yield page_1.default.mainArea.colorLegend.click();
        const legend = yield page_1.default.mainArea.colorLegend.options.getTextArray();
        (0, utils_2.expectArrayIncludesItemsFromArray)(const_1.colorLegendOptions, legend);
    }));
    it("Graph view, [@smoke, @critical, @jira(BLMBMON-10871)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.mainArea.graph.waitForExist();
        yield page_1.default.mainArea.graph.checkIfDisplayed();
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.order.buttonVerticalOrder.isButtonSelected(), true);
        (0, utils_1.expectEquality)(yield page_1.default.leftPanel.order.buttonHorizontalOrder.isButtonSelected(), false);
    }));
    it("Invalid values, [@criticalPath, @high, @jira(BLMBMON-10867)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const nodes1 = yield (0, utils_2.getNodesFromTheResponse)("security=aaa");
        const nodes2 = yield (0, utils_2.getNodesFromTheResponse)("security=response_1");
        (0, utils_2.expectArraysEqual)(nodes1, nodes2);
    }));
    it("Correct first parameter + value, second invalid, [@criticalPath, @high, @jira(BLMBMON-10868)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const nodes1 = yield (0, utils_2.getNodesFromTheResponse)(const_1.defaultQuery);
        const nodes2 = yield (0, utils_2.getNodesFromTheResponse)(`${const_1.defaultQuery}, fdkgk=@#$%43G`);
        (0, utils_2.expectArraysEqual)(nodes1, nodes2);
    }));
    it("Correct first and second parameters + values, third invalid parameter, [@criticalPath, @high, @jira(BLMBMON-10869)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const nodes1 = yield (0, utils_2.getNodesFromTheResponse)(`${const_1.defaultQuery}, tvi_trace=6473726354`);
        const nodes2 = yield (0, utils_2.getNodesFromTheResponse)(`${const_1.defaultQuery}, tvi_trace=6473726354, fdkgk=@#$%43G`);
        (0, utils_2.expectArraysEqual)(nodes1, nodes2);
    }));
    it("Correct first and second parameters + values, third valid parameter + invalid value, [@criticalPath, @high, @jira(BLMBMON-10870)]", () => __awaiter(void 0, void 0, void 0, function* () {
        const nodes1 = yield (0, utils_2.getNodesFromTheResponse)(`${const_1.defaultQuery}, tvi_trace=6473726354, security=response_1`);
        const nodes2 = yield (0, utils_2.getNodesFromTheResponse)(`${const_1.defaultQuery}, tvi_trace=6473726354, security=@#$%43G`);
        (0, utils_2.expectArraysEqual)(nodes1, nodes2);
    }));
    it("Color legend default view, [@criticalPath, @high, @jira(BLMBMON-10877)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.colorLegend.isCollapsed(), true);
    }));
    it("Color legend popup view, [@criticalPath, @high, @jira(BLMBMON-10878)]", () => __awaiter(void 0, void 0, void 0, function* () {
        /**
         * Get returned nodes
         */
        const nodes = yield (0, utils_2.getNodesFromTheResponse)(const_1.defaultQuery);
        /*
         * Review color options and compare them with nodes
         */
        yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(const_1.defaultQuery);
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        yield page_1.default.mainArea.colorLegend.click();
        (0, utils_1.expectEquality)(yield page_1.default.mainArea.colorLegend.isCollapsed(), false);
        const colorOptions = yield page_1.default.mainArea.colorLegend.options.getTextArray();
        (0, utils_2.expectArrayIncludesItemsFromArray)(nodes, colorOptions);
    }));
    describe("UI related scenarios", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.buildGraph.textArea.setInputValue(const_1.defaultQuery);
            yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
        }));
        it("Show path through node default state, [@criticalPath, @high, @jira(BLMBMON-10881)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.mainArea.graph.waitForExist();
            yield page_1.default.header.buttonShowPath.checkIfDisplayed();
        }));
        it("Show path through node ON, [@criticalPath, @high, @jira(BLMBMON-10882)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.mainArea.graph.waitForExist();
            (0, utils_1.expectElementIncludesText)(yield page_1.default.getCurrentUrl(), "show_path=false");
            yield page_1.default.header.buttonShowPath.click();
            (0, utils_1.expectElementIncludesText)(yield page_1.default.getCurrentUrl(), "show_path=true");
        }));
        it("Hierarchical view reset, [@extended, @medium, @jira(BLMBMON-10974)]", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page_1.default.leftPanel.order.buttonHorizontalOrder.click();
            yield page_1.default.mainArea.spinner.waitForDisplayed(true);
            yield page_1.default.leftPanel.buildGraph.buttonExpand.click();
            yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
            yield page_1.default.mainArea.spinner.waitForDisplayed(true);
            (0, utils_1.expectEquality)(yield page_1.default.leftPanel.order.buttonVerticalOrder.isButtonSelected(), true);
        }));
    });
});
