import React from "react";
import { Route } from "react-router-dom";

import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";

const App = () => {
  return (
    <div>
      <Route exact path="/">
        <TodoList />
      </Route>
      <Route exact path="/Create">
        <CreateTodo />
      </Route>
      <Route exact path="/Edit/:id">
        <EditTodo />
      </Route>
    </div>
  );
};

export default App;
