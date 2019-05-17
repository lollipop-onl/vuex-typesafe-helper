import { assert, IsExact, Has, NotHas } from 'conditional-type-checks';
import { Module as CounterStore } from './store/counter';
import { Module as TimerStore } from './store/timer';

export type RootStore = CounterStore & TimerStore;

// - Test Utility

assert<IsExact<RootStore['state']['counter']['count'], number>>(true);
assert<Has<keyof RootStore['state']['counter'], 'count'>>(true);
assert<NotHas<keyof RootStore['state']['counter'], 'unknown'>>(true);

declare var $store: RootStore;

$store.dispatch('counter/fetchData', '');