/**
 * @file コアの型定義
 */

import {CommitOptions, DispatchOptions} from "vuex";
import { Mutations } from "./base";
import { PickKeyWithoutPayload } from "./utils";
import {Actions, Payload} from "../src/base";

/** 関数からペイロード引数を取り出す */
export type PickPayload<
  F extends (...args: any) => any,
  Default = never,
> = F extends (ctx: any, payload: infer P) => any ? P : Default;

/** ベース型をCommitメソッドにマッピングする */
export type CommitMapper<M extends Mutations> = {
  <K extends keyof M>(
    type: K,
    payload: PickPayload<M[K]>,
    options?: CommitOptions
  ): void;
  <K extends PickKeyWithoutPayload<M>>(
    type: K,
    payload?: PickPayload<M[K]>,
    options?: CommitOptions
  ): void;

  // Payload with type
  <K extends keyof M>(
    payloadWithType: PickPayload<M[K]> & { type: K },
    options?: CommitOptions
  ): void;
  <K extends PickKeyWithoutPayload<M>>(
    payloadWithType: { type: K },
    options?: CommitOptions
  ): void;
};

/** ベース型をdispatchメソッドにマッピングする */
export type DispatchMapper<A extends Actions> = {
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
