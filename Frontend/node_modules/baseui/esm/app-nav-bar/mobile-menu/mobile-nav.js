function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import { Button } from '../../button/index.js';
import { Drawer, ANCHOR } from '../../drawer/index.js';
import MenuIcon from '../../icon/menu.js';
import MobileNavMenu from './mobile-nav-menu.js';
import { StyledSideMenuButton } from '../styled-components.js';
export default function MobileNav(props) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isOpen = _React$useState2[0],
      setIsOpen = _React$useState2[1];

  var toggleMenu = function toggleMenu() {
    setIsOpen(!isOpen);
  };

  return React.createElement(React.Fragment, null, React.createElement(Button, {
    overrides: {
      BaseButton: {
        component: StyledSideMenuButton
      }
    },
    onClick: toggleMenu
  }, React.createElement(MenuIcon, {
    size: '24px'
  })), React.createElement(Drawer, {
    anchor: ANCHOR.left,
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
  }, React.createElement(MobileNavMenu, _extends({
    close: toggleMenu
  }, props))));
}