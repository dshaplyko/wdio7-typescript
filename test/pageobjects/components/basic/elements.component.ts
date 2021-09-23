import { isElementDisplayed } from "../../../utils/expect";
import { ParsedCSSValue } from "webdriverio";

export default class Elements {
  readonly selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  async getTextArray(): Promise<string[]> {
    const elements = await $$(this.selector);
    const textArr = [];
    if (elements.length > 0) await elements[0].waitForExist();
    for (const element of elements) {
      textArr.push(await element.getText());
    }
    return textArr;
  }

  async selectByIndex(index: number): Promise<WebdriverIO.Element> {
    await this.waitForDisplayed();
    return $$(this.selector)[index - 1];
  }

  async getTextByIndex(index: number): Promise<string> {
    const element: WebdriverIO.Element = await this.selectByIndex(index);
    return element.getText();
  }

  async clickByIndex(index: number): Promise<void> {
    const element: WebdriverIO.Element = await this.selectByIndex(index);
    await element.waitForClickable();
    return element.click();
  }

  async checkIfDisplayed(option = true): Promise<void> {
    const elements: WebdriverIO.Element[] = await $$(this.selector);
    return isElementDisplayed(elements, option);
  }

  async getElementsCount(): Promise<number> {
    const elements: WebdriverIO.Element[] = await $$(this.selector);
    return elements.length;
  }

  async waitForExist(reverse = false): Promise<void> {
    try {
      await $$(this.selector)[0].waitForExist({ reverse });
    } catch (e) {
      throw new Error(e);
    }
  }

  async waitForDisplayed(reverse = false): Promise<void> {
    try {
      await $$(this.selector)[0].waitForExist({ reverse });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getElementsBackgroundColors(): Promise<string[]> {
    const elements = await $$(this.selector);
    const textArr = [];
    if (elements.length > 0) await this.waitForExist();
    for (const element of elements) {
      const color: ParsedCSSValue = await element.getCSSProperty("background-color");
      textArr.push(color.parsed.hex);
    }
    return textArr;
  }
}
