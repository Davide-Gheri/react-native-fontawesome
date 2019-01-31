import React from 'react';
import { AbstractElement, SizeProp } from '@fortawesome/fontawesome-svg-core';
import {
  Svg,
  Path,
  Defs,
  Rect,
  Mask,
  ClipPath,
  G,
  Circle
} from 'react-native-svg';

export const mapping: { [key: string]: React.ComponentClass<any, any> } = {
  svg: Svg,
  path: Path,
  rect: Rect,
  g: G,
  defs: Defs,
  mask: Mask,
  clipPath: ClipPath,
  circle: Circle
};

export function sizeToInt(size?: SizeProp): number {
  const base = 24;
  switch (true) {
    case size === 'xs':
      return base * 0.75;
    case size === 'lg':
      return (base * 4) / 3;
    case size === 'sm':
      return base * 0.875;
    case typeof size === 'string' &&
      (size as string).indexOf('x') === (size as string).length - 1:
      const multi = parseInt((size as string).replace('x', ''), 10);
      return base * multi;
    default:
      return base;
  }
}

export function convert(
  tree: AbstractElement,
  otherProps: { size?: SizeProp; color?: string } = {},
  key?: string | number
) {
  const childrens: any = tree.children
    ? tree.children.map((t, k) =>
        convert(t, { color: otherProps.color }, k + 1)
      )
    : [];

  const { size, color } = otherProps;

  const props = Object.assign(
    {},
    tree.attributes,
    key ? { key } : null,
    color ? { fill: color } : null,
    {
      width: sizeToInt(size).toString(),
      height: sizeToInt(size).toString()
    }
  );

  return React.createElement(mapping[tree.tag], props, childrens);
}
