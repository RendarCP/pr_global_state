# Recoil | Jotai | Zustand (전역상태관리 비교)

## Recoil

- 페이스북 (현 메타) 팀에서 제작한 상태관리 라이브러리이며, 기존에 복잡한 상태관리는 굉장히 단순하게 만들수있게 제작한 라이브러리이다.
- 기존과 다르게 atom단위로 상태를 쪼개어 관리하는 구조로 만들어져있다.
- 기존 redux의 top-down 방식이 아닌 bottom-up 방식의 상태 구조

### 설치 과정 및 세팅

1. recoil 설치

```bash
yarn add recoil

or

npm install recoil
```

1. 개발 환경 세팅
   - 최상단 index 파일내에 Recoilroot 감싸기

```tsx
import { RecoilRoot } from 'recoil';

<RecoilRoot>
	 <App />
</RecoilRoot>
```

### 사용방법

- recoil에서는 atom이라는 단위를 사용하여 상태를 관리한다
- atom의 값을 변경하면 그것을 구독하고 있는 컴포넌트들이 모두 다시 렌더링된다

```tsx
// atom.ts
import { atom } from 'recoil';

const todoListState = atom<TtodoItem[]>({
  key: 'todoListState', // 키값을 통해 상태를 구분한다.
  default: [], // default 값을 정의
});

export { todoListState };
```

- seletor는 상태에서 파생된 데이터로, 다른 atom에 의존하는 동적인 데이터를 만들 수 있게 해준다.

```tsx
// selector.ts
import { todoListState } from "./atom";

import { selector } from "recoil";

const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({get}) => {
    const todoList = get(todoListState);
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
  },
});

export { todoListStatsState }
```

- 페이지에서 불러와서 동작할수있게 만들어준다

```tsx
import React, { ChangeEvent, useState } from 'react';
import { TodoCreator } from '../components/TodoCreator';
import { TodoItem } from '../components/TodoItem';
import { todoListState } from '../store/recoil/todo/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListStatsState } from '../store/recoil/todo/selectors';
import TodoListStats from '../components/TodolistStats';

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
const getId = () => {
  return id++;
};

export default function RecoilPage() {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const todoState = useRecoilValue(todoListStatsState);
  const [inputValue, setInputValue] = useState('');

  // todolist 체크 로직
  const toggleItemCompletion = (id: number) => {
    setTodoList(
      todoList.map(list => ({
        ...list,
        isComplete: list.id === id ? !list.isComplete : list.isComplete,
      }))
    );
  };

  // todolist 수정 로직
  const editItemText = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = event.target;
    setTodoList(
      todoList.map(list => ({
        ...list,
        text: list.id === id ? value : list.text,
      }))
    );
  };

  // todolist 삭제 로직
  const deleteItem = (id: number) => {
    setTodoList(todoList.filter(list => list.id !== id));
  };

  // todolist 추가 로직
  const addItem = () => {
    setTodoList(oldTodoList => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };
  return (
    <div>
      recoil-state
      <TodoListStats states={todoState} />
      <TodoCreator value={inputValue} addItem={addItem} onChange={onChange} />
      {todoList.map(todoItem => (
        <TodoItem
          item={todoItem}
          toggleItemCompletion={toggleItemCompletion}
          editItemText={editItemText}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
}
```

### Recoil hook

- recoil에서는 위에 atom과 selector를 제외한 상태를 가져오는 훅이 존재한다
  **useRecoilState —** atom의 값을 구독하여 업데이트할 수 있는 hook. `useState`와 동일한 방식으로 사용할 수 있다.
  **useRecoilValue —** setter 함수 없이 atom의 값을 반환만 한다.
  **useSetRecoilState —** setter 함수만 반환한다.
- 그외에도 여러가지가 존재하나 이 글에서는 설명하지 않는다.

## Jotai

- Jotai는 recoil에서 영감을 받아 제작한 상태관리툴로써, 일본어로 ‘상태’라는 뜻을 의미합니다
  실제로 일본의 개발자가 개발한 상태관리 툴입니다.
- recoil에서 영감을 받았기때문에 atomic구조이며 ,bottom-up 형식으로 구성되어있습니다.

### 설치과정 및 세팅

1. jotai 설치

   ```bash
   # npm
   npm i jotai

   # yarn
   yarn add jotai

   # pnpm
   pnpm install jotai
   ```

2. jotai는 세팅과정이 없다 provider를 제공하지만, 안넣어도 동작이 가능하며, 상태에 대한 추적이 필요할때 쓰는것같았다.

### 사용방법

- recoil과 동일하게 atom으로 선언하여 바로 사용이 가능했다 recoil과 다른점이라면 key값이 필요없었다.

