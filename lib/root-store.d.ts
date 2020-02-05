/**
 * @file RootStoreの型定義
 */

import { Store } from 'vuex';
import { StoreModule } from './base';
import { DefineGetters, DefineMutations, DefineActions } from './definition';

export interface DefineRootStore<S extends StoreModule> extends Store<S['state']> {
  getters: DefineGetters<S['getters']>;
  commit: DefineMutations<S['mutations']>;
  dispatch: DefineActions<S['actions']>;
}
