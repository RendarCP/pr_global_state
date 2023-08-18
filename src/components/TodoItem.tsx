import { ChangeEvent } from 'react';
import { TtodoItem } from '../types/todoType';

interface TodoItemProps {
  item: TtodoItem;
  toggleItemCompletion: (id: number) => void;
  editItemText: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  deleteItem: (id: number) => void;
}

export const TodoItem = ({
  item,
  toggleItemCompletion,
  editItemText,
  deleteItem,
}: TodoItemProps) => {
  return (
    <div>
      <input
        type="text"
        value={item.text}
        onChange={e => editItemText(e, item.id)}
      />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={() => toggleItemCompletion(item.id)}
      />
      <button onClick={() => deleteItem(item.id)}>X</button>
    </div>
  );
};