```tsx
// jotai/atom.ts
import { atom } from 'jotai'

const todoItem = atom([])
```

- selector의경우 따로 제공해주지 않으나 atom에서 get 함수를 지원해줘서 비슷하게 구현이 가능했다.

```tsx
// jotai/atom.ts
// 동일한 스코프내에서 선언

import { atom } from 'jotai'

const todoStateAtom = atom(get => {
  const todoList = get(todoItem);
  const totalNum = todoList.length;
  const totalCompletedNum = todoList.filter(item => item.isComplete).length;
  const totalUncompletedNum = totalNum - totalCompletedNum;
  const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;
  return {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  };
});
```

- jotai.page.tsx

```tsx
import { ChangeEvent, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { storageTodoAtom, todoStateAtom } from '../store/jotai/todo/atom';
import { DevTools } from 'jotai-devtools'; // jotai devtools
import TodoListStats from '../components/TodolistStats';
import { TodoCreator } from '../components/TodoCreator';
import { TodoItem } from '../components/TodoItem';

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
const getId = () => {
  return id++;
};

export default function JotailPage() {
  const [todos, setTodos] = useAtom(storageTodoAtom);
  const todoState = useAtomValue(todoStateAtom);
  const [inputValue, setInputValue] = useState('');

  // todolist 체크 로직
  const toggleItemCompletion = (id: number) => {
    setTodos(
      todos.map(list => ({
        ...list,
        isComplete: list.id === id ? !list.isComplete : list.isComplete,
      }))
    );
  };

  // todolist 수정 로직
  const editItemText = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = event.target;
    setTodos(
      todos.map(list => ({
        ...list,
        text: list.id === id ? value : list.text,
      }))
    );
  };

  // todolist 삭제 로직
  const deleteItem = (id: number) => {
    setTodos(todos.filter(list => list.id !== id));
  };

  // todolist 추가 로직
  const addItem = () => {
    setTodos(oldTodoList => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  return (
    <div>
      jotai-state
      <DevTools />
      <TodoListStats states={todoState} />
      <TodoCreator value={inputValue} addItem={addItem} onChange={onChange} />
      {todos.map(todo => (
        <TodoItem
          item={todo}
          toggleItemCompletion={toggleItemCompletion}
          editItemText={editItemText}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
}
```

### jotai hook

- jotai도 recoil과 동일하게 hook을 제공하는데 오히려 더 간결하고 쉽게 되어있었다.
  **useAtom —** atom의 값을 구독하여 업데이트할 수 있는 hook. `useState`와 동일한 방식으로 사용할 수 있다.
  **useAtomValue —** setter 함수 없이 atom의 값을 반환만 한다.
  **useSetAtom —** setter 함수만 반환한다.

### jotai utilities

