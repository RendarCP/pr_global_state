import React, { useState } from 'react'
import { TodoCreator } from '../components/TodoCreator'
import { TodoItem } from '../components/TodoItem';
import { todoListState } from '../store/recoil/todo/atom'
import { useRecoilState, useSetRecoilState } from "recoil";

export default function RecoilPage() {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [inputValue, setInputValue] = useState("");


  const toggleItemCompletion = (id) => {
    setTodoList(todoList.map(list => list.id === id ? { ...todoList, isComplete: !list.isComplete }: list))
  }

  const editItemText = (event, id) => {
    const { value} = event.target
    setTodoList(
      todoList.map((list) =>
        list.id === id ? { ...todoList, text: value } : list
      )
    );
  };
    const deleteItem = (id) => {

      setTodoList(todoList.filter(list => list.id !== id));
    };


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
      <TodoCreator addItem={addItem} onChange={onChange} />
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

