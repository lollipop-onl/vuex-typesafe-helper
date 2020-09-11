import { ActionContext, Store } from 'vuex';
import { BaseState, BaseGetters, BaseMutations, BaseActions } from './base';
import { CommitMapper } from './commit-mapper';
import { DispatchMapper } from './dispatch-mapper';
import { NeverableDefault, NamespaceMapper } from './utils';

/** Stateの型を定義する */
export type DefineState<NS extends string | never, S extends BaseState> =
  NS extends never
    ? S
    : NS extends `${infer N}/${infer R}`
      ? { [K in N]: DefineState<R, S> }
      : { [K in NS]: S };

/** Gettersの型を定義する */
export type DefineGettters<G extends BaseGetters> = {
  [K in keyof G]: ReturnType<G[K]>;
};

/** Mutationsの型を定義する */
export type DefineMutations<M extends BaseMutations> = CommitMapper<M>;

/** Actionsの型を定義する */
export type DefineActions<A extends BaseActions> = DispatchMapper<A>;

/** ローカルのActionContext型を定義する */
export interface DefineActionContext<
  S extends BaseState | never,
  G extends BaseGetters | never,
  M extends BaseMutations,
> extends ActionContext<NeverableDefault<S, {}>, any> {
  getters: NeverableDefault<DefineGettters<G>, {}>;
  commit: DefineMutations<M>;
}

/** ストアモジュールの型を定義する */
export type DefineStoreModule<
  NS extends string | never,
  S extends BaseState | never,
  G extends BaseGetters | never,
  M extends BaseMutations | never,
  A extends BaseActions | never,
> = {
  state: NeverableDefault<DefineState<NS, S>, {}>;
  getters: NeverableDefault<NamespaceMapper<NS, G>, {}>;
  mutations: NeverableDefault<NamespaceMapper<NS, M>, {}>;
  actions: NeverableDefault<NamespaceMapper<NS, A>, {}>;
};

/** すべてのストアモジュールをまとめるRootStoreの型を定義する */
export interface DefineRootStore<SM extends {
  state: BaseState;
  getters: BaseGetters;
  mutations: BaseMutations;
  actions: BaseActions;
}> extends Store<SM['state']> {
  getters: DefineGettters<SM['getters']>;
  commit: DefineMutations<SM['mutations']>;
  dispatch: DefineActions<SM['actions']>;
}
