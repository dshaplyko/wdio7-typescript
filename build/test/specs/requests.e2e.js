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
describe("Left Panel - Fetch traces section - Requests", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page_1.default.openPage("/");
        yield page_1.default.leftPanel.buildGraph.addToQuery(const_1.Values.Trace, "111");
        yield page_1.default.leftPanel.buildGraph.buttonLoadData.click();
    }));
    it("Requests format, [@criticalPath, @high, @jira(BLMBMON-14244)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        const selectedItems = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
        page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        const request = yield (0, utils_1.captureRequest)("trace");
        (0, utils_1.verifyFetchRequest)(request, "trace 111", selectedItems[0]);
    }));
    it("Rerequesting the same data, [@criticalPath, @high, @jira(BLMBMON-14247)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        try {
            page_1.default.leftPanel.fetchTraces.buttonFetch.click();
            yield (0, utils_1.captureRequest)("/trace");
        }
        catch (error) {
            (0, utils_1.expectEquality)(error, "no such request");
        }
    }));
    it("Requests_Rerequesting data_New period, [@criticalPath, @high, @jira(BLMBMON-14249)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        const selectedItems = yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectedItems.getTextArray();
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        const request = yield (0, utils_1.captureRequest)("trace");
        (0, utils_1.expectArrayContainsItem)((0, utils_1.getNodesFetchRequest)(request), selectedItems[0], false);
    }));
    it("Rerequesting data_Some new nodes, [@criticalPath, @high, @jira(BLMBMON-14248)]", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page_1.default.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
        page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        const firstRequest = yield (0, utils_1.captureRequest)("/trace");
        yield page_1.default.leftPanel.fetchTraces.buttonCalendar.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonNextTimePeriod.click();
        yield page_1.default.leftPanel.calendar.buttonApply.click();
        yield page_1.default.leftPanel.fetchTraces.buttonFetch.click();
        page_1.default.modal.buttonOverwrite.click();
        const secondRequest = yield (0, utils_1.captureRequest)("/trace");
        (0, utils_1.expectEquality)((0, utils_1.getTimeInterval)(firstRequest.startTime, secondRequest.startTime), 0, true);
        (0, utils_1.expectEquality)((0, utils_1.getTimeInterval)(firstRequest.endTime, secondRequest.endTime), 0, true);
    }));
});
