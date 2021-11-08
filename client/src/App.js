import React from "react";
import { Route } from "react-router-dom";

import Header from "./components/Header";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";

const App = () => {
  return (
    <div>
      <Header />
      <Route exact path="/">
        <TodoListPage />
      </Route>
      <Route exact path="/Create">
        <CreateTodoPage />
      </Route>
      <Route exact path="/Edit/:id">
        <EditTodoPage />
      </Route>
      <Route exact path="/Todo/:id">
        <TodoDetailPage />
      </Route>
    </div>
  );
};

export default App;
