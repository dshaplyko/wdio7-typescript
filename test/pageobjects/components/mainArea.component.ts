import TracesPanel from "./mainArea/tracesPanel.component";
import NodeInfo from "./mainArea/nodeInfo.component";
import Button from "./basic/button.component";
import Element from "./basic/element.component";
import Spinner from "./basic/spinner.component";
import ColorLegend from "./mainArea/colorLegend.component";

export default class MainArea extends Element {
  get buttonDeleteAll(): Button {
    return new Button(`${this.selector} button[data-tip='Delete all']`);
  }

  get buttonCollapse(): Button {
    return new Button(`${this.selector} button[data-tip='Collapse']`);
  }

  get spinner(): Spinner {
    return new Spinner(`${this.selector} .spinner__wrapper`);
  }

  get tracesPanel(): TracesPanel {
    return new TracesPanel(`${this.selector} .collapsible__traces-panel`);
  }

  get nodeInfo(): NodeInfo {
    return new NodeInfo(".node-info");
  }

  get colorLegend(): ColorLegend {
    return new ColorLegend(".countries-map");
  }

  get graph(): Element {
    return new Element(`${this.selector} .graph-wrapper canvas`);
  }

  get infoMessage(): Element {
    return new Element(`${this.selector} .text`);
  }

  get headerTitle(): Element {
    return new Element(`${this.selector} h2.panel-header__title"`);
  }

  async clickGraphNode(): Promise<void> {
    await browser.pause(1000);
    const canvas: WebdriverIO.Element = await $(this.graph.selector);
    await canvas.click({ x: 2, y: 34 });
  }

  async clickOutsideGraph(): Promise<void> {
    const canvas: WebdriverIO.Element = await $(this.graph.selector);
    await canvas.click({ x: 0, y: 25 });
  }
}
