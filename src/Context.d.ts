/**
 * @file ActionContextを定義する
 */

import {
  ActionContext as BaseActionContext,
  CommitOptions,
  DispatchOptions
} from "vuex";
import {
  Payload,
  BaseState,
  BaseGetters,
  BaseMutations,
  BaseStoreModule
} from "./Base";
import { PickKeyWithPayload, PickKeyWithoutPayload } from "./Utils";

/** ベースのペイロード */
export type BasePayload = { type: string };

/** Gettersを定義 */
export type DefineGetters<G extends BaseGetters> = {
  [K in keyof G]: G[K] extends (...args: any) => infer R ? R : never
};
/** Commit */
export type DefineCommit<M extends BaseMutations> = {
  <K extends PickKeyWithPayload<M>>(
    type: K,
    payload: Payload<M[K]>,
    options?: CommitOptions
  ): void;
  <K extends PickKeyWithoutPayload<M>>(
    type: K,
    payload?: Payload<M[K]>,
    options?: CommitOptions
  ): void;
  // Payload with type
  <K extends PickKeyWithPayload<M>>(
    payloadWithType: Payload<M[K]> & { type: K },
    options?: CommitOptions
  ): void;
  <K extends PickKeyWithoutPayload<M>>(
    payloadWithType: { type: K },
    options?: CommitOptions
  ): void;

  // フォールバック
  (type: string, payload: any, options: CommitOptions): void;
};

/** ActionContext */
export interface DefineActionContext<
  S extends BaseState = never,
  G extends BaseGetters = never,
  M extends BaseMutations = never
> extends BaseActionContext<S, any> {
  getters: DefineGetters<G>;
  commit: DefineCommit<M>;
}
