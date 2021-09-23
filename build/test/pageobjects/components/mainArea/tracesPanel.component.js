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
const tabsPanel_component_1 = __importDefault(require("./tabsPanel.component"));
const button_component_1 = __importDefault(require("../basic/button.component"));
const element_component_1 = __importDefault(require("../basic/element.component"));
const elements_component_1 = __importDefault(require("../basic/elements.component"));
const field_component_1 = __importDefault(require("../basic/field.component"));
const log_component_1 = __importDefault(require("./log.component"));
class TracesPanel extends element_component_1.default {
    get title() {
        return new element_component_1.default(`${this.selector} .panel-header__title`);
    }
    get panelName() {
        return new element_component_1.default(`${this.selector} [data-for="tooltip1"]`);
    }
    get tabsPanel() {
        return new tabsPanel_component_1.default(".tabs");
    }
    get log() {
        return new log_component_1.default(".trace-content");
    }
    get buttonTrash() {
        return new button_component_1.default(`${this.selector} [data-for="icon-button-tooltip-trash"]`);
    }
    get buttonCollapse() {
        return new button_component_1.default(`${this.selector} [data-for*="icon-button-tooltip-chevron-double"]`);
    }
    get dateStart() {
        return new element_component_1.default(`${this.selector} .date-period-date-start`);
    }
    get timeStart() {
        return new element_component_1.default(`${this.selector} .date-period-time-start`);
    }
    get dateEnd() {
        return new element_component_1.default(`${this.selector} .date-period-date-end`);
    }
    get timeEnd() {
        return new element_component_1.default(`${this.selector} .date-period-time-end`);
    }
    get searchInput() {
        return new field_component_1.default(`${this.selector} .trace-content__search-traces input`);
    }
    get buttonDownload() {
        return new button_component_1.default(`${this.selector} [data-for="icon-button-tooltip-download"]`);
    }
    get buttonPopOut() {
        return new button_component_1.default(`${this.selector} [data-for="icon-button-tooltip-pop-out"]`);
    }
    get buttonPopIn() {
        return new button_component_1.default(`${this.selector} [data-for="icon-button-tooltip-pop-in"]`);
    }
    get downloadOptions() {
        return new elements_component_1.default(`${this.selector} .content-wrapper .button-wrapper`);
    }
    isPanelExpanded() {
        return __awaiter(this, void 0, void 0, function* () {
            const header = yield $(`${this.selector} .collapsible-panel__header`);
            const attribute = yield header.getAttribute("aria-expanded");
            return attribute === "true" ? true : false;
        });
    }
    waitUntilCollapsed(state) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser.waitUntil(() => __awaiter(this, void 0, void 0, function* () {
                if (state)
                    return !(yield this.isPanelExpanded());
                yield browser.pause(1000);
                return yield this.isPanelExpanded();
            }), {
                timeout: 20000,
                timeoutMsg: "the tab is not expanded/collapsed after 20s",
            });
        });
    }
}
exports.default = TracesPanel;
