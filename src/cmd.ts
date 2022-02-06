export type Dispatch<Msg> = (msg: Msg) => void;
export type Action<Msg> = (dispatch: Dispatch<Msg>) => void;
export type PromiseAction<Msg> = (dispatch: Dispatch<Msg>) => Promise<void>;
export type Cmd<Msg> = Array<Action<Msg> | PromiseAction<Msg>>;

export const none = <Msg>(): Cmd<Msg> => {
  return [];
};

export const delay = <Msg>(action: Action<Msg>, timeout: number): Cmd<Msg> => {
  return [(dispatch) => setTimeout(() => action(dispatch), timeout)];
};

export const promise = <Msg>(promiseAction: PromiseAction<Msg>): Cmd<Msg> => {
  return [(dispatch) => promiseAction(dispatch)];
};

export const batch = <Msg>(...cmds: Cmd<Msg>[]): Cmd<Msg> => {
  return cmds.flat();
};