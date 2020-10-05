"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AppNavBar;

var React = _interopRequireWildcard(require("react"));

var _index = require("../styles/index.js");

var _index2 = require("../layout-grid/index.js");

var _mainMenuItem = _interopRequireDefault(require("./main-menu-item.js"));

var _secondaryMenu = _interopRequireDefault(require("./secondary-menu.js"));

var _mobileNav = _interopRequireDefault(require("./mobile-menu/mobile-nav.js"));

var _logo = _interopRequireDefault(require("./logo.js"));

var _userMenu = _interopRequireDefault(require("./user-menu/user-menu.js"));

var _constants = require("./constants.js");

var _styledComponents = require("./styled-components.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function AppNavBar(props) {
  var _useStyletron = (0, _index.useStyletron)(),
      _useStyletron2 = _slicedToArray(_useStyletron, 2),
      css = _useStyletron2[0],
      theme = _useStyletron2[1]; // const [activeMainNavItem, setActiveMainNavItem] = React.useState(null);


  var breakpoints = theme.breakpoints;
  var appDisplayName = props.appDisplayName,
      _props$isNavItemActiv = props.isNavItemActive,
      isNavItemActive = _props$isNavItemActiv === void 0 ? function (params) {
    return false;
  } : _props$isNavItemActiv,
      onNavItemSelect = props.onNavItemSelect,
      _props$mainNav = props.mainNav,
      mainNav = _props$mainNav === void 0 ? [] : _props$mainNav,
      _props$userNav = props.userNav,
      userNav = _props$userNav === void 0 ? [] : _props$userNav;
  var secondaryMenu;
  var desktopSubNavPosition = _constants.POSITION.horizontal;
  var mobileSubNavPosition = _constants.POSITION.vertical;
  var mainMenu = mainNav.map(function (item, index) {
    var active = item.active !== undefined ? item.active : isNavItemActive({
      item: item
    }); // For an active top level menu get the secondary navigation and its positioning

    if (active && item.nav && item.nav.length) {
      secondaryMenu = item.nav;

      if (item.navPosition) {
        desktopSubNavPosition = item.navPosition.desktop || desktopSubNavPosition;
        mobileSubNavPosition = item.navPosition.mobile || mobileSubNavPosition;
      }
    } // Render main menu item


    return React.createElement(_mainMenuItem.default, {
      active: active,
      item: item,
      key: index,
      onSelect: onNavItemSelect
    });
  });
  return React.createElement(_styledComponents.StyledRoot, {
    "data-baseweb": "app-nav-bar"
  }, React.createElement("div", {
    className: css(_defineProperty({}, "@media screen and (min-width: ".concat(breakpoints.large, "px)"), {
      display: 'none'
    }))
  }, React.createElement(_index2.Grid, null, React.createElement(_index2.Cell, {
    span: [4, 8, 0]
  }, React.createElement(_styledComponents.StyledSpacing, null, mainNav.length || userNav.length ? React.createElement(_mobileNav.default, props) : null, React.createElement(_logo.default, {
    appDisplayName: appDisplayName
  })))), secondaryMenu && mobileSubNavPosition === _constants.POSITION.horizontal ? React.createElement(_secondaryMenu.default, {
    nav: secondaryMenu,
    isNavItemActive: isNavItemActive,
    onNavItemSelect: onNavItemSelect
  }) : null), React.createElement("div", {
    className: css(_defineProperty({}, "@media screen and (max-width: ".concat(breakpoints.large - 1, "px)"), {
      display: 'none'
    }))
  }, React.createElement(_index2.Grid, null, React.createElement(_index2.Cell, {
    span: [0, 3, 3]
  }, React.createElement(_styledComponents.StyledSpacing, null, React.createElement(_logo.default, {
    appDisplayName: appDisplayName
  }))), React.createElement(_index2.Cell, {
    span: userNav.length ? [0, 4, 8] : [0, 5, 9]
  }, React.createElement(_styledComponents.StyledPrimaryMenuContainer, {
    role: "navigation",
    "aria-label": "Main navigation"
  }, mainMenu)), userNav.length ? React.createElement(_index2.Cell, {
    span: [0, 1, 1]
  }, React.createElement(_styledComponents.StyledSpacing, null, React.createElement(_userMenu.default, {
    isNavItemActive: isNavItemActive,
    onNavItemSelect: onNavItemSelect,
    username: props.username,
    usernameSubtitle: props.usernameSubtitle,
    userImgUrl: props.userImgUrl,
    userNav: userNav
  }))) : null), secondaryMenu && desktopSubNavPosition === _constants.POSITION.horizontal ? React.createElement(_secondaryMenu.default, {
    nav: secondaryMenu,
    isNavItemActive: isNavItemActive,
    onNavItemSelect: onNavItemSelect
  }) : null));
}