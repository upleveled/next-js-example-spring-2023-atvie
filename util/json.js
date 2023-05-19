import sjson from 'secure-json-parse';

export function parseJson(string) {
  if (!string) return undefined;

  try {
    return sjson(string);
  } catch {
    return undefined;
  }
}
