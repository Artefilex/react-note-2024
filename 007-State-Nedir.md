# State Nedir ?

React'ta "state", bir component'in yaşam döngüsü boyunca değişebilecek verilerin saklandığı ve yönetildiği bir yapıdır. State, kullanıcı etkileşimleri, zamanla değişen veriler veya harici API çağrılarından gelen veriler gibi dinamik bilgileri içerebilir. Bir component'in state'i değiştiğinde, React bu değişikliği otomatik olarak algılar ve ilgili component'i (ve çocuklarını) yeniden render ederek UI'ı güncel tutar.

## State Kullanımın Avantajları

- **Interaktif Kullanıcı Arayüzleri:** State, modern web uygulamalarının temel taşıdır. Dinamik ve interaktif kullanıcı arayüzlerinin kolayca oluşturulabilmesini sağlar.

- **Veri Yönetimi:** Uygulama içerisinde kullanıcı etkileşimlerine ve harici verilere bağlı olarak değişen verilerin yönetilmesine olanak tanır.

- **Deklaratif Kodlama:** Geliştiricilerin, uygulamanın herhangi bir zamandaki durumuna göre nasıl görünmesi gerektiğine odaklanmalarını sağlar. Bu, kodun okunabilirliğini ve bakımını kolaylaştırır. 

## State Nasıl Çalışır?

React'da bir state 16.8 sürümü ile beraber hooklar hayatımıza girmiştir. Bu noktada  State tanımlamak için `useState` hookunu kullanırız. 

Bu örnekte, `useState` hook'u `0` başlangıç değeri ile kullanılarak bir `count` state değişkeni ve bu değişkeni güncellemek için bir `setCount` fonksiyonu oluşturulmuştur. Butona her tıklandığında, `setCount` fonksiyonu çağrılarak `count` değeri bir arttırılır ve component yeniden render edilir.

```jsx

import { useState} from 'react'
function App () {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
    </>
  )
}

```

Basit bir form işleminde ise bu şekilde bir state kullanımı sağlayabiliriz.

```jsx

import { useState } from 'react';

function App() {
  const [name, setName] = useState("");

 // Form işlemi başarılı ise setName ile inputun içini temizliyoruz 
  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit">save</button>
        </form>
      </div>
    </>
  );
}

```

Bir button ile beraber açılır kapanır bir menüyü hızlıca yaratabilirsiniz. 

```jsx

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Menüyü Aç/Kapa</button>
      {isOpen && (
        <ul>
          <li>Seçenek 1</li>
          <li>Seçenek 2</li>
          <li>Seçenek 3</li>
        </ul>
      )}
    </div>
  );
}

```

State kullanımı ile ilgili birçok basit ve karmaşık kullanım methodlar vardır. Bu senaryolar, state kullanımının uygulama geliştirmedeki çeşitliliğini ve önemini gösterir. State, uygulamanızın kullanıcı etkileşimlerine dinamik bir şekilde yanıt vermesini sağlar ve kullanıcı deneyimini zenginleştirir.
