import Element from "./element.component";

export default class Button extends Element {
  async isButtonDisabled(): Promise<boolean> {
    const attribute = await $(this.selector).getAttribute("disabled");
    return !!attribute;
  }

  async isButtonSelected(): Promise<boolean> {
    const className = await $(this.selector).getAttribute("class");
    return className.includes("selected");
  }

  async getButtonBackgroundColor(): Promise<string> {
    const elem: WebdriverIO.Element = await $(this.selector);
    return (await elem.getCSSProperty("background-color")).parsed.hex;
  }
}
