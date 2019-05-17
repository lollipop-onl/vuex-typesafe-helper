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

/** ベースのペイロード */
export type BasePayload = { type: string };
/** ペイロードを取得（Optionalを区別しない） */
export type WeakPayload<F extends (...args: any) => any> = F extends (ctx, payload: infer P) => any
  ? P
  : {};

/** Gettersを定義 */
export type DefineGetters<G> = G extends Record<string, (...args: any) => any> ? {
  [K in keyof G]: G[K] extends (state) => infer R ? R : never;
} : never;
/** Commit */
export type DefineCommit<M> = M extends Record<string, (...args: any) => any> ? {
  <K extends keyof M>(type: K, payload: Payload<M[K]>): void;
  <K extends keyof M>(payloadWithType: BasePayload & WeakPayload<M[K]>): void;

  // フォールバック
  (type: string, payload: any, options: CommitOptions): void;
  (payloadWithType: BasePayload, options: CommitOptions): void;
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