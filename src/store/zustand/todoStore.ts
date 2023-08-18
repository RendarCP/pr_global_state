import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TodoItem } from '../../types/todoType';
import React from 'react';

interface TodoListState {
  todos: TodoItem[];
  addItem: (text: string) => void;
  deleteItem: (id: string | number) => void;
  toggleItemCompletion: (id: string | number) => void;
  editItemText: (event: any, id: string | number) => void;
  getTodoState: () => void;
}

// 스토어 값을 정의 합니다
const store = (set, get) => ({
  todos: [],
  // 투두리스트 추가 함수 정의
  addItem: (text: any) => {
    set(
      state => ({
        todos: [
          ...state.todos,
          {
            id: get().todos.length + 1,
            text,
            isComplete: false,
          },
        ],
      }),
      false,
      'addItem'
    );
  },
  // 투두리스트 삭제 함수 정의
  deleteItem: (id: number | string) => {
    set(
      state => ({ todos: state.todos.filter(list => list.id !== id) }),
      false,
      'removeItem'
    );
  },
  // 투두리스트 완료 상태 변경함수 정의
  toggleItemCompletion: (id: number | string) => {
    set(
      state => ({
        todos: state.todos.map(list => ({
          ...list,
          isComplete: list.id === id ? !list.isComplete : list.isComplete,
        })),
      }),
      false,
      'toggleItem'
    );
  },
  // 투두 리스트 item 내용 변경 함수
  editItemText: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number | string
  ) => {
    const { value } = event.target;
    set(
      state => ({
        todos: state.todos.map(list =>
          list.id === id ? { ...state.todos, text: value } : list
        ),
      }),
      false,
      'editItem'
    );
  },
  // selector 정의
  getTodoState: () => {
    const todoList = get().todos;
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter(item => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;
    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

const useTodoStore = create<TodoListState>(
  devtools(persist(store, { name: 'todos' }))
);

export { useTodoStore };
