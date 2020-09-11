/** 関数型 */
export type FunctionLike = (...args: any[]) => any;

/** Booleanを反転する */
export type NOT<T extends boolean> = T extends true ? false : true;

/** BooleanのORを提供する型 */
export type OR<T extends boolean[]> =
  T extends readonly [infer C, ...infer R]
    ? C extends true
      ? true
      : R extends boolean[]
        ? OR<R>
        : false
    : false;

/** BooleanのANDを提供する型 */
export type AND<T extends boolean[]> =
T extends readonly [infer C, ...infer R]
  ? C extends false
    ? false
    : R extends boolean[]
      ? OR<R>
      : false
  : true;

/** オブジェクト・配列の値の型を共用体で取得 */
export type ValueOf<T extends Record<string, any>> = T[keyof T];

/** ２つの型が同一か判定する */
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;

/** 型がNeverの場合にデフォルトの型を返す */
export type NeverableDefault<T, D> = Equal<T, never> extends true ? D : T;

/** ペイロードが必ず存在するプロパティのキーを取り出す */
export type PickKeyWithPayload<T extends Record<string, FunctionLike>> =
  T extends Record<string, FunctionLike>
    ? ValueOf<{
      [K in keyof T]: T[K] extends (context: any, payload: infer P) => any
        ? OR<[Equal<P, unknown>, undefined extends P ? true : false]> extends true
          ? never
          : K
        : never
    }>
    : never;

/** ペイロードが存在しない可能性があるプロパティを取り出す */
export type PickKeyWithoutPayload<T extends Record<string, FunctionLike>> =
  T extends Record<string, FunctionLike>
    ? ValueOf<{
      [K in keyof T]: T[K] extends (context: any, payload: infer P) => any
        ? OR<[Equal<P, unknown>, undefined extends P ? true : false]> extends true
          ? K
          : never
        : never
    }>
    : never;
