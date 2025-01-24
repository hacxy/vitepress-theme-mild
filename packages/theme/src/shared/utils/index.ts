export function isString(value?: any): value is string {
  if (typeof value === 'string') {
    return true;
  }
  else {
    return false;
  }
}
