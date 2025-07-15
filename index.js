'use strict';

require('core-js/stable');
var request = require('superagent');

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return _assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var NpmException = /** @class */ (function () {
    function NpmException(err) {
        // Type assertion for pragmatic implementation while maintaining unknown in public API
        var superagentErr = err;
        this.message = superagentErr.message || 'Unknown error';
        this.name = 'NpmException';
        this.statusCode = 500; // default value
        this.body = {}; // default value
        // Network errors have response: undefined, API errors have response with error object
        if (!superagentErr.response || superagentErr.response === undefined) {
            this.statusCode = 500;
            this.body = _assign({}, superagentErr);
        }
        else if (superagentErr.status && Number(superagentErr.status) >= 400) {
            var error = superagentErr.response.error;
            this.statusCode = superagentErr.status;
            this.body = _assign({ path: error.path }, JSON.parse(error.text));
        }
    }
    return NpmException;
}());

// Timeout configuration
var TIMEOUT_CONFIG = {
    response: 3 * 1000,
    deadline: 5 * 1000,
};
/**
 * Body module that calls the API
 *
 * @param {String} url: request URL with params
 * @returns {Object} object from npm API status code and response body
 */
var load = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, statusCode, body, err_1, obj;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, request
                        .get(url)
                        .timeout(TIMEOUT_CONFIG)];
            case 1:
                _a = _b.sent(), statusCode = _a.statusCode, body = _a.body;
                return [2 /*return*/, {
                        statusCode: statusCode,
                        body: body,
                    }];
            case 2:
                err_1 = _b.sent();
                obj = new NpmException(err_1);
                throw obj;
            case 3: return [2 /*return*/];
        }
    });
}); };

/**
 * Get module stats
 *
 * @param {String} pkg: module name
 * @param {String} start: Start date of search period
 * @param {String} end: End date of search period
 * @returns Promise object
 */
var stat = function (pkg, start, end) {
    var url = "https://api.npmjs.org/downloads/point/".concat(start, ":").concat(end, "/").concat(pkg ? pkg : "");
    return load(url);
};
/**
 * Get module detail info
 *
 * @param {String} pkg: module name
 * @returns Promise object
 */
var details = function (pkg) {
    var url = "https://registry.npmjs.org/".concat(pkg ? pkg : "");
    return load(url);
};

var npm = /*#__PURE__*/Object.freeze({
    __proto__: null,
    details: details,
    stat: stat
});

exports.npm = npm;
//# sourceMappingURL=index.js.map
