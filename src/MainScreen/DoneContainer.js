import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import styles from "./styles.scss";

const DoneItem = ({ taskObj }) => {
  const [toggleView, setToggleView] = useState({ isView: false });

  const handleViewToggle = () => {
    event.preventDefault();
    setToggleView({ ...toggleView, isView: !toggleView.isView });
  };

  return (
    <li>
      {/* <button
        className={styles.btnDetail}
        title={`${!toggleView.isView ? "Click to view task details" : "Click to hide task details"}`}
        onClick={handleViewToggle}>
        {`${!toggleView.isView ? "Show detail" : "Hide detail"}`}
      </button> */}
      <span
        title={`${!toggleView.isView ? "Click to view task details" : "Click to hide task details"}`}
        className={styles.doneText}
        onClick={handleViewToggle}>
        {taskObj.taskName}
      </span>
      {toggleView.isView && (
        <>
          <h4>Taskname:- {taskObj.taskName}</h4>
          <h4>Description:</h4>
          <textarea maxLength={240} rows={4} disabled>
            {taskObj.description}
          </textarea>
        </>
      )}
    </li>
  );
};

const DoneContainer = ({ tasksDone }) => {
  return (
    <div className={styles.doneContainer}>
      <h1>DONE</h1>
      <ul>
        {tasksDone.map((taskObj, i) => {
          return <DoneItem key={i} taskObj={taskObj} />;
        })}
      </ul>
    </div>
  );
};

export default withRouter(DoneContainer);
