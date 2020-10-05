function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
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
        style: ({
          $theme
        }) => {
          return {
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px'
          };
        }
      },
      // Removes the close icon from the drawer
      Close: () => null
    }
  }, React.createElement(MobileNavMenu, _extends({
    close: toggleMenu
  }, props))));
}