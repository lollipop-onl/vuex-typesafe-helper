/**
 * @file 各種コアの定義を行う
 */

import { Store } from 'vuex';
import {
  State,
  Getters,
  Mutations,
  Actions,
  BaseStoreModule,
  Commit,
  Dispatch
} from './base';

/** State */
export type DefineState<N extends string, S> =
  S extends State
    ? N extends ''
      // ルートモジュール
      ? S
      : { [K in N]: S }
    : never;

/** Getters */
export type DefineGetters<G extends Getters> = {
  [K in keyof G]: ReturnType<G[K]>;
};

/** Mutations */
export type DefineMutations<M extends Mutations> = Commit<M>;

/** Actions */
export type DefineActions<A extends Actions> = Dispatch<A>;

export interface DefineStoreModule<
  NS extends string,
  S extends State,
  G extends Getters,
  M extends Mutations,
  A extends Actions
> extends Store<DefineState<NS, S>> {
  getters: DefineGetters<G>;
  commit: DefineMutations<M>;
  dispatch: DefineActions<A>;
}