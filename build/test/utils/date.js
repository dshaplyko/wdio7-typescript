"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDateSecondsAhead = exports.verifyDatesValid = exports.verifyDatesRange = exports.getTimeInterval = void 0;
const chai_1 = require("chai");
const moment_1 = __importDefault(require("moment"));
const getTimeInterval = (dateFrom, dateTo) => {
    const dateFromParsed = +new Date(dateFrom.split(" ")[0]);
    const dateToParsed = +new Date(dateTo);
    const diffTime = Math.abs(dateToParsed - dateFromParsed) / (1000 * 60);
    return diffTime;
};
exports.getTimeInterval = getTimeInterval;
const verifyDatesRange = (dates) => {
    dates.forEach((date) => (0, chai_1.expect)((0, moment_1.default)(date).toNow(), `The range for ${date} is not valid`).to.equal("in a few seconds"));
};
exports.verifyDatesRange = verifyDatesRange;
const verifyDatesValid = (dates) => {
    dates.forEach((date) => (0, chai_1.expect)((0, moment_1.default)(date, true).format(), `The value ${date} is not a date`).not.to.equal("Invalid date"));
};
exports.verifyDatesValid = verifyDatesValid;
const getCurrentDateSecondsAhead = (seconds = 0) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + seconds);
    return date;
};
exports.getCurrentDateSecondsAhead = getCurrentDateSecondsAhead;
