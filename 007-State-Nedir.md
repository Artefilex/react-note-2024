# State Nedir ?

React'ta "state", bir component'in yaşam döngüsü boyunca değişebilecek verilerin saklandığı ve yönetildiği bir yapıdır. State, kullanıcı etkileşimleri, zamanla değişen veriler veya harici API çağrılarından gelen veriler gibi dinamik bilgileri içerebilir. Bir component'in state'i değiştiğinde, React bu değişikliği otomatik olarak algılar ve ilgili component'i (ve çocuklarını) yeniden render ederek UI'ı güncel tutar.

## State Kullanımın Avantajları

- **Interaktif Kullanıcı Arayüzleri:** State, modern web uygulamalarının temel taşıdır. Dinamik ve interaktif kullanıcı arayüzlerinin kolayca oluşturulabilmesini sağlar.

- **Veri Yönetimi:** Uygulama içerisinde kullanıcı etkileşimlerine ve harici verilere bağlı olarak değişen verilerin yönetilmesine olanak tanır.

- **Deklaratif Kodlama:** Geliştiricilerin, uygulamanın herhangi bir zamandaki durumuna göre nasıl görünmesi gerektiğine odaklanmalarını sağlar. Bu, kodun okunabilirliğini ve bakımını kolaylaştırır. 

## State Nasıl Çalışır?

React'da bir state 16.8 sürümü ile beraber hooklar hayatımıza girmiştir. Bu noktada  State tanımlamak için `useState` hookunu kullanırız. 

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

Bu örnekte, `useState` hook'u `0` başlangıç değeri ile kullanılarak bir `count` state değişkeni ve bu değişkeni güncellemek için bir `setCount` fonksiyonu oluşturulmuştur. Butona her tıklandığında, `setCount` fonksiyonu çağrılarak `count` değeri bir arttırılır ve component yeniden render edilir.  

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
basit bir form işleminde ise bu şekilde bir state kullanımı sağlayabiliriz 


Saf JavaScript'te, dinamik UI'lar oluşturmak için DOM API'si doğrudan kullanılır. Bu, elementleri manuel olarak oluşturmayı, seçmeyi ve güncellemeyi gerektirir. State yönetimi genellikle custom logic ile gerçekleştirilir ve DOM güncellemeleri için manuel olarak kod yazmak gerekir. React'in sağladığı otomatik UI güncellemeleri, sanal DOM ve state yönetimi gibi özellikler, saf JavaScript'e kıyasla büyük avantajlar sağlar. React, uygulama geliştirmeyi daha hızlı, daha verimli ve hata yapma olasılığını azaltacak şekilde basitleştirir.
