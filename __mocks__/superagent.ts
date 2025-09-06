const version = require("../package.json").version;

const usual200 = (details: boolean) => {
  return details
    ? {
        statusCode: 200,
        body: {
          name: "npm-stats-api",
          "dist-tags": { latest: version },
          license: "MIT"
        }
      }
    : {
        statusCode: 200,
        body: {
          downloads: 628,
          start: "2022-01-01",
          end: "2022-02-15",
          package: "npm-stats-api"
        }
      };
    }
const error400 = (start: boolean) => ({
  message: "Bad Request",
  status: 400,
  response: {
    error: {
      statusCode: 400,
      path: `/downloads/point/${
        start ? "hoge:2022-02-15" : "2022-01-01:hoge"
      }/npm-stats-api`,
      text: JSON.stringify({ error: "invalid date" })
    }
  }
});

const error404 = {
  message: "Not Found",
  status: 404,
  response: {
    error: {
      statusCode: 404,
      path: "/downloads/point/2022-01-01:2022-02-15/hoge",
      text: JSON.stringify({ error: "package hoge is not found" })
    }
  }
};

const error500 = {
  message: "getaddrinfo ENOTFOUND api.npmjs.org",
  errno: -3008,
  code: "ENOTFOUND",
  syscall: "getaddrinfo",
  hostname: "api.npmjs.org",
  response: undefined
};

const superagent = {
  get: (urlStr: string) => {
    const { pkg, start, end } = getParams(urlStr);
    const isDetails = /registry/.test(urlStr);
    return {
      timeout: () => {
        if (pkg === "network") throw error500;
        if (start === "hoge" || end === "hoge")
          throw error400(start === "hoge");
        if (pkg === "hoge") throw error404;
        if (pkg === "network") throw error500;
        return usual200(isDetails);
      }
    };
  }
};

const getParams = (url: string) => {
  const params = url.split("/");
  const pkg = params[params.length - 1];
  const [start, end] = params[params.length - 2].split(":");
  return {
    pkg,
    start,
    end
  };
};
module.exports = superagent;
