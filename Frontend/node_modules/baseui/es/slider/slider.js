function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Range, useThumbOverlap } from 'react-range';
import { isFocusVisible as focusVisible, forkFocus, forkBlur } from '../utils/focusVisible.js';
import { Root as StyledRoot, Track as StyledTrack, InnerTrack as StyledInnerTrack, Tick as StyledTick, TickBar as StyledTickBar, Thumb as StyledThumb, InnerThumb as StyledInnerThumb, ThumbValue as StyledThumbValue } from './styled-components.js';
import { getOverrides } from '../helpers/overrides.js';
import { ThemeContext } from '../styles/theme-provider.js'; // value.length should not be bigger than two
// because our design doesn't support more than
// two thumbs

const limitValue = value => {
  if (value.length > 2 || value.length === 0) {
    throw new Error('the value prop represents positions of thumbs, so its length can be only one or two');
  }

  return value;
};

function ThumbLabel({
  index,
  values,
  rangeRef,
  Component,
  separator,
  valueToLabel,
  $step: step,
  ...props
}) {
  const [labelValue, style] = useThumbOverlap(rangeRef, values, index, step, separator, valueToLabel);
  return React.createElement(Component, _extends({}, props, {
    style: style
  }), labelValue);
}

function Slider({
  overrides = {},
  disabled = false,
  onChange = () => {},
  onFinalChange = () => {},
  min = 0,
  max = 100,
  step = 1,
  value: providedValue
}) {
  const theme = React.useContext(ThemeContext);
  const [isFocusVisible, setIsFocusVisible] = React.useState(false);
  const [focusedThumbIndex, setFocusedThumbIndex] = React.useState(-1);
  const handleFocus = React.useCallback(event => {
    if (focusVisible(event)) {
      setIsFocusVisible(true);
    }

    const index = // eslint-disable-next-line flowtype/no-weak-types
    event.target.parentNode.firstChild === event.target ? 0 : 1;
    setFocusedThumbIndex(index);
  }, []);
  const handleBlur = React.useCallback(event => {
    if (isFocusVisible !== false) {
      setIsFocusVisible(false);
    }

    setFocusedThumbIndex(-1);
  }, []); // Use ref callback pattern so useThumbOverlap can properly measure dom nodes
  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node

  const [rangeRef, setRangeRef] = React.useState(null);
  const rangeRefCallback = React.useCallback(node => setRangeRef(node), []);
  const value = limitValue(providedValue);
  const sharedProps = {
    $disabled: disabled,
    $step: step,
    $min: min,
    $max: max,
    $value: value,
    $isFocusVisible: isFocusVisible
  };
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Track, trackProps] = getOverrides(overrides.Track, StyledTrack);
  const [InnerTrack, innerTrackProps] = getOverrides(overrides.InnerTrack, StyledInnerTrack);
  const [Thumb, thumbProps] = getOverrides(overrides.Thumb, StyledThumb);
  const [InnerThumb, innerThumbProps] = getOverrides(overrides.InnerThumb, StyledInnerThumb);
  const [ThumbValue, thumbValueProps] = getOverrides(overrides.ThumbValue, StyledThumbValue);
  const [Tick, tickProps] = getOverrides(overrides.Tick, StyledTick);
  const [TickBar, tickBarProps] = getOverrides(overrides.TickBar, StyledTickBar);
  return React.createElement(Root, _extends({
    "data-baseweb": "slider"
  }, sharedProps, rootProps, {
    onFocus: forkFocus(rootProps, handleFocus),
    onBlur: forkBlur(rootProps, handleBlur)
  }), React.createElement(Range, {
    step: step,
    min: min,
    max: max,
    values: value,
    disabled: disabled,
    onChange: value => onChange({
      value
    }),
    onFinalChange: value => onFinalChange({
      value
    }),
    ref: rangeRefCallback,
    rtl: theme.direction === 'rtl',
    renderTrack: ({
      props,
      children,
      isDragged
    }) => React.createElement(Track, _extends({
      onMouseDown: props.onMouseDown,
      onTouchStart: props.onTouchStart,
      $isDragged: isDragged
    }, sharedProps, trackProps), React.createElement(InnerTrack, _extends({
      $isDragged: isDragged,
      ref: props.ref
    }, sharedProps, innerTrackProps), children)),
    renderThumb: ({
      props,
      index,
      isDragged
    }) => React.createElement(Thumb, _extends({}, props, {
      $thumbIndex: index,
      $isDragged: isDragged,
      style: { ...props.style
      }
    }, sharedProps, thumbProps, {
      $isFocusVisible: isFocusVisible && focusedThumbIndex === index
    }), React.createElement(ThumbLabel, _extends({
      Component: ThumbValue,
      values: value,
      index: index,
      rangeRef: rangeRef,
      $thumbIndex: index,
      $isDragged: isDragged
    }, sharedProps, thumbValueProps)), React.createElement(InnerThumb, _extends({
      $thumbIndex: index,
      $isDragged: isDragged
    }, sharedProps, innerThumbProps)))
  }), React.createElement(TickBar, _extends({}, sharedProps, tickBarProps), React.createElement(Tick, _extends({}, sharedProps, tickProps), min), React.createElement(Tick, _extends({}, sharedProps, tickProps), max)));
}

export default Slider;