# **Custom Hook**

React'ta custom hookları belirli bir işlevselliği yeniden kullanılabilirbir şekilde paketlemek amacıyla kullanılır. Bu, kod tekrarını azaltır, okunabilirliği artırır ve genel olarak uygulamanızın bakımını kolaylaştırır. 

## **Custom Hook Nasıl Oluşturulur ?**

Custom hook oluştururken `use` ile başlarız. Bu konvansiyon, fonksiyonun bir hook olduğunu belirtir ve React’ın lint kurallarının hook’larla ilgili hataları yakalamasına yardımcı olur.

Örneğin, bir form input’unda girilen değeri takip eden ve bu değeri yöneten basit bir custom hook (useInput) oluşturalım 

```jsx

import { useState } from 'react';

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return [value, handleChange];
}

```

```jsx
function MyComponent() {
  const [name, setName] = useInput('');

  return (
    <input type="text" value={name} onChange={setName} />
  );
}

```

Yukarıdaki kod bloğunda basit bir custom hook oluşturduk. Tabi ki bu senaryoları projenin gereksinimlerine göre ayarlayabilirsiniz. örneğin Form İşlemleri , Veri Fetching , Event Listenerler vb .  Bu tamamıyla size kalmış.  

Custom hook oluşturma ihtiyacınız olduğunu anlamanıza yardımcı olacak bazı temel durumlar

1. **Kod Tekrarı:** Aynı mantığı iki veya daha fazla bileşende kullanıyorsanız, bu mantığı bir custom hook içerisinde merkezileştirmek zaman ve çaba tasarrufu sağlar. Kod tekrarını azaltmak, hata yapma riskini düşürür ve gelecekteki değişiklikleri kolaylaştırır.

2. **Karmaşık Mantık:** Bileşeniniz karmaşık mantık veya yardımcı işlevler içeriyorsa ve bu karmaşıklık bileşenin asıl amacını gölgelemeye başladıysa, bu mantığı bir custom hook’a taşımak, bileşeninizin okunabilirliğini ve yeniden kullanılabilirliğini artırabilir.

3. **Özelleştirilebilir Bileşenler:** Eğer bir bileşenin davranışını özelleştirmek için dışarıdan alınan parametrelere bağlı olarak değişiklikler yapmanız gerekiyorsa, bu özelleştirmeleri yönetmek için bir custom hook kullanmak işleri kolaylaştırabilir.

4. **Yeniden Kullanılabilirlik:** Uygulamanızın farklı bölümlerinde yeniden kullanmayı düşündüğünüz özel bir işlevselliğe ihtiyacınız varsa, bu işlevselliği bir custom hook olarak oluşturmak, kodunuzu DRY (Don't Repeat Yourself - Kendini Tekrar Etme) prensibine uygun hale getirir.

5. **Side Effect Yönetimi:**  Birden fazla bileşen useEffect veya benzeri hook’ları benzer şekillerde kullanıyorsa (örneğin, veri çekme, event listener ekleyip kaldırma), bu işlevselliği bir custom hook içinde merkezileştirmek, kodunuzun daha temiz ve yönetilebilir olmasını sağlar.