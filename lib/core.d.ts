/**
 * @file コアの型定義
 */

import {CommitOptions, DispatchOptions} from "vuex";
import { Mutations, Actions } from "./base";
import { PickKeyWithoutPayload } from './utils';

/** 関数からペイロード引数を取り出す */
export type PickPayload<
  F extends (...args: any) => any,
  Default = never,
> = F extends (ctx: any, payload: infer P) => any ? P : Default;

/** ベース型をCommitメソッドにマッピングする */
export interface CommitMapper<M extends Mutations> {
  <K extends keyof M>(
    type: K,
    payload: PickPayload<M[K]>,
    options?: CommitOptions,
  ): void;
  <K extends PickKeyWithoutPayload<M>>(
    type: K,
  ): void;
}

/** ベース型をdispatchメソッドにマッピングする */
export type DispatchMapper<A extends Actions> = {
  <K extends keyof A>(
    type: K,
    payload: PickPayload<A[K]>,
    options?: DispatchOptions,
  ): ReturnType<A[K]>;
  <K extends PickKeyWithoutPayload<A>>(
    type: K,
  ): ReturnType<A[K]>;
};
