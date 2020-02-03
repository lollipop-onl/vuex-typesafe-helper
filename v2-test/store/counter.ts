import { Converter, DefineStoreModule } from "../../lib";

// * State

export interface IState {
  count: number;
}

export const state = (): IState => ({
  count: 0
});

// * Getters

export const getters = {
  x2Count(state: IState) {
    return state.count * 2;
  },
  xCount: (state: IState) => (times: number) => state.count * times
};

// * Mutations

export const mutations = {
  addCount(state: IState, count: number) {
    state.count += count;
  },
  updateCount(state: IState, count?: number) {
    if (count == null) {
      state.count = 0;

      return;
    }

    state.count = count;
  },
  resetCount(state: IState) {
    state.count = 0;
  }
};

// * Actions

export const actions = {
  async fetchData(
    { state, getters, commit }: any,
    payload: string
  ): Promise<void> {
    commit("addCount", 100);
  },
  fetchWithData({ commit }: any): void {
    commit("resetCount");
  }
};

export type State = IState;
export type Getters = Converter<
  typeof getters,
  {
    "x2Count": "counter/x2Count";
    "xCount": "counter/xCount";
  }
  >;
export type Mutations = Converter<
  typeof mutations,
  {
    "addCount": "counter/addCount";
    "updateCount": "counter/updateCount";
    "resetCount": "counter/resetCount";
  }
  >;
export type Actions = Converter<
  typeof actions,
  {
    "fetchData": "counter/fetchData";
    "fetchWithData": "counter/fetchWithData";
  }
  >;
export type Store = DefineStoreModule<
  "counter",
  State,
  Getters,
  Mutations,
  Actions
  >;
