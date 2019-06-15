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
  BaseStoreModule,
  Commit
} from "./Base";
import { DefineGetters } from "./Definition";
import { PickKeyWithoutPayload } from "./Utils";

/** ActionContext */
export interface DefineActionContext<
  S extends BaseState = never,
  G extends BaseGetters = never,
  M extends BaseMutations = never
> extends BaseActionContext<S, any> {
  getters: DefineGetters<G>;
  commit: Commit<M>;
}
