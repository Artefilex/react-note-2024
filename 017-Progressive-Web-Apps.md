# Progressive Web Apps

Progressive Web Apps (PWA), modern web API'leri kullanarak geliştirilmiş, kullanıcılarına yerel mobil uygulamalara benzer bir deneyim sunmayı amaçlayan web uygulamalarıdır. Temel amaç, web teknolojileri ile geliştirilmiş uygulamaların performansını, güvenilirliğini ve kullanıcı deneyimini maksimize ederek, kullanıcıların cihazlarına yerel uygulamalar gibi entegre edilmesini ve çalıştırılmasını sağlamaktır.

## Neyi Amaçlar

1. **Yerel Uygulama Deneyimi Sunmak :** PWAlar, kullanıcılara hızlı, güvenilir ve yerel uygulama benzeri bir deneyim sunar. Animasyonlar, geçişler ve gezinme yerel uygulamalardakine benzer şekilde düzgün ve akıcıdır.

2. **Bağımsız Çalışabilirlik :** İnternet bağlantısı zayıf olan veya hiç olmayan durumlarda bile çalışabilen PWAlar, servis çalışanları sayesinde çevrimdışı destek sunar. Bu, uygulamanın daha güvenilir olmasını sağlar.

3. **Kolay Erişim ve Dağıtım :** Kullanıcılar, uygulamayı doğrudan bir web adresi üzerinden erişebilirler. Mağaza onay süreçleri veya mağaza kısıtlamaları olmadan, güncellemeler doğrudan dağıtılabilir.

4. **Hızlı Yükleme ve Performans :** Servis çalışanları, uygulamanın önemli kaynaklarını önbelleğe alarak, tekrar ziyaretlerde hızlı yüklenmesini sağlar. Bu, kullanıcı deneyimini iyileştirir.

## **Nasıl Çevrimdışı Çalışabiliyor ve Arka Planda Güncelleme Yapabiliyor?**

PWA bu özellik için serviceworker denen bir yapı kullanıyor. Service Worker'lar js ile aynı thread'de çalışmadıkları için arka planda çalışıp bir takım işleri halledebiliyorlar. Örneğin, Precaching işlemi ile websitesinin dosyalarını indirip tarayıcı üzerine kaydediyorlar. Bu şekilde uygulama istenirse kısmen de olsa çevrimdışı çalışabiliyor. Gerekli ayarlamaları yaparak precaching içerisine API call isteklerinin verilerini dahi kaydedebiliyorsunuz.

## **Serviceworkers Websitesinin Güncellendiğini Nasıl Anlıyor?**

Aslında bunu sağlayan basit bir mekanizma var ve vite-plugin-pwa bunu otomatik olarak hallediyor. Projede build alındıktan sonra pwa dosyaları oluşturuluyorken sw.js dosyası içerisine build sonucunda oluşan dosyalar ve onların revizyon numaraları liste halinde yazılıyor. Eğer vite-pwa dosyanın yeni olduğunu anlarsa ve precache edilmesi gerekiyorsa revizyon numarası null olarak atanıyor direk tarayıcı tarafında precache ediliyor, fakat dosyanın daha önceden aynı isimde dosya var ise ona rastgele bir revision numarası atıyor. Tarayıcı tarafında ise sw.js dosyası güncelleniyor ve yeni dosyadaki revizyon numarası farklı ise bu dosyalar silinip sunucudan yeni hali alınıyor.

uygulamları genel olarak vite ile geliştirdiğim için burada vite-pwa paketinden bahsettim şimdi nasıl uygulamayı oluşturacağımza bakalım.

## ** PWA oluşturma**

1. **vite-plugin-pwa dahil etme**

```bash
npm i vite-plugin-pwa;
yarn add vite-plugin-pwa
```

2. **index.js hazırlanması**

<a href="https://favicon.io/favicon-converter/">favicon</a> Uygulamanınızın iconunu otomatik çevirmek için kullanın.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <meta name="description" content="English App" />
    <title>English App</title>
    <script>
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("./sw.js")
            .then((reg) => {
              console.log("worger Register");
            })
            .catch((err) => {
              console.log("error in service");
            });
        });
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- **Manifest Dosyası Bağlantısı:**

```html
<link rel="manifest" href="/manifest.webmanifest" />
```

Bu link, web uygulamanızın manifest dosyasına işaret eder. Manifest dosyası, uygulamanızın adı, başlatma ekranında nasıl görüneceği, uygulama ikonları ve daha fazlası gibi bilgileri içerir. Bu dosya sayesinde, uygulamanızın mobil cihazlarda "uygulama gibi" davranmasını sağlayabilirsiniz. Bu, PWA'nın temel bileşenlerinden biridir.

- **Apple Cihazları İçin İkonlar:**

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

Bu link, Apple cihazları tarafından kullanılan bir uygulama ikonunu tanımlar. Kullanıcılar, web uygulamanızı ana ekranlarına eklediklerinde bu ikon kullanılır.

- **Farklı Boyutlardaki Faviconlar:**

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
```

Bu linkler, farklı tarayıcılarda ve sekme boyutlarında görüntülenecek faviconları (sekme ikonları) tanımlar. Kullanıcılar tarayıcı sekmesinde web sitenize girdiklerinde bu ikonlar görüntülenir.

- **Service Worker Kaydı:**

```html
<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js")
        .then((reg) => {
          console.log("Service worker registered");
        })
        .catch((err) => {
          console.log("Service worker registration failed:", err);
        });
    });
  }
</script>
```

Bu script, sayfa yüklendiğinde service worker'ı kaydetmeye yarar. Service worker, uygulamanızın çevrimdışı çalışabilmesini, arka planda veri senkronizasyonunu ve push bildirimlerini sağlayan bir JavaScript dosyasıdır. Bu, PWA'nın önemli bir özelliğidir. 'serviceWorker' in navigator kontrolü, mevcut tarayıcının service worker teknolojisini destekleyip desteklemediğini kontrol eder.

3. **Vite PWA Plugin Konfigürasyonu:**

Bu konfigürasyon, bir React uygulamasını bir Progressive Web App'e (PWA) dönüştürmek için gerekli ayarları içerir. Bu işlem, uygulamanızın çevrimdışı kullanılabilirliğini artırır, ana ekrana ekleme imkanı sunar ve daha hızlı yükleme süreleri sağlar.

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      start_url: ".",
      manifest: {
        name: "English Time",
        short_name: "Daily English",
        description: "Every Day New word",
        theme_color: "#171717",
        background_color: "#000000",
        display: "standalone",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "masked-icon.svg",
        ],
        orientation: "portrait",
        icons: [
          {
            src: "/assets/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/assets/android-chrome-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/assets/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
```

**registerType: "autoUpdate"**
Service worker'ınızın güncelleme stratejisini belirler. autoUpdate ayarı, yeni bir service worker sürümü bulunduğunda otomatik olarak güncellenmesini sağlar.

**start_url: ".""**

Kullanıcı bir PWA'yı ana ekrana eklediğinde uygulamanın başlatılacağı URL'i belirtir. Bu durumda, uygulamanın kök dizinine yönlendirir.

**manifest Ayarları"**

- `name`, `short_name`: Uygulamanızın adı ve kısa adı.

- `description`: Uygulamanızın açıklaması.

- `theme_color`, `background_color`: Uygulamanızın temel ve arka plan rengi.

- `display`: Uygulamanın görüntülenme modu, burada `"standalone"` olarak ayarlanmış ki bu, uygulamanın kendi başına, tarayıcı UI'si olmadan çalıştığını gösterir.

- `orientation`: Uygulamanın yönü, burada `"portrait"` (dikey) olarak ayarlanmış.

- `includeAssets`: Ekstra kaynaklar, örneğin faviconlar ve başlangıç ekranı ikonları.

- `icons`: Uygulamanın farklı boyutlardaki ikonlarını tanımlar. Bu ikonlar, cihazın ana ekranına eklendiğinde kullanılır. purpose alanı, ikonun nasıl kullanılacağını belirtir (örneğin "maskable" ana ekrana eklerken tam ekran bir ikon olarak kullanılabilir).

  **devOptions: { enabled: true }"**
  Geliştirme ortamında PWA özelliklerinin etkinleştirilmesini sağlar. Bu sayede, geliştirme aşamasında PWA özelliklerini test edebilirsiniz.

4. **sw.js**

sw.js dosyası, bir Service Worker dosyasıdır ve Progressive Web Apps (PWA) için çok önemlidir. Service Worker, web uygulamanızın arka planında çalışan bir scripttir ve aşağıdaki önemli işlevlere sahiptir

- **Çevrimdışı Desteği**
  Service Worker, belirli kaynakları önbelleğe alarak kullanıcıların çevrimdışıyken bile uygulamanızı kullanabilmesini sağlar. Bu, kullanıcı deneyimini önemli ölçüde artırır, çünkü ağ bağlantısı olmadan dahi içeriklere erişilebilir.

- **Ağ İsteklerini Yönetme**
  Tüm ağ istekleri Service Worker üzerinden geçer. Bu, istekleri yakalayıp özelleştirebileceğiniz veya istekleri önbellekten karşılayabileceğiniz anlamına gelir. Bu özellik, uygulamanın performansını artırabilir.

- **Arka Plan Senkronizasyonu**
  Kullanıcı çevrimdışıyken gerçekleşen işlemleri, çevrimiçi olunduğunda sunucuyla senkronize edebilir.

- **Push Bildirimleri**
  Service Worker, sunucudan gelen push bildirimlerini uygulamanıza iletmek için kullanılabilir. Bu, kullanıcı etkileşimini artırmak için güçlü bir yoldur.

```js
const CACHE_NAME = "version-1";
const urlsToCachce = ["index.html", "offline.html"];

/* Install =>  Service Worker yüklenirken, belirtilen kaynakları (index.html ve offline.html) önbelleğe alır. Bu, uygulamanın temel parçalarının çevrimdışı kullanılabilirliğini sağlar.*/

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("open cache");
      return cache.addAll(urlsToCachce);
    })
  );
});

/* Fetch => Uygulamanın yaptığı her ağ isteği için çalışır. İlk olarak, önbellekte bir eşleşme arar. Eğer istenen kaynak önbellekte varsa, bu kaynak döndürülür; aksi takdirde, kaynak ağ üzerinden çekilmeye çalışılır. Ağ isteği başarısız olursa (örneğin, kullanıcı çevrimdışıyken), offline.html sayfası döndürülür. */

this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

/*Activate => Service Worker aktifleştiğinde eski önbellekleri temizler. Bu, uygulamanın güncel kalmasını sağlamak için önemlidir.  */

this.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
```

vite-plugin-pwa genellikle kendi Service Worker'ını oluşturur ve yönetir, bu nedenle sizin manuel olarak bir sw.js dosyası oluşturmanız genellikle gerekmez. Ancak, özel davranışlar eklemek isterseniz, kendi Service Worker dosyanızı oluşturup entegre etmeniz mümkündür.
