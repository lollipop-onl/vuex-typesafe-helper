import { Converter, DefineStoreModule, DefineActionContext } from "../../../lib";

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
type Ctx = DefineActionContext<IState, typeof getters, typeof mutations>;

export const actions = {
  async fetchData(
    { state, getters, commit }: Ctx,
    payload: {
      count: number,
      secret?: string
    }
  ): Promise<void> {
    commit("addCount", false);
    commit("updateCount", '');
  },
  fetchWithData({ commit }: Ctx): void {
    commit("resetCount");
  }
};

export type State = IState;
export type Getters = Converter<
  typeof getters,
  {
    "x2Count": "sample/counter/x2Count";
    "xCount": "sample/counter/xCount";
  }
  >;
export type Mutations = Converter<
  typeof mutations,
  {
    "addCount": "sample/counter/addCount";
    "updateCount": "sample/counter/updateCount";
    "resetCount": "sample/counter/resetCount";
  }
  >;
export type Actions = Converter<
  typeof actions,
  {
    "fetchData": "sample/counter/fetchData";
    "fetchWithData": "sample/counter/fetchWithData";
  }
  >;
export type Store = DefineStoreModule<
  ["sample", "counter"],
  State,
  Getters,
  Mutations,
  Actions
>;
