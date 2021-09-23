import Button from "../basic/button.component";
import Element from "../basic/element.component";

export default class Order extends Element {
  get buttonVerticalOrder(): Button {
    return new Button(`${this.selector} [data-for="icon-button-tooltip-graph-order-vert"]`);
  }

  get buttonHorizontalOrder(): Button {
    return new Button(`${this.selector} [data-for="icon-button-tooltip-graph-order-hor"]`);
  }
}
