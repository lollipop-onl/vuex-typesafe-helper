/**
 * @file ストアのベースとなる型
 */

import { CommitOptions, DispatchOptions } from "vuex";
import { PickKeyWithPayload, PickKeyWithoutPayload } from "./Utils";

/** State */
export type BaseState = Record<string, any>;
/** Getters */
export type BaseGetters = Record<string, (...args: any) => any>;
/** Mutations */
export type BaseMutations = Record<string, (...args: any) => void>;
/** Actions */
export type BaseActions = Record<string, (...args: any) => any>;
/** StoreModule */
export type BaseStoreModule = {
  State?: BaseState;
  Getters?: Record<string, any>;
  Mutations?: BaseMutations;
  Actions?: BaseActions;
};

/** Commit, Dispatchでのペイロードを取得 */
export type Payload<
  F extends (...args: any) => any,
  Default = never
> = F extends (ctx: any, payload: infer P) => any ? P : Default;

/** Commit */
export type Commit<M extends BaseMutations> = {
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
};

/** Dispatch */
export type Disaptch<A extends BaseActions> = {
  <K extends PickKeyWithPayload<A>>(
    type: K,
    payload: Payload<A[K]>,
    options?: DispatchOptions
  ): ReturnType<A[K]>;
  <K extends PickKeyWithoutPayload<A>>(
    type: K,
    payload?: Payload<A[K]>,
    options?: DispatchOptions
  ): ReturnType<A[K]>;
  // Payload with type
  <K extends PickKeyWithPayload<A>>(
    payloadWithType: Payload<A[K]> & { type: K },
    options?: DispatchOptions
  ): ReturnType<A[K]>;
  <K extends PickKeyWithoutPayload<A>>(
    payloadWithType: { type: K },
    options?: DispatchOptions
  ): ReturnType<A[K]>;
};
