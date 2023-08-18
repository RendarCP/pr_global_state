import { atom } from 'recoil';
import { TtodoItem } from '../../../types/todoType';

const todoListState = atom<TtodoItem[]>({
  key: 'todoListState',
  default: [],
});

export { todoListState };
