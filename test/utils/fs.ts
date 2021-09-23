import path from "path";
import fs from "fs";
import csv from "csvtojson";

export async function waitForFileExists(filePath: string, timeout: number) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      watcher.close();
      reject(new Error("File did not exists and was not created during the timeout."));
    }, timeout);

    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (!err) {
        clearTimeout(timer);
        watcher.close();
        resolve("");
      }
    });

    const dir = path.dirname(filePath);
    const basename = path.basename(filePath);
    const watcher = fs.watch(dir, (eventType, filename) => {
      if (eventType === "rename" && filename === basename) {
        clearTimeout(timer);
        watcher.close();
        resolve("");
      }
    });
  });
}

export const rmdir = (dir: string) => {
  const list = fs.readdirSync(dir);
  for (let i: number = 0; i < list.length; i++) {
    const filename = path.join(dir, list[i]);
    const stat = fs.statSync(filename);
    stat.isDirectory() ? rmdir(filename) : fs.unlinkSync(filename);
  }
  fs.rmdirSync(dir);
};

export const readFile = async (fileName: string) => {
  const filePath = path.join(global.downloadDir, fileName);
  browser.call(async () => await waitForFileExists(filePath, 60000));
  return fileName.includes(".json") ? JSON.parse(fs.readFileSync(filePath, "utf-8")) : csv().fromFile(filePath);
};
