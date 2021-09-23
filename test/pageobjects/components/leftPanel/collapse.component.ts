import { Values } from "test/config/const";
import Dropdown from "../basic/dropdown.component";
import Field from "../basic/field.component";
import Button from "../basic/button.component";
import Element from "../basic/element.component";

export default class Collapse extends Element {
  get buttonExpand(): Button {
    return new Button(`${this.selector} .drop-header__title`);
  }

  get filterDropdown(): Dropdown {
    return new Dropdown("[data-testid='select'].filter__param");
  }

  get nodesDropdown(): Dropdown {
    return new Dropdown("[data-testid='select']:not(.filter__param)");
  }

  get fieldInput(): Field {
    return new Field(".filter__param-value input");
  }

  get buttonLoadData(): Button {
    return new Button(`${this.selector} .load-data button`);
  }

  get buttonFetch(): Button {
    return new Button(`${this.selector} .fetch-button`);
  }

  get buttonAddToQuery(): Button {
    return new Button(`${this.selector} .filter__param-value ~ button`);
  }

  get buttonClearAll(): Button {
    return new Button(`${this.selector} .clear-all-container button`);
  }

  get buttonCalendar(): Button {
    return new Button(`${this.selector} .period-calendar-icon`);
  }

  get textArea(): Field {
    return new Field(`${this.selector} .ui-textarea`);
  }

  get inputPeriodFrom(): Field {
    return new Field("input.masked-input:nth-child(1)");
  }

  get inputPeriodTo(): Field {
    return new Field("input.masked-input:nth-child(2)");
  }

  get nodeInfoIcon(): Element {
    return new Element(`${this.selector} .nodes-tip`);
  }

  get toolTip(): Element {
    return new Element(`${this.selector} #tooltip9`);
  }

  async isExpanded(): Promise<boolean> {
    const classAttribute: string = await $(this.selector).getAttribute("class");
    return classAttribute.includes("active");
  }

  async addToQuery(filter: Values, value: string): Promise<void> {
    /**
     * To check if the menu is collapsed/expanded
     */
    if (!(await this.isExpanded())) await this.buttonExpand.click();
    /**
     * submit the form
     */
    await this.filterDropdown.click();
    await this.filterDropdown.selectMenuItem(filter);
    await this.fieldInput.setInputValue(value);
    return this.buttonAddToQuery.click();
  }
}
