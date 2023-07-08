import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { todoActions } from "../store/todoSlice";

import "./Todo.css";

const Todo = () => {
  const [editableIdx, setEditableIdx] = useState(null);
  const todoInputRef = useRef();
  const dispatch = useDispatch();
  const { todoList } = useSelector((state) => state.todo);

  const addTodoHandler = () => {
    const todo = todoInputRef.current.value;
    if (editableIdx !== null) {
      const existingTodos = [...todoList];
      const idx = existingTodos.findIndex(
        (i) => existingTodos[editableIdx] === i
      );
      existingTodos[idx] = todo;
      dispatch(todoActions.addTodo({ add: existingTodos }));
    } else {
      dispatch(todoActions.addTodo({ add: [...todoList, todo] }));
    }
    setEditableIdx(null);
    todoInputRef.current.value = "";
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const editHandler = (idx) => {
    const list = todoList.filter((list) => list === todoList[idx]);
    todoInputRef.current.value = list;
    console.log(idx);
    setEditableIdx(idx);
  };

  const deleteHandler = (idx) => {
    const list = todoList.filter((list) => list !== todoList[idx]);
    dispatch(todoActions.addTodo({ add: list }));
  };

  const todos = todoList.map((list, index) => {
    return (
      <li key={index}>
        {list}
        <div className="todo-buttons">
          <button onClick={() => editHandler(index)}>Edit</button>
          <button onClick={() => deleteHandler(index)}>Delete</button>
        </div>
      </li>
    );
  });

  return (
    <>
      <section className="todo-container">
        <h1>Add Your Todo List Below</h1>
        <div className="add-todo-section">
          <input type="text" id="list" ref={todoInputRef} required />
          <button type="submit" onClick={addTodoHandler}>
            Add
          </button>
        </div>
        <ul className="todo-lists">{todos}</ul>
      </section>
    </>
  );
};

export default Todo;
