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
export type DefineGetters<G> = G extends BaseGetters ? {
  [K in keyof G]: ReturnType<G[K]>;
} : never;
/** Mutations */
export type DefineMutations<M> = M extends BaseMutations
  ? Commit<M>
  : never;
/** Actions */
export type DefineActions<A> = A extends BaseActions
  ? Disaptch<A>
  : never;

/** StoreModuleを定義 */
export interface DefineStoreModule<
  N extends string,
  S extends BaseStoreModule['State'] = never,
  G extends BaseStoreModule['Getters'] = never,
  M extends BaseStoreModule['Mutations'] = never,
  A extends BaseStoreModule['Actions'] = never
> extends Store<DefineState<N, S>> {
  getters: DefineGetters<G>;
  commit: DefineMutations<M>;
  dispatch: DefineActions<A>;
}