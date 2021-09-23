import Element from "../basic/element.component";
import Elements from "../basic/elements.component";

export default class ColorLegend extends Element {
  get options(): Elements {
    return new Elements(`${this.selector} .legend-item`);
  }

  async isCollapsed(): Promise<boolean> {
    const attribute: string = await $(this.selector).getAttribute("class");
    return attribute.includes("collapsed");
  }
}
