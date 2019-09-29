/**
 * @file ストアのベースとなる型
 */

import { CommitOptions, DispatchOptions } from "vuex";
import { PickKeyWithoutPayload } from "./utils";

/** State */
export interface State {
  [key: string]: any;
}
/** Getters */
export interface Getters {
  [key: string]: (...args: any) => any;
}
/** Mutations */
export interface Mutations {
  [key: string]: (...args: any) => void;
}
/** Actions */
export interface Actions {
  [key: string]: (...args: any) => any;
}
/** StoreModule */
export interface BaseStoreModule {
  State?: State;
  Getters?: Record<string, any>;
  Mutations?: Mutations;
  Actions?: Actions;
}

/** Commit, Dispatchでのペイロードを取得 */
export type Payload<
  F extends (...args: any) => any,
  Default = never
> = F extends (ctx: any, payload: infer P) => any ? P : Default;

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
  <K extends PickKeyWithoutPayload<M>>(
    payloadWithType: { type: K },
    options?: CommitOptions
  ): void;
};

/** Dispatch */
export type Dispatch<A extends Actions> = {
  // Payload with type
  <K extends PickKeyWithoutPayload<A>>(
    payloadWithType: { type: K },
    options?: DispatchOptions
  ): ReturnType<A[K]>;
  <K extends keyof A>(
    payloadWithType: Payload<A[K]> & { type: K },
    options?: DispatchOptions
  ): ReturnType<A[K]>;

  <K extends PickKeyWithoutPayload<A>>(
    type: K,
    payload?: Payload<A[K]>,
    options?: DispatchOptions
    ): ReturnType<A[K]>;
    <K extends keyof A>(
      type: K,
      payload: Payload<A[K]>,
      options?: DispatchOptions
    ): ReturnType<A[K]>;
};
