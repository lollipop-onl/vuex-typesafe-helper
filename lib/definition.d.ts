/**
 * @file 各種定義系型定義
 */

import { Actions, Getters, Mutations, State } from './base';
import { CommitMapper, DispatchMapper } from './core';
import { Neverable, ToNestedObject } from './utils';

/** モジュールのState型を定義 */
export type DefineState<NS extends string | string[], S extends State> =
  NS extends ''
    // ルートモジュール
    ? S
    : NS extends string
    ? { [K in NS]: S }
    : NS extends string[]
      ? ToNestedObject<S, NS>
      : S;

/** モジュールのGetters型を定義 */
export type DefineGetters<G extends Getters> = { [K in keyof G]: ReturnType<G[K]> };

/** モジュールのMutations型を定義 */
export type DefineMutations<M extends Mutations> = CommitMapper<M>;

/** モジュールのActions型を定義 */
export type DefineActions<A extends Actions> = DispatchMapper<A>;
