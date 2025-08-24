import { stat, details, NpmException } from "../";

jest.disableAutomock();

// リクエストモジュールをモック化
jest.mock('../src/lib/request', () => ({
  fetchData: jest.fn((url: string) => {
    // Handle network error mock
    if (url.includes('network')) {
      throw {
        message: "getaddrinfo ENOTFOUND api.npmjs.org",
        code: "ENOTFOUND",
        errno: -3008,
        syscall: "getaddrinfo",
        hostname: "api.npmjs.org",
      };
    }

    // Handle 404 error mock
    if (url.includes('/hoge')) {
      throw {
        status: 404,
        message: "Not Found",
        response: {
          error: {
            path: url,
            text: JSON.stringify({ error: "package hoge is not found" })
          }
        }
      };
    }

    // Handle invalid date error mock for start date
    if (url.includes('hoge:2022-02-15')) {
      throw {
        status: 400,
        message: "Bad Request",
        response: {
          error: {
            path: url,
            text: JSON.stringify({ error: "invalid date" })
          }
        }
      };
    }

    // Handle invalid date error mock for end date
    if (url.includes('2022-01-01:hoge')) {
      throw {
        status: 400,
        message: "Bad Request",
        response: {
          error: {
            path: url,
            text: JSON.stringify({ error: "invalid date" })
          }
        }
      };
    }

    // Handle valid responses
    if (url.includes('npm-stats-api') && url.includes('downloads')) {
      return {
        statusCode: 200,
        body: {
          downloads: 628,
          start: "2022-01-01",
          end: "2022-02-15",
          package: "npm-stats-api"
        }
      };
    }

    if (url.includes('npm-stats-api') && url.includes('registry')) {
      return {
        statusCode: 200,
        body: {
          "dist-tags": {
            latest: "2.1.2"
          },
          license: "MIT",
          name: "npm-stats-api"
        }
      };
    }

    return {};
  })
}));

describe("Throw exception error", () => {
  test("stat method: should receive 500 error when there is a network error", async () => {
    expect.assertions(1);
    try {
      await stat("network", "2022-01-01", "2022-02-15");
    } catch (error) {
      expect(error).toMatchObject({
        name: "NpmException",
        statusCode: 500,
        body: expect.objectContaining({
          message: expect.stringContaining("ENOTFOUND")
        })
      });
    }
  });

  test("stat method: should receive 404 error when a non-existent package name is passed it", async () => {
    expect.assertions(1);
    try {
      await stat("hoge", "2022-01-01", "2022-02-15");
    } catch (error) {
      expect(error).toMatchObject({
        name: "NpmException",
        statusCode: 404,
        body: expect.objectContaining({
          error: expect.stringContaining("not found")
        })
      });
    }
  });

  test("stat method: should receive 400 error when an arbitrary string is passed for start date", async () => {
    expect.assertions(1);
    try {
      await stat("npm-stats-api", "hoge", "2022-02-15");
    } catch (error) {
      expect(error).toMatchObject({
        name: "NpmException",
        statusCode: 400,
        body: expect.objectContaining({
          error: "invalid date"
        })
      });
    }
  });

  test("stat method: should receive 400 error when an arbitrary string is passed for end date", async () => {
    expect.assertions(1);
    try {
      await stat("npm-stats-api", "2022-01-01", "hoge");
    } catch (error) {
      expect(error).toMatchObject({
        name: "NpmException",
        statusCode: 400,
        body: expect.objectContaining({
          error: "invalid date"
        })
      });
    }
  });

  test("details method: should receive 500 error when there is a network error", async () => {
    expect.assertions(1);
    try {
      await details("network");
    } catch (error) {
      expect(error).toMatchObject({
        name: "NpmException",
        statusCode: 500,
        body: expect.objectContaining({
          message: expect.stringContaining("ENOTFOUND")
        })
      });
    }
  });

  test("stat method: should throw Error if package name is missing", async () => {
    await expect(stat("", "2022-01-01", "2022-02-15")).rejects.toThrow("Package name is required");
  });

  test("stat method: should throw Error if dates are missing", async () => {
    await expect(stat("npm-stats-api", "", "")).rejects.toThrow("Start and end dates are required");
  });

  test("details method: should throw Error if package name is missing", async () => {
    await expect(details("")).rejects.toThrow("Package name is required");
  });
});

describe("Patterns that process normally", () => {
  test("stat method: should receive 200 ok when a existent package name, valid start date and end date are passed it", async () => {
    const actual = {
      statusCode: 200,
      body: {
        downloads: 628,
        start: "2022-01-01",
        end: "2022-02-15",
        package: "npm-stats-api"
      }
    };

    await expect(stat("npm-stats-api", "2022-01-01", "2022-02-15")).resolves.toEqual(actual);
  });

  test("details method: should receive 200 ok when a existent package name is passed it", async () => {
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

    await expect(details("npm-stats-api")).resolves.toEqual(actual);
  });
});
