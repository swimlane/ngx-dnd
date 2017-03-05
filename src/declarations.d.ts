// Extra variables that live on Global that
// will be replaced by webpack DefinePlugin
declare var ENV: string;
declare var APP_VERSION: string;
declare var IS_PRODUCTION: boolean;
declare var HMR: boolean;
declare var IS_DEV: boolean;
declare var TRAVIS: boolean;

// declare var require: any

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

interface ErrorConstructor {
  stackTraceLimit: number;
}

interface Drake {
  containers: any[];
  remove: () => void;
  on: (s: string, f: any) => void;
  emit: (s: string, a: any, b: any, c: any) => void;
  dragging: boolean;
}

declare module 'dragula';
declare module '@swimlane/ngx-ui';