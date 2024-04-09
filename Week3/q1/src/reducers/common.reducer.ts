import { COMMON_CONSTANT } from "../constants"
import { ActionType, StateType } from "../types/common.type"

const initalState = {
  count: 0,
}

export const commonReducer = (state: StateType = initalState, action: ActionType) => {
  switch (action.type) {
    case COMMON_CONSTANT.INCREATMENT_COUNTING: {
      return {
        ...state,
        count: state.count + 1
      }
    }

    default:
      return state;
  }
}

