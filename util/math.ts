export function add(a: number, b: number) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Pass only numbers!');
  }
  return a + b;
}
