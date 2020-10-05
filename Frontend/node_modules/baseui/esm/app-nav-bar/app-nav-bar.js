function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useStyletron } from '../styles/index.js';
import { Cell, Grid } from '../layout-grid/index.js';
import MainMenuItem from './main-menu-item.js';
import SecondaryMenu from './secondary-menu.js';
import MobileNav from './mobile-menu/mobile-nav.js';
import Logo from './logo.js';
import UserMenu from './user-menu/user-menu.js';
import { POSITION } from './constants.js';
import { StyledRoot, StyledSpacing, StyledPrimaryMenuContainer } from './styled-components.js';
export default function AppNavBar(props) {
  var _useStyletron = useStyletron(),
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
  var desktopSubNavPosition = POSITION.horizontal;
  var mobileSubNavPosition = POSITION.vertical;
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


    return React.createElement(MainMenuItem, {
      active: active,
      item: item,
      key: index,
      onSelect: onNavItemSelect
    });
  });
  return React.createElement(StyledRoot, {
    "data-baseweb": "app-nav-bar"
  }, React.createElement("div", {
    className: css(_defineProperty({}, "@media screen and (min-width: ".concat(breakpoints.large, "px)"), {
      display: 'none'
    }))
  }, React.createElement(Grid, null, React.createElement(Cell, {
    span: [4, 8, 0]
  }, React.createElement(StyledSpacing, null, mainNav.length || userNav.length ? React.createElement(MobileNav, props) : null, React.createElement(Logo, {
    appDisplayName: appDisplayName
  })))), secondaryMenu && mobileSubNavPosition === POSITION.horizontal ? React.createElement(SecondaryMenu, {
    nav: secondaryMenu,
    isNavItemActive: isNavItemActive,
    onNavItemSelect: onNavItemSelect
  }) : null), React.createElement("div", {
    className: css(_defineProperty({}, "@media screen and (max-width: ".concat(breakpoints.large - 1, "px)"), {
      display: 'none'
    }))
  }, React.createElement(Grid, null, React.createElement(Cell, {
    span: [0, 3, 3]
  }, React.createElement(StyledSpacing, null, React.createElement(Logo, {
    appDisplayName: appDisplayName
  }))), React.createElement(Cell, {
    span: userNav.length ? [0, 4, 8] : [0, 5, 9]
  }, React.createElement(StyledPrimaryMenuContainer, {
    role: "navigation",
    "aria-label": "Main navigation"
  }, mainMenu)), userNav.length ? React.createElement(Cell, {
    span: [0, 1, 1]
  }, React.createElement(StyledSpacing, null, React.createElement(UserMenu, {
    isNavItemActive: isNavItemActive,
    onNavItemSelect: onNavItemSelect,
    username: props.username,
    usernameSubtitle: props.usernameSubtitle,
    userImgUrl: props.userImgUrl,
    userNav: userNav
  }))) : null), secondaryMenu && desktopSubNavPosition === POSITION.horizontal ? React.createElement(SecondaryMenu, {
    nav: secondaryMenu,
    isNavItemActive: isNavItemActive,
    onNavItemSelect: onNavItemSelect
  }) : null));
}