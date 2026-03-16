export function cn<T>(...styles: (T | false | null | undefined)[]) {
  return styles.filter(Boolean) as T[];
}