/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Avatar } from '../../avatar/index.js';
import { LabelMedium, ParagraphSmall } from '../../typography/index.js';
import { StyledUserProfileTileContainer, StyledUserProfilePictureContainer, StyledUserProfileInfoContainer } from '../styled-components.js';
export default function UserProfileTile(props) {
  const {
    username,
    usernameSubtitle,
    userImgUrl
  } = props;
  return (// Replace with a  profile tile renderer: renderUserProfileTile()
    React.createElement(StyledUserProfileTileContainer, null, React.createElement(StyledUserProfilePictureContainer, null, React.createElement(Avatar, {
      name: username || '',
      src: userImgUrl,
      size: '48px'
    })), React.createElement(StyledUserProfileInfoContainer, null, React.createElement(LabelMedium, null, username), usernameSubtitle ? React.createElement(ParagraphSmall, {
      marginTop: "0",
      marginBottom: "0"
    }, usernameSubtitle) : null))
  );
}