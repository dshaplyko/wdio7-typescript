import { Values } from "../../../config/const";
import Field from "./field.component";
import Element from "./element.component";
import Elements from "./elements.component";
import Button from "./button.component";

export default class Dropdown extends Element {
  get textField(): Field {
    return new Field(`${this.selector} .select__value input`);
  }

  get selectMenu(): Element {
    return new Element(`${this.selector} .select__menu`);
  }

  get buttonsClear(): Elements {
    return new Elements(`${this.selector} .icon-close`);
  }

  get selectMenuItems(): Elements {
    return new Elements(`${this.selector} .select__option`);
  }

  get selectedItems(): Elements {
    return new Elements(`${this.selector} .select__control-selected-value-wrapper`);
  }

  async selectMenuItem(item: Values): Promise<void> {
    const menuItems = await $$(this.selectMenuItems.selector);
    return menuItems[item].click();
  }

  async selectMenuItemByIndex(index: number): Promise<void> {
    const selectMenuExists: boolean = await $(this.selectMenu.selector).isExisting();
    if (!selectMenuExists) await $(this.selector).click();
    return this.selectMenuItems.clickByIndex(index);
  }

  async addSeveralItems(count: number): Promise<void> {
    for (let i: number = 1; i < count; i++) {
      await this.selectMenuItemByIndex(1);
    }
  }
}
