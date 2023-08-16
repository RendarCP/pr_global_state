import { useState } from "react";
import { useAtom } from "jotai";
import { todoAtom } from "../store/jotai/todo/atom";
import { DevTools } from "jotai-devtools";


export default function JotailPage() {
  const [todos, setTodos] = useAtom(todoAtom);
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <DevTools />
      Jotail.page
    </div>
  )
}
