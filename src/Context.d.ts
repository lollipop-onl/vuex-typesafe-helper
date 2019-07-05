/**
 * @file ActionContextを定義する
 */

import {
  ActionContext as BaseActionContext,
  CommitOptions
} from "vuex";
import {
  Payload,
  State,
  Getters,
  Mutations
} from "./base";
import { DefineGetters } from "./core";
import { PickKeyWithoutPayload } from "./utils";

/** Commit */
export type Commit<M extends Mutations> = {
  <K extends keyof M>(
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
  <K extends keyof M>(
    payloadWithType: Payload<M[K]> & { type: K },
    options?: CommitOptions
  ): void;

  // Fallbacks
  (tyoe: string, payload: any, options: CommitOptions & { root: true }): void;
  (payloadWithType: Record<any, any> & { type: string }, options: CommitOptions & { root: true }): void;
};

/** Mutations */
export type DefineMutations<M extends Mutations> = Commit<M>;

/** ActionContext */
export interface DefineActionContext<
  S extends State,
  G extends Getters,
  M extends Mutations
> extends BaseActionContext<S, any> {
  getters: DefineGetters<G>;
  commit: DefineMutations<M>;
}
