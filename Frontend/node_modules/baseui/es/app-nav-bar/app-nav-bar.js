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
  const [css, theme] = useStyletron(); // const [activeMainNavItem, setActiveMainNavItem] = React.useState(null);

  const {
    breakpoints
  } = theme;
  const {
    appDisplayName,
    isNavItemActive = params => false,
    onNavItemSelect,
    mainNav = [],
    userNav = []
  } = props;
  let secondaryMenu;
  let desktopSubNavPosition = POSITION.horizontal;
  let mobileSubNavPosition = POSITION.vertical;
  const mainMenu = mainNav.map((item, index) => {
    const active = item.active !== undefined ? item.active : isNavItemActive({
      item
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
    className: css({
      [`@media screen and (min-width: ${breakpoints.large}px)`]: {
        display: 'none'
      }
    })
  }, React.createElement(Grid, null, React.createElement(Cell, {
    span: [4, 8, 0]
  }, React.createElement(StyledSpacing, null, mainNav.length || userNav.length ? React.createElement(MobileNav, props) : null, React.createElement(Logo, {
    appDisplayName: appDisplayName
  })))), secondaryMenu && mobileSubNavPosition === POSITION.horizontal ? React.createElement(SecondaryMenu, {
    nav: secondaryMenu,
    isNavItemActive: isNavItemActive,
    onNavItemSelect: onNavItemSelect
  }) : null), React.createElement("div", {
    className: css({
      [`@media screen and (max-width: ${breakpoints.large - 1}px)`]: {
        display: 'none'
      }
    })
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