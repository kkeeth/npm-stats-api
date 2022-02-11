import load from "./request"

const checkProperties = (pkg, cb) => {
  if (!pkg) {
    throw new Error("package name is a required argument");
  }
  if (!cb) {
    throw new Error("callback function is a required argument");
  }
}

module.exports = {
  stat: (pkg, start, end, cb) => {
    checkProperties(pkg, cb);

    const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${pkg}`;
    load(url, cb);
  },
  details: (pkg, cb) => {
    checkProperties(pkg, cb);

    const url = `https://registry.npmjs.org/${pkg}`;
    load(url, cb);
  },
};
