const usual200 = details =>
  details
    ? {
        statusCode: 200,
        body: {
          name: "npm-stats-api",
          "dist-tags": { latest: "1.2.2" },
          license: "MIT"
        }
      }
    : {
        statusCode: 200,
        body: {
          downloads: 1053,
          start: "2018-01-01",
          end: "2019-05-01",
          package: "check-stats-modules"
        }
      };

const error400 = start => ({
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
  get: urlStr => {
    const { pkg, start, end } = getParams(urlStr);
    const isDetails = /registry/.test(urlStr);
    return {
      timeout: () => {
        if (start === "hoge" || end === "hoge")
          throw error400(start === "hoge");
        if (pkg === "hoge") throw error404;
        if (pkg === "network") throw error500;
        return usual200(isDetails);
      }
    };
  }
};

const getParams = url => {
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
