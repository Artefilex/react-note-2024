## Recoil

Recoil, React ortamında global state yönetimi için kullanılan bir kütüphanedir. Redux, Context API, MobX gibi diğer state yönetim çözümlerine kıyasla, React'in kendi atom ve seçici (selector) kavramları üzerine kurulu bir yaklaşım sunar. Bu, React'ın fonksiyonel ve deklaratif doğasına daha yakın bir kullanım sağlar.

Recoil, "atom" ve "seçici" (selector) olmak üzere iki temel yapı üzerine kuruludur

**Atom:** Uygulamanın global state'ini tutan, değişkenlerdir. Her atom, uygulamanın herhangi bir yerinden erişilebilen ve güncellenebilen bir state parçasını temsil eder. Atomlar değiştiğinde, bu atomu kullanan tüm bileşenler yeniden render edilir.

**Seçici (Selector):** Atomlar veya diğer seçiciler üzerinde hesaplama yaparak yeni bir veri elde etmeyi sağlayan saf fonksiyonlardır. Seçiciler, türetilmiş state veya hesaplanmış değerler oluşturmak için kullanılır. Bir seçici, bağlı olduğu atom veya seçicilerdeki değişikliklere otomatik olarak tepki gösterir.

Recoil, daha az boilerplate kod ile çalışır ve React'in kendi hooklarıyla (useState, useEffect vb.) benzer bir API kullanır, bu da öğrenmesini ve kullanmasını kolaylaştırır.

## Temel Kavramlar

- **atom:** Uygulamanın durumunu tutan en küçük birimdir. Global state parçalarını oluşturmak için kullanılır. uniq bir key ve default value tutar içinde tıpkı initial value gibi düşünebilirsin.

```js
import { atom } from "recoil";

const todosState = atom({
  key: "allTodoItem",
  default: [],
});
```

- **selector:** Atomlar veya diğer selektörler üzerinden hesaplama yaparak türetilmiş state üretir. Bağlı olduğu atom veya selektörlerdeki değişikliklere dinamik olarak tepki verir.

```js
import { selector, atom } from "recoil";
const todosState = atom({
  key: "allTodoItem",
  default: [],
});
export const filterText = atom({
  key: "filterText",
  default: "",
});
const todoFilter = selector({
  key: filteredTodo,
  get: ({ get }) => {
    const text = get(filterText);
    const todoList = get(todoState);
    const filterTodo = todoList.filter((item) => item.text !== text);
    const todoLength = todoList.length;
    return { filterTodo, todoLength };
  },
});
```

- **useRecoilState:** Bir atomun state'ini ve onu güncellemek için bir setter fonksiyonunu döndüren bir hook'tur. React'in useState hook'una benzer.

```js
import { useRecoilState, useSetRecoilState } from "recoil";
import { filterText, todoListState } from "../../store/recoil/Todo";

function AddTodo() {
  const [textTodo, setTextTodo] = useState("");
  const [filterTodoText, setFilterTodoText] = useRecoilState(filterText);

  return <div> something </div>;
}
```

kullanımında default veriyi güncellemek istediğimiz atomu vererek yapıyoruz

- **useRecoilValue:** Sadece atom veya selektörün mevcut değerini okumak için kullanılır. State'i güncellemek için kullanılamaz.

```js
import { useRecoilValue } from "recoil";
import { todoListState } from "../../store/recoil/Todo";

function AddTodo() {
  const todoList = useRecoilValue(todoListState);

  return (
    <div>
      {" "}
      {todoList.map((todo) => (
        <div key={todo.id}> {todo.text}</div>
      ))}{" "}
    </div>
  );
}
```

- **RecoilRoot:** Recoil state yönetimini kullanabilmek için uygulamanızın en üst seviyesine yerleştirilmesi gereken bileşendir. Tüm Recoil hook'ları bu bileşenin altında kullanılmalıdır.

```jsx
import { RecoilRoot } from "recoil";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
```

- **useSetRecoilState:** Bir atomun setter fonksiyonunu döndüren bir hook'tur. Bu hook, atomun mevcut değerini okumadan sadece onu güncellemek için kullanılır.

```jsx
import { useSetRecoilState } from "recoil";
import { todoListState } from "../../store/recoil/Todo";
import {useState} from "react"
function SetTodo() {

 const setTodo = useSetReoilState(todoListState)
 const [newItem , setNewItem] = useState("")
const addNewItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      newItem,
    ]);
    setNewItem("")
  };
 const
  return (
    <div>
      <input name="newItem" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      <button onClick={addNewItem}> Add Item </button>
    </div>
  );
}
```

- **useResetRecoilState:** Bir atomun değerini başlangıç değerine sıfırlamak için kullanılan bir hook'tur.

```jsx
import { useResetRecoilState } from "recoil";
import { todoListState } from "./atoms";

function ResetTodoList() {
  const resetTodoList = useResetRecoilState(todoListState);

  return <button onClick={resetTodoList}>Reset Todo List </button>;
}
```

- **useRecoilValueLoadable:** Bir atom veya selektörün değerini, yükleme durumunu ve hata bilgilerini içeren bir "loadable" nesnesi olarak döndürür. Bu, asenkron selektörlerle çalışırken özellikle yararlıdır.

- **useRecoilStateLoadable:** Hem state'i hem de yükleme/hata durumlarını yönetmek için kullanılır. Asenkron işlemleri yürütürken atom veya selektörlerin durumunu yönetmek amacıyla tasarlanmıştır.

- **selectorFamily:** Parametreler alabilen ve bu parametrelere göre dinamik selektörler üreten bir fabrika fonksiyonudur. Benzer hesaplamaları farklı parametrelerle yapmak istediğinizde kullanışlıdır.

- **atomFamily:** Parametreler alabilen ve bu parametrelere göre dinamik atomlar üreten bir fabrika fonksiyonudur. Benzer global state'lerin farklı parametrelerle yönetilmesi gerektiğinde kullanılır.

- **useRecoilCallback:** Recoil state'ine erişim sağlayan callback'ler oluşturmak için kullanılır. Bu callback'ler, normal React event handler'ları veya diğer etkiler içinde state'e erişim sağlamak amacıyla kullanılabilir.
