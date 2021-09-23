import Order from "./leftPanel/order.component";
import Collapse from "./leftPanel/collapse.component";
import Calendar from "./leftPanel/calendar.component";
import Button from "./basic/button.component";
import Element from "./basic/element.component";
export default class LeftPanel extends Element {
  get panel(): Element {
    return new Element(`${this.selector}`);
  }

  get order() {
    return new Order("div.order");
  }

  get buildGraph() {
    return new Collapse(".build-graph-container .rc-collapse-item");
  }

  get fetchTraces() {
    return new Collapse(".fetch-traces-container .rc-collapse-item");
  }

  get calendar() {
    return new Calendar(".calendar__modal");
  }

  get buttonCollapse(): Button {
    return new Button(`${this.selector} .side-bar-button.stretch`);
  }

  get logo(): Button {
    return new Button(`${this.selector} a.navbar-header-logo`);
  }

  get applicationVersion(): Element {
    return new Element(`${this.selector} .frontend-version`);
  }

  async isSideBarExpanded(): Promise<boolean> {
    const attributes = await $(this.selector).getAttribute("class");
    return attributes.includes("expanded");
  }
}
