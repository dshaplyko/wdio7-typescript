import Element from "../basic/element.component";
import Spinner from "../basic/spinner.component";
import Button from "../basic/button.component";
import Elements from "../basic/elements.component";

export default class Log extends Element {
  get timeStamps(): Elements {
    return new Elements(`${this.selector} .log-timestamp`);
  }

  get logData(): Elements {
    return new Elements(`${this.selector} .log-data`);
  }

  get highlightedText(): Elements {
    return new Elements(`${this.selector} mark.highlighted-text`);
  }

  get noResultsLabel(): Element {
    return new Element(`${this.selector} .trace-log__load-more-container`);
  }

  get buttonContinueSearch(): Button {
    return new Button(`${this.selector} button.trace-log__load-more-btn`);
  }

  get buttonStopSearch(): Button {
    return new Button(`${this.selector} [data-testid='spinner-icon-button']`);
  }

  get spinner(): Spinner {
    return new Spinner(`${this.selector} .spinner__wrapper`);
  }

  async waitUntilLogLoaded(): Promise<void> {
    await browser.waitUntil(async () => (await this.timeStamps.getTextArray())[0] !== undefined, {
      timeout: 25000,
      timeoutMsg: "expected log appears after 25s",
    });
  }

  async waitUntilLogContainsQuery(query: string): Promise<void> {
    await browser.waitUntil(
      async () => {
        const searchResults: string[] = await this.highlightedText.getTextArray();
        return searchResults[0].includes(query);
      },
      {
        timeout: 25000,
        timeoutMsg: "expected results are changed after 25s",
      }
    );
  }
}
