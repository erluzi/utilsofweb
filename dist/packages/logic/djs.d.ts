declare class Djs {
    el: HTMLElement;
    leftSecond: number;
    timer: any;
    constructor(el: HTMLElement, leftMs: number);
    show(prefix?: string): void;
    handle(prefix: string): void;
}
export default Djs;
