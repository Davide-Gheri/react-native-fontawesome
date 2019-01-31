import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { library, IconName, SizeProp, icon as iconRn } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Icon, { IconProps } from '../FontawesomeIcon';
import log from '../../logger';
import { sizeToInt } from '../../converter';

jest.mock('../../logger', () => jest.fn());

library.add(fas);

const render = (props: IconProps): ReactTestRendererJSON | null => renderer.create(<Icon {...props}/>).toJSON();

describe('<FontawesomeIcon>', () => {

  it('should render correctly passing an icon name', () => {
    const icon = render({icon: 'circle'});

    expect(icon).toMatchSnapshot();
  });

  it('should render correctly passing an icon array', () => {
    const icon = render({icon: ['far', 'circle']});

    expect(icon).toMatchSnapshot();
  });

  it('should render correctly passing an icon object', () => {
    const icon = render({icon: {prefix: 'far', iconName: 'circle'}});

    expect(icon).toMatchSnapshot();
  });

  it('should render a masked icon passing a mask icon', () => {
    const icon = render({icon: 'abacus', mask: 'circle'});

    expect(icon).toMatchSnapshot();
  });

  it('should render null if icon is not found', () => {
    const icon = render({icon: 'notAnIcon' as IconName});

    expect(icon).toMatchInlineSnapshot('null');
    expect(log).toHaveBeenCalledWith('Could not find icon', { prefix: 'fas', iconName: 'notAnIcon' });
  });

  it('should render null if no icon is passed', () => {
    const icon = render({icon: null} as any);

    expect(icon).toMatchInlineSnapshot('null');
    expect(log).toHaveBeenCalledWith('Could not find icon', null);
  });

  it('should add styles to the wrapper View component', () => {
    const style = {
      marginLeft: 20,
      marginRight: 20,
    };
    const icon = render({style, icon: 'circle'}) as ReactTestRendererJSON;

    expect(icon.props).toEqual({style});
  });

  it('should set SVG width and height based on size prop', () => {

    (['xs', 'lg', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'] as SizeProp[])
    .forEach((size) => {
      const toInt = sizeToInt(size);
      const icon = render({size, icon: 'circle'})  as ReactTestRendererJSON;
      const SVG = (icon.children as ReactTestRendererJSON[])[0];

      expect(SVG.props.width).toBe(toInt);
      expect(SVG.props.height).toBe(toInt);
    });
  });

  it('should set SVG fill based on color prop', () => {
    const icon = render({icon: 'circle', color: '#fafafa'}) as ReactTestRendererJSON;
    const SVG = (icon.children as ReactTestRendererJSON[])[0];

    expect(SVG.props.fill).toEqual('#fafafa');
  });

  it('should apply transform from fontawesome transform keys', () => {
    const transform = {
      flipX: false,
      flipY: false,
      rotate: 15,
      size: 56,
      x: -4,
      y: 0,
    };

    const icn = iconRn({iconName: 'circle', prefix: 'fas'}, {transform});
    const style = icn.abstract[0].attributes.style;

    const icon = render({transform, icon: 'circle'}) as ReactTestRendererJSON;
    const SVG = (icon.children as ReactTestRendererJSON[])[0];

    expect(SVG.props.style.some((s: any) => s === style)).toBeTruthy();
  });
});
