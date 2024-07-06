import React, {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch
} from "react";

import {
  SHOW_ABOUT,
  SHOW_DIALUP,
  SET_CURRENTLY_ACTIVE,
  SHOW_WORK,
  ENABLE_SOUND
} from "./constants";

interface State {
  showAbout: boolean;
  showDialup: boolean;
  showWork: boolean;
  currentlyActive: string;
  enableSound: boolean;
}

const initialValues = {
  showAbout: false,
  showDialup: false,
  showWork: false,
  currentlyActive: "",
  enableSound: false
};

type Action =
  | {
      type: "SHOW_ABOUT";
      payload: boolean;
    }
  | {
      type: "SHOW_DIALUP";
      payload: boolean;
    }
  | {
      type: "SHOW_WORK";
      payload: boolean;
    }
  | {
      type: "ENABLE_SOUND";
      payload: boolean;
    }
  | {
      type: "SET_CURRENTLY_ACTIVE";
      payload: string;
    };

const StateContext = createContext<State>(initialValues);
const DispatchContext = createContext<Dispatch<Action>>(() => null);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SHOW_ABOUT:
      return {
        ...state,
        showAbout: action.payload
      };
    case SHOW_DIALUP:
      return {
        ...state,
        showDialup: action.payload
      };
    case SHOW_WORK:
      return {
        ...state,
        showWork: action.payload
      };
    case ENABLE_SOUND:
      return {
        ...state,
        enableSound: action.payload
      };
    case SET_CURRENTLY_ACTIVE:
      return {
        ...state,
        currentlyActive: action.payload
      };
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

interface ProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useStore = (): State => useContext(StateContext);
export const useDispatch = (): Dispatch<Action> => useContext(DispatchContext);
