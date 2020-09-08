import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Input,
  Button,
  Alert,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import { addTaskItem } from "./redux/actions/index";
import { bindActionCreators } from "redux";

const RenderTaskItem = ({ Item }) => {
  const { name } = Item;
  return (
    <ListGroupItem>
      <Alert>{name}</Alert>
    </ListGroupItem>
  );
};

const ToDoDashboard = ({ addTaskItem, taskItems }) => {
  const taskItemInputRef = useRef(null);
  const [taskItemInputState, setTaskInputState] = useState("");

  return (
    <Row style={{ padding: "3%" }}>
      <Col xs="6">
        <Input
          ref={taskItemInputRef}
          onChange={(e) => setTaskInputState(e.target.value)}
          type="textarea"
        ></Input>
        <Button
          style={{ marginTop: "1em" }}
          type="button"
          color="success"
          size="sm"
          onClick={(e) => addTaskItem({ name: taskItemInputState })}
        >
          Add Task
        </Button>
      </Col>
      <Col xs="6">
        <ListGroup>
          {taskItems.length > 0 ? (
            taskItems.map((obj, i) => <RenderTaskItem key={i} Item={obj} />)
          ) : (
            <ListGroupItem>
              <Alert color="danger">No Task Added</Alert>
            </ListGroupItem>
          )}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default connect(
  (state) => {
    return {
      taskItems: state.TaskHandlerReducer.taskItems,
    };
  },
  (dispatch) => {
    return bindActionCreators({ addTaskItem }, dispatch);
  }
)(ToDoDashboard);
