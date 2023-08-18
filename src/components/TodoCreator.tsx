import { ChangeEvent } from 'react';

interface TodoCreatorProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  addItem: () => void;
}

export const TodoCreator = ({ value, onChange, addItem }: TodoCreatorProps) => {
  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};
