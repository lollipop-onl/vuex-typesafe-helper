import { Store as CounterStore } from './store/counter';
import { Store as SampleCounterStore } from './store/sample/counter';

type RootStoreModule = CounterStore & SampleCounterStore;
