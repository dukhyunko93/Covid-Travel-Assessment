function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { MenuAdapter, ListItemLabel, ARTWORK_SIZES } from '../../list/index.js'; // eslint-disable-next-line flowtype/no-weak-types

const UserMenuListItem = React.forwardRef((props, ref) => {
  const {
    item = {}
  } = props; // Replace with a user menu item renderer

  return React.createElement(MenuAdapter, _extends({}, props, {
    ref: ref,
    artwork: item.icon || null,
    artworkSize: ARTWORK_SIZES.LARGE
  }), React.createElement(ListItemLabel, null, typeof item.mapItemToNode === 'function' ? item.mapItemToNode(item.item) : item.mapItemToString(item.item)));
});
export default UserMenuListItem;