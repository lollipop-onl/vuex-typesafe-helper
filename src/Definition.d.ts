/**
 * @file 各種定義を行う型
 */

import { Store } from 'vuex';
import {
  BaseState,
  BaseGetters,
  BaseMutations,
  BaseActions,
  BaseStoreModule,
  Commit,
  Disaptch
} from './Base';

/** State */
export type DefineState<N extends string, S> = S extends BaseState ? { [K in N]: S } : never;
/** Getters */
export type DefineGetters<G extends BaseGetters> = {
  [K in keyof G]: ReturnType<G[K]>;
}
/** Mutations */
export type DefineMutations<M extends BaseMutations> = Commit<M>;
/** Actions */
export type DefineActions<A extends BaseActions> = Disaptch<A>;

/** StoreModuleを定義 */
export interface DefineStoreModule<
  N extends string,
  S extends BaseState = never,
  G extends BaseGetters = never,
  M extends BaseMutations = never,
  A extends BaseActions = never
> extends Store<DefineState<N, S>> {
  getters: DefineGetters<G>;
  commit: DefineMutations<M>;
  dispatch: DefineActions<A>;
}