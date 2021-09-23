// tslint:disable-next-line:variable-name
export const Constants = {
  dropdownValues: ["ExByte", "Trace", "Security"],
};

export enum Values {
  ExByte = 0,
  Trace = 1,
  Security = 2,
}

export enum ExtractorType {
  Id,
  Time,
  Num,
  TimeTo,
  EmptyValue,
  Date,
}

export interface Filter {
  field: string;
  values: string[];
}

enum Button {
  left = 0,
  middle = 1,
  right = 2,
}

export interface ClickObject {
  button?: Button;
  x: number;
  y: number;
}

export type PostData = {
  endTime: string;
  startTime: string;
  searchQuery?: string;
  filters?: Filter[];
};

export type HttpResponse = {
  status: number;
  data: any;
};

export type OSData = {
  os: string;
  button: string;
  message: string;
  tooltipMessage: string;
};

export const nodeInfoItems: string[] = ["machineId", "name", "nodeType"];
export const colorLegendOptions: string[] = [
  "FeedHandler",
  "FETickSender",
  "Tickerplant",
  "ApiPublisher",
  "DistributionNode",
  "MonitorStream",
  "ClientNode",
  "Other",
];
export const defaultQuery = "exbyte=2F20";
export const searchQuery =
  '"MessageType": "BasicDataTableEntry", "Name": "BAP TR - NON-CLEARED - 10k", "ReceiveTime": "2020-06-08T04:10:02.76Z", "Sequence Number"';

export const dateRegexp: RegExp = /(\d){4}-(\d){2}-(\d){2}T(\d){2}:(\d){2}:(\d){2}/g;
export const dayRegexp: RegExp = /(\d){2}/g;
export const emptyValue: RegExp = /(\d){2}:(\d){2}:(\d){2}  -  (\d){2}:(\d){2}:(\d){2}/;
export const timeRegexp: RegExp = /(\d){2}:(\d){2}:(\d){2}/g;
export const idRegexp: RegExp = /(\d|[a-z]){8}-(\d|[a-z]){4}-(\d|[a-z]){4}-(\d|[a-z]){4}-(\d|[a-z]){12}$/;
export const loadingRegexp: RegExp = /No matches in (\d){4} traces/g;
export const emptyValuePeriod = "00:00:00  -  00:00:00";
export const orangeColor = "#f09000";
export const whiteColor = "#ffffff";
export const grayColor = "#9b9b9b";
export const lightBlueColor = "#9fc4fb";
export const weeksNumber = 6;
export const calendarActiveDays = 30;
export const endTimePeriod = 235959;
