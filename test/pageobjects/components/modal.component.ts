import Button from "./basic/button.component";
import Element from "./basic/element.component";

export default class Modal extends Element {
  get buttonOverwrite(): Button {
    return new Button(`${this.selector} .ui-button.large.primary`);
  }

  get buttonClear(): Button {
    return new Button(`${this.selector} .ui-button.large.primary`);
  }

  get buttonSkip(): Button {
    return new Button(`${this.selector} .ui-button.default`);
  }

  get buttonCancel(): Button {
    return new Button(`${this.selector} .ui-button.default`);
  }

  get buttonClose(): Button {
    return new Button(`${this.selector} button.close-button`);
  }

  get content(): Element {
    return new Element(`${this.selector} .confirm-content__text`);
  }
}
