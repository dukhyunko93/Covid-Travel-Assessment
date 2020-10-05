function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { KIND } from './constants.js';
import { StyledMainMenuItem } from './styled-components.js';
import { isFocusVisible } from '../utils/focusVisible.js';
export default class MenuItem extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      hasFocusVisible: false
    });

    _defineProperty(this, "setHasFocusVisible", hasFocusVisible => {
      this.setState({
        hasFocusVisible
      });
    });

    _defineProperty(this, "handleFocus", event => {
      if (isFocusVisible(event)) {
        this.setHasFocusVisible(true);
      }
    });

    _defineProperty(this, "handleBlur", event => {
      if (this.state.hasFocusVisible !== false) {
        this.setHasFocusVisible(false);
      }
    });

    _defineProperty(this, "onClick", e => {
      const {
        onClick,
        onSelect
      } = this.props;
      typeof onClick === 'function' && onClick(e);
      typeof onSelect === 'function' && onSelect({
        item: this.props.item
      });
      return;
    });

    _defineProperty(this, "onKeyDown", e => {
      const {
        onKeyDown,
        onSelect
      } = this.props;
      typeof onKeyDown === 'function' && onKeyDown(e);

      if (e.key === 'Enter') {
        typeof onSelect === 'function' && onSelect({
          item: this.props.item
        });
      }

      return;
    });
  }

  render() {
    const {
      item,
      active,
      kind = KIND.primary
    } = this.props;
    return React.createElement(StyledMainMenuItem, {
      $kind: kind,
      $isFocusVisible: this.state.hasFocusVisible,
      $active: active,
      tabIndex: 0,
      "aria-selected": active || null,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.onClick,
      onKeyDown: this.onKeyDown
    }, typeof item.mapItemToNode === 'function' ? item.mapItemToNode(item.item) : item.mapItemToString(item.item));
  }

}