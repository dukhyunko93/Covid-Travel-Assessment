"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _index = require("../../list/index.js");

var _arrowLeft = _interopRequireDefault(require("../../icon/arrow-left.js"));

var _userProfileTile = _interopRequireDefault(require("../user-menu/user-profile-tile.js"));

var _styledComponents = require("../styled-components.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// eslint-disable-next-line flowtype/no-weak-types
var _default = React.forwardRef(function (props, ref) {
  var _props$item = props.item,
      item = _props$item === void 0 ? {} : _props$item,
      restProps = _objectWithoutProperties(props, ["item"]);

  if (item.PARENT_MENU_ITEM) {
    return React.createElement(_index.MenuAdapter, _extends({}, restProps, {
      ref: ref,
      artwork: item.navExitIcon || _arrowLeft.default,
      artworkSize: _index.ARTWORK_SIZES.LARGE
    }), React.createElement(_index.ListItemLabel, null, item.mapItemToString(item.item) || ''));
  }

  if (item.USER_MENU_ITEM) {
    // Replace with a user menu item renderer
    return (// $FlowFixMe
      React.createElement(_styledComponents.StyledUserMenuListItem, _extends({}, restProps, {
        ref: ref
      }), React.createElement(_userProfileTile.default, item.item))
    );
  }

  return (// Replace with a main menu item renderer
    React.createElement(_index.MenuAdapter, _extends({}, restProps, {
      ref: ref,
      artwork: item.icon || null,
      artworkSize: _index.ARTWORK_SIZES.LARGE
    }), React.createElement(_index.ListItemLabel, null, typeof item.mapItemToNode === 'function' ? item.mapItemToNode(item.item) : item.mapItemToString(item.item)))
  );
});

exports.default = _default;