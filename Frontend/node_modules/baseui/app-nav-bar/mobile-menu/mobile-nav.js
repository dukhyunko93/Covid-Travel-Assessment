"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MobileNav;

var React = _interopRequireWildcard(require("react"));

var _index = require("../../button/index.js");

var _index2 = require("../../drawer/index.js");

var _menu = _interopRequireDefault(require("../../icon/menu.js"));

var _mobileNavMenu = _interopRequireDefault(require("./mobile-nav-menu.js"));

var _styledComponents = require("../styled-components.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function MobileNav(props) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isOpen = _React$useState2[0],
      setIsOpen = _React$useState2[1];

  var toggleMenu = function toggleMenu() {
    setIsOpen(!isOpen);
  };

  return React.createElement(React.Fragment, null, React.createElement(_index.Button, {
    overrides: {
      BaseButton: {
        component: _styledComponents.StyledSideMenuButton
      }
    },
    onClick: toggleMenu
  }, React.createElement(_menu.default, {
    size: '24px'
  })), React.createElement(_index2.Drawer, {
    anchor: _index2.ANCHOR.left,
    isOpen: isOpen,
    onClose: toggleMenu,
    size: '75%',
    overrides: {
      DrawerBody: {
        style: function style(_ref) {
          var $theme = _ref.$theme;
          return {
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px'
          };
        }
      },
      // Removes the close icon from the drawer
      Close: function Close() {
        return null;
      }
    }
  }, React.createElement(_mobileNavMenu.default, _extends({
    close: toggleMenu
  }, props))));
}