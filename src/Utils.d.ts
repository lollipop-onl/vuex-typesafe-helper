/**
 * @file 型のユーティリティ
 */

/** オブジェクトの値を取り出す */
export type Values<T, Default = never> = T extends { [key: string]: infer V } ? V : Default;

/**
 * Converorの引数をバリデーションする
 * @param A Getter, Mutation, Actionのいずれかをtypeofしたもの
 * @param P モジュールでの名前と元のメソッド名のオブジェクト
 */
export type Validator<A extends Record<string, any>, P> = keyof A extends never
  ? {}
  : keyof A extends Values<P>
  ? Values<P> extends keyof A
    ? Record<string, string>
    : keyof A
  : keyof A;

/**
 * @param A Getter, Mutation, Actionのいずれかをtypeofしたもの
 * @param P モジュールでの名前と元のメソッド名のオブジェクト
 */
export type Convertor<
  A extends Record<string, any>,
  P extends Validator<A, P>
> = P extends Record<string, string> ? { [K in keyof P]: A[P[K]] } : never;

/**
 * ペイロードがないプロパティのキーを取り出す
 */
export type PickKeyWithoutPayload<P> = P extends Record<
  string,
  (...args: any) => any
>
  ? Values<
      { [K in keyof P]: P[K] extends (context: any) => any ? K : undefined }
    >
  : never;

/**
 * Omit
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Nil
 */
export type Nil<T> = T | undefined | null;

/**
 *
 */
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

/**
 *
 */
export type ToNestedObject<V, Ks extends string[]> = ToObjectFromKeys<V, Ks[0], Ks[1], Ks[2], Ks[3], Ks[4]>
