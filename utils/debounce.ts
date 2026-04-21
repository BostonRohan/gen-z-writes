/* eslint-disable no-unused-vars */
export function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function (this: ThisParameterType<T>, ...rest: Parameters<T>): void {
    const context = this;
    const later = () => {
      timeout = null;
      func.apply(context, rest);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}