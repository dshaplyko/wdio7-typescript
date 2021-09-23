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
exports.getFetchResponse = exports.getNodesFromTheResponse = exports.sendRequest = exports.emulateNetworkError = exports.getNodesFetchRequest = exports.verifyFetchRequest = exports.verifyDataflowRequest = exports.captureRequest = void 0;
const chai_1 = require("chai");
const date_1 = require("./date");
const axios_1 = __importDefault(require("axios"));
const captureRequest = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const puppeteer = yield browser.getPuppeteer();
    const page = (yield puppeteer.pages())[0];
    yield page.setRequestInterception(true);
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            page.removeAllListeners("request");
            yield page.setRequestInterception(false);
            reject("no such request");
        }), 2000);
        const handler = (request) => __awaiter(void 0, void 0, void 0, function* () {
            clearTimeout(timeout);
            if ((yield request.url()).includes(url)) {
                resolve(JSON.parse(yield request.postData()));
            }
            else {
                reject("no such request");
            }
            yield page.setRequestInterception(false);
        });
        page.once("request", handler);
    });
});
exports.captureRequest = captureRequest;
const verifyDataflowRequest = (request, stringToCheck) => {
    (0, chai_1.expect)(request.searchQuery).to.include(stringToCheck);
    (0, date_1.verifyDatesRange)([request.startTime, request.endTime]);
};
exports.verifyDataflowRequest = verifyDataflowRequest;
const verifyFetchRequest = (request, searchString, selectedNote) => {
    (0, chai_1.expect)((0, date_1.getTimeInterval)(request.startTime, request.endTime), "The time interval is incorrect").to.equal(5);
    (0, chai_1.expect)(request.filters[0].field + " " + request.filters[0].values, "The request does not contain the selected item").to.include(searchString);
    (0, chai_1.expect)(request.filters[1].values, "The request does note include the selected node").to.include(selectedNote);
};
exports.verifyFetchRequest = verifyFetchRequest;
const getNodesFetchRequest = (request) => {
    return request.filters[1].values;
};
exports.getNodesFetchRequest = getNodesFetchRequest;
const emulateNetworkError = (request, statusMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const mock = yield browser.mock("**" + request, {
        method: "post",
    });
    mock.abortOnce(statusMessage);
});
exports.emulateNetworkError = emulateNetworkError;
const sendRequest = (url, data, method = "post") => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        (0, axios_1.default)({
            method: method,
            url: `${browser.options.baseUrl}/shipwreck/v1/${url}`,
            headers: {},
            data: data,
        })
            .then((response) => {
            resolve({
                status: response.status,
                data: response.data,
            });
        })
            .catch((error) => {
            reject(error);
        });
    });
});
exports.sendRequest = sendRequest;
const getNodesFromTheResponse = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, exports.sendRequest)("dataflow", {
        endTime: (0, date_1.getCurrentDateSecondsAhead)(5),
        searchQuery: searchQuery,
        startTime: (0, date_1.getCurrentDateSecondsAhead)(),
    });
    return response.data[0].nodes.map((node) => node.nodeType);
});
exports.getNodesFromTheResponse = getNodesFromTheResponse;
const getFetchResponse = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, exports.sendRequest)("trace", {
        endTime: (0, date_1.getCurrentDateSecondsAhead)(5),
        filters: [
            {
                field: "",
                values: [],
            },
        ],
        startTime: (0, date_1.getCurrentDateSecondsAhead)(),
    });
    return response.data[0].nodes.map((node) => node.nodeType);
});
exports.getFetchResponse = getFetchResponse;
