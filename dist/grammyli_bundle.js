(function (modules) {
  const require = (id) => {
    let [fn, mapping] = modules[id];
    const localRequire = (name) => {
      return require(mapping[name]);
    };
    const localModule = {
      exports: {},
    };
    fn(localRequire, localModule, localModule.exports);
    return localModule.exports;
  };

  require(1);
})({
  1: [
    function (require, module, exports) {
      "use strict";

      var _utils = _interopRequireDefault(require("./helper/utils.js"));
      var _dom = _interopRequireDefault(require("./helper/dom.js"));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var bindEventLogin = function bindEventLogin() {
        var button = (0, _dom["default"])("#id-button-login");
        var box = (0, _dom["default"])(".grammy-box");
        button.addEventListener("click", function (event) {
          box.classList.add("pink");
          (0, _utils["default"])("hello world");
        });
      };
      var bindEvents = function bindEvents() {
        bindEventLogin();
      };
      var __main = function __main() {
        bindEvents();
      };
      __main();
    },
    { "./helper/utils.js": 2, "./helper/dom.js": 3 },
  ],

  2: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports["default"] = void 0;
      var log = console.log.bind(console);
      log("in utils");
      var _default = log;
      exports["default"] = _default;
    },
    {},
  ],

  3: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports["default"] = void 0;
      var e = function e(selector) {
        return document.querySelector(selector);
      };
      var _default = e;
      exports["default"] = _default;
    },
    {},
  ],
});
