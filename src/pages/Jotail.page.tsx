import { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { storageTodoAtom, todoStateAtom } from '../store/jotai/todo/atom';
import { DevTools } from 'jotai-devtools';
import TodoListStats from '../components/TodolistStats';
import { TodoCreator } from '../components/TodoCreator';
import { TodoItem } from '../components/TodoItem';

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
const getId = (id: number) => {
  return id++;
};

export default function JotailPage() {
  const [todos, setTodos] = useAtom(storageTodoAtom);
  const todoState = useAtomValue(todoStateAtom);
  const [inputValue, setInputValue] = useState('');

  // todolist 체크 로직
  const toggleItemCompletion = id => {
    setTodos(
      todos.map(list => ({
        ...list,
        isComplete: list.id === id ? !list.isComplete : list.isComplete,
      }))
    );
  };

  // todolist 수정 로직
  const editItemText = (event, id) => {
    const { value } = event.target;
    setTodos(
      todos.map(list => ({
        ...list,
        text: list.id === id ? value : list.text,
      }))
    );
  };

  // todolist 삭제 로직
  const deleteItem = id => {
    setTodos(todos.filter(list => list.id !== id));
  };

  // todolist 추가 로직
  const addItem = () => {
    setTodos(oldTodoList => [
      ...oldTodoList,
      {
        id: getId(id),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      jotai-state
      <DevTools />
      <TodoListStats states={todoState} />
      <TodoCreator value={inputValue} addItem={addItem} onChange={onChange} />
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
