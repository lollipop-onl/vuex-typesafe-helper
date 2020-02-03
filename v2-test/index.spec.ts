import { DefineRootStore } from '../lib';
import { Store as CounterStore } from './store/counter';
import { Store as SampleCounterStore } from './store/sample/counter';

type RootStore = DefineRootStore<CounterStore & SampleCounterStore>;

declare var $store: RootStore;

$store.commit('counter/addCount', '100');
