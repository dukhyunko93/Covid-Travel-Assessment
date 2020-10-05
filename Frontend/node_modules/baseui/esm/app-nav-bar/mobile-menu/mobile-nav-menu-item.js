function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { MenuAdapter, ListItemLabel, ARTWORK_SIZES } from '../../list/index.js';
import ArrowLeft from '../../icon/arrow-left.js';
import UserProfileTile from '../user-menu/user-profile-tile.js';
import { StyledUserMenuListItem } from '../styled-components.js'; // eslint-disable-next-line flowtype/no-weak-types

export default React.forwardRef(function (props, ref) {
  var _props$item = props.item,
      item = _props$item === void 0 ? {} : _props$item,
      restProps = _objectWithoutProperties(props, ["item"]);

  if (item.PARENT_MENU_ITEM) {
    return React.createElement(MenuAdapter, _extends({}, restProps, {
      ref: ref,
      artwork: item.navExitIcon || ArrowLeft,
      artworkSize: ARTWORK_SIZES.LARGE
    }), React.createElement(ListItemLabel, null, item.mapItemToString(item.item) || ''));
  }

  if (item.USER_MENU_ITEM) {
    // Replace with a user menu item renderer
    return (// $FlowFixMe
      React.createElement(StyledUserMenuListItem, _extends({}, restProps, {
        ref: ref
      }), React.createElement(UserProfileTile, item.item))
    );
  }

  return (// Replace with a main menu item renderer
    React.createElement(MenuAdapter, _extends({}, restProps, {
      ref: ref,
      artwork: item.icon || null,
      artworkSize: ARTWORK_SIZES.LARGE
    }), React.createElement(ListItemLabel, null, typeof item.mapItemToNode === 'function' ? item.mapItemToNode(item.item) : item.mapItemToString(item.item)))
  );
});