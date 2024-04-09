import { Dispatch, ReactNode, createContext, useReducer } from "react"
import { commonReducer } from "../reducers/common.reducer"
import { ActionType } from "../types/common.type";

export const StateContext = createContext({ count: 0 });
export const DispatchContext = createContext((() => undefined) as Dispatch<ActionType>)

type Props = {
  children?: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(commonReducer, { count: 0 });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
