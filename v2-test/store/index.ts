import { DefineActionContext, DefineStoreModule } from '../..';

/** State */
export interface IState {
  loading: boolean;
}

export const state = (): IState => ({
  loading: false,
});

/** Getters */
export const getters = {};

/** mutations */
export const mutations = {
  setLoadingStatus(state: IState, status: boolean) {
    state.loading = status;
  }
};

/** Actions */
type Ctx = DefineActionContext<IState, typeof getters, typeof mutations>;

export const actions = {
  nuxtServerInit(): void {},
  async initialize({}: Ctx, token: string): Promise<void> {}
};

export type Store = DefineStoreModule<
  '',
  IState,
  typeof getters,
  typeof mutations,
  Omit<typeof actions, 'nuxtServerInit'>
>;
