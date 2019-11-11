import React from "react";
import { withRouter } from "react-router-dom";

import styles from "./styles.scss";

const ToDoContainer = props => {
  return (
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
  );
};

export default withRouter(ToDoContainer);
