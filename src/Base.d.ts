/**
 * @file ストアのベースとなる型
 */

import { CommitOptions } from 'vuex';

/** State */
export type BaseState = Record<string, any>;
/** Getters */
export type BaseGetters = Record<string, any>;
/** Mutations */
export type BaseMutations = Record<string,(...args: any) => void>;
/** Actions */
export type BaseActions = Record<string, (...args: any) => any>;
/** StoreModule */
export type BaseStoreModule = {
  State?: BaseState;
  Getters?: BaseGetters;
  Mutations?: BaseMutations;
  Actions?: BaseActions;
}

/** Commit, Dispatchでのペイロードを取得 */
export type Payload<F extends (...args: any) => any, O = any> = F extends (context) => any ? [undefined?, O?]
  : F extends (context, payload?: infer P) => any
  ? [P, O?]
  : [undefined?, O?];
/** Commit */
export type Commit<M extends BaseMutations> = {
  <K extends keyof M>(type: K, ...payload: Payload<M[K], CommitOptions>): void;
}
/** Dispatch */
export type Disaptch<A extends BaseActions> = {
  <K extends keyof A>(type: K, ...payload: Payload<A[K]>): ReturnType<A[K]>;
}
