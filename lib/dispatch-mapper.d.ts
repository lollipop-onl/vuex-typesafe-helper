import { DispatchOptions } from 'vuex';
import { BaseActions } from './base';
import { PickPayload, PickKeyWithoutPayload, PickKeyOfPayloadWithType, PickPayloadWithType } from './utils';

/** Actionsをdispatchメソッドにマップする */
export interface DispatchMapper<A extends BaseActions> {
  <K extends keyof A>(
    type: K,
    payload: PickPayload<A[K]>,
    options?: DispatchOptions
  ): ReturnType<A[K]>;
  <K extends PickKeyWithoutPayload<A>>(
    type: K,
  ): ReturnType<A[K]>;

  <K extends PickKeyOfPayloadWithType<A>>(
    payloadWithType: PickPayloadWithType<K, A[K]>,
  ): ReturnType<A[K]>;
}
