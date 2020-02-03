/**
 * @file 型のユーティリティ
 */

/** オブジェクトのValueを取り出す */
export type ValuesOf<T extends Record<string, any>> = T[keyof T];

/** ２つの型が等しいかを判定する */
export type IsEquals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;

/** Neverの場合にデフォルトの型を返す */
export type Neverable<T, D> = IsEquals<T, never> extends true ? D : T;

/** ペイロードがないプロパティのキーを取り出す */
export type PickKeyWithoutPayload<P> = P extends Record<
    string,
    (...args: any) => any
    >
  ? ValuesOf<
    { [K in keyof P]: P[K] extends (context: any) => any ? K : undefined }
    >
  : never;

/** ジェネリックからネストされたオブジェクト型を生成 */
export type ToObjectFromKeys<
  V,
  K1 extends string | undefined = undefined,
  K2 extends string | undefined = undefined,
  K3 extends string | undefined = undefined,
  K4 extends string | undefined = undefined,
  K5 extends string | undefined = undefined,
  > =
  K1 extends undefined
    ? V
    : K1 extends string
    ? { [K in K1]: ToObjectFromKeys<V, K2, K3, K4, K5> }
    : V;

/** 文字列の配列からネストされたオブジェクト型を生成 */
export type ToNestedObject<V, Ks extends string[]> = ToObjectFromKeys<V, Ks[0], Ks[1], Ks[2], Ks[3], Ks[4]>;

/** オブジェクトのKeyとValueのペアを取り出す */
export type ToPair<T extends Record<string, string>> = {
  [P in keyof T]: [P, T[P]];
}[keyof T];
