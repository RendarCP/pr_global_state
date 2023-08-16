import { atom } from "jotai";

const todoAtom = atom([]);

const todoStateAtom = atom(
  (get) => {
    const todoList = get(todoAtom)
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

export { todoAtom, todoStateAtom };