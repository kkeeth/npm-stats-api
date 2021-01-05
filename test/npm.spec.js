import npm from "../lib/npm";
import test from "ava";

test("check the operation of ava", (t) => {
  t.pass();
});

test("should throw error when any variables are not passed it", (t) => {
  t.throws(() => npm.load(), "callback function is a required argument");
});

test("should throw error when invalid url is passed but cb is not passed it", (t) => {
  t.throws(
    () => npm.load("hogehoge"),
    "callback function is a required argument"
  );
});

test("should throw error when invalid url and cb are passed it", (t) => {
  t.throws(() => npm.load("hogehoge", () => {}), 'Invalid URI "hogehoge"');
});

test("should throw error when valid url is passed but cb is not passed it", (t) => {
  t.throws(
    () =>
      npm.load(
        "https://api.npmjs.org/downloads/point/2020-01-01:2020-08-01/npm-stats-api"
      ),
    "callback function is a required argument"
  );
});

test("should throw error when url is not passed and cb is passed it", (t) => {
  t.throws(
    () => npm.load(undefined, () => {}),
    "options.uri is a required argument"
  );
});

test.cb(
  "should return download stat when valid variables are passed it",
  (t) => {
    const expectValues = {
      downloads: 197,
      start: "2020-01-01",
      end: "2020-08-01",
      package: "npm-stats-api",
    };
    const expectError = null;
    npm.load(
      "https://api.npmjs.org/downloads/point/2020-01-01:2020-08-01/npm-stats-api",
      (err, res) => {
        t.is(err, expectError);
        t.is(res.downloads, expectValues.downloads);
        t.is(res.start, expectValues.start);
        t.is(res.end, expectValues.end);
        t.is(res.package, expectValues.package);
        t.end();
      }
    );
  }
);

// The stat and details method simply calls the load method,
// so we don't need to write a test case.
