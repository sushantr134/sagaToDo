import React, { useState, useReducer } from "react";
import { withRouter } from "react-router-dom";

import ViewWindowPanel from "./listViewWindow";
import TaskItem from "./taskItem";
import styles from "./styles.scss";

const TaskContext = React.createContext({});

//reducer for tasks Mangement
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
      description: ""
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
        <div className={styles.todoContainer}>
          <ol>
            {tasks.tasksAdded.length > 0 &&
              tasks.tasksAdded.map((taskObj, i) => (
                <TaskItem
                  key={i}
                  handleChange={handleChange}
                  handleRemoveTask={() => dispatch({ type: "REMOVE_TASK", payload: taskObj })}
                  handleSave={handleSave}
                  taskObj={taskObj}
                  inputTask={inputTask}
                />
              ))}
          </ol>
          <input type='text' name='taskName' placeholder='Enter Task Name' defaultValue={""} onChange={handleChange} />
          <button onClick={() => dispatch({ type: "ADD_TASK", payload: inputTask })}>+ Add Task</button>
          <button onClick={handleListView}>{!listViewState.listView ? "View list" : "close list"}</button>
          {listViewState.listView && <ViewWindowPanel taskState={tasks.tasksAdded} />}
        </div>
        <div className={styles.doneContainer}></div>
      </section>
    </TaskContext.Provider>
  );
};

export default withRouter(Dashboard);
