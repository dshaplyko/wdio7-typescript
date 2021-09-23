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
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectEquality = exports.expectElementIncludesText = exports.expectArrayContainsItem = exports.expectArrayFilled = exports.expectLabelWorksAgainstRegexp = exports.expectArrayIncludesItemsFromArray = exports.expectArraysEqual = exports.expectArraySortedAlphabetically = exports.expectArrayIncludes = exports.isElementExists = exports.isElementDisplayed = void 0;
const chai_1 = require("chai");
const main_1 = require("./main");
const const_1 = require("../config/const");
const isElementDisplayed = (el, option = true) => __awaiter(void 0, void 0, void 0, function* () {
    if (Array.isArray(el))
        el = el[0];
    yield el.waitForExist();
    (0, chai_1.expect)(yield el.isDisplayed(), `The visibility of element is incorrect ${el.selector}`).to.equal(option);
});
exports.isElementDisplayed = isElementDisplayed;
const isElementExists = (el, option = true) => __awaiter(void 0, void 0, void 0, function* () {
    (0, chai_1.expect)(yield el.isExisting(), `The existence of element is incorrect ${el.selector}`).to.equal(option);
});
exports.isElementExists = isElementExists;
const expectArrayIncludes = (arr, toContain, isCaseInsensitive = false, option = true) => {
    (0, chai_1.expect)((0, main_1.doesEveryItemContains)(arr, isCaseInsensitive, toContain), `Expect ${JSON.stringify(arr)} to contain ${toContain}`).to.equal(option);
};
exports.expectArrayIncludes = expectArrayIncludes;
const expectArraySortedAlphabetically = (arr) => {
    const sorted = [...(0, main_1.sortArrayAlphabetically)(arr)];
    (0, chai_1.expect)(JSON.stringify(sorted), `The array ${JSON.stringify(sorted)} is not sorted alphabetically`).to.equal(JSON.stringify(arr));
};
exports.expectArraySortedAlphabetically = expectArraySortedAlphabetically;
const expectArraysEqual = (arr1, arr2, not) => {
    let assertion = (0, chai_1.expect)(arr1, `Equality of ${JSON.stringify(arr1)} and ${JSON.stringify(arr2)} is incorrect`).to;
    if (not)
        assertion = assertion.not;
    return assertion.have.members(arr2);
};
exports.expectArraysEqual = expectArraysEqual;
const expectArrayIncludesItemsFromArray = (arr, arrToInclude, not) => {
    arrToInclude.forEach((item) => {
        let assertion = (0, chai_1.expect)(arr, `Inclusion of ${item} in ${JSON.stringify(arr)} is incorrect`).to;
        if (not)
            assertion = assertion.not;
        return assertion.include(item);
    });
};
exports.expectArrayIncludesItemsFromArray = expectArrayIncludesItemsFromArray;
const expectLabelWorksAgainstRegexp = (label, reg = const_1.loadingRegexp) => {
    (0, chai_1.expect)(reg.test(label)).to.equal(true);
};
exports.expectLabelWorksAgainstRegexp = expectLabelWorksAgainstRegexp;
const expectArrayFilled = (arr) => {
    const result = arr.every((item) => item !== "");
    (0, chai_1.expect)(result, `The array ${JSON.stringify(arr)} contains empty items`).to.equal(true);
};
exports.expectArrayFilled = expectArrayFilled;
const expectArrayContainsItem = (arr, item, option = true) => {
    (0, chai_1.expect)(arr.includes(item), `Inclusion of ${item} into ${JSON.stringify(arr)} is incorrect`).to.equal(option);
};
exports.expectArrayContainsItem = expectArrayContainsItem;
const expectElementIncludesText = (element, textToInclude, not) => {
    let assertion = (0, chai_1.expect)(element, `The inclusion of ${textToInclude} into ${element} is improper`).to;
    if (not)
        assertion = assertion.not;
    if (Array.isArray(textToInclude)) {
        textToInclude.forEach((item) => assertion.include(item));
    }
    else {
        assertion.include(textToInclude);
    }
};
exports.expectElementIncludesText = expectElementIncludesText;
const expectEquality = (element, textToEqual, not) => {
    let assertion = (0, chai_1.expect)(element, `The equaity of ${element} and ${textToEqual} is improper`).to;
    if (not)
        assertion = assertion.not;
    if (Array.isArray(textToEqual)) {
        textToEqual.forEach((item) => assertion.equal(item));
    }
    else {
        assertion.equal(textToEqual);
    }
};
exports.expectEquality = expectEquality;
