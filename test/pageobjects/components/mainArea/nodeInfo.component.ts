import Element from "../basic/element.component";
import Elements from "../basic/elements.component";
import Button from "../basic/button.component";

export default class NodeInfo extends Element {
  get buttonClose(): Button {
    return new Button(`${this.selector} .ui-button`);
  }

  get infoListItems(): Elements {
    return new Elements(`${this.selector} .info-list__item`);
  }

  get infoListContents(): Elements {
    return new Elements(`${this.selector} .info-list__content`);
  }
}
