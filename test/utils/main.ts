import urlencode from "urlencode";
import { platform } from "os";
import { idRegexp, dateRegexp, dayRegexp, timeRegexp, OSData, emptyValue, ExtractorType } from "../config/const";

export const doesEveryItemContains = (arr: string[], isCaseInsensitive: boolean, toInclude: string): boolean => {
  return arr.every((item) => {
    if (isCaseInsensitive) item = item.toLowerCase();
    return item.includes(toInclude);
  });
};

export const sortArrayAlphabetically = (arr: string[]): string[] => {
  return arr.sort((a, b) => a.localeCompare(b));
};

export const regexpMap = {
  [ExtractorType.Id]: (str: string) => str.match(idRegexp)[0],
  [ExtractorType.Time]: (str: string) => str.match(timeRegexp)[0],
  [ExtractorType.Num]: (str: string) => str.match(dayRegexp)[3],
  [ExtractorType.TimeTo]: (str: string) => str.match(timeRegexp)[1],
  [ExtractorType.EmptyValue]: (str: string) => str.match(emptyValue)[0],
  [ExtractorType.Date]: (str: string) => str.match(dateRegexp)[0],
};

export const decodeUrl = (url: string): string => {
  return urlencode.decode(url);
};

export const getOSData = (): OSData => {
  const pform: string = platform();

  return pform === "darwin"
    ? {
        os: "MacOS",
        button: "Meta",
        message: "cmd+click on node",
        tooltipMessage: "cmd+select area to select group of nodes",
      }
    : {
        os: "Win or Linux",
        button: "Control",
        message: "ctrl+click on node",
        tooltipMessage: "ctrl+select area to select group of nodes",
      };
};

export const rgbToHex = (value: string): string => {
  const rgbColor: string[] = value.match(/(\d{2,3})/g);
  const [r, g, b] = [parseInt(rgbColor[0]), parseInt(rgbColor[1]), parseInt(rgbColor[2])];
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

export const generateFileName = (nodeName: string, dateFrom: string, dateTo: string, type: string): string => {
  const fileName: string = `${nodeName} ${dateFrom} ${dateTo}`;
  return fileName.replace(/( |:)/g, "_") + `_search-results.${type}`;
};
