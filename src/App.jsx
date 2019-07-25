import React, { useState } from "react";
import styles from "./app.global.scss";

const App = () => {
  const [countState, setCount] = useState({ count: 0 });

  const handleCount = () => {
    setCount({ count: countState.count + 1 });
  };

  return (
    <>
      <button className={styles.buttonDefault} onClick={handleCount}>
        Click Me
      </button>
      <h1>count: {countState.count}</h1>
    </>
  );
};

export default App;
