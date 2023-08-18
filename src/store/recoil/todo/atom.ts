import { atom } from 'recoil';
import { TodoItem } from '../../../types/todoType';

const todoListState = atom<TodoItem[]>({
  key: 'todoListState',
  default: [],
});

export { todoListState };
