import Button from "../basic/button.component";
import Element from "../basic/element.component";
import Elements from "../basic/elements.component";
import Field from "../basic/field.component";
import { calendarActiveDays } from "../../../config/const";
export default class Calendar extends Element {
  get buttonApply(): Button {
    return new Button(`${this.selector} button.calendar__apply-button`);
  }

  get buttonNextTimePeriod(): Button {
    return new Button(`${this.selector} button[data-for="icon-button-tooltip-single-arrow-right"]`);
  }

  get weekRows(): Elements {
    return new Elements(`${this.selector} .react-datepicker__week`);
  }

  get firstDayOfCalendar(): Element {
    return new Element(
      `${this.selector} .react-datepicker__week:nth-of-type(1) .react-datepicker__day:nth-of-type(1)[aria-label*="1st"]`
    );
  }

  get lastDayOfPreviousMonth(): Element {
    return new Element(`${this.selector} .react-datepicker__week:nth-of-type(6) .react-datepicker__day:nth-of-type(7)`);
  }

  get previousMonth(): Button {
    return new Button(`${this.selector} button[data-for="icon-button-tooltip-single-arrow-up"]`);
  }

  get nextMonth(): Button {
    return new Button(`${this.selector} button[data-for="icon-button-tooltip-single-arrow-down"]`);
  }

  get timePeriodField(): Field {
    return new Field(`${this.selector} .calendar__time-wrapper`);
  }

  get timePeriodArrowRight(): Button {
    return new Button(`${this.selector} button[data-for="icon-button-tooltip-single-arrow-right"]`);
  }

  get timePeriodArrowLeft(): Button {
    return new Button(`${this.selector} button[data-for="icon-button-tooltip-single-arrow-left"]`);
  }

  get selectedMonthYear(): Element {
    return new Element(`${this.selector} .calendar-header__title`);
  }

  get todayDay(): Element {
    return new Element(`${this.selector} .react-datepicker__day--today`);
  }

  get everyDay(): Element {
    return new Element(`${this.selector} .react-datepicker__day`);
  }

  get selectedMonth(): Element {
    return new Element(`${this.selector} .react-datepicker__month`);
  }

  get inputPeriodFromTo(): Field {
    return new Field(`${this.selector} input.masked-input`);
  }

  get activeDays(): Elements {
    return new Elements(`${this.selector} .react-datepicker__day[aria-disabled="false"]`);
  }

  get disabledDay(): Elements {
    return new Elements(`${this.selector} .react-datepicker__day--disabled`);
  }

  async getTextPreviousDay(): Promise<string> {
    const element: WebdriverIO.Element = await this.todayDay.previousElement();
    await element.waitForExist();
    return element.getText();
  }

  async nextElementColor(): Promise<string> {
    const nextDay: WebdriverIO.Element = await this.todayDay.nextElement();
    const color = await nextDay.getCSSProperty("color");
    return color.parsed.hex;
  }

  async clickPreviousDay(): Promise<void> {
    const dayToday: number = parseInt(await this.todayDay.getText());

    if (dayToday === 1) {
      await this.previousMonth.click();
      await this.lastDayOfPreviousMonth.click();
    } else {
      const previousDay: WebdriverIO.Element = await this.todayDay.previousElement();
      await previousDay.waitForExist();
      return previousDay.click();
    }
  }
  async clickNextDay(): Promise<void> {
    const nextDay: WebdriverIO.Element = await this.todayDay.nextElement();
    await nextDay.click();
  }

  async getActiveDaysCount(): Promise<number> {
    const activeDaysCurrentMonth: number = await this.activeDays.getElementsCount();

    if (activeDaysCurrentMonth < calendarActiveDays) {
      await this.previousMonth.click();
      return this.activeDays.getElementsCount();
    }

    return activeDaysCurrentMonth;
  }
}
