import React from "react";
import "./styles.css";
import { Container } from "reactstrap";
import ToDoDashboard from "./ToDoContainer";

export default function App() {
  return (
    <Container>
      <ToDoDashboard />
    </Container>
  );
}
