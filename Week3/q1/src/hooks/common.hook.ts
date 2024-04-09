import { useContext } from "react"
import { DispatchContext, StateContext } from "../providers/app.provider"

export const useCommon = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext)

  if (!state) {
    throw new Error("Error")
  }

  return { state, dispatch };
}
