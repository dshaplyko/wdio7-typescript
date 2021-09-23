import Element from "./element.component";

export default class Spinner extends Element {
  async waitForDisappear(): Promise<void> {
    await this.waitForDisplayed();
    await this.waitForDisplayed(true);
  }
}
