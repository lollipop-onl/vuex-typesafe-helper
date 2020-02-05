import { Converter, DefineActionContext, DefineStoreModule } from '../../../lib';

/** State */
export interface IState {
  account?: Record<string, any>;
}

export const state = (): IState => ({});

/** Getters */
export const getters = {
  fullName(state: IState): string | void {
    if (!state.account) {
      return;
    }

    const { firstName, lastName } = state.account;

    return `${lastName} ${firstName}`;
  }
};

export type Getters = Converter<
  typeof getters,
  {
    fullName: 'mypage/account/fullName'
  }
>;

/** Mutations */
export const mutations = {
  setAccountProfile(state: IState, account: Record<string, any>): void {
    state.account = account;
  }
};

export type Mutations = Converter<
  typeof mutations,
  {
    setAccountProfile: 'mypage/account/setAccountProfile'
  }
>;

/** Actions */
type Ctx = DefineActionContext<IState, typeof getters, typeof mutations>;

export const actions = {
  async fetchMyAccount({ commit }: Ctx): Promise<void> {
    await Promise.resolve();

    commit('setAccountProfile', {});
  },
  async fetchUserAccount({ commit }: Ctx, accoutId: string): Promise<void> {
    await Promise.resolve();

    commit('setAccountProfile', {});
  },
  async deleteAccount({}: Ctx, accountId?: string): Promise<void> {
    await Promise.resolve();
  },
  async updateAccount({}: Ctx, payload: { firstName: string, lastName: string }): Promise<void> {
    await Promise.resolve();
  }
};

export type Actions = Converter<
  typeof actions,
  {
    fetchMyAccount: 'mypage/account/fetchMyAccount',
    fetchUserAccount: 'mypage/account/fetchUserAccount',
    deleteAccount: 'mypage/account/deleteAccount',
    updateAccount: 'mypage/account/updateAccount'
  }
>;

export type Store = DefineStoreModule<['mypage', 'account'], IState, Getters, Mutations, Actions>;
