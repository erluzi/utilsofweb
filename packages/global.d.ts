interface Object {
  _events: {};
  on(type: string, fn: Function): void;
  once(type: string, fn: Function): void;
  off(type: string, fn: Function): void;
  trigger(type: string, ...args: any[]): void;
}

interface CustomUrl {
  source: string,
  protocol: string,
  host: string,
  port: number | string,
  query: string,
  params: {[index: string]: string},
  hash: string,
  path: string
}
