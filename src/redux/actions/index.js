export const ADD_TASK_CALL = "ADD_TASK_CALL";
export const ADD_TASK = "ADD_TASK";

export const addTaskItem = ({ name }) => {
  return {
    type: ADD_TASK_CALL,
    payload: name,
  };
};
