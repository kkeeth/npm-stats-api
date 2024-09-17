const {stat, details} = require("../").npm;

jest.disableAutomock();

describe("Throw exception error", () => {
  test("stat method: should receive 500 error when there is a network error", () => {
    const error = {
      body: {
        code: "ENOTFOUND",
        errno: -3008,
        hostname: "api.npmjs.org",
        message: "getaddrinfo ENOTFOUND api.npmjs.org",
        response: undefined,
        syscall: "getaddrinfo"
      },
      message: "getaddrinfo ENOTFOUND api.npmjs.org",
      name: "NpmException",
      statusCode: 500
    };

    // Name the module "network" to explicitly return stubs
    // for network error patterns.
    return expect(stat("network")).rejects.toEqual(error);
  });

  test("stat method: should receive 404 error when a non-existent package name is passed it", () => {
    const error = {
      message: "Not Found",
      name: "NpmException",
      statusCode: 404,
      body: {
        path: "/downloads/point/2022-01-01:2022-02-15/hoge",
        error: "package hoge is not found"
      }
    };

    return expect(stat("hoge", "2022-01-01", "2022-02-15")).rejects.toEqual(
      error
    );
  });

  test("stat method: should receive 400 error when an arbitrary string is passed for start date", () => {
    const error = {
      message: "Bad Request",
      name: "NpmException",
      statusCode: 400,
      body: {
        path: "/downloads/point/hoge:2022-02-15/npm-stats-api",
        error: "invalid date"
      }
    };

    return expect(stat("npm-stats-api", "hoge", "2022-02-15")).rejects.toEqual(
      error
    );
  });

  test("stat method: should receive 400 error when an arbitrary string is passed for end date", () => {
    const error = {
      message: "Bad Request",
      name: "NpmException",
      statusCode: 400,
      body: {
        path: "/downloads/point/2022-01-01:hoge/npm-stats-api",
        error: "invalid date"
      }
    };

    return expect(stat("npm-stats-api", "2022-01-01", "hoge")).rejects.toEqual(
      error
    );
  });

  test("details method: should receive 500 error when there is a network error", () => {
    const error = {
      body: {
        code: "ENOTFOUND",
        errno: -3008,
        hostname: "api.npmjs.org",
        message: "getaddrinfo ENOTFOUND api.npmjs.org",
        response: undefined,
        syscall: "getaddrinfo"
      },
      message: "getaddrinfo ENOTFOUND api.npmjs.org",
      name: "NpmException",
      statusCode: 500
    };

    // Name the module "network" to explicitly return stubs
    // for network error patterns.
    return expect(details("network")).rejects.toEqual(error);
  });
});

describe("Patterns that process normally", () => {
  test("stat method: should receive 200 ok when a existent package name, valid start date and end date are passed it", () => {
    const actual = {
      statusCode: 200,
      body: {
        downloads: 628,
        start: "2022-01-01",
        end: "2022-02-15",
        package: "npm-stats-api"
      }
    };

    return expect(
      stat("npm-stats-api", "2022-01-01", "2022-02-15")
    ).resolves.toEqual(actual);
  });

  test("details method: should receive 200 ok when a existent package name is passed it", () => {
    const actual = {
      statusCode: 200,
      body: {
        "dist-tags": {
          latest: "2.1.2"
        },
        license: "MIT",
        name: "npm-stats-api"
      }
    };

    return expect(details("npm-stats-api")).resolves.toEqual(actual);
  });
});
