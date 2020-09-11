import { CommitOptions } from 'vuex';
import { BaseMutations } from './base';
import { PickPayload, PickKeyWithoutPayload, PickKeyOfPayloadWithType, PickPayloadWithType } from './utils';

/** MutationsをCommitメソッドにマップする */
export interface CommitMapper<M extends BaseMutations> {
  <K extends keyof M>(
    type: K,
    payload: PickPayload<M[K]>,
    options?: CommitOptions
  ): void;
  <K extends PickKeyWithoutPayload<M>>(
    type: K,
  ): void;

  <K extends PickKeyOfPayloadWithType<M>>(
    payloadWithType: PickPayloadWithType<K, M[K]>,
  ): void;
}
