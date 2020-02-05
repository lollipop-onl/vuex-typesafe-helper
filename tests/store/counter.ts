import { Converter, DefineActionContext, DefineStoreModule } from '../..';

/** State */
export interface IState {
  count: number;
}

export const state = (): IState => ({
  count: 0
});

/** Getters */
export const getters = {
  doubleCount(state: IState) {
    return state.count * 2;
  },
  isValidCount(state: IState) {
    return state.count >= 0;
  }
};

export type Getters = Converter<
  typeof getters,
  {
    doubleCount: 'counter/doubleCount',
    isValidCount: 'counter/isValidCount',
  }
>;

/** Mutations */
export const mutations = {
  addCount(state: IState, count = 1) {
    state.count += count;
  },
  setCount(state: IState, count: number) {
    state.count = count;
  },
  resetCount(state: IState) {
    state.count = 0;
  }
};

export type Mutations = Converter<
  typeof mutations,
  {
    addCount: 'counter/addCount',
    setCount: 'counter/setCount',
    resetCount: 'counter/resetCount'
  }
>;

/** Actions */
type Ctx = DefineActionContext<IState, typeof getters, typeof mutations>;

export const actions = {
  incrementCount({commit }: Ctx): void {
    commit('addCount', 1);
  },
  async saveCount({ state, getters, commit }: Ctx, value = 0): Promise<void> {
    const { count } = state;
    const { doubleCount } = getters;

    await Promise.resolve();

    console.log((count + doubleCount + value));
  }
};

export type Actions = Converter<
  typeof actions,
  {
    incrementCount: 'counter/incrementCount',
    saveCount: 'counter/saveCount'
  }
>;

export type Store = DefineStoreModule<'counter', IState, Getters, Mutations, Actions>;
