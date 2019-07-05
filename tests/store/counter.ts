import { Convertor, DefineActionContext, DefineStoreModule } from "../..";

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
    payload: string
  ): Promise<void> {
    commit("addCount", 100);
  },
  fetchWithData({ commit }: Ctx): void {
    commit("resetCount");
  }
};

export type State = IState;
export type Getters = Convertor<
  typeof getters,
  {
    "counter/x2Count": "x2Count";
    "counter/xCount": "xCount";
  }
>;
export type Mutations = Convertor<
  typeof mutations,
  {
    "counter/addCount": "addCount";
    "counter/updateCount": "updateCount";
    "counter/resetCount": "resetCount";
  }
>;
export type Actions = Convertor<
  typeof actions,
  {
    "counter/fetchData": "fetchData";
    "counter/fetchWithData": "fetchWithData";
  }
>;
export type Store = DefineStoreModule<
  "counter",
  State,
  Getters,
  Mutations,
  Actions
>;
