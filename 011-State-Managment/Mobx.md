# MobX

MobX, modern web ve mobil uygulama geliştirmede kullanılan popüler bir state management kütüphanesidir. MobX, modern JavaScript'in `Proxy`nesnesini kullanarak state'i yönetir. `Proxy`, bir nesnenin davranışını özelleştirmek için kullanılan bir yapıdır. Bu, MobX'in reaktif sistemini oluşturmanın temel taşlarından biridir. Proxy ile MobX, bir nesneye yapılan erişimleri ve değişiklikleri "gözlemleyebilir" `observable`, böylece nesne üzerinde yapılan herhangi bir değişiklik otomatik olarak algılanır ve ilgili reaktif güncellemeler tetiklenebilir.

## MobX'i Diğerlerinden Farklı Kılan Özellikler

**Reaktif Programlama:** MobX, reaktif programlama prensiplerini kullanır. Bu, bir veri değiştiğinde, bu veriye bağlı olan tüm bileşenlerin veya hesaplamaların otomatik olarak güncellendiği anlamına gelir. Bu, geliştiricilere manuel olarak bileşenleri güncelleme zahmetinden kurtarır.

**Basit ve Az Kod:** MobX, uygulama durumunu yönetirken çok az boilerplate kod gerektirir. Bu, geliştirme sürecini hızlandırır ve kodun okunabilirliğini artırır.

**Basit ve Az Kod:** MobX, uygulama durumunu yönetirken çok az boilerplate kod gerektirir. Bu, geliştirme sürecini hızlandırır ve kodun okunabilirliğini artırır.

**Esneklik:** MobX, geniş bir kullanım senaryosuna uyarlanabilir ve küçük projelerden büyük ölçekli uygulamalara kadar her yerde kullanılabilir. Ayrıca, diğer state management kütüphaneleriyle karşılaştırıldığında, daha az katı kurallara sahiptir.

## Kullanım için Dikkat Edilmesi Gereken Noktalar

**Verileri Doğru Şekilde İşaretleme:** MobX ile çalışırken, uygulamanızın durumunu yönetmek için observable olarak işaretlemeniz gereken verileri doğru bir şekilde belirlemek önemlidir.

**Eylemler:** Durumu değiştiren işlemler action içinde yapılmalıdır. Bu, MobX'in durum değişikliklerini daha iyi izlemesine ve gereksiz render işlemlerini önlemesine yardımcı olur.

**Computed Değerler:** Türetilmiş veya hesaplanmış değerler için `computed` kullanılmalıdır. Bu, performansı artırır çünkü ilgili observable değerler değişmediği sürece hesaplanmış değerler yeniden hesaplanmaz.

**React ile Kullanırken:** MobX'i React ile kullanırken `observer` yüksek-düzey fonksiyonunu kullanmak, bileşenlerin gerektiğinde ve yalnızca gerekli olan durumlarda yeniden render edilmesini sağlar.

## MobX'in Temel Konseptleri

1. **Observable State**
   Observable state, MobX'in gözlemlediği ve üzerinde değişiklikler olduğunda reaktif güncellemeleri tetiklediği uygulama durumudur. Herhangi bir JavaScript veri yapısı (objeler, diziler, primitifler) observable yapılabilir. Bu, MobX'in uygulamanın durumundaki değişiklikleri otomatik olarak izlemesine ve bu değişikliklere tepki vermesine olanak tanır.

```js
import { makeAutoObservable } from "mobx";

class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }
}

const counterStore = new CounterStore();
export default counterStore;
```

2. **Actions**

Actions, uygulama durumunu değiştirmek için kullanılan metodlardır. MobX, actions içinde yapılan değişiklikleri "transaction" olarak işler ve bu sayede performansı optimize eder. Bir action tamamlandığında, durumdaki tüm değişiklikler tek bir güncelleme olarak uygulanır

```js

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

```

3. **Computeds**

Computed values, mevcut observable durumlarından türetilen değerlerdir. Bir computed değer, bağımlı olduğu observables değiştiğinde otomatik olarak yeniden hesaplanır. Bu, hesaplamalı değerlerin her zaman güncel ve tutarlı olmasını sağlar.

```js
class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get isEven() {
    return this.count % 2 === 0;
  }
}
```

isEven bir computed value'dur. count'un değeri her değiştiğinde, isEven otomatik olarak yeniden hesaplanır. Eğer count çift bir sayıysa, isEven true değerini döndürür. Bu, hesaplamalı değerlerin her zaman güncel ve tutarlı olmasını sağlar.

4. **Reactions**

Reactions, observable durumdaki değişikliklere tepki olarak otomatik olarak yürütülen yan etkilerdir. Reactions, genellikle veri akışının son noktalarında kullanılır, örneğin bir kullanıcı arayüzünü güncellemek veya bir API isteği yapmak için.

MobX ile birlikte, observable state'teki değişikliklere tepki olarak çalışacak yan etkileri tanımlayabilirsiniz. Bu, reaction veya autorun gibi MobX API'leri kullanılarak yapılabilir.

```js
import { autorun } from "mobx";

autorun(() => {
  console.log(`The count is now ${counterStore.count}`);
});
```

## Nasıl Kullanılır

1. **Bağımlılıkları Yükleyin:**

```bash
yarn add mobx mobx-react-lite # veya mobx-react

```

2. **State Store Oluşturma:** Uygulamanızın durumunu yönetmek için bir veya birden fazla store oluşturun.

```js
import { makeAutoObservable } from "mobx";

class Todo {
  id = Math.random();
  title = "";
  complated = false;
  constructor(title) {
    makeAutoObservable(this);
    this.title = title;
  }
}
class TodoStore {
  todos = [];

  constructor() {
    makeAutoObservable(this);
  }
  toogleComplated(id) {
    this.todos.find((todo) => {
      if (todo.id === id) {
        todo.complated = !todo.complated;
      }
    });
  }

  addTodo(title) {
    this.todos = [...this.todos, new Todo(title)];
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

const stores = new TodoStore();

export default stores;
```

3. **Store'u Componentlerde Kullanma:** Store'u, uygulamanızın React componentleri içinde kullanın.

```jsx
import { useState } from "react";
import store from "../../store/mobx/store";
import { observer } from "mobx-react";

const CreateTodo = observer(() => {
  const [title, setTitle] = useState("");
  console.log(store.todos);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      store.addTodo(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
});

export default CreateTodo;
```

```jsx
import { observer } from "mobx-react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";
import store from "../../store/mobx/store";

const Todo = observer(() => {
  return (
    <div style={{ margin: "20px" }}>
      <h1>Todo App using MobX+React</h1>
      <CreateTodo />
      <ul>
        {store.todos.map((todo ,index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ul>


    </div>
  );
});

export default Todo;


// TodoItem

import store from "../../store/mobx/store";
import { observer } from "mobx-react-lite";
const TodoItem = observer(({ todo }) => {

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => store.toogleComplated(todo.id)}
      />
      <span>{todo.title}</span>
      <button onClick={() => store.removeTodo(todo.id)}>Remove</button>
    </li>
  );
});

export default TodoItem;

```

MobX kullanırken, React Context API'sinin Provider/Consumer kalıbını kullanmanıza gerek kalmadan doğrudan store'u import ederek verilere erişebilir ve bu verileri yönetebilirsiniz. observer fonksiyonu, gözlemlenen (observable) verilerdeki değişikliklere otomatik olarak tepki veren ve ilgili componentleri yalnızca gerekli olduğunda yeniden render eden bir mekanizma sağlar.
