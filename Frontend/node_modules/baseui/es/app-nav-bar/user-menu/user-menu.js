function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

const svgStyleOverride = ({
  $theme
}) => ({
  paddingLeft: $theme.sizing.scale200
});

export default function UserMenu(props) {
  // isOpen is used for displaying different arrow icons in open or closed state
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    username,
    userImgUrl
  } = props;
  return React.createElement(StatefulPopover, {
    content: ({
      close
    }) => React.createElement(UserMenuDropdown, _extends({
      close: close
    }, props)),
    dismissOnEsc: true,
    dismissOnClickOutside: true,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
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