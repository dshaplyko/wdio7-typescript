import { expect } from "chai";
import { doesEveryItemContains, sortArrayAlphabetically } from "./main";
import { loadingRegexp } from "../config/const";

export const isElementDisplayed = async (el: any, option: boolean = true): Promise<void> => {
  if (Array.isArray(el)) el = el[0];
  await el.waitForExist();
  expect(await el.isDisplayed(), `The visibility of element is incorrect ${el.selector}`).to.equal(option);
};

export const isElementExists = async (el: any, option: boolean = true): Promise<void> => {
  expect(await el.isExisting(), `The existence of element is incorrect ${el.selector}`).to.equal(option);
};

export const expectArrayIncludes = (
  arr: string[],
  toContain: string,
  isCaseInsensitive = false,
  option = true
): void => {
  expect(
    doesEveryItemContains(arr, isCaseInsensitive, toContain),
    `Expect ${JSON.stringify(arr)} to contain ${toContain}`
  ).to.equal(option);
};

export const expectArraySortedAlphabetically = (arr: string[]): void => {
  const sorted: string[] = [...sortArrayAlphabetically(arr)];
  expect(JSON.stringify(sorted), `The array ${JSON.stringify(sorted)} is not sorted alphabetically`).to.equal(
    JSON.stringify(arr)
  );
};

export const expectArraysEqual = (arr1: string[], arr2: string[], not?: boolean): void => {
  let assertion = expect(arr1, `Equality of ${JSON.stringify(arr1)} and ${JSON.stringify(arr2)} is incorrect`).to;
  if (not) assertion = assertion.not;

  return assertion.have.members(arr2);
};

export const expectArrayIncludesItemsFromArray = (arr: string[], arrToInclude: string[], not?: boolean): void => {
  arrToInclude.forEach((item) => {
    let assertion = expect(arr, `Inclusion of ${item} in ${JSON.stringify(arr)} is incorrect`).to;
    if (not) assertion = assertion.not;
    return assertion.include(item);
  });
};

export const expectLabelWorksAgainstRegexp = (label: string, reg: RegExp = loadingRegexp): void => {
  expect(reg.test(label)).to.equal(true);
};

export const expectArrayFilled = (arr: string[]): void => {
  const result = arr.every((item) => item !== "");
  expect(result, `The array ${JSON.stringify(arr)} contains empty items`).to.equal(true);
};

export const expectArrayContainsItem = (arr: string[], item: string, option = true): void => {
  expect(arr.includes(item), `Inclusion of ${item} into ${JSON.stringify(arr)} is incorrect`).to.equal(option);
};

export const expectElementIncludesText = (element: string, textToInclude: string | string[], not?: boolean) => {
  let assertion = expect(element, `The inclusion of ${textToInclude} into ${element} is improper`).to;
  if (not) assertion = assertion.not;

  if (Array.isArray(textToInclude)) {
    textToInclude.forEach((item) => assertion.include(item));
  } else {
    assertion.include(textToInclude);
  }
};

export const expectEquality = (element: any, textToEqual: any, not?: boolean) => {
  let assertion = expect(element, `The equaity of ${element} and ${textToEqual} is improper`).to;
  if (not) assertion = assertion.not;

  if (Array.isArray(textToEqual)) {
    textToEqual.forEach((item) => assertion.equal(item));
  } else {
    assertion.equal(textToEqual);
  }
};
