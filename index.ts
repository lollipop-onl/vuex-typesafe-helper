import { Values } from './src/Utils';

// export type Validator<A extends Record<string, any>, P> =
//     keyof A extends never
//       ? {}
//       : keyof A extends Values<P>
//         ? Values<P> extends keyof A
//           ? Record<string, string>
//           : keyof A
//         : keyof A

// export type Convertor<
//   A extends Record<string, any>,
//   P extends Validator<A, P>
// > = P extends Record<string, string> ? {
//   [K in keyof P]: A[P[K]];
// } : never;

// const a = {
//   'hello': 1,
//   'world': 2,
// };

// type A = Convertor<typeof a, {
//   'aa': 'hello',
//   'bb': 'world2'
// }>;

// type B<P extends Record<string, string>> = {};
// type C = B<never>;

export type PickKeyWithPayload<P> = P extends Record<string, (...args: any) => any>
  ?
    Values<{
      [K in keyof P]: P[K] extends (context: any) => any ? undefined : K
    }>
  : never;

/**
 * ペイロードがないプロパティのキーを取り出す
 */
export type PickKeyWithoutPayload<P> = P extends Record<string, (...args: any) => any>
?
  Values<{
    [K in keyof P]: P[K] extends (context: any, payload: any | undefined) => any ? K : undefined;
  }>
: never;

const actions = {
  hello1: (context, payload?: string) => {},
  hello2: (context) => {},
  hello3: (context, payload: string) => {},
};

type k1 = PickKeyWithPayload<typeof actions>;
type k2 = PickKeyWithoutPayload<typeof actions>;