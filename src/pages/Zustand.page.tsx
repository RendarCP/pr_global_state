import React, { useState } from 'react';
import { TodoCreator } from '../components/TodoCreator';
import TodoListStats from '../components/TodolistStats';
import { TodoItem } from '../components/TodoItem';
import { useTodoStore } from '../store/zustand/todoStore';

export default function ZustandPage() {
  const [inputValue, setInputValue] = useState('');
  const { todos, addItem, deleteItem, toggleItemCompletion, editItemText } =
    useTodoStore();

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const onAddItem = () => {
    addItem(inputValue);
    setInputValue('');
  };

  return (
    <div>
      Zustand.page
      {/* <TodoListStats states={todoState}/> */}
      <TodoCreator value={inputValue} addItem={onAddItem} onChange={onChange} />
      {todos.map(todo => (
        <TodoItem
          item={todo}
          toggleItemCompletion={toggleItemCompletion}
          editItemText={editItemText}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
}
