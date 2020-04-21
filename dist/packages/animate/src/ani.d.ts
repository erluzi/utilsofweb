interface AniOptions {
    target: HTMLElement;
    easing?: string;
    duration?: number;
    delay?: number;
    loop?: boolean;
}
interface AniProps {
    [propName: string]: string;
}
declare let Ani: {
    listenerFn: undefined;
    stiff: boolean;
    accept: string[];
    aniProps: never[];
    aniPropsAll: never[];
    getPropsAll(): any;
    initProps(...props: string[]): void;
    ani(options: AniOptions, props: AniProps): Promise<unknown>;
};
export { Ani };
