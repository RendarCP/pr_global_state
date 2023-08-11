export const TodoItem = ({ item, toggleItemCompletion, editItemText, deleteItem }) => {
  // const index = todoList.findIndex((listItem) => listItem === item);





  return (
    <div>
      <input type="text" value={item.text} onChange={(e) => editItemText(e,item.id)} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={() => toggleItemCompletion(item.id)}
      />
      <button onClick={() => deleteItem(item.id)}>X</button>
    </div>
  );
};

// function replaceItemAtIndex(arr, index, newValue) {
//   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
// }

// function removeItemAtIndex(arr, index) {
//   return [...arr.slice(0, index), ...arr.slice(index + 1)];
// }

