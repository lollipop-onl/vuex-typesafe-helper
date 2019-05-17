import {
  Convertor,
  DefineStoreModule
} from '../../';

// * State

export interface IState {
  time: number;
}

export const state = (): IState => ({
  time: 0
});

// * Getters

export const getters = {};


// * Mutations

export const mutations = {
  updateTime(state: IState, time: number) {
    state.time = time;
  }
}

// * Actions

export const actions = {
  async fetchData({}, payload: string): Promise<void> {},
  async fetchWithData(a: number): Promise<void> {}
}

export type State = IState;
export type Getters = Convertor<typeof getters, never>;
export type Mutations = Convertor<typeof mutations, {
  'timer/updateTime': 'updateTime'
}>;
export type Actions = Convertor<typeof actions, {
  'timer/fetchData': 'fetchData',
  'timer/fetchWithData': 'fetchWithData'
}>;
export type Module = DefineStoreModule<'timer', State, Getters, Mutations, Actions>;