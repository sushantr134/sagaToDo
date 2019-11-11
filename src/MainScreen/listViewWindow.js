import React from "react";

const ViewWindowPanel = ({ taskState }) => {
  return (
    <>
      <div>
        <h1>List of all todo's items</h1>
        <ul>
          {taskState.length > 0 &&
            taskState.map(task => {
              return (
                <li>
                  <h3>TaskName :- {`${task.taskName}`}</h3>
                  <h3>Description:-</h3>
                  <p>{task.description}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default ViewWindowPanel;
