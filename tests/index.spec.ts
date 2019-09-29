import { assert, IsExact, Has, NotHas } from "conditional-type-checks";
import { Store as IndexStore } from "./store/";
import { Store as CounterStore } from "./store/counter";
import { Store as TimerStore } from "./store/timer";
import { Store as SampleCounterStore } from "./store/sample/counter";

export type RootStore = IndexStore & CounterStore & TimerStore & SampleCounterStore;

declare const $store: RootStore;

$store.commit("counter/updateCount");
$store.commit("counter/updateCount", 100);
$store.commit("counter/addCount", 100);
$store.dispatch("counter/fetchData", "user_id");

// - Test Utility

assert<IsExact<typeof $store.state.counter.count, number>>(true);
assert<IsExact<typeof $store.state.sample.counter.count, number>>(true);
assert<IsExact<typeof $store.getters['sample/counter/x2Count'], number>>(true);
assert<Has<keyof RootStore["state"]["counter"], "count">>(true);
assert<NotHas<keyof RootStore["state"]["counter"], "unknown">>(true);
