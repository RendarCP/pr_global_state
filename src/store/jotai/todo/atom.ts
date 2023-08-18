import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { TtodoItem } from '../../../types/todoType';

const storageTodoAtom = atomWithStorage<TtodoItem[]>('todoAtom', []);

const todoStateAtom = atom(get => {
  const todoList = get(storageTodoAtom);
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
});

export { storageTodoAtom, todoStateAtom };
