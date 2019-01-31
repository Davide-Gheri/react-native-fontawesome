import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { icon, parse, IconProp, Transform, SizeProp, IconLookup } from '@fortawesome/fontawesome-svg-core';
import { convert } from '../converter';
import log from '../logger';

export interface IconProps {
  icon: IconProp;
  mask?: IconProp;
  color?: string;
  size?: SizeProp;
  transform?: Transform | string;
  style?: any;
  tabIndex?: number;
  title?: string;
}

function normalizeIconArgs(icon?: IconProp): IconLookup | null | undefined {
  if (!icon) {
    return null;
  }
  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] };
  }
  if (typeof icon === 'object' && (icon as IconLookup).prefix && (icon as IconLookup).iconName) {
    return icon as IconLookup;
  }
  if (typeof icon === 'string') {
    return { prefix: 'fas', iconName: icon };
  }
}

const Icon: React.FunctionComponent<any> = (props: IconProps) => {
  const { icon: iconArgs, mask: maskArgs, title, transform: transformArgs, size, color, style } = props;

  const iconLookup = normalizeIconArgs(iconArgs);

  if (!iconLookup) {
    log('Could not find icon', iconArgs);
    return null;
  }

  const mask = normalizeIconArgs(maskArgs);

  const transform = typeof transformArgs === 'string' ? parse.transform(transformArgs) : transformArgs;

  const iconObj = icon(
    iconLookup,
    Object.assign(
      {transform, title},
      {mask},
    ),
  );

  if (!iconObj) {
    log('Could not find icon', iconLookup);
    return null;
  }

  const absIcon = iconObj.abstract[0];

  const Icn = convert(absIcon, {size, color});

  return React.createElement(View, {style}, Icn);
};

Icon.displayName = 'Icon';

Icon.propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),

  icon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),

  size: PropTypes.oneOf([
    'lg',
    'xs',
    'sm',
    '1x',
    '2x',
    '3x',
    '4x',
    '5x',
    '6x',
    '7x',
    '8x',
    '9x',
    '10x',
  ]),

  tabIndex: PropTypes.number,

  title: PropTypes.string,

  transform: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  color: PropTypes.string,
};

export default Icon;
