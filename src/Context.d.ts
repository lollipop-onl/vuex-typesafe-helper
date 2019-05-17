/**
 * @file ActionContextを定義する
 */

import {
  ActionContext as BaseActionContext,
  CommitOptions,
  DispatchOptions
} from 'vuex';
import {
  Payload,
  BaseState,
  BaseGetters,
  BaseMutations,
  BaseActions,
  BaseStoreModule
} from './Base';
import { PickKeyWithPayload, PickKeyWithoutPayload } from './Utils';

/** ベースのペイロード */
export type BasePayload = { type: string };

/** Gettersを定義 */
export type DefineGetters<G> = G extends Record<string, (...args: any) => any> ? {
  [K in keyof G]: G[K] extends (state) => infer R ? R : never;
} : never;
/** Commit */
export type DefineCommit<M> = M extends Record<string, (...args: any) => any> ? {
  // @ts-ignore
  <K extends PickKeyWithPayload<M>>(type: K, payload: Payload<M[K]>, options?: CommitOptions): void;
  <K extends PickKeyWithoutPayload<M>>(type: K, payload?: never, options?: CommitOptions): void;

  // フォールバック
  (type: string, payload: any, options: CommitOptions): void;
} : never;

/** ActionContext */
export interface DefineActionContext<
  S extends BaseStoreModule['State'] = never,
  G extends BaseStoreModule['Getters'] = never,
  M extends BaseStoreModule['Mutations'] = never
> extends BaseActionContext<S, any> {
  getters: DefineGetters<G>;
  commit: DefineCommit<M>;
}