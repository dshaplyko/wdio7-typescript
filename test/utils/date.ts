import { expect } from "chai";
import moment from "moment";

export const getTimeInterval = (dateFrom: string, dateTo: string): number => {
  const dateFromParsed: number = +new Date(dateFrom.split(" ")[0]);
  const dateToParsed: number = +new Date(dateTo);
  const diffTime: number = Math.abs(dateToParsed - dateFromParsed) / (1000 * 60);

  return diffTime;
};

export const verifyDatesRange = (dates: string[]): void => {
  dates.forEach((date) =>
    expect(moment(date).toNow(), `The range for ${date} is not valid`).to.equal("in a few seconds")
  );
};

export const verifyDatesValid = (dates: string[]): void => {
  dates.forEach((date) =>
    expect(moment(date, true).format(), `The value ${date} is not a date`).not.to.equal("Invalid date")
  );
};

export const getCurrentDateSecondsAhead = (seconds: number = 0): Date => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + seconds);
  return date;
};
