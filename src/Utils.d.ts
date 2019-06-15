/**
 * @file 型のユーティリティ
 */

/** オブジェクトの値を取り出す */
export type Values<T> = T extends { [key: string]: infer V }
  ? (V extends unknown ? never : V)
  : never;

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
 * ペイロードがあるプロパティのキーを取り出す
 */
export type PickKeyWithPayload<P> = P extends Record<
  string,
  (...args: any) => any
>
  ? Values<
      { [K in keyof P]: P[K] extends (context: any) => any ? undefined : K }
    >
  : never;

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
