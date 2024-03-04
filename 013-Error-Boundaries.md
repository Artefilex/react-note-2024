# Error Boundaries

React uygulama geliştirirken, çoğu zaman hatalarla karşılaşırız. Bu zorlu yolculukta, React bazen bir hatayla karşılaştığında kullanıcı arayüzünü (UI) tamamen ortadan kaldırır, bize beyaz bir ekran ve hatayı gösterir. Bu tür durumlarda, sadece ilgili bileşen için hata mesajı göstermek, boş bir beyaz sayfa göstermekten her zaman daha iyidir. İşte bu noktada Error Boundaries devreye girer.

Error Boundaries, React bileşen ağacındaki hataları yakalayıp bu hataları yönetmemize ve kullanıcı deneyimini iyileştirmemize olanak tanıyan özel bileşenlerdir. Bir Error Boundary bileşeni oluşturmak için aşağıdakilere ihtiyacımız vardır:

- Class based (sınıf tabanlı) bir component

- static olarak tanımlanmış getDerivedStateFromError() metodu

- İsteğe göre componentDidCatch() lifecycle metodu

- Hatayı tutabileceğimiz bir state

Aşağıda, temel bir Error Boundary bileşeni örneği verilmiştir:

```jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // Başlangıç durumunda hata olmadığını belirtiyoruz
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Bileşen ağacında bir hata meydana geldiğinde, 'hasError' durumunu güncelleyerek
    // bir sonraki render'da alternatif bir UI göstermeyi sağlarız.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Eğer bir hata yakalanırsa, alternatif bir UI göster
      return (
        <div>
          Maalesef bir hata oluştu.
          {this.state.hasError.message}
        </div>
      );
    }

    // Hata yoksa, bileşenin çocuklarını normal olarak render et
    return this.props.children;
  }
}

export default ErrorBoundary;
```

ErrorBoundary component'ımızı oluşturduk şimdi de bu component'ı kullanalım.

```jsx
<ErrorBoundary>
  <PostList />
</ErrorBoundary>
```

Artık PostList component ve o component'ın alt component'larında herhangi bir sorun olduğunda ErrorBoundary component'ımız çalışacak ve kullancıya boş hatalı bir sayfa göstermek yerine belirlediğimiz hata mesajını gösterecebileceğiz.

## **Nerelerde Kullanılmalı?**

Error Boundaries, özellikle uygulamanın farklı bölümlerini izole edebileceğiniz ve potansiyel olarak hatalı olabilecek bileşenleri sarmalayabileceğiniz yerlerde işinize yarar:

- **Üçüncü Taraf Bileşenleri:** Güvenilir olmayan veya hatalı olma ihtimali olan üçüncü taraf bileşenlerini sarmalamak için kullanılabilir.

- **UI Bölümleri :** Uygulamanın önemli olmayan, ancak hata potansiyeli taşıyan bölümlerini (örneğin, bir yorum listesi, reklam bileşeni gibi) sarmalamak için kullanılabilir. Bu sayede, bu bölümlerde bir hata oluşsa bile uygulamanın geri kalanı etkilenmez.

- **Widget ve Modüller :** Uygulamanızın modüler bölümleri veya widget'ları gibi, izole edilmiş çalışan kısımlar için idealdir.

## Error **Boundary Kullanılmaması Gereken Durumlar**

- **Event Handlerlar :** Error Boundary'ler yalnızca render sırasında, yaşam döngüsü metotlarında ve constructor içinde meydana gelen hataları yakalar. Event handlerlardaki hataları yakalamaz.

- **Asenkron Kod :** Error Boundary'ler, useEffect gibi React hooklarında veya asenkron fonksiyonlarda oluşan hataları yakalayamaz.

- **Sunucu Tarafı Renderlama (SSR) :** Error Boundary'ler, sunucu tarafı renderlama sırasında hataları yakalayamaz, çünkü SSR sırasında React'ın yaşam döngüsü metotları farklı çalışır.

- **Kendi Kendini Düzeltme Mekanizmaları :** Uygulamanın hata durumlarını kendi kendine düzeltebileceği senaryolar. Örneğin, bir ağ hatası sonrası otomatik yeniden deneme mekanizmaları.



<a href="https://blog.logrocket.com/react-error-handling-with-react-error-boundary/"> Detaylı yazı için </a>
<a href="https://www.youtube.com/watch?v=az7XWIF1aiY"> Türkçe kaynak </a>
