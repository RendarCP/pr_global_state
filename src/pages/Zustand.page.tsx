import React, { useState } from 'react';
import { TodoCreator } from '../components/TodoCreator';
import TodoListStats from '../components/TodolistStats';
import { TodoItem } from '../components/TodoItem';
import { useTodoStore } from '../store/zustand/todoStore';

export default function ZustandPage() {
  // 인풋에 대한 상태값을 가져옵니다
  const [inputValue, setInputValue] = useState('');
  // todo에대한 store값을 가져옵니다.
  const { todos, addItem, deleteItem, toggleItemCompletion, editItemText } =
    useTodoStore();

  // 투투리스트에 대한 state값을 가져옵니다
  const todoState = useTodoStore(state => state.getTodoState());

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
      <TodoListStats states={todoState} />
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
