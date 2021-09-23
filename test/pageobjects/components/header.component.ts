import Button from "./basic/button.component";
import Element from "./basic/element.component";

export default class Header extends Element {
  get buttonCopyUrl(): Button {
    return new Button(`${this.selector} .copy-button`);
  }

  get buttonShowPath(): Button {
    return new Button(`${this.selector} .switch__track`);
  }

  get copyTooltip(): Element {
    return new Element(`${this.selector} [id*='copy-button']`);
  }
}
