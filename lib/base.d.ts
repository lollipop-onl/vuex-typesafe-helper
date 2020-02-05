/**
 * @file ベースとなる型
 */

/** State */
export interface State {
  [key: string]: any;
}

/** Getters */
export interface Getters {
  [key: string]: (...args: any) => any;
}

/** Mutations */
export interface Mutations {
  [key: string]: (...args: any) => void;
}

/** Actions */
export interface Actions {
  [key: string]: (...args: any) => any;
}

/** StoreModule */
export interface StoreModule {
  state: State;
  getters: Getters;
  mutations: Mutations;
  actions: Actions;
}
