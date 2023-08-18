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

const initialState = {
  todos: [],
};

// 스토어 값을 정의 합니다
const store = (set, get) => ({
  ...initialState,
  // 투두리스트 추가 함수 정의
  addItem: (text: any) => {
    set(state => ({
      todos: [
        ...state.todos,
        {
          id: Math.random().toString(36).substring(2, 11),
          text,
          isComplete: false,
        },
      ],
    }));
  },
  // 투두리스트 삭제 함수 정의
  deleteItem: (id: number | string) => {
    set(state => ({ todos: state.todos.filter(list => list.id !== id) }));
  },
  // 투두리스트 완료 상태 변경함수 정의
  toggleItemCompletion: (id: number | string) => {
    set(state => ({
      todos: state.todos.map(list =>
        list.id === id ? { ...state.todos, isComplete: !list.isComplete } : list
      ),
    }));
  },
  // 투두 리스트 item 내용 변경 함수
  editItemText: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number | string
  ) => {
    const { value } = event.target;
    set(state => ({
      todos: state.todos.map(list =>
        list.id === id ? { ...state.todos, text: value } : list
      ),
    }));
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
