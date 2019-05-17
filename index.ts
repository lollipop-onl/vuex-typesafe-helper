import { Values } from './src/Utils';

const actions = {
  foo(context: any, payload: string): void {},
  bar(context: any): void {},
  baz(context: any, payload: number): void {},
}

type NoUndefinedFeild<T> = { [P in keyof T]: Exclude<T[P], null | undefined> };

export type WeakPayload<F extends (...args: any) => any> = F extends (ctx, payload: infer P) => any
  ? P
  : never;
type PickWPayload<A> = A extends Record<string, (...args: any) => any>
  ?
    Values<{
      [K in keyof A]: A[K] extends (context: any) => any ? undefined : K;
    }>
  : never;
type PickWOPayload<A> = A extends Record<string, (...args: any) => any>
  ?
    Values<{
      [K in keyof A]: A[K] extends (context: any) => any ? K : undefined;
    }>
  : never;
type Define<A> = A extends Record<string, (...args: any) => any>
  ?
    {
      // @ts-ignore
      <K extends PickWPayload<A>, I extends K>(type: K, payload: WeakPayload<A[K]>): ReturnType<A[K]>;
      // @ts-ignore
      <K extends PickWOPayload<A>>(type: K): ReturnType<A[K]>;
    }
  : never

type c<P extends PickWOPayload<typeof actions>> = { [K in keyof P]-?: NoUndefinedFeild<P[K]> };
type a = Define<typeof actions>;

declare var b: a;