- jotai의경우 util 기능을 제공해준다 대표적으로는 새로고침시 상태가 유지되게하는 기능, ssr 등의 기능을 제공해주니 [공식 문서](https://jotai.org/) 참고 바란다.
- 일단 대표적인 새로고침시 상태가 유지되는 persist 기능을 해볼까한다.

```tsx
import { atomWithStorage } from 'jotai/utils';

const storageTodoAtom = atomWithStorage<TtodoItem[]>('todoAtom', []);
```

- 기존 atom으로 감싸진 부분을 `atomWithStorage`로 변경하면된다
  - parameter의경우 각 key, initialValue, storage(option) 이다
  - storage의경우 localstorage, sessionstorage 로 구별되는데 기본값은 localstorage로 지정되어있다.

### jotai devtools

- jotai내부에는 기본적으로 dev tools가 없기때문에 따로 설치를 요한다.
- 내부적으로 emotion이 디펜던시로 연결되어있는거 같았다.

```bash
# yarn
yarn add jotai-devtools @emotion/react

# npm
npm install jotai-devtools @emotion/react --save
```

- 사용법같은경우 페이지단이나 index단에서 컴포넌트 형식으로 사용하면된다

```jsx
import { DevTools } from 'jotai-devtools'; // jotai devtools

  return (
		/* ... 이전 생략 */
      <DevTools />
		/* 이후 생략... */
  );
```

## zustand

- zustand란 독일어로 상태란뜻이다.
- 기존 flux패턴을 더 단순하고 간결하게 제작한것이 zustand이다.
  - 일단 사용법이 매우 쉽다
  - 불필요한 리렌더링을 발생시키지 않는다
  - 보일러플레이트가 거의 없다 (redux의 단점)
  - redux dev tool 사용이 가능하다 (매우 매우 좋다)

### 설치과정 및 세팅

1. 설치

   ```bash
   # NPM
   npm install zustand

   # Yarn
   yarn add zustand
   ```

2. 세팅
   - redux에서는 provider를 감싸는 형태를 zustand에서는 별도로 필요로 하지 않는다.

### 사용방법

- redux와 동일한 방법으로 store를 선언하는 형태로 되어있는데 zustand에서는 create함수로 만들수있다.
  필자는 store라는 변수로 빼서 따로 관리하는 형태로 제작할것이다.
- 기본구조
  - 기본구조는 default값을 정의한뒤에 reducer형태로 정의하는 형태로 되어있었다.
  ```tsx
  import { create } from 'zustand';

  const useTodoStore = create((set) => ({
  	todos: [],
  	addItem: (text:string) => {
  		set(state => ({
  			//... 이하 생략
  		})
  	}
  }))
  ```
- 프로젝트 선언
  - set 함수에 대한 부분은 zustand devtools를 진행하다가 알게된 부분인데
  - set함수는 3가지 parameter가 존재했다, 첫번째는 상태, 두번째는 shoudReplace, 세번째가 action type 정의였다. devtools 사용한다면 알아두면 좋겠다 (정의없이 사용하면 annoymous로 매번찍히고, 상태가 꼬일때가 있던거 같았다)

```tsx
// todoStore

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TtodoItem } from '../../types/todoType';

// 스토어 값을 정의 합니다
const store = (set, get) => ({
  todos: [],
  // 투두리스트 추가 함수 정의
  addItem: (text: any) => {
    set(
      state => ({
        todos: [
          ...state.todos,
          {
            id: get().todos.length + 1,
            text,
            isComplete: false,
          },
        ],
      }),
      false,
      'addItem'
    );
  },
  // 투두리스트 삭제 함수 정의
  deleteItem: (id: number) => {
    set(
      state => ({ todos: state.todos.filter(list => list.id !== id) }),
      false,
      'removeItem'
    );
  },
  // 투두리스트 완료 상태 변경함수 정의
  toggleItemCompletion: (id: number) => {
    set(
      state => ({
        todos: state.todos.map(list => ({
          ...list,
          isComplete: list.id === id ? !list.isComplete : list.isComplete,
        })),
      }),
      false,
      'toggleItem'
    );
  },
  // 투두 리스트 item 내용 변경 함수
  editItemText: (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = event.target;
    set(
      state => ({
        todos: state.todos.map(list =>
          list.id === id ? { ...state.todos, text: value } : list
        ),
      }),
      false,
      'editItem'
    );
  },
  // selector 정의
  getTodoState: () => {
    const todoList = get().todos;
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter(item => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;
    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

// devtools 부터 persist까지 적용된 상태
const useTodoStore = create<TodoListState>(
  devtools(persist(store, { name: 'todos' }))
);

export { useTodoStore };
```

- zustand.page.tsx
  - 페이지내에서는 hook 형태로 사용하면 된다
  - store에서 선언된 useTodoStore를 가져오구 내부에 선언된 값들을 연결시켜주면된다.

```tsx
import React, { ChangeEvent, useState } from 'react';
import { TodoCreator } from '../components/TodoCreator';
import TodoListStats from '../components/TodolistStats';
import { TodoItem } from '../components/TodoItem';
import { useTodoStore } from '../store/zustand/todoStore';

export default function ZustandPage() {
  // 인풋에 대한 상태값을 가져옵니다
  const [inputValue, setInputValue] = useState('');
  // todo에대한 store값을 가져옵니다.
  const { todos, addItem, deleteItem, toggleItemCompletion, editItemText } =
    useTodoStore();

  // 투투리스트에 대한 state값을 가져옵니다
  const todoState = useTodoStore(state => state.getTodoState());

  // input 변경 함수
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  // todoitem add함수 정의
  const onAddItem = () => {
    addItem(inputValue);
    setInputValue('');
  };

  return (
    <div>
      Zustand.page
      <TodoListStats states={todoState} />
      <TodoCreator value={inputValue} addItem={onAddItem} onChange={onChange} />
      {todos.map(todo => (
        <TodoItem
          item={todo}
          toggleItemCompletion={toggleItemCompletion}
          editItemText={editItemText}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
}
```

### zustand utilities (Devtools, persist)

- zustand는 기본적으로 devtools와 persist(상태저장) 을 기본적으로 middleware에서 가능하게 해두었다.
- 필자는 개인적으로 redux dev tool을 쓸수있는 부분이 매우 매력적이라 생각되어 zustand에 감명을 받았다.
- 최상단에 devtools → persist → store순으로 참조해주면된다. 아 가장 중요한 persist에서 참조할수있게 name정의하는것도 중요하다.

```tsx
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set,get) => ({
	//... store 내용 이하생략 (사용방법 참조)
})

const useTodoStore = create(
  devtools(persist(store, { name: 'todos' }))
);
```
