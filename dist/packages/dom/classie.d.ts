declare type ClassIe = (elem: HTMLElement, c: string) => boolean | void;
interface CheckClass {
    (elem: HTMLElement, c: string): boolean;
}
declare function toggleClass(elem: HTMLElement, c: string): void;
declare let classie: {
    hasClass: CheckClass;
    addClass: ClassIe;
    removeClass: ClassIe;
    toggleClass: typeof toggleClass;
    has: CheckClass;
    add: ClassIe;
    remove: ClassIe;
    toggle: typeof toggleClass;
};
export default classie;
