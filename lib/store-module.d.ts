/**
 * @file ストアモジュールで使用する型
 */

import { ActionContext, Commit } from 'vuex';
import { Actions, Getters, Mutations, State } from "./base";
import { DefineState, DefineGetters, DefineMutations } from './definition';
import { Neverable, ToPair } from './utils';

/** モジュールのメソッド名とグローバルのタイプ名を変換する */
export type Converter<
  T extends Record<string, any>,
  P extends { [K in keyof T]: string },
> = {
  [K in ToPair<P>[1]]: T[Extract<ToPair<P>, [string, K]>[0]];
}

/** ストアモジュールのActionContextの型を定義する */
export interface DefineActionContext<
  S extends State,
  G extends Getters,
  M extends Mutations,
  RS = any,
> extends ActionContext<S, RS> {
  getters: DefineGetters<G>,
  commit: DefineMutations<M>,
}

/** ストアモジュールの型を定義する */
export interface DefineStoreModule<
  NS extends string | string[],
  S extends State | never,
  G extends Getters | never,
  M extends Mutations | never,
  A extends Actions | never,
> {
  state: DefineState<NS, S>,
  getters: Neverable<G, {}>,
  mutations: Neverable<M, {}>,
  actions: Neverable<A, {}>,
}
