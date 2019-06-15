import { assert, IsExact, Has, NotHas } from "conditional-type-checks";
import { Store as IndexStore } from "./store/";
import { Store as CounterStore } from "./store/counter";
import { Store as TimerStore } from "./store/timer";

export type RootStore = IndexStore & CounterStore & TimerStore;

declare const $store: RootStore;

$store.commit("counter/updateCount");
$store.commit("counter/updateCount", 100);
$store.commit("counter/addCount", 100);
$store.dispatch("counter/fetchData", "user_id");

// - Test Utility

assert<IsExact<RootStore["state"]["counter"]["count"], number>>(true);
assert<Has<keyof RootStore["state"]["counter"], "count">>(true);
assert<NotHas<keyof RootStore["state"]["counter"], "unknown">>(true);
