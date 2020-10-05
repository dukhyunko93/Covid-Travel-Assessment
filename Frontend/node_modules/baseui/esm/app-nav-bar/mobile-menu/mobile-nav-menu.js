function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { StatefulMenu } from '../../menu/index.js';
import MobileNavMenuItem from './mobile-nav-menu-item.js';
var USER_MENU_ITEM = 'USER_MENU_ITEM';
var PARENT_MENU_ITEM = 'PARENT_MENU_ITEM';
export default function MobileNavMenu(props) {
  var _ref;

  var _props$mainNav = props.mainNav,
      mainNav = _props$mainNav === void 0 ? [] : _props$mainNav,
      _props$userNav = props.userNav,
      userNav = _props$userNav === void 0 ? [] : _props$userNav,
      _props$close = props.close,
      close = _props$close === void 0 ? function () {} : _props$close,
      rest = _objectWithoutProperties(props, ["mainNav", "userNav", "close"]);

  var navItems = [].concat(_toConsumableArray(userNav.length ? [(_ref = {
    item: _objectSpread({}, rest),
    mapItemToString: function mapItemToString(item) {
      return item.username || '';
    }
  }, _defineProperty(_ref, USER_MENU_ITEM, true), _defineProperty(_ref, "nav", userNav), _ref)] : []), _toConsumableArray(mainNav));

  var _React$useState = React.useState(navItems),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      currentNavItems = _React$useState2[0],
      setCurrentNavItems = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      ancestorNavItems = _React$useState4[0],
      setAncestorNavItems = _React$useState4[1];

  return React.createElement(StatefulMenu, {
    items: currentNavItems,
    onItemSelect: function onItemSelect(params) {
      var item = params.item;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      props.onNavItemSelect.apply(props, [params].concat(args));

      if (item.PARENT_MENU_ITEM) {
        // Remove current parent item selected to return to
        // from the ancestors list (`ancestorNavItems[ancestorArrLength - 1]`)
        var updatedAncestorNavItems = ancestorNavItems.slice(0, ancestorNavItems.length - 1);
        var isTopLevel = !updatedAncestorNavItems.length;

        if (isTopLevel) {
          // Set to the initial `navItems` value
          setCurrentNavItems(navItems);
        } else {
          var newParentItem = _objectSpread({}, updatedAncestorNavItems[updatedAncestorNavItems.length - 1], _defineProperty({}, PARENT_MENU_ITEM, true));

          setCurrentNavItems([newParentItem].concat(_toConsumableArray(newParentItem.nav)));
        }

        setAncestorNavItems(updatedAncestorNavItems);
        return;
      }

      if (item.nav && item.nav.length) {
        var parentItem = _objectSpread({}, item, _defineProperty({}, PARENT_MENU_ITEM, true));

        setAncestorNavItems([].concat(_toConsumableArray(ancestorNavItems), [item]));
        setCurrentNavItems([parentItem].concat(_toConsumableArray(item.nav)));
        return;
      }

      close();
    },
    overrides: {
      List: {
        style: {
          paddingTop: '0',
          paddingBottom: '0',
          minHeight: '100vh',
          boxShadow: 'none'
        }
      },
      ListItem: {
        component: MobileNavMenuItem
      }
    }
  });
}