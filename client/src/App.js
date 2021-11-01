import React from "react";
import { Route } from "react-router-dom";

import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div>
      <Route exact path="/">
        <TodoList />
      </Route>
    </div>
  );
};

export default App;
