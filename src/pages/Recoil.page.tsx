import React, { useState } from "react";
import { TodoCreator } from "../components/TodoCreator";
import { TodoItem } from "../components/TodoItem";
import { todoListState } from "../store/recoil/todo/atom";
import { useRecoilState } from "recoil";
import { todoListStatsState } from "../store/recoil/todo/selectors";
import TodoListStats from "../components/TodolistStats";

export default function RecoilPage() {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [todoState, setTodoState] = useRecoilState(todoListStatsState);
  const [inputValue, setInputValue] = useState("");

  // todolist 체크 로직
  const toggleItemCompletion = (id) => {
    setTodoList(
      todoList.map((list) =>
        list.id === id ? { ...todoList, isComplete: !list.isComplete } : list
      )
    );
  };

  // todolist 수정 로직
  const editItemText = (event, id) => {
    const { value } = event.target;
    setTodoList(
      todoList.map((list) =>
        list.id === id ? { ...todoList, text: value } : list
      )
    );
  };

  // todolist 삭제 로직
  const deleteItem = (id) => {
    setTodoList(todoList.filter((list) => list.id !== id));
  };

  // todolist 추가 로직
  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };
  return (
    <div>
      recoil-state
      <TodoListStats states={todoState} />
      <TodoCreator value={inputValue} addItem={addItem} onChange={onChange} />
      {todoList.map((todoItem) => (
        <TodoItem
          item={todoItem}
          toggleItemCompletion={toggleItemCompletion}
          editItemText={editItemText}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
}

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
function getId() {
  return id++;
}
