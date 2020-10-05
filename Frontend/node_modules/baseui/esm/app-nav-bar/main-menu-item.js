function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { KIND } from './constants.js';
import { StyledMainMenuItem } from './styled-components.js';
import { isFocusVisible } from '../utils/focusVisible.js';

var MenuItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MenuItem, _React$Component);

  function MenuItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MenuItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasFocusVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "setHasFocusVisible", function (hasFocusVisible) {
      _this.setState({
        hasFocusVisible: hasFocusVisible
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (event) {
      if (isFocusVisible(event)) {
        _this.setHasFocusVisible(true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (event) {
      if (_this.state.hasFocusVisible !== false) {
        _this.setHasFocusVisible(false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          onSelect = _this$props.onSelect;
      typeof onClick === 'function' && onClick(e);
      typeof onSelect === 'function' && onSelect({
        item: _this.props.item
      });
      return;
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var _this$props2 = _this.props,
          onKeyDown = _this$props2.onKeyDown,
          onSelect = _this$props2.onSelect;
      typeof onKeyDown === 'function' && onKeyDown(e);

      if (e.key === 'Enter') {
        typeof onSelect === 'function' && onSelect({
          item: _this.props.item
        });
      }

      return;
    });

    return _this;
  }

  _createClass(MenuItem, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          item = _this$props3.item,
          active = _this$props3.active,
          _this$props3$kind = _this$props3.kind,
          kind = _this$props3$kind === void 0 ? KIND.primary : _this$props3$kind;
      return React.createElement(StyledMainMenuItem, {
        $kind: kind,
        $isFocusVisible: this.state.hasFocusVisible,
        $active: active,
        tabIndex: 0,
        "aria-selected": active || null,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onClick: this.onClick,
        onKeyDown: this.onKeyDown
      }, typeof item.mapItemToNode === 'function' ? item.mapItemToNode(item.item) : item.mapItemToString(item.item));
    }
  }]);

  return MenuItem;
}(React.Component);

export { MenuItem as default };