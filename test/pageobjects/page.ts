import LeftPanel from "./components/leftPanel.component";
import MainArea from "./components/mainArea.component";
import Header from "./components/header.component";
import Modal from "./components/modal.component";
import TracesPanel from "./components/mainArea/tracesPanel.component";
import { decodeUrl } from "../utils";

class Page {
  /**
   * Basic components
   */

  get leftPanel(): LeftPanel {
    return new LeftPanel(".side-bar");
  }

  get mainArea(): MainArea {
    return new MainArea(".content.main-region");
  }

  get header(): Header {
    return new Header(".header-wrapper");
  }

  get modal(): Modal {
    return new Modal("#modal-wrapper");
  }

  get tracesPopOut(): TracesPanel {
    return new TracesPanel(".trace-popout");
  }

  openPage(path: string) {
    return browser.url(path);
  }

  async openNewWindow(): Promise<void> {
    const { handle } = await browser.createWindow("window");
    return browser.switchToWindow(handle);
  }

  async refreshPage(): Promise<void> {
    return browser.refresh();
  }

  async isPageOpened(url: string): Promise<boolean> {
    const currentUrl = await browser.getUrl();
    return currentUrl.includes(url);
  }

  async getCurrentUrl(): Promise<string> {
    return browser.getUrl();
  }

  async getDecodedUrl(): Promise<string> {
    const currentUrl: string = await this.getCurrentUrl();
    return decodeUrl(currentUrl);
  }

  async getAllOpenedWindows(): Promise<string[]> {
    return browser.getWindowHandles();
  }

  async switchWindow(index: number, withWait = true): Promise<void> {
    let openedWindows: string[] = await this.getAllOpenedWindows();
    if (withWait) {
      await browser.waitUntil(
        async () => {
          openedWindows = await this.getAllOpenedWindows();
          return openedWindows.length > index - 1;
        },
        {
          timeout: 20000,
          timeoutMsg: "expected new window appears after 20s",
        }
      );
    }
    await browser.switchToWindow(openedWindows[index - 1]);
    await browser.pause(1000);
  }

  async closePopOuts(): Promise<void> {
    const openedWindows: string[] = await this.getAllOpenedWindows();
    if (openedWindows.length > 1) {
      await this.switchWindow(2);
      await browser.closeWindow();
      await this.switchWindow(1, false);
    }
  }
}

export default new Page();
