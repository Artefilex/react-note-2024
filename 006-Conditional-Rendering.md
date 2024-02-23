# Koşullu Render 

Conditional rendering, React'ta belirli koşullara bağlı interaktif şekilde içerik gösterme işlemine yarar.

## Conditional Rendering Yapmanın Yolları

1. **If/Else Blokları Kurmak**

En temel yöntem, if/else ifadelerini kullanarak koşullu render yapmaktır. Ancak, JSX içinde doğrudan if/else kullanamazsınız, bu yüzden genellikle bu tür koşullu renderlarını bir fonksiyon içinde veya bileşenin render metodundan önce yapmanız gerekir. Çok fazla tercih edilmez ancak kullanıldığı sanaryolarda vardır.

```jsx
function Welcome({user}) {
  if (user.isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please sign up.</h1>;
  }
}
```

2. **Mantıksal && Operatör kullanmak**

Bir koşul doğruysa bir element göstermek istediğinizde, JavaScript'in mantıksal AND operatörünü (`&&`) kullanabilirsiniz. Eğer koşul `true` ise, React elementi render edecektir.

```jsx
function Welcome({user}) {
 return (
    <div>
      {user.isLoggedIn && <h1>Welcome back!</h1>}
      {!user.isLoggedIn && <h1>Please sign up.</h1>}
    </div>
  );
}
```

3. **Ternary Operatör**

Ternary operatörü (`koşul ? doğru : yanlış`), iki farklı element arasında seçim yapmak için sıkça kullanılır ve JSX içinde doğrudan kullanılabilir.

```jsx
function Welcome({user}) {
 return (
    <div>
      {user.isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1> }
    </div>
  );
}
```

En temel kullanılan metodlar yukardaki gibidir ancak bu methodları da kullanırken dikkat etmeniz gereken bazı noktalar vardır. 


## Nelere Dikkat Etmek Gerekir?

- **Boolean değerlerle çalışırken dikkatli olun:** JavaScript'te `false`,`null`, `undefined`, ve `true` gibi değerler doğrudan render edildiğinde görünmezler ama `0` ve `'' (boş string)` gibi değerler render edilir. Bu, beklenmeyen sonuçlara yol açabilir.

- **Koşullu render yaparken, olası tüm durumları ele aldığınızdan emin olun:** Kullanıcıların karşılaşabileceği her durumu düşünmek ve bunları yönetmek önemlidir.

- **Performansı göz önünde bulundurun:** Gereksiz render işlemlerinden kaçının. Özellikle büyük listeler veya karmaşık UI'lar söz konusu olduğunda, koşullu renderlama performansı etkileyebilir.