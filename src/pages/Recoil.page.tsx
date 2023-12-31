import React, { ChangeEvent, useState } from 'react';
import { TodoCreator } from '../components/TodoCreator';
import { TodoItem } from '../components/TodoItem';
import { todoListState } from '../store/recoil/todo/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListStatsState } from '../store/recoil/todo/selectors';
import TodoListStats from '../components/TodolistStats';

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
const getId = () => {
  return id++;
};

export default function RecoilPage() {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const todoState = useRecoilValue(todoListStatsState);
  const [inputValue, setInputValue] = useState('');

  // todolist 체크 로직
  const toggleItemCompletion = (id: number) => {
    setTodoList(
      todoList.map(list => ({
        ...list,
        isComplete: list.id === id ? !list.isComplete : list.isComplete,
      }))
    );
  };

  // todolist 수정 로직
  const editItemText = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = event.target;
    setTodoList(
      todoList.map(list => ({
        ...list,
        text: list.id === id ? value : list.text,
      }))
    );
  };

  // todolist 삭제 로직
  const deleteItem = (id: number) => {
    setTodoList(todoList.filter(list => list.id !== id));
  };

  // todolist 추가 로직
  const addItem = () => {
    setTodoList(oldTodoList => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };
  return (
    <div>
      recoil-state
      <TodoListStats states={todoState} />
      <TodoCreator value={inputValue} addItem={addItem} onChange={onChange} />
      {todoList.map(todoItem => (
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
