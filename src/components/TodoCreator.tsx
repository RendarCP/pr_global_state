export const  TodoCreator = ({ value, onChange, addItem }) => {
  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

