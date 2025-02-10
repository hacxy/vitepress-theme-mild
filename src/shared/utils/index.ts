export function isString(value?: any): value is string {
  if (typeof value === 'string') {
    return true;
  }
  else {
    return false;
  }
}

export function capitalizeFirstFormat(str: string | undefined) {
  if (typeof str !== 'string' || !str.length)
    return str;
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
