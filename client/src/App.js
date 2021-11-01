import React from "react";
import { Route } from "react-router-dom";

import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";

const App = () => {
  return (
    <div>
      <Route exact path="/">
        <TodoList />
      </Route>
      <Route exact path="/Create">
        <CreateTodo />
      </Route>
    </div>
  );
};

export default App;
