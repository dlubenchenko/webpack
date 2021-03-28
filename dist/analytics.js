(self["webpackChunk"] = self["webpackChunk"] || []).push([["analytics"],{

/***/ "./analytics.ts":
/*!**********************!*\
  !*** ./analytics.ts ***!
  \**********************/
/***/ (function() {

function createAnalytics() {
  var counter = 0;
  var destroyed = false;

  var listener = function listener() {
    return counter++;
  };

  document.addEventListener('click', listener);
  return {
    destroy: function destroy() {
      document.removeEventListener('click', listener);
      destroyed = true;
    },
    getClicks: function getClicks() {
      if (destroyed) {
        return "Analytics is destroyed. Total clicks = ".concat(counter);
      }

      return counter;
    }
  };
}

window['analytics'] = createAnalytics();

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./analytics.ts"));
/******/ }
]);
//# sourceMappingURL=analytics.js.map