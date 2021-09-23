import { expect } from "chai";
import { verifyDatesRange, getTimeInterval, getCurrentDateSecondsAhead } from "./date";
import Protocol from "devtools-protocol";
import { PostData, HttpResponse } from "../config/const";
import axios, { AxiosResponse, AxiosError, Method } from "axios";

export const captureRequest = async (url: string): Promise<PostData> => {
  const puppeteer = await browser.getPuppeteer();
  const page = (await puppeteer.pages())[0];
  await page.setRequestInterception(true);

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(async () => {
      page.removeAllListeners("request");
      await page.setRequestInterception(false);
      reject("no such request");
    }, 2000);

    const handler = async (request) => {
      clearTimeout(timeout);
      if ((await request.url()).includes(url)) {
        resolve(JSON.parse(await request.postData()));
      } else {
        reject("no such request");
      }
      await page.setRequestInterception(false);
    };
    page.once("request", handler);
  });
};

export const verifyDataflowRequest = (request: any, stringToCheck: string): void => {
  expect(request.searchQuery).to.include(stringToCheck);
  verifyDatesRange([request.startTime, request.endTime]);
};

export const verifyFetchRequest = (request: any, searchString: string, selectedNote: string): void => {
  expect(getTimeInterval(request.startTime, request.endTime), "The time interval is incorrect").to.equal(5);
  expect(
    request.filters[0].field + " " + request.filters[0].values,
    "The request does not contain the selected item"
  ).to.include(searchString);
  expect(request.filters[1].values, "The request does note include the selected node").to.include(selectedNote);
};

export const getNodesFetchRequest = (request: any): string[] => {
  return request.filters[1].values;
};

export const emulateNetworkError = async (request: string, statusMessage: Protocol.Network.ErrorReason) => {
  const mock = await browser.mock("**" + request, {
    method: "post",
  });

  mock.abortOnce(statusMessage);
};

export const sendRequest = async (url: string, data: any, method: Method = "post"): Promise<HttpResponse> => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: `${browser.options.baseUrl}/shipwreck/v1/${url}`,
      headers: {},
      data: data,
    })
      .then((response: AxiosResponse) => {
        resolve({
          status: response.status,
          data: response.data,
        });
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getNodesFromTheResponse = async (searchQuery: string): Promise<string[]> => {
  const response: HttpResponse = await sendRequest("dataflow", {
    endTime: getCurrentDateSecondsAhead(5),
    searchQuery: searchQuery,
    startTime: getCurrentDateSecondsAhead(),
  });
  return response.data[0].nodes.map((node) => node.nodeType);
};

export const getFetchResponse = async (searchQuery: string): Promise<string[]> => {
  const response: HttpResponse = await sendRequest("trace", {
    endTime: getCurrentDateSecondsAhead(5),
    filters: [
      {
        field: "",
        values: [],
      },
    ],
    startTime: getCurrentDateSecondsAhead(),
  });
  return response.data[0].nodes.map((node) => node.nodeType);
};
