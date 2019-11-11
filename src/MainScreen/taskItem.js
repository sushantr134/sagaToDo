import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import styles from "./styles.scss";

const TaskItem = ({ handleChange, taskObj, inputTask, handleRemoveTask, handleSave, markTaskDone }) => {
  const [toggleEditState, setEditOption] = useState({ isEdit: false });

  const handleEdit = () => {
    event.preventDefault();
    setEditOption({ ...toggleEditState, isEdit: !toggleEditState.isEdit });
  };

  const handleEditAndSave = (previousTask, newTask) => {
    event.preventDefault();
    handleSave(previousTask, newTask);
    handleEdit();
  };

  return (
    <>
      <li>
        {toggleEditState.isEdit ? (
          <input type='text' defaultValue={taskObj.taskName} onChange={handleChange}></input>
        ) : (
          <b className={styles.taskText}>{taskObj.taskName}</b>
        )}
        <button
          className={styles.btnEdit}
          title='Edit your task'
          onClick={toggleEditState.isEdit ? event => handleEditAndSave(taskObj, inputTask) : handleEdit}>
          {toggleEditState.isEdit ? "save" : "Edit"}
        </button>
        <button className={styles.btnRemove} title='delete your task' onClick={event => handleRemoveTask()}>
          x Remove
        </button>
        <button className={styles.btnDone} title='Click to mark this task Done' onClick={() => markTaskDone(taskObj)}>
          Mark Done
        </button>
      </li>
    </>
  );
};

export default withRouter(TaskItem);
