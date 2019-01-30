import React from 'react';
import { View } from 'react-native';
import { icon, IconProp, FlipProp, FaSymbol, Transform, RotateProp, SizeProp, PullProp, IconLookup } from '@fortawesome/fontawesome-svg-core';
import { convert } from '../converter';
import log from '../logger';

export interface IconProps {
  icon: IconProp
  mask?: IconProp
  color?: string
  flip?: FlipProp
  size?: SizeProp
  pull?: PullProp
  rotation?: RotateProp
  transform?: Transform
  symbol?: FaSymbol
  style?: any;
  tabIndex?: number;
  title?: string;
}

function normalizeIconArgs(icon?: IconProp): IconLookup | null {
  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] }
  }
  if (typeof icon === 'object' && (icon as IconLookup).prefix && (icon as IconLookup).iconName) {
    return icon as IconLookup;
  }
  if (typeof icon === 'string') {
    return { prefix: 'far', iconName: icon }
  }
  return null;
}

const Icon: React.FunctionComponent<IconProps> = (props: IconProps) => {
  const { icon: iconArgs, mask: maskArgs, symbol, title, transform, size, color, style } = props;

  const iconLookup = normalizeIconArgs(iconArgs);

  if (!iconLookup) {
    log('Could not find icon', iconArgs);
    return null;
  }

  const mask = normalizeIconArgs(maskArgs);

  const iconObj = icon(iconLookup, Object.assign({},
    {transform},
    mask ? {mask} : null,
    {symbol},
    {title},
  ));

  if (!iconObj) {
    log('Could not find icon', iconLookup);
    return null;
  }

  const absIcon = iconObj.abstract[0];

  const Icn = convert(absIcon, {size, color});

  return React.createElement(View, {style}, Icn);
}

Icon.displayName = 'Icon';

export default Icon;
