function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { StatefulMenu, StyledList } from '../../menu/index.js';
import UserMenuListItem from './user-menu-list-item.js';
import UserProfileTile from './user-profile-tile.js';
import { StyledUserMenuListItem } from '../styled-components.js';
const MENU_ITEM_WIDTH = '275px';
export default function UserMenuDropdown(props) {
  // Provide API for handlers to be called on render, like analytics
  return React.createElement(StatefulMenu, {
    items: props.userNav || [],
    onItemSelect: (...args) => {
      props.onNavItemSelect(...args);
      props.close();
    },
    overrides: {
      List: {
        component: React.forwardRef(({
          children,
          ...restProps
        }, ref) => React.createElement(StyledList, _extends({}, restProps, {
          ref: ref
        }), React.createElement(StyledUserMenuListItem, null, React.createElement(UserProfileTile, {
          username: props.username,
          usernameSubtitle: props.usernameSubtitle,
          userImgUrl: props.userImgUrl
        })), children)),
        style: {
          width: MENU_ITEM_WIDTH
        }
      },
      ListItem: {
        component: UserMenuListItem
      }
    }
  });
}