"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserMenu;

var React = _interopRequireWildcard(require("react"));

var _index = require("../../popover/index.js");

var _index2 = require("../../button/index.js");

var _index3 = require("../../avatar/index.js");

var _chevronDown = _interopRequireDefault(require("../../icon/chevron-down.js"));

var _chevronUp = _interopRequireDefault(require("../../icon/chevron-up.js"));

var _userMenuDropdown = _interopRequireDefault(require("./user-menu-dropdown.js"));

var _styledComponents = require("../styled-components.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var svgStyleOverride = function svgStyleOverride(_ref) {
  var $theme = _ref.$theme;
  return {
    paddingLeft: $theme.sizing.scale200
  };
};

function UserMenu(props) {
  // isOpen is used for displaying different arrow icons in open or closed state
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isOpen = _React$useState2[0],
      setIsOpen = _React$useState2[1];

  var username = props.username,
      userImgUrl = props.userImgUrl;
  return React.createElement(_index.StatefulPopover, {
    content: function content(_ref2) {
      var close = _ref2.close;
      return React.createElement(_userMenuDropdown.default, _extends({
        close: close
      }, props));
    },
    dismissOnEsc: true,
    dismissOnClickOutside: true,
    onOpen: function onOpen() {
      return setIsOpen(true);
    },
    onClose: function onClose() {
      return setIsOpen(false);
    },
    placement: _index.PLACEMENT.bottomRight,
    popperOptions: {
      modifiers: {
        flip: {
          enabled: false
        }
      }
    },
    triggerType: _index.TRIGGER_TYPE.click
  }, React.createElement(_index2.Button, {
    overrides: {
      BaseButton: {
        component: _styledComponents.StyledUserMenuButton
      }
    }
  }, React.createElement(_index3.Avatar, {
    name: username || '',
    src: userImgUrl,
    size: '32px'
  }), isOpen ? React.createElement(_chevronUp.default, {
    size: 28,
    overrides: {
      Svg: {
        style: svgStyleOverride
      }
    }
  }) : React.createElement(_chevronDown.default, {
    size: 28,
    overrides: {
      Svg: {
        style: svgStyleOverride
      }
    }
  })));
}