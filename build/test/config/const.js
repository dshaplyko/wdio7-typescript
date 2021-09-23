"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endTimePeriod = exports.calendarActiveDays = exports.weeksNumber = exports.lightBlueColor = exports.grayColor = exports.whiteColor = exports.orangeColor = exports.emptyValuePeriod = exports.loadingRegexp = exports.idRegexp = exports.timeRegexp = exports.emptyValue = exports.dayRegexp = exports.dateRegexp = exports.searchQuery = exports.defaultQuery = exports.colorLegendOptions = exports.nodeInfoItems = exports.ExtractorType = exports.Values = exports.Constants = void 0;
// tslint:disable-next-line:variable-name
exports.Constants = {
    dropdownValues: ["ExByte", "Trace", "Security"],
};
var Values;
(function (Values) {
    Values[Values["ExByte"] = 0] = "ExByte";
    Values[Values["Trace"] = 1] = "Trace";
    Values[Values["Security"] = 2] = "Security";
})(Values = exports.Values || (exports.Values = {}));
var ExtractorType;
(function (ExtractorType) {
    ExtractorType[ExtractorType["Id"] = 0] = "Id";
    ExtractorType[ExtractorType["Time"] = 1] = "Time";
    ExtractorType[ExtractorType["Num"] = 2] = "Num";
    ExtractorType[ExtractorType["TimeTo"] = 3] = "TimeTo";
    ExtractorType[ExtractorType["EmptyValue"] = 4] = "EmptyValue";
    ExtractorType[ExtractorType["Date"] = 5] = "Date";
})(ExtractorType = exports.ExtractorType || (exports.ExtractorType = {}));
var Button;
(function (Button) {
    Button[Button["left"] = 0] = "left";
    Button[Button["middle"] = 1] = "middle";
    Button[Button["right"] = 2] = "right";
})(Button || (Button = {}));
exports.nodeInfoItems = ["machineId", "name", "nodeType"];
exports.colorLegendOptions = [
    "FeedHandler",
    "FETickSender",
    "Tickerplant",
    "ApiPublisher",
    "DistributionNode",
    "MonitorStream",
    "ClientNode",
    "Other",
];
exports.defaultQuery = "exbyte=2F20";
exports.searchQuery = '"MessageType": "BasicDataTableEntry", "Name": "BAP TR - NON-CLEARED - 10k", "ReceiveTime": "2020-06-08T04:10:02.76Z", "Sequence Number"';
exports.dateRegexp = /(\d){4}-(\d){2}-(\d){2}T(\d){2}:(\d){2}:(\d){2}/g;
exports.dayRegexp = /(\d){2}/g;
exports.emptyValue = /(\d){2}:(\d){2}:(\d){2}  -  (\d){2}:(\d){2}:(\d){2}/;
exports.timeRegexp = /(\d){2}:(\d){2}:(\d){2}/g;
exports.idRegexp = /(\d|[a-z]){8}-(\d|[a-z]){4}-(\d|[a-z]){4}-(\d|[a-z]){4}-(\d|[a-z]){12}$/;
exports.loadingRegexp = /No matches in (\d){4} traces/g;
exports.emptyValuePeriod = "00:00:00  -  00:00:00";
exports.orangeColor = "#f09000";
exports.whiteColor = "#ffffff";
exports.grayColor = "#9b9b9b";
exports.lightBlueColor = "#9fc4fb";
exports.weeksNumber = 6;
exports.calendarActiveDays = 30;
exports.endTimePeriod = 235959;
