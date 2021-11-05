import React from "react";
import { Route } from "react-router-dom";

import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import Todo from "./components/Todo";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Route exact path="/">
        <TodoList />
      </Route>
      <Route exact path="/Create">
        <CreateTodo />
      </Route>
      <Route exact path="/Edit/:id">
        <EditTodo />
      </Route>
      <Route exact path="/Todo/:id">
        <Todo />
      </Route>
    </div>
  );
};

export default App;
