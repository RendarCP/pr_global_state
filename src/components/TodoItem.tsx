export const TodoItem = ({
  item,
  toggleItemCompletion,
  editItemText,
  deleteItem,
}) => {
  return (
    <div>
      <input
        type="text"
        value={item.text}
        onChange={(e) => editItemText(e, item.id)}
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
