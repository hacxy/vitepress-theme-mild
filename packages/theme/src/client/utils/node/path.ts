import path from 'node:path';

export function normalizePath(path: string): string {
  // Replace backslashes with slashes
  let normalizedPath = path.replace(/\\/g, '/');

  // Remove duplicate slashes
  normalizedPath = normalizedPath.replace(/\/+/g, '/');

  // Remove trailing slash, if it's not the root path
  if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  return normalizedPath;
}

export function getPattern(srcDir: string) {
  return normalizePath(path.join(srcDir, './**/*.md'));
}

