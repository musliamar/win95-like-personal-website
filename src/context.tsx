import React, {
    useReducer,
    useContext,
    createContext,
    ReactNode,
    Dispatch
  } from 'react'
  
  import {
    DIALING_ACTIVE,
    SHOW_DIALUP,
    ENABLE_SOUND
  } from './constants'
  
  interface State {
    dialingActive: boolean
    showDialup: boolean
    enableSound: boolean
  }
  
  const initialValues = {
    dialingActive: false,
    showDialup: false,
    enableSound: false
  }
  
  type Action = | {
    type: 'DIALING_ACTIVE',
    payload: boolean
  } | {
    type: 'SHOW_DIALUP',
    payload: boolean
  } | {
    type: 'ENABLE_SOUND'
    payload: boolean
  } 
  
  const StateContext = createContext<State>(initialValues)
  const DispatchContext = createContext<Dispatch<Action>>(
    () => null
  )
  
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case DIALING_ACTIVE:
        return {
          ...state,
          showDialupButton: action.payload
        }
      case SHOW_DIALUP:
        return {
          ...state,
          showDialup: action.payload
        }
      case ENABLE_SOUND:
          return {
            ...state,
            enableSound: action.payload,
            showDialupButton: action.payload
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
  