# vuex-typesafe-helper

Helper of typesafe Vuex with minimal expansion.

Inspired by [takefumi-yoshii/ts-nuxtjs-express](https://github.com/takefumi-yoshii/ts-nuxtjs-express).

## Installation

```sh
$ npm i --save @lollipop-onl/vuex-typesafe-helper
# or
$ yarn add @lollipop-onl/vuex-typesafe-helper
```

## Example for Nuxt

### Step 1. Define Vuex store

```ts
// store/counter.ts

import Vue from 'vue';
import {
  Convertor,
  DefineActionContext,
  DefineStoreModule
} from '@lollipop-onl/vuex-typesafe-helper';

// Only define interface of state
export interface IState {
  count: number;
}
export const state = (): IState => ({
  count: 0
});

// Convert to global name
// It is an error if there is excess or deficiency
export type Getters = Convertor<typeof getters, {
  'counter/isOdd', 'isOdd'
}>;
export type getters = {
  isOdd(state: IState) {
    return count % 2;
  }
};

export type Mutations = Convertor<typeof mutations, {
  'counter/updateCount': 'updateCount',
  'counter/resetCount': 'resetCount'
}>;
export const mutations = {
  updateCount(state: IState, count: number) {
    state.count = count;
  },
  resetCount(state: IState) {
    state.count = 0;
  }
};

export type Ctx = DefineActionContext<IState, typeof getters, typeof mutations>;
export type Actions = Convertor<typeof actions, {}>;
export const actions = {
  async syncCount(this: Vue, { commit }: Ctx, count: number) {
    const remoteCount = await this.$axios.$post('/sync', { count });

    commit('updateCount', remoteCount);
  }
};

// Define store module type
export type Store = DefineStoreModule<'counter', IState, Getters, Mutations, Actions>;
```

### Step 2. Combine all store modules

```ts
// types/vuex.d.ts

import { Store as CounterStore } from '@/store/counter';
import { Store as AuthStore } from '@/store/auth';

export type RootStore = CounterStore & AuthStore;
```

### Step 3. Self attachment RootStore type to global `$store`

```ts
import { Component, Vue } from 'nuxt-property-decorator';
import { RootStore } from '@/types/vuex';

@Component
export class MyComponent extends Vue {
  $store!: RootStore;

  async fetch({ store }) {
    const { state } = store as RootStore;
    const { count } = state.counter;

    // ...
  }

  increment() {
    const { state, commit } = this.$store;
    
    // Type and payload are type safe
    commit('counter/updateCount', state.counter.count + 1);
  }

  async syncCount(count: number) {
    const { state, dispatch } = this.$store;

    await dispatch('counter/syncCount', count);

    // updated counter count
    console.log(state.counter.count);
  }
}
```

# License

MIT
