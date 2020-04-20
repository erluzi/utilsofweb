interface Object {
  _events: {},
  on(type: string, fn: Function): void;
  once(type: string, fn: Function): void;
  off(type: string, fn: Function): void;
  trigger(type: string, ...args: any[]): void;
}
