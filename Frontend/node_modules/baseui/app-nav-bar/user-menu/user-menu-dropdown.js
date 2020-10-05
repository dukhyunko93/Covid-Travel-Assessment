"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserMenuDropdown;

var React = _interopRequireWildcard(require("react"));

var _index = require("../../menu/index.js");

var _userMenuListItem = _interopRequireDefault(require("./user-menu-list-item.js"));

var _userProfileTile = _interopRequireDefault(require("./user-profile-tile.js"));

var _styledComponents = require("../styled-components.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var MENU_ITEM_WIDTH = '275px';

function UserMenuDropdown(props) {
  // Provide API for handlers to be called on render, like analytics
  return React.createElement(_index.StatefulMenu, {
    items: props.userNav || [],
    onItemSelect: function onItemSelect() {
      props.onNavItemSelect.apply(props, arguments);
      props.close();
    },
    overrides: {
      List: {
        component: React.forwardRef(function (_ref, ref) {
          var children = _ref.children,
              restProps = _objectWithoutProperties(_ref, ["children"]);

          return React.createElement(_index.StyledList, _extends({}, restProps, {
            ref: ref
          }), React.createElement(_styledComponents.StyledUserMenuListItem, null, React.createElement(_userProfileTile.default, {
            username: props.username,
            usernameSubtitle: props.usernameSubtitle,
            userImgUrl: props.userImgUrl
          })), children);
        }),
        style: {
          width: MENU_ITEM_WIDTH
        }
      },
      ListItem: {
        component: _userMenuListItem.default
      }
    }
  });
}