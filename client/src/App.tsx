import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";

import { Todo } from "./models/model";
import TodoList from "./components/TodoList";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  const ArrangeTodosList = (
    source: Array<Todo>,
    destination: Array<Todo>,
    sId: number,
    dId: number,
    setSource: React.Dispatch<React.SetStateAction<Todo[]>>,
    setDestination: React.Dispatch<React.SetStateAction<Todo[]>>,
    isDone: boolean
  ) => {
    const sourceClone = [...source];
    const destinationClone = [...destination];
    // add to the destination and update destination
    destinationClone.splice(dId, 0, sourceClone[sId]);
    destinationClone[dId].isDone = isDone;
    setDestination(destinationClone);
    // delete from source and update source
    sourceClone.splice(sId, 1);
    setSource(sourceClone);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (
      source.droppableId === "TodosList" &&
      destination.droppableId === "TodosRemove"
    ) {
      ArrangeTodosList(
        todos,
        completedTodos,
        source.index,
        destination.index,
        setTodos,
        setCompletedTodos,
        true
      );
    }

    if (
      destination.droppableId === "TodosList" &&
      source.droppableId === "TodosRemove"
    ) {
      ArrangeTodosList(
        completedTodos,
        todos,
        source.index,
        destination.index,
        setCompletedTodos,
        setTodos,
        false
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className="heading">To Dos</div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;