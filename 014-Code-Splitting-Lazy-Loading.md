# **Code Splitting ve Lazy Loading**

Kısaca Code splitting, büyük JavaScript dosyalarını daha küçük parçalara ayırma işlemidir. Bu, bir uygulamanın yalnızca ihtiyaç duyulan kodunun yüklendiği anlamına gelir, böylece başlangıç yükleme süresi azalır ve uygulama performansı artar. React uygulamalarında code splitting genellikle dinamik olarak içe aktarılan (dynamic imports) modüller aracılığıyla ve React'ın `React.lazy` ve `<Suspense>` bileşenleriyle yapılır.

## **Code Splitting'i Nerede Kullanmalısınız?**

1. Bir SPA (Tek Sayfa Uygulaması) içinde, farklı rotalar için farklı kod blokları yüklemek, kullanıcı bir rota değişikliği yaptığında sadece gerekli bileşenlerin ve kodların yüklenmesini sağlar. React Router gibi kütüphanelerle entegrasyon kolaydır. Tabi ki bunu küçük projeler yerine büyük bir Route sahip olduğumuz durumlarda gerçekleştirmek daha mantıklıdır.

```jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
        </Switch>
      </Suspense>
    </Router>
  );
}
```

2. Sayfanızda sadece belirli kullanıcı etkileşimleri sonucu (örneğin, bir butona tıklama) render edilen büyük bileşenler varsa, bu bileşenleri ayırarak JavaScript yüklerinizi azaltabilirsiniz. Böylece, kullanıcı bu etkileşimleri gerçekleştirmediği sürece, ilgili JavaScript kodu yüklenmez, bu da genel performansı iyileştirir.

```jsx
import React, { useState, Suspense, lazy } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function MyComponent() {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowHeavyComponent(true)}>
        Büyük Bileşeni Göster
      </button>
      {showHeavyComponent && (
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}
```

3. Belirli bir sayfa veya bileşen içinde yoğun şekilde kullanılan, ancak uygulamanın diğer bölümlerinde ihtiyaç duyulmayan büyük bir üçüncü parti kütüphaneyi yalnızca o bileşen/sayfa yüklendiğinde dinamik olarak yüklemek, başlangıç yükünü azaltabilir ve uygulamanın genel performansını artırabilir. Örneğin, bir grafik kütüphanesi genellikle sadece belirli bir analiz sayfasında gereklidir.

```jsx
import React, { useState, Suspense, lazy } from "react";

// Grafik kütüphanesini lazy import ile dinamik olarak yükle
const Chart = lazy(() => import("some-big-chart-library"));

function AnalyticsComponent() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Grafiği Göster</button>
      {showChart && (
        <Suspense fallback={<div>Grafik yükleniyor...</div>}>
          <Chart />
        </Suspense>
      )}
    </div>
  );
}
```

4. Kullanıcı için kritik olmayan ve hemen görünür olmayan (ekran dışı) bileşenlerinizi de dinamik olarak yüklemeyi düşünün. Örneğin, sayfanın alt kısmında yer alan bir bileşen veya kullanıcının belirli bir eylemi gerçekleştirene kadar görünmeyen içerikler. Bu bileşenleri dinamik olarak yüklemek, başlangıçtaki JavaScript yükünü daha da azaltabilir ve böylece uygulamanızın performansını artırabilir.

```jsx
import React, { lazy, Suspense } from "react";

const FooterComponent = lazy(() => import("./FooterComponent"));

function App() {
  return (
    <div>
      {/* Uygulamanızın diğer içerikleri */}
      <Suspense fallback={<div>Footer yükleniyor...</div>}>
        <FooterComponent />
      </Suspense>
    </div>
  );
}
```

### Kullanım

**Lazy ve Suspense**

React'te, genellikle bir bileşeni doğrudan import ifadesiyle içe aktarırsınız, bu da uygulamanızın başlangıcında o bileşenin hemen yüklenmesi anlamına gelir. Bu, uygulamanın yükleme süresini artırabilir ve kullanıcı deneyimini olumsuz etkileyebilir, özellikle de o bileşen hemen kullanılmıyorsa.

```jsx
import React, { lazy } from "react";

// import AvatarComponent from "./AvatarComponent"
const AvatarComponent = lazy(() => import("./AvatarComponent"));

const DetailsComponent = () => (
  <div>
    <AvatarComponent />
  </div>
);
```

React'in `lazy` fonksiyonu, bir bileşeni yalnızca gerektiğinde, yani "dinamik olarak" yüklemenize olanak tanır. Bu işlem, "code splitting" olarak bilinir ve uygulamanın performansını artırmak için kullanılır. Bir bileşeni `lazy` ile içe aktardığınızda, React o bileşeni yalnızca o bileşenin kullanıldığı bileşen ağacı render edildiğinde yükler.

Ancak, `lazy` ile içe aktarılan bir bileşenin kullanıldığı yerde, React'in bu bileşeni yüklerken biraz zaman alabileceğini ve bu süreçte kullanıcıya bir şeyler göstermek isteyebileceğinizi unutmamalısınız. İşte burada `<Suspense>` bileşeni devreye girer.

```jsx
import React, { lazy, Suspense } from "react";

const AvatarComponent = lazy(() => import("./AvatarComponent"));

const renderLoader = () => <p>Loading</p>;

const DetailsComponent = () => (
  <Suspense fallback={renderLoader()}>
    <AvatarComponent />
  </Suspense>
);
```

`<Suspense>` bileşeni, `lazy` ile yüklenen bileşenlerin yükleme süresince gösterilecek bir "yedek" içeriği `(fallback)` belirlemenize olanak tanır. Genellikle bu, bir yükleme dönüşü (spinner) veya bir "Yükleniyor" mesajı olabilir. Böylece, kullanıcı yüklenme işlemi devam ederken bile hoş bir deneyim yaşar.

## **Code Splitting'i Kullanırken Dikkat Etmeniz Gerekenler**

Code splitting ve lazy yükleme kullanırken dikkat edilmesi gereken bazı önemli noktalar vardır. Bu tekniklerin aşırı veya yanlış kullanımı, beklenenin aksine performans sorunlarına veya kötü kullanıcı deneyimine yol açabilir. İşte dikkat etmeniz gereken bazı hususlar ve yanlış kullanımı nasıl anlayabileceğinizle ilgili ipuçları:

1. **Aşırı Parçalama (Over-Splitting)**

- **Belirti:** Uygulamanızda çok sayıda küçük parça (chunk) oluşturmak, ağ gecikmesi (latency) sorunlarına yol açabilir. Her bir parça için ayrı bir HTTP isteği yapılacağından, çok sayıda küçük dosyanın indirilmesi gerekebilir, bu da özellikle yavaş veya düşük kaliteli ağ bağlantılarında performansı olumsuz etkileyebilir.

- **Çözüm:** İlgili bileşenler ve kütüphaneler arasında dengeli bir bölme yapın. Her bileşen veya modülü ayrı ayrı yüklemek yerine, mantıksal olarak gruplanabilecek bileşenleri bir arada tutmayı düşünün.

2. **Önceliklendirme Yapmamak**

- **Belirti:** Her şeyi dinamik olarak yüklemeye çalışmak, bazen önemli bileşenlerin gereksiz yere geç yüklenmesine neden olabilir.

- **Çözüm:** Uygulamanızın performansını ve kullanıcı deneyimini analiz edin ve hangi bileşenlerin öncelikli olarak yüklenmesi gerektiğine karar verin. Örneğin, ilk yüklemede görüntülenmesi gereken bileşenler statik olarak içe aktarılmalı, diğer bileşenler ise gerektiğinde lazy ile yüklenmelidir.

3. **Kullanıcı Deneyimini Göz Ardı Etmek**

- **Belirti:** Yükleme süreçlerinde kullanıcılara uygun geri bildirimler sağlamamak (örneğin, yükleniyor spinner'ları veya placeholder'lar), kullanıcıların sayfanın "bozuk" olduğunu düşünmesine neden olabilir

- **Çözüm:** Suspense'in fallback prop'unu kullanarak, bileşenler yüklenirken kullanıcıya gösterilecek yer tutucu içerikler sağlayın. Bu, yükleme sürecinin daha şeffaf olmasını ve kullanıcı deneyiminin iyileştirilmesini sağlar.

Code splitting ve lazy loading, doğru kullanıldığında uygulamanızın performansını önemli ölçüde artırabilir. Ancak, bu tekniklerin etkilerini sürekli olarak değerlendirmek ve kullanıcı deneyimini göz önünde bulundurarak dengeli bir yaklaşım benimsemek önemlidir.
