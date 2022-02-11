const npm = require("../lib/npm");

describe("throw error pattern", () => {
  test("should throw error when any variables are not passed it", () => {
    expect(() => npm.load()).toThrow(
      "request URL is a required argument"
    );
  });

  test("should throw error when invalid url is passed but cb is not passed it", () => {
    expect(() => npm.load("hogehoge")).toThrow(
      "callback function is a required argument"
    );
  });

  test("should throw error when valid url is passed but cb is not passed it", () => {
    expect(() => npm.load(
      "https://api.npmjs.org/downloads/point/2020-01-01:2020-08-01/npm-stats-api"
    )).toThrow(
      "callback function is a required argument"
    );
  });

  test("should throw error when invalid url and cb are passed it", () => {
    expect(() => npm.load("hogehoge", () => {})).toThrow(
      "getaddrinfo ENOTFOUND hogehoge"
    );
  });


  test("should throw error when url is not passed and cb is passed it", () => {
    expect(() => npm.load(undefined, () => {})).toThrow(
      "request URL is a required argument"
    );
  });
});

// The stat and details method simply calls the load method,
// so we don't need to write a test case.
