import Element from "../basic/element.component";
import Elements from "../basic/elements.component";
export default class TabsPanel extends Element {
  readonly el: WebdriverIO.Element;

  get tabs(): Elements {
    return new Elements(`${this.selector} .tab-label`);
  }

  get buttonsCloseTab(): Elements {
    return new Elements(`${this.selector} .tab-label a`);
  }

  get navigationController(): Element {
    return new Element(`${this.selector} .scrollbar-navigation-control:not(.disabled)`);
  }

  async getClassAttribute(index: number): Promise<string> {
    const tab: WebdriverIO.Element = await this.tabs.selectByIndex(index);
    return tab.getAttribute("class");
  }

  async isTabActive(index: number): Promise<boolean> {
    const classAttribute: string = await this.getClassAttribute(index);
    return classAttribute.includes("active");
  }

  async waitUntilActive(index: number): Promise<void> {
    await browser.waitUntil(
      async () => {
        await this.tabs.clickByIndex(index);
        return this.isTabActive(index);
      },
      {
        timeout: 20000,
        timeoutMsg: "the tab is still not active after 20s",
      }
    );
  }
}
