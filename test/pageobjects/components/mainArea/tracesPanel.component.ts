import TabsPanel from "./tabsPanel.component";
import Button from "../basic/button.component";
import Element from "../basic/element.component";
import Elements from "../basic/elements.component";
import Field from "../basic/field.component";
import Log from "./log.component";

export default class TracesPanel extends Element {
  get title(): Element {
    return new Element(`${this.selector} .panel-header__title`);
  }

  get panelName(): Element {
    return new Element(`${this.selector} [data-for="tooltip1"]`);
  }

  get tabsPanel() {
    return new TabsPanel(".tabs");
  }

  get log() {
    return new Log(".trace-content");
  }

  get buttonTrash(): Button {
    return new Button(`${this.selector} [data-for="icon-button-tooltip-trash"]`);
  }

  get buttonCollapse(): Button {
    return new Button(`${this.selector} [data-for*="icon-button-tooltip-chevron-double"]`);
  }

  get dateStart(): Element {
    return new Element(`${this.selector} .date-period-date-start`);
  }

  get timeStart(): Element {
    return new Element(`${this.selector} .date-period-time-start`);
  }

  get dateEnd(): Element {
    return new Element(`${this.selector} .date-period-date-end`);
  }

  get timeEnd(): Element {
    return new Element(`${this.selector} .date-period-time-end`);
  }

  get searchInput(): Field {
    return new Field(`${this.selector} .trace-content__search-traces input`);
  }

  get buttonDownload(): Button {
    return new Button(`${this.selector} [data-for="icon-button-tooltip-download"]`);
  }

  get buttonPopOut(): Button {
    return new Button(`${this.selector} [data-for="icon-button-tooltip-pop-out"]`);
  }

  get buttonPopIn(): Button {
    return new Button(`${this.selector} [data-for="icon-button-tooltip-pop-in"]`);
  }

  get downloadOptions(): Elements {
    return new Elements(`${this.selector} .content-wrapper .button-wrapper`);
  }

  async isPanelExpanded(): Promise<boolean> {
    const header: WebdriverIO.Element = await $(`${this.selector} .collapsible-panel__header`);
    const attribute: string = await header.getAttribute("aria-expanded");
    return attribute === "true" ? true : false;
  }

  async waitUntilCollapsed(state?: boolean): Promise<void> {
    await browser.waitUntil(
      async () => {
        if (state) return !(await this.isPanelExpanded());
        await browser.pause(1000);
        return await this.isPanelExpanded();
      },
      {
        timeout: 20000,
        timeoutMsg: "the tab is not expanded/collapsed after 20s",
      }
    );
  }
}
