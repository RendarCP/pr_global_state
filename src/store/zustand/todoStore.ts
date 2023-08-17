import { create }from 'zustand';
import { devtools } from 'zustand/middleware';

interface TodoState {
	id: string
  description: string
  isComplete: boolean
}

interface TodoListState {
	todos: TodoState[]
  addTodo?: (text: string) => void
  deleteItem?:(id:string |number) => void
  toggleItemCompletion?: (id: string  | number) => void;
  editItemText?: (event: any, id: string | number) => void;
}

const useTodoStore = create<TodoListState>(devtools((set) => ({
  todos: [],
  addItem: (text) => {
    set((state) => ({
      todos:[
        ...state.todos,{
          id: Math.random().toString(36).substring(2,11),
					text,
          isComplete: false
        }
      ]
    }))
  },
  deleteItem: (id) => {
    set((state) => ({ todos: state.todos.filter((list) => list.id !== id)}))
  },
  toggleItemCompletion: (id) => {
    set((state) => ({ todos: state.todos.map((list) => list.id === id ? { ...state.todos, isComplete: !list.isComplete} : list)}) )
  },
  editItemText: (event, id) => {
    const { value } = event.target;
    set((state) => ({ todos: state.todos.map((list) => list.id === id ? { ...state.todos, text: value} : list)}))
  }
})))

export { useTodoStore }