"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leftPanel_component_1 = __importDefault(require("./components/leftPanel.component"));
const mainArea_component_1 = __importDefault(require("./components/mainArea.component"));
const header_component_1 = __importDefault(require("./components/header.component"));
const modal_component_1 = __importDefault(require("./components/modal.component"));
const tracesPanel_component_1 = __importDefault(require("./components/mainArea/tracesPanel.component"));
const utils_1 = require("../utils");
class Page {
    /**
     * Basic components
     */
    get leftPanel() {
        return new leftPanel_component_1.default(".side-bar");
    }
    get mainArea() {
        return new mainArea_component_1.default(".content.main-region");
    }
    get header() {
        return new header_component_1.default(".header-wrapper");
    }
    get modal() {
        return new modal_component_1.default("#modal-wrapper");
    }
    get tracesPopOut() {
        return new tracesPanel_component_1.default(".trace-popout");
    }
    openPage(path) {
        return browser.url(path);
    }
    openNewWindow() {
        return __awaiter(this, void 0, void 0, function* () {
            const { handle } = yield browser.createWindow("window");
            return browser.switchToWindow(handle);
        });
    }
    refreshPage() {
        return __awaiter(this, void 0, void 0, function* () {
            return browser.refresh();
        });
    }
    isPageOpened(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUrl = yield browser.getUrl();
            return currentUrl.includes(url);
        });
    }
    getCurrentUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            return browser.getUrl();
        });
    }
    getDecodedUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUrl = yield this.getCurrentUrl();
            return (0, utils_1.decodeUrl)(currentUrl);
        });
    }
    getAllOpenedWindows() {
        return __awaiter(this, void 0, void 0, function* () {
            return browser.getWindowHandles();
        });
    }
    switchWindow(index, withWait = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let openedWindows = yield this.getAllOpenedWindows();
            if (withWait) {
                yield browser.waitUntil(() => __awaiter(this, void 0, void 0, function* () {
                    openedWindows = yield this.getAllOpenedWindows();
                    return openedWindows.length > index - 1;
                }), {
                    timeout: 20000,
                    timeoutMsg: "expected new window appears after 20s",
                });
            }
            yield browser.switchToWindow(openedWindows[index - 1]);
            yield browser.pause(1000);
        });
    }
    closePopOuts() {
        return __awaiter(this, void 0, void 0, function* () {
            const openedWindows = yield this.getAllOpenedWindows();
            if (openedWindows.length > 1) {
                yield this.switchWindow(2);
                yield browser.closeWindow();
                yield this.switchWindow(1, false);
            }
        });
    }
}
exports.default = new Page();
