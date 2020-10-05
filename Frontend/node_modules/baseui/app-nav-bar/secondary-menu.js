"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AppNavBar;

var React = _interopRequireWildcard(require("react"));

var _index = require("../layout-grid/index.js");

var _mainMenuItem = _interopRequireDefault(require("./main-menu-item.js"));

var _constants = require("./constants.js");

var _styledComponents = require("./styled-components.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
function AppNavBar(props) {
  var _props$nav = props.nav,
      nav = _props$nav === void 0 ? [] : _props$nav,
      _props$isNavItemActiv = props.isNavItemActive,
      isNavItemActive = _props$isNavItemActiv === void 0 ? function (params) {} : _props$isNavItemActiv,
      onNavItemSelect = props.onNavItemSelect;
  return React.createElement(_styledComponents.StyledSubnavContainer, null, React.createElement(_index.Grid, null, React.createElement(_index.Cell, {
    span: [0, 8, 12]
  }, React.createElement(_styledComponents.StyledSecondaryMenuContainer, {
    role: "navigation",
    "aria-label": "Secondary navigation"
  }, nav.map(function (item, index) {
    return (// Replace with a menu item renderer
      React.createElement(_mainMenuItem.default, {
        active: item.active !== undefined ? item.active : isNavItemActive({
          item: item
        }),
        item: item,
        kind: _constants.KIND.secondary,
        key: index,
        onSelect: onNavItemSelect
      })
    );
  })))));
}