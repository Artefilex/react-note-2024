# Zustand

Zustand, React uygulamaları için basit, hızlı ve ölçeklenebilir bir durum yönetim kütüphanesidir. Redux, MobX gibi kütüphanelere alternatif olarak geliştirilmiş olup, daha az boilerplate kod ile çalışmayı ve daha anlaşılır bir API sunmayı amaçlar. Zustand, React Hooks'un avantajlarını kullanarak durum yönetimini kolaylaştırır ve uygulamanızın farklı bölümleri arasında veri akışını sorunsuz bir şekilde sağlar.

Zustand boilerpate/\*

## Zustand'ın Avantajları

1. **Basitlik:** Zustand, karmaşık konfigürasyonlar veya boilerplate kod gerektirmez. Basit API'si sayesinde, durum yönetimini hızlı bir şekilde uygulamanıza entegre edebilirsiniz.
2. **Performans:** Zustand, gereksiz render'ları önlemek için bileşenleri otomatik olarak abone eder ve yalnızca ilgili durum değişikliklerinde güncellenmeleri tetikler. Bu, uygulamanızın performansını artırır.
3. **Esneklik:** Zustand, küçük projelerden büyük ölçekli uygulamalara kadar her türlü projede kullanılabilir. Durum yapılarınızı ihtiyaçlarınıza göre özelleştirebilirsiniz.
4. **Hooks Desteği:** Zustand, React Hooks ile uyumludur, bu da durum yönetimini fonksiyonel bileşenler içinde kolayca kullanabileceğiniz anlamına gelir.

## Kurulum ve Kullanım

**Ortamın Hazırlanması**

Zustandı porjeye dahil ettikten sonra kullanması aşırı kolay hatta diyebilirim ki Context API yerine kullanılabilir. Herhangi bir providera ihitiyaç duymuyoruz.

```bash
yarn add zustand ;
npm install zustand
```

1. Zustand ile basit bir todo oluşturalım. ve dışarıya aktaralım.

```js
//TodoStore.js

import { create } from "zustand";

export const useTodos = create((set) => ({
  todos: [{ title: "todo1", complated: false }],
  addTodo: (item) =>
    set((state) => ({
      todos: [...state.todos, item],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((_, key) => key !== id),
    })),
}));
```

- `create` fonksiyonu, Zustand'ın sağladığı bir metottur ve bir global state oluşturmak için kullanılır. Bu fonksiyona argüman olarak bir callback fonksiyonu verilir. Bu callback fonksiyonu içerisinde state'imizi yönetecek yapıyı tanımlarız.

- `set` fonksiyonu, state'imizi güncellememizi sağlar. Zustand, state güncellemelerinin yapılabilmesi için bu fonksiyonu sağlar .

- initial state olarak todos adında bir array tanımladık

- `addTodo` fonksiyonu, yeni bir todo öğesini listeye eklemek için kullanılır. Bu fonksiyon, set metodunu kullanarak todos array'ine yeni bir öğe ekler. Yeni öğe, mevcut todos array'ine eklenirken, eski elemanların korunması için spread operator (...) kullanılmıştır.

- `removeTodo` fonksiyonu, belirli bir index'e sahip todo öğesini listeden çıkarmak için kullanılır. Bu işlem, filter metodu ile gerçekleştirilir. filter fonksiyonu, verilen koşulu sağlamayan öğeleri yeni bir array olarak döndürür. Bu örnekte, id parametresi ile belirtilen index'e sahip öğe hariç tüm öğeleri içeren yeni bir array oluşturulur.

- Zustand'ın set fonksiyonunu kullanırken süslü parantezler `({})` içinde bir obje döndürmemizin sebebi, güncellenmiş state'i bir obje olarak sağlamak zorunda olmamızdır. JavaScript'te, bir fonksiyonun birden fazla satırı varsa ve bu fonksiyondan bir değer döndürmek istiyorsak, return anahtar kelimesini kullanmamız gerekir. Ancak, arrow fonksiyonunda doğrudan bir obje döndürmek istediğimizde, JavaScript objenin süslü parantezlerini fonksiyonun bloğunu tanımlamak için kullanılan süslü parantezlerle karıştırabilir. Bu durumu önlemek ve fonksiyonun bir obje döndürdüğünü açıkça belirtmek için, objeyi ekstra bir parantez çiftiyle `(())` sarmalarız.

- `set((state) => ({ ... }))`: Burada `set` fonksiyonuna bir callback fonksiyonu geçiriyoruz. Bu callback, güncel state'i alır ve yeni state'i döndürür.
- `({ ... })`: Callback fonksiyonunun içinde, doğrudan bir obje döndürmek istiyoruz. Bu obje, güncellenmiş state'imizi temsil eder. Ancak, doğrudan `{ ... }` kullanırsak, JavaScript bunu fonksiyonun bloğu olarak yorumlar. Bu yüzden objeyi `()`içine alarak, JavaScript'e bu süslü parantezlerin bir obje literal'ını sarmalamak için kullanıldığını belirtiyoruz.

