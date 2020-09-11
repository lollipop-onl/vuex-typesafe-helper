/** 関数型 */
export type FunctionLike<R = any> = (...args: any[]) => R;

/** キーが文字列のオブジェクト */
export type Collection<T = any> = Record<string, T>;

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
export type ValueOf<T extends Collection> = T[keyof T];

/** ２つの型が同一か判定する */
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;

/** 型がNeverの場合にデフォルトの型を返す */
export type NeverableDefault<T, D> = Equal<T, never> extends true ? D : T;

/** 関数からペイロード（第２引数）を取り出す */
export type PickPayload<F extends FunctionLike, D = undefined> =
  F extends (context: any, payload: infer P) => any
    ? Equal<P, unknown> extends true
      ? D
      : P
    : D;

/** ペイロードが存在しない可能性があるプロパティを取り出す */
export type PickKeyWithoutPayload<T extends Collection<FunctionLike>> =
  T extends Collection<FunctionLike>
    ? ValueOf<{
      [K in keyof T]: T[K] extends (context: any, payload: infer P) => any
        ? OR<[Equal<P, unknown>, undefined extends P ? true : false]> extends true
          ? K
          : never
        : never
    }>
    : never;

/** type付きのPayloadを使用できるプロパティを取り出す */
export type PickKeyOfPayloadWithType<T extends Collection<FunctionLike>> =
  T extends Collection<FunctionLike>
    ? ValueOf<{
      [K in keyof T]: T[K] extends (context: any, payload: infer P) => any
        ? AND<[Equal<P, unknown>, P extends Collection ? true : false]> extends true
          ? K
          : never
        : never
    }>
    : never;

/** type付きのPayloadを取り出す */
export type PickPayloadWithType<K extends string | number | symbol, T extends FunctionLike> =
  Equal<PickPayload<T>, never> extends true
    // ペイロードが存在しない場合
    ? { type: K }
    : PickPayload<T> extends Collection
      ? undefined extends PickPayload<T>
        // ペイロードがOptionalな場合
        ? ({ type: K } & PickPayload<T>) | { type: K }
        : { type: K } & PickPayload<T>
      : never

/** Namespaceを付与したキーを取得する */
export type Namespaced<NS extends string | never, K extends string | number | symbol> =
  K extends string | number
    ? Equal<NS, never> extends true
      ? K
      : `${NS}/${K}`
    : never;

/** プロパティにNamespaceを付与する */
export type NamespaceMapper<NS extends string | never, T extends Collection> = {
  [K in keyof T as Namespaced<NS, K>]: T[K];
};
