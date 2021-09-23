"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileName = exports.rgbToHex = exports.getOSData = exports.decodeUrl = exports.regexpMap = exports.sortArrayAlphabetically = exports.doesEveryItemContains = void 0;
const urlencode_1 = __importDefault(require("urlencode"));
const os_1 = require("os");
const const_1 = require("../config/const");
const doesEveryItemContains = (arr, isCaseInsensitive, toInclude) => {
    return arr.every((item) => {
        if (isCaseInsensitive)
            item = item.toLowerCase();
        return item.includes(toInclude);
    });
};
exports.doesEveryItemContains = doesEveryItemContains;
const sortArrayAlphabetically = (arr) => {
    return arr.sort((a, b) => a.localeCompare(b));
};
exports.sortArrayAlphabetically = sortArrayAlphabetically;
exports.regexpMap = {
    [const_1.ExtractorType.Id]: (str) => str.match(const_1.idRegexp)[0],
    [const_1.ExtractorType.Time]: (str) => str.match(const_1.timeRegexp)[0],
    [const_1.ExtractorType.Num]: (str) => str.match(const_1.dayRegexp)[3],
    [const_1.ExtractorType.TimeTo]: (str) => str.match(const_1.timeRegexp)[1],
    [const_1.ExtractorType.EmptyValue]: (str) => str.match(const_1.emptyValue)[0],
    [const_1.ExtractorType.Date]: (str) => str.match(const_1.dateRegexp)[0],
};
const decodeUrl = (url) => {
    return urlencode_1.default.decode(url);
};
exports.decodeUrl = decodeUrl;
const getOSData = () => {
    const pform = (0, os_1.platform)();
    return pform === "darwin"
        ? {
            os: "MacOS",
            button: "Meta",
            message: "cmd+click on node",
            tooltipMessage: "cmd+select area to select group of nodes",
        }
        : {
            os: "Win or Linux",
            button: "Control",
            message: "ctrl+click on node",
            tooltipMessage: "ctrl+select area to select group of nodes",
        };
};
exports.getOSData = getOSData;
const rgbToHex = (value) => {
    const rgbColor = value.match(/(\d{2,3})/g);
    const [r, g, b] = [parseInt(rgbColor[0]), parseInt(rgbColor[1]), parseInt(rgbColor[2])];
    return ("#" +
        [r, g, b]
            .map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        })
            .join(""));
};
exports.rgbToHex = rgbToHex;
const generateFileName = (nodeName, dateFrom, dateTo, type) => {
    const fileName = `${nodeName} ${dateFrom} ${dateTo}`;
    return fileName.replace(/( |:)/g, "_") + `_search-results.${type}`;
};
exports.generateFileName = generateFileName;
