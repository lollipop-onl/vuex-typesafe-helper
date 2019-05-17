/**
 * @file 型のユーティリティ
 */

/** オブジェクトの値を取り出す */
export type Values<T> = T extends { [key: string]: infer V } ? V : never;

/**
 * @param A Getter, Mutation, Actionのいずれかをtypeofしたもの
 * @param P モジュールでの名前と元のメソッド名のオブジェクト
 */
export type Convertor<
  A extends Record<string, any>,
  P extends (keyof A extends Values<P> ? Values<P> extends keyof A ? Record<string, string> : keyof A : keyof A)
> = P extends Record<string, string> ? {
  [K in keyof P]: A[P[K]];
} : never;
