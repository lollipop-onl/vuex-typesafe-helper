import { FunctionLike } from "./utils";

/** Stateのベース型 */
export type BaseState = Record<string, any>;

/** Gettersのベース型 */
export type BaseGetters = Record<string, FunctionLike>;

/** Mutationsのベース型 */
export type BaseMutations = Record<string, FunctionLike<void>>;

/** Actionsのベース型 */
export type BaseActions = Record<string, FunctionLike>;
