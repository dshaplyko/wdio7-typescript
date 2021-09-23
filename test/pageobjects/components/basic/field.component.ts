import { ExtractorType } from "../../../config/const";
import { regexpMap } from "../../../utils";
import Element from "./element.component";
import Button from "./button.component";

export default class Field extends Element {
  get buttonClear(): Button {
    const buttonSelector: string = "[data-testid='clear.input']";
    return new Button(`${this.selector}~${buttonSelector}`);
  }

  async getInputValue(decodeType?: ExtractorType): Promise<string> {
    const value: string = await $(this.selector).getValue();
    return decodeType ? regexpMap[decodeType](value) : value;
  }

  async setInputValue(text: string | number): Promise<void> {
    await this.waitForExist();
    await this.waitForClickable();
    return $(this.selector).setValue(text);
  }

  async clearInputValue(): Promise<void> {
    await this.click();
    return $(this.selector).clearValue();
  }

  async pasteFromClipboard(): Promise<void> {
    await this.click();
    return browser.keys([global.osType.button, "v"]);
  }
}
