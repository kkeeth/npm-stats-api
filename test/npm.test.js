const load = require("../lib/request");
const { stat, details } = require("../lib/npm");

describe("throw error pattern", () => {
  test("load method: should throw error when any variables are not passed it", () => {
    expect(() => load()).toThrow(
      "request URL is a required argument"
    );
  });

  test("load method: should throw error when invalid url is passed but cb is not passed it", () => {
    expect(() => load("hogehoge")).toThrow(
      "callback function is a required argument"
    );
  });

  test("load method: should throw error when valid url is passed but cb is not passed it", () => {
    expect(() => load(
      "https://api.npmjs.org/downloads/point/2020-01-01:2020-08-01/npm-stats-api"
    )).toThrow(
      "callback function is a required argument"
    );
  });

  test("load method: should throw error when invalid url and cb are passed it", () => {
    expect(() => load("hogehoge", () => {})).toThrow(
      "getaddrinfo ENOTFOUND hogehoge"
    );
  });


  test("load method: should throw error when url is not passed and cb is passed it", () => {
    expect(() => load(undefined, () => {})).toThrow(
      "request URL is a required argument"
    );
  });

  test("stat method: should throw error when any variables are not passed it", () => {
    expect(() => stat()).toThrow(
      "package name is a required argument"
    );
  });

  test("stat method: should throw error when package name is passed but cb is not passed it", () => {
    expect(() => stat("check-stats-modules")).toThrow(
      "callback function is a required argument"
    );
  });

  test("details method: should throw error when any variables are not passed it", () => {
    expect(() => details()).toThrow(
      "package name is a required argument"
    );
  });

  test("details method: should throw error when package name is passed but cb is not passed it", () => {
    expect(() => details("check-stats-modules")).toThrow(
      "callback function is a required argument"
    );
  });
});

describe("application error pattern", () => {
  test("load method: should throw error when any variables are not passed it", () => {
    expect(() => load()).toThrow(
      "request URL is a required argument"
    );
  });
});
