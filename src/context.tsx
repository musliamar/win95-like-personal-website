import React, {
    useReducer,
    useContext,
    createContext,
    ReactNode,
    Dispatch
  } from 'react'
  
  import {
    SHOW_DIALUP_BUTTON,
    SHOW_DIALUP
  } from './constants'
  
  interface State {
    showDialupButton: boolean
    showDialup: boolean
  }
  
  const initialValues = {
    showDialupButton: false,
    showDialup: false
  }
  
  type Action = | {
    type: 'SHOW_PLAY_BUTTON',
    payload: boolean
  } | {
    type: 'SHOW_DIALUP',
    payload: boolean
  } 
  
  const StateContext = createContext<State>(initialValues)
  const DispatchContext = createContext<Dispatch<Action>>(
    () => null
  )
  
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case SHOW_DIALUP_BUTTON:
        return {
          ...state,
          showDialupButton: action.payload
        }
      case SHOW_DIALUP:
        return {
          ...state,
          showDialup: action.payload
        }
      default:
        throw new Error(`Unknown action: ${JSON.stringify(action)}`)
    }
  }
  
  interface ProviderProps { children: ReactNode }
  
  export const StoreProvider = ({ children }: ProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialValues)
    return (
        <DispatchContext.Provider value={dispatch}>
          <StateContext.Provider value={state}>
            {children}
          </StateContext.Provider>
        </DispatchContext.Provider>
    )
  }
  
  export const useStore = (): State => useContext(StateContext)
  export const useDispatch = (): Dispatch<Action> => useContext(DispatchContext)
  