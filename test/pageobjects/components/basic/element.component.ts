import { isElementDisplayed, isElementExists, rgbToHex } from "../../../utils";
import { ClickObject } from "../../../config/const";

export default class Element {
  readonly selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  async click(options?: ClickObject): Promise<void> {
    await this.waitForClickable();
    return $(this.selector).click(options);
  }

  async clearValue(): Promise<void> {
    await this.waitForExist();
    await this.click();
    return $(this.selector).clearValue();
  }

  async checkIfDisplayed(option = true): Promise<void> {
    const element: WebdriverIO.Element = await $(this.selector);
    return isElementDisplayed(element, option);
  }

  async checkIfExists(option = true): Promise<void> {
    const element: WebdriverIO.Element = await $(this.selector);
    return isElementExists(element, option);
  }

  async getText(): Promise<string> {
    return $(this.selector).getText();
  }

  async parseNumber(): Promise<number> {
    const text: string = await this.getText();
    return parseInt(text.match(/\d+/)[0]);
  }

  async waitForExist(reverse = false): Promise<void> {
    try {
      await $(this.selector).waitForExist({ reverse });
    } catch (e) {
      throw new Error(e);
    }
  }

  async waitForDisplayed(reverse = false): Promise<void> {
    try {
      await $(this.selector).waitForDisplayed({ reverse });
    } catch (e) {
      throw new Error(e);
    }
  }

  async waitForClickable(reverse = false): Promise<void> {
    try {
      await $(this.selector).waitForClickable({ reverse });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAttribute(attribute: string): Promise<string> {
    await this.waitForExist();
    return $(this.selector).getAttribute(attribute);
  }

  async getPlaceholder(): Promise<string> {
    return this.getAttribute("placeholder");
  }

  async hover(): Promise<void> {
    await this.waitForExist();
    return $(this.selector).moveTo();
  }

  async getElementsCount(): Promise<number> {
    const elements: WebdriverIO.Element[] = await $$(this.selector);
    return elements.length;
  }

  async getBackgroundColor(): Promise<string> {
    const elem: WebdriverIO.Element = await $(this.selector);
    return (await elem.getCSSProperty("background-color")).parsed.hex;
  }

  async isElementEnabled(): Promise<boolean> {
    return $(this.selector).isEnabled();
  }

  async getBorderColor(): Promise<string> {
    const rgbColor: string = (await $(this.selector).getCSSProperty("border")).value;
    return rgbToHex(rgbColor);
  }

  async getBackground(): Promise<string> {
    const elem: WebdriverIO.Element = await $(this.selector);
    return await elem.getCSSProperty("background").parsed.hex;
  }

  async previousElement(): Promise<WebdriverIO.Element> {
    return $(this.selector).previousElement();
  }

  async nextElement(): Promise<WebdriverIO.Element> {
    return $(this.selector).nextElement();
  }

  async parentElement(): Promise<WebdriverIO.Element> {
    return $(this.selector).parentElement();
  }

  async isStateEqual(state: string, field = false): Promise<boolean> {
    const classAttribute: string = field
      ? await (await this.parentElement()).getAttribute("class")
      : await this.getAttribute("class");
    return classAttribute.includes(state);
  }
}
