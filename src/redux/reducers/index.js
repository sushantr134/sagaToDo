import { ADD_TASK } from "../actions/index";
const initialState = {
  taskItems: []
};

export const TaskHandlerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TASK:
      return {
        ...state,
        taskItems: [...state.taskItems, { name: payload }]
      };
    default:
      return state;
  }
};
