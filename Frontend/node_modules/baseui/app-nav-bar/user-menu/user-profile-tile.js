"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserProfileTile;

var React = _interopRequireWildcard(require("react"));

var _index = require("../../avatar/index.js");

var _index2 = require("../../typography/index.js");

var _styledComponents = require("../styled-components.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
function UserProfileTile(props) {
  var username = props.username,
      usernameSubtitle = props.usernameSubtitle,
      userImgUrl = props.userImgUrl;
  return (// Replace with a  profile tile renderer: renderUserProfileTile()
    React.createElement(_styledComponents.StyledUserProfileTileContainer, null, React.createElement(_styledComponents.StyledUserProfilePictureContainer, null, React.createElement(_index.Avatar, {
      name: username || '',
      src: userImgUrl,
      size: '48px'
    })), React.createElement(_styledComponents.StyledUserProfileInfoContainer, null, React.createElement(_index2.LabelMedium, null, username), usernameSubtitle ? React.createElement(_index2.ParagraphSmall, {
      marginTop: "0",
      marginBottom: "0"
    }, usernameSubtitle) : null))
  );
}