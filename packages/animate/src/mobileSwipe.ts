interface Swipe {
  moveLeft(): void,
  moveRight(): void
}

interface ParamsMobileSwipe {
  box?: string,
  items?: string,
  duration?: number,
  loop?: boolean,
  auto?: boolean,
  times?: number,
}

class MobileSwipe implements Swipe{
  constructor({box = '.swipe-box', items = '.swipe-item', duration = 400, loop = true, auto = true, times = 4000}) {
  }
  moveLeft(): void {
  }
  moveRight(): void {
  }
}

export default MobileSwipe
