import React, { useState, useReducer } from "react";
import { withRouter } from "react-router-dom";
import ToDoContainer from "./ToDoContainer";
import styles from "./styles.scss";

const TaskContext = React.createContext({});

//reducer for tasks Management
const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const taskIndex = state.tasksAdded.findIndex(data => data.taskName === action.payload.taskName);
      if (taskIndex === -1) {
        return {
          ...state,
          tasksAdded: [...state.tasksAdded, action.payload]
        };
      } else {
        alert("Task with this name already Added");
      }

    case "TASK_DONE":
      return {
        ...state,
        tasksDone: [...state.tasksDone, action.payload]
      };

    case "EDIT_SAVE":
      const previousTaskIndex = state.tasksAdded.findIndex(data => data.taskName === action.payload.previous.taskName);
      state.tasksAdded.splice(previousTaskIndex, 1, action.payload.new);
      return {
        ...state
      };
    case "REMOVE_TASK":
      const tasksAfterRemoved = state.tasksAdded.filter(data => data.taskName !== action.payload.taskName);
      return {
        ...state,
        tasksAdded: [...tasksAfterRemoved]
      };
    default:
      return state;
  }
};

const Dashboard = props => {
  const [inputTask, setInputTask] = useState({});
  const [listViewState, setListView] = useState({ listView: false });

  const [tasks, dispatch] = useReducer(taskReducer, { tasksAdded: [], tasksDone: [] });

  const handleChange = event => {
    event.preventDefault();
    const Task = {
      taskName: event.target.value,
      description: "a small description about task ..."
    };
    setInputTask({ ...Task });
  };

  const handleSave = (previousTask, newTask) => {
    event.preventDefault();
    return dispatch({ type: "EDIT_SAVE", payload: { new: newTask, previous: previousTask } });
  };

  const handleListView = () => {
    event.preventDefault();
    setListView({ ...listViewState, listView: !listViewState.listView });
  };

  return (
    <TaskContext.Provider value={tasks}>
      {console.log(tasks)}
      <button className={styles.buttonDefault} onClick={event => props.handleLogout(props.history)}>
        Logout
      </button>
      <h1>Welcome to ToDo's App</h1>
      <section className={styles.dashboardContainer}>
        <ToDoContainer
          inputTask={inputTask}
          dispatch={dispatch}
          taskState={tasks.tasksAdded}
          handleListView={handleListView}
          handleChange={handleChange}
          handleSave={handleSave}
          listViewState={listViewState}
        />
        <div className={styles.doneContainer}></div>
      </section>
    </TaskContext.Provider>
  );
};

export default withRouter(Dashboard);
