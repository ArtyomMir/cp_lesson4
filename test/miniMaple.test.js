import {MiniMaple} from "../src/miniMaple";

describe('MiniMaple — symbolic differentiation', () => {
  let maple;

  beforeEach(() => {
    maple = new MiniMaple();
  });

  test('дифференцирование простого монома', () => {
    expect(maple.diff('4*x^3', 'x')).toBe('12*x^2');
  });

  test('производная по другой переменной — 0', () => {
    expect(maple.diff('4*x^3', 'y')).toBe('0');
  });

  test('сумма мономов', () => {
    expect(maple.diff('4*x^3 - x^2', 'x')).toBe('12*x^2-2*x');
  });

  test('константа', () => {
    expect(maple.diff('7', 'x')).toBe('0');
  });

  test('переменная первой степени', () => {
    expect(maple.diff('2*x', 'x')).toBe('2');
  });

  test('нулевой член должен исчезать', () => {
    expect(maple.diff('2*x + 0', 'x')).toBe('2');
  });

  test('сложное выражение', () => {
    expect(maple.diff('3*x^5 + 2*x^3 - 7*x + 9', 'x'))
      .toBe('15*x^4+6*x^2-7');
  });

  test('минус перед первым членом', () => {
    expect(maple.diff('-2*x^2 + 5*x', 'x')).toBe('-4*x+5');
  });

  test('отсутствие переменных (всё числа)', () => {
    expect(maple.diff('10 - 7 + 3', 'x')).toBe('0');
  });
});
