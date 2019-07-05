import { assert, IsExact, Has, NotHas } from "conditional-type-checks";
import { Store as IndexStore } from "./store/";
import { Store as CounterStore } from "./store/counter";
import { Store as TimerStore } from "./store/timer";
import { setupVuexkey } from "..";

export type RootStore = IndexStore & CounterStore & TimerStore;

type g = IndexStore['getters'] & CounterStore['getters'] & TimerStore['getters'];
type s = IndexStore['getters']

declare const $store: RootStore;

$store.commit("counter/updateCount");
$store.commit("counter/updateCount", 100);
$store.commit("counter/addCount", 100);
$store.dispatch("counter/fetchData", "user_id");

const vuexkey = setupVuexkey<RootStore>();

vuexkey('state', 'counter', 'count');
vuexkey('getters', 'counter/x2Count');

// - Test Utility

assert<IsExact<RootStore["state"]["counter"]["count"], number>>(true);
assert<Has<keyof RootStore["state"]["counter"], "count">>(true);
assert<NotHas<keyof RootStore["state"]["counter"], "unknown">>(true);
