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
import { StatefulPopover, PLACEMENT, TRIGGER_TYPE } from '../../popover/index.js';
import { Button } from '../../button/index.js';
import { Avatar } from '../../avatar/index.js';
import ChevronDownSmallFilled from '../../icon/chevron-down.js';
import ChevronUpSmallFilled from '../../icon/chevron-up.js';
import UserMenuDropdown from './user-menu-dropdown.js';
import { StyledUserMenuButton } from '../styled-components.js';

var svgStyleOverride = function svgStyleOverride(_ref) {
  var $theme = _ref.$theme;
  return {
    paddingLeft: $theme.sizing.scale200
  };
};

export default function UserMenu(props) {
  // isOpen is used for displaying different arrow icons in open or closed state
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isOpen = _React$useState2[0],
      setIsOpen = _React$useState2[1];

  var username = props.username,
      userImgUrl = props.userImgUrl;
  return React.createElement(StatefulPopover, {
    content: function content(_ref2) {
      var close = _ref2.close;
      return React.createElement(UserMenuDropdown, _extends({
        close: close
      }, props));
    },
    dismissOnEsc: true,
    dismissOnClickOutside: true,
    onOpen: function onOpen() {
      return setIsOpen(true);
    },
    onClose: function onClose() {
      return setIsOpen(false);
    },
    placement: PLACEMENT.bottomRight,
    popperOptions: {
      modifiers: {
        flip: {
          enabled: false
        }
      }
    },
    triggerType: TRIGGER_TYPE.click
  }, React.createElement(Button, {
    overrides: {
      BaseButton: {
        component: StyledUserMenuButton
      }
    }
  }, React.createElement(Avatar, {
    name: username || '',
    src: userImgUrl,
    size: '32px'
  }), isOpen ? React.createElement(ChevronUpSmallFilled, {
    size: 28,
    overrides: {
      Svg: {
        style: svgStyleOverride
      }
    }
  }) : React.createElement(ChevronDownSmallFilled, {
    size: 28,
    overrides: {
      Svg: {
        style: svgStyleOverride
      }
    }
  })));
}