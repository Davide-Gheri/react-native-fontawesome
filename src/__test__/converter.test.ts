import { sizeToInt } from '../converter';

const base = 24;

describe('sizeToInt', () => {
  it('should convert xs, sm and lg with fixed value', () => {
    const lg = 32; // (24*4)/3
    const xs = 18; // 24*0.75
    const sm = 21; // 25*0.875
    expect(sizeToInt('lg')).toEqual(lg);
    expect(sizeToInt('xs')).toEqual(xs);
    expect(sizeToInt('sm')).toEqual(sm);
  });

  it('should convert a Nx to base * N', () => {
    expect(sizeToInt('10x')).toEqual(base * 10);
  });

  it('should return base value if a number or string number is passed', () => {
    expect(sizeToInt(12 as any)).toEqual(base);
    expect(sizeToInt('12' as any)).toEqual(base);
  });

  it('should return base value if null is passed', () => {
    expect(sizeToInt(null as any)).toEqual(base);
  });
});