**Bileşen İçinde Zustand Kullanımı**

Ortam kurulumunu yaptıktan sonra yapmamız gereken sadece `useTodos`'u gerekli yerlerde kullanarak işlemlerimiz gerçekleştirmek olacak bunun için bir `Todos.jsx` ve `AddTodo.jsx` componentlarını oluşturarak kullanalım

**Todos.jsx**

```jsx
import { useTodos } from "../store/zustand/zustandStore";
import AddTodo from "./AddTodo";

function Todos() {
  // `useTodos` hook'undan `todos` listesini alıyoruz.
  // Burada state'ten sadece gerekli olan parçayı seçmek için bir selector fonksiyonu kullanılıyor.
  // Bu, sadece `todos` state'i değiştiğinde bileşenin yeniden render edilmesini sağlar.
  const todos = useTodos((state) => state.todos);
  // Aynı şekilde `removeTodo` fonksiyonunu da `useTodos` hook'undan alıyoruz.
  // Bu fonksiyon, belirli bir todo'yu silmek için kullanılacak.
  const removeTodo = useTodos((state) => state.removeTodo);
  return (
    <div>
      {todos.length === 0 && <div> todos boş </div>}
      {todos.map((todo, index) => (
        <div key={index}>
          {todo.title}
          {todo.complated ? "tamamlandı" : "bekliyor"}
          <button onClick={() => removeTodo(index)}>sil</button>
        </div>
      ))}
      <AddTodo />
    </div>
  );
}

export default Todos;
```

Zustand kütüphanesi ile oluşturulan useTodos hook'unu React bileşeninde kullanırken, performansı optimize etmek ve gereksiz yeniden renderları önlemek için dikkatli bir yaklaşım sergilemek önemlidir. useTodos hook'undan dönen değerleri doğrudan bir değişkene atayarak kullanmak (const todos = useTodos((state) => state.todos)), bu yaklaşımın bir parçasıdır. Aşağıda, kodunuzun açıklamasını daha anlaşılır bir hale getirdim:

**Neden Doğrudan Değişkene Atama Yapıyoruz?**

Zustand ile state yönetimi yaparken, useTodos hook'undan dönen değerleri `{todos, removeTodo} = useTodos()` şeklinde destructure etmek yerine, her birini ayrı ayrı kullanmak `(const todos = useTodos((state) => state.todos))`, gereksiz yeniden renderları önler.

Eğer Zustaınd hook'undan dönen değerleri illaki destruct etmek istiyorsanız ve gereksiz yeniden render'ların önüne geçmek istiyorsanız, Zustaınd'ın sağladığı shallow karşılaştırma fonksiyonunu kullanabilirsiniz. shallow fonksiyonu, yüzey seviyesinde (shallow) bir eşitlik karşılaştırması yapar ve bu sayede sadece gerçekten değişen state parçalarında yeniden render tetiklenir.

```jsx
const { todos, removeTodo } = useTodos(
  (state) => ({
    todos: state.todos,
    removeTodo: state.removeTodo,
  }),
  shallow
);
```

Artık hangisi kolayınıza gelirse.

**AddTodo.jsx**

```jsx
import { useState } from "react";
import { useTodos } from "../store/zustand/zustandStore";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [complated, setComplated] = useState(false);
  const addTodo = useTodos((state) => state.addTodo);
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      title,
      complated,
    });
    setTitle("");
    setComplated(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo"> Todo </label>
      <input
        type="text"
        name="todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label htmlFor="complated"> Complated </label>
      <input
        type="checkbox"
        name="complated"
        value={complated}
        onChange={(e) => setComplated(e.target.checked)}
      />
      {complated ? "tamamlandı" : "bekliyor"}
      <br />
      <button type="submit">ekle</button>
    </form>
  );
}

export default AddTodo;
```

`Addtodo.jsx` de addtodo methodunu kullanarak inputlardan gelen değerleri submit durumunda `addTodo` fonksiyonumuza iletiyirouz . Bu şekilde kullanarak daha farklı senaryolar için geliştirme yapabiliriz. Bu örnek basit bir todo uygulamasını zustand kullanarak nasıl yapabileceğimizi gördük.

Zustandın yetenekleri ve sağladıkları bu kadarla sınırlı değil içinde birçok farklı fonskiyon ve yaklaşım barındırıyor incelemeniz için link bırakıyorum.

<a href="https://github.com/pmndrs/zustand">Zustand Doc</a>
