// 0x112233 => 0001 0001 0010 0010 0011 0011
/**
 * 色值转换
 * @param val
 */
function hex2rgb(val) {
    let regHex3 = /^#([0-9a-f]{3})$/;
    let regHex6 = /^#([0-9a-f]{6})$/;
    if (regHex3.test(val)) {
        let m = parseInt(val.replace(/^#/, ''), 16);
        let r = (m >> 8) | (m >> 4 & 0x0f0);
        let g = (m >> 4 & 0xf) | (m & 0xf0);
        let b = ((m & 0xf) << 4) | (m & 0xf);
        return `rgb(${r}, ${g}, ${b})`;
    }
    else if (regHex6.test(val)) {
        let m = parseInt(val.replace(/^#/, ''), 16);
        let r = m >> 16;
        let g = m >> 8 & 0xff;
        let b = m & 0xff;
        return `rgb(${r}, ${g}, ${b})`;
    }
    else {
        throw new Error(`argument ${val} is not a color`);
    }
}

// use:
// Ani.initProps('width', 'height')
// Ani.ani(
//   {target: Dom.$('.ani')},
//   {width: '100px'}
// )
let Ani = {
    listenerFn: undefined,
    stiff: true,
    accept: ['target', 'easing', 'duration', 'delay', 'loop'],
    aniProps: [],
    aniPropsAll: [],
    getPropsAll() {
        if (this.aniPropsAll.length) {
            return this.aniPropsAll;
        }
        else {
            return Object.keys(getComputedStyle(document.body)).filter((value, index, array) => {
                return isNaN(Number(value)) && !value.startsWith('webkit');
            });
        }
    },
    initProps(...props) {
        let propsAll = this.getPropsAll();
        let aniProps = [];
        for (let prop of props) {
            if (propsAll.includes(prop)) {
                aniProps.push(prop);
            }
        }
        this.aniProps = aniProps;
    },
    ani(options, props) {
        return new Promise((resolve, reject) => {
            let target = options.target;
            let easing = options.easing || 'ease';
            let duration = options.duration || 300;
            let delay = options.delay || 0;
            let loop = options.loop || false;
            target.style.transition = `all ${duration}ms ${easing} ${delay}ms`;
            if (this.listenerFn !== undefined) {
                target.removeEventListener('transitionend', this.listenerFn);
            }
            this.listenerFn = () => {
                this.stiff = true;
                resolve();
            };
            target.addEventListener('transitionend', this.listenerFn);
            for (let prop of this.aniProps) {
                let aniProp = props[prop];
                if (aniProp) {
                    if (/^#([0-9a-f]{3})$/.test(aniProp) || /^#([0-9a-f]{6})$/.test(aniProp)) {
                        if (hex2rgb(aniProp) !== target.style[prop]) {
                            console.log(`update color ${prop}: ${aniProp}`);
                            target.style[prop] = aniProp;
                            this.stiff = false;
                        }
                    }
                    else {
                        if (aniProp !== target.style[prop]) {
                            console.log(`update ${prop}: ${aniProp}`);
                            target.style[prop] = aniProp;
                            this.stiff = false;
                        }
                    }
                }
            }
            //未发生动画
            if (this.stiff)
                resolve();
        });
    }
};

export { Ani };
