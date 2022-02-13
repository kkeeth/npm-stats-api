import load from "./request";
import formatResponse from "./formatResponse";

module.exports = {
  stat: (pkg, start, end) => {
    if (!pkg) {
      return Promise.reject().catch(() => formatResponse(400, Error("package name is a required argument")));
    }

    const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${pkg}`;
    return load(url)
      .then(ret => formatResponse(ret.status, ret))
  },
  details: (pkg) => {
    if (!pkg) {
      return Promise.reject().catch(() => formatResponse(400, Error("package name is a required argument")));
    }

    const url = `https://registry.npmjs.org/${pkg}`;
    return load(url)
      .then(ret => formatResponse(ret.status, ret))
  },
};
