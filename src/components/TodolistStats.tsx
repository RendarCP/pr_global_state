interface TodoListStateProps {
  states: {
    totalNum: string | number;
    totalCompletedNum: string | number;
    totalUncompletedNum: string | number;
    percentCompleted: number;
  };
}

const TodoListStats = ({ states }: TodoListStateProps) => {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    states;
  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>총 합: {totalNum}</li>
      <li>완료: {totalCompletedNum}</li>
      <li>해야될일: {totalUncompletedNum}</li>
      <li>퍼센트: {formattedPercentCompleted}</li>
    </ul>
  );
};

export default TodoListStats;
