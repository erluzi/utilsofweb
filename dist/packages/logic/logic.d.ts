declare function randomColor16(): string;
declare function randomColorOpacity(opacity?: number): string;
/**
 * 色值转换
 * @param val
 */
declare function hex2rgb(val: string): string;
/**
 * 色值转换-有少许误差
 * @param val
 */
declare function rgb2hsl(val: string): string;
declare function throttle(handler: Function, duration: number): (...args: any[]) => void;
declare function debounce(handler: Function, delay: number): (...args: any[]) => void;
/**
 * 把文本复制到剪切板
 * https://github.com/zenorocha/clipboard.js
 * @param text
 * @returns {Promise<any>}
 */
declare function clip2board(text: string): Promise<unknown>;
export { randomColor16, randomColorOpacity, hex2rgb, rgb2hsl, throttle, debounce, clip2board };
