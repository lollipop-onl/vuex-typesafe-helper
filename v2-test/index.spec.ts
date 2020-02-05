import { assert, IsExact } from 'conditional-type-checks';
import { DefineRootStore } from '../lib';
import { Store as IndexStore } from './store';
import { Store as NeverStore } from './store/never';
import { Store as CounterStore } from './store/counter';
import { Store as MypageAccountStore } from './store/mypage/account';

export type RootStore = DefineRootStore<
  IndexStore
  & NeverStore
  & CounterStore
  & MypageAccountStore
>;

declare const $store: RootStore;

/**
 * State
 */
assert<IsExact<typeof $store.state.loading, boolean>>(true);
assert<IsExact<typeof $store.state.counter.count, number>>(true);
assert<IsExact<typeof $store.state.mypage.account.account, undefined | Record<string, any>>>(true);

/**
 * Getters
 */
assert<IsExact<typeof $store.getters['counter/doubleCount'], number>>(true);
assert<IsExact<typeof $store.getters['mypage/account/fullName'], string | void>>(true);

/**
 * Mutations
 */
// ペイロードの指定が必須なMutation
$store.commit('setLoadingStatus', false);

// ペイロードが省略可能なMutation
$store.commit('counter/addCount', 100);
$store.commit('counter/addCount');

// ペイロードが指定されていないMutation
$store.commit('counter/resetCount');
$store.commit('counter/resetCount', 100);

/**
 * Actions
 */
// ペイロードの指定が必須なAction
$store.dispatch('mypage/account/fetchUserAccount', '1234');

// ペイロードが省略可能なAction
$store.dispatch('mypage/account/deleteAccount');
$store.dispatch('mypage/account/deleteAccount', '1234');

// ペイロードが指定されていないAction
$store.dispatch('mypage/account/fetchMyAccount');

// ペイロードがオブジェクトのAction
$store.dispatch('mypage/account/updateAccount', { firstName: '', lastName: '' });
