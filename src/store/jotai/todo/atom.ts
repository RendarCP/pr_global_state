import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

const storageTodoAtom = atomWithStorage('todoAtom', [])

// console.log('-============', storageAtom);

// const testAtom = atom(storageAtom);
// console.log('testAtom' ,testAtom);

// const todoAtom = atom([]);

const todoStateAtom = atom(
  (get) => {
    const todoList = get(storageTodoAtom)
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;
    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  }
)

export { storageTodoAtom, todoStateAtom };