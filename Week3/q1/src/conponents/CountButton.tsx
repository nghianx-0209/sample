import { COMMON_CONSTANT } from "../constants"
import { useCommon } from "../hooks/common.hook"

export const CountButton = () => {
  const { state, dispatch } = useCommon();
  return (
    <div>
      <button onClick={() => dispatch({type: COMMON_CONSTANT.INCREATMENT_COUNTING})}>
        count is {state.count}
      </button>
    </div>
  )
}
