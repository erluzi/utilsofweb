interface Swipe {
    moveLeft(): void;
    moveRight(): void;
}
declare class MobileSwipe implements Swipe {
    constructor({ box, items, duration, loop, auto, times }: {
        box?: string | undefined;
        items?: string | undefined;
        duration?: number | undefined;
        loop?: boolean | undefined;
        auto?: boolean | undefined;
        times?: number | undefined;
    });
    moveLeft(): void;
    moveRight(): void;
}
export default MobileSwipe;
