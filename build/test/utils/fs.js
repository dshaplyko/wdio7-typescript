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
exports.readFile = exports.rmdir = exports.waitForFileExists = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const csvtojson_1 = __importDefault(require("csvtojson"));
function waitForFileExists(filePath, timeout) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                watcher.close();
                reject(new Error("File did not exists and was not created during the timeout."));
            }, timeout);
            fs_1.default.access(filePath, fs_1.default.constants.R_OK, (err) => {
                if (!err) {
                    clearTimeout(timer);
                    watcher.close();
                    resolve("");
                }
            });
            const dir = path_1.default.dirname(filePath);
            const basename = path_1.default.basename(filePath);
            const watcher = fs_1.default.watch(dir, (eventType, filename) => {
                if (eventType === "rename" && filename === basename) {
                    clearTimeout(timer);
                    watcher.close();
                    resolve("");
                }
            });
        });
    });
}
exports.waitForFileExists = waitForFileExists;
const rmdir = (dir) => {
    const list = fs_1.default.readdirSync(dir);
    for (let i = 0; i < list.length; i++) {
        const filename = path_1.default.join(dir, list[i]);
        const stat = fs_1.default.statSync(filename);
        stat.isDirectory() ? (0, exports.rmdir)(filename) : fs_1.default.unlinkSync(filename);
    }
    fs_1.default.rmdirSync(dir);
};
exports.rmdir = rmdir;
const readFile = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(global.downloadDir, fileName);
    browser.call(() => __awaiter(void 0, void 0, void 0, function* () { return yield waitForFileExists(filePath, 60000); }));
    return fileName.includes(".json") ? JSON.parse(fs_1.default.readFileSync(filePath, "utf-8")) : (0, csvtojson_1.default)().fromFile(filePath);
});
exports.readFile = readFile;
