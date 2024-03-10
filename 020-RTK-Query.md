# RTK Query

RTK Query, Redux Toolkit kütüphanesinin bir parçası olarak sunulan, veri alma (fetching), önbelleğe alma (caching), senkronizasyon ve veri yönetimi işlemlerini kolaylaştıran bir araçtır. Redux'un karmaşıklığını azaltmak ve uygulama geliştirme sürecini hızlandırmak amacıyla tasarlanmıştır. RTK Query, özellikle API sorgularıyla çalışırken geliştiricilere büyük kolaylıklar sağlar.

RTK Query'nin önemi ve diğer veri çekme yöntemlerine göre getirdiği yenilikler şu şekildedir:

1. **Entegre Önbelleğe Alma ve Otomatik Yenileme :** RTK Query, veri önbelleğe almayı ve gerektiğinde bu verileri yenilemeyi otomatik olarak yönetir. Bu, uygulamanın performansını artırır ve kullanıcı deneyimini iyileştirir.

2. **Sıfır Konfigürasyon Başlangıcı :** RTK Query, varsayılan ayarlarla çalışacak şekilde tasarlanmıştır, bu da geliştiricilerin hemen kod yazmaya başlamalarını sağlar. İhtiyaca göre yapılandırma seçenekleri sunarak esneklik sağlar.

3. **Otomatik Yeniden Fetching :** Bileşenlerinize bağlı verilerde değişiklik olduğunda, RTK Query otomatik olarak veriyi yeniden çeker, bu da veri tutarlılığını sağlar.

4. **Kod Üretimi :** RTK Query, API endpoints'lerinizi tanımlamanıza olanak tanır ve bunları kullanarak otomatik olarak hook'lar ve diğer yardımcı araçlar üretir. Bu, boilerplate kod miktarını önemli ölçüde azaltır.

5. **Tip Güvenliği :** TypeScript ile tam entegrasyon sağlar, bu sayede uçtan uca tip güvenliği sunar.

RTK Query diğer veri çekme yöntemlerine göre özellikle Redux kullanılan projelerde avantaj sağlar. Ancak, her kullanım durumu için ideal olmayabilir.

- **Redux Kullanılan Projeler :** RTK Query, özellikle Redux ile yapılandırılmış uygulamalar için tasarlanmıştır. Redux'un sunduğu avantajlardan yararlanmak isteyen projelerde tercih edilir.

- **Kompleks Durum Yönetimi Gereksinimleri :** Uygulamanız kompleks durum yönetimi senaryolarına sahipse ve API sorguları arasında tutarlılık sağlamak önemliyse, RTK Query iyi bir seçim olabilir.

- **Önbelleğe Alma ve Veri Senkronizasyonu İhtiyacı :** Verilerinizin önbelleğe alınmasını ve farklı kullanıcı etkileşimleri veya zaman aralıkları üzerinden senkronize edilmesini gerektiren durumlarda RTK Query, bu ihtiyaçları doğrudan destekler.

Diğer taraftan, eğer uygulamanız basit API çağrılarından ibaretse ve özel bir durum yönetimi kütüphanesi kullanmıyorsanız, RTK Query yerine yerleşik fetch API'si veya axios gibi daha hafif bir HTTP istemcisi yeterli olabilir.

## Kullanım

1. Kurulum

```bash
yarn add @reduxjs/toolkit react-redux
```

2. API oluşturma

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
    }),
    getProduct: builder.query({
      query: (product) => `products/search?q=${product}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;
```

RTK Query ile bir api isteği oluşturmak için basit düzeyde iki fonksiyona ihtiyaç duyarız bunlar `createApi` ve `fetchBaseQuery` adım adım bakacak olursak eğer.

1. **createApi Fonksiyonu:** RTK Query'de bir API servisi oluşturmak için kullanılır. Bu servis, belirli bir API'ye yapılan sorguları tanımlar ve yönetir.

2. **reducerPath:** Oluşturulan API servisinin Redux store'da hangi yol altında saklanacağını belirler.

3. **baseQuery:** API sorgularının yapılacağı temel URL'yi ve diğer ayarları tanımlar.

4. **endpoints:** API'nin son noktalarını (endpoints) tanımlar. Bu fonksiyon, her bir endpoint için sorgu tanımlamalarını içeren bir nesne döndürür.

5. **Hook'ların Dışa Aktarılması:** createApi tarafından oluşturulan her bir endpoint için, RTK Query otomatik olarak React hook'ları üretir. Bu örnekte, useGetAllProductsQuery ve useGetProductQuery hook'ları dışa aktarılır. Bu hook'lar, React bileşenlerinde ilgili API sorgularını çalıştırmak ve sorgu sonuçlarını yönetmek için kullanılır.

RTK Query ile oluşturduğumuz sorguları Reacta iletebilmek bir provider'a ihtiyaç duyarız. Bunu ya `ApiProvider` ile yaparız ya da bir store oluşturarak normal bir şekilde dışarıya aktarırız iki yöntemede bakacak olursak eğer.

```jsx
// ApiProvider yöntemiyle
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { productsApi } from "./featuers/apiCallsRtk.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ApiProvider api={productsApi}>
    <App />
  </ApiProvider>
);
```

Eğer ApiProvider kullanıyorsak `api` propsuna ilgili js dosyamızı ekliyoruz ve kullanılacağı zaman erişilmiş oluyor . Provide kullanacak olursak şu şekilde bir tanımlama yapmamız lazım

```js
// store.js

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../featuers/apiCallsRtk";
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);
```

```js
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

1. **İçe Aktarmalar:** İlk olarak, Redux Toolkit'ten (`@reduxjs/toolkit`) `configureStore` ve `setupListeners` fonksiyonlarını, ayrıca önceden tanımlanmış olan productsApi'yi içe aktarıyoruz. productsApi, RTK Query kullanılarak oluşturulmuş, ürünlerle ilgili API sorgularını barındıran bir yapıdır.

2. **Store Yapılandırma:**

- `configureStore` fonksiyonu ile Redux store'u yapılandırıyoruz. Bu fonksiyon, uygulamanın durum yönetimi için merkezi bir depo oluşturur.

- `reducer:` Bu yapılandırmada, reducer nesnesi `productsApi.reducerPath`'i anahtar olarak kullanır ve değeri olarak `productsApi.reducer'`ı atar. Bu, RTK Query tarafından oluşturulan reducer'ın, Redux store'unun bir parçası haline gelmesini sağlar. `reducerPath`, store içindeki bu reducer için benzersiz bir isim sağlar.

- `middleware:` `getDefaultMiddleware` fonksiyonu, Redux Toolkit tarafından sağlanan varsayılan ara yazılımları (middleware) döndürür. Bu ara yazılımlar, Redux store'u ile ilgili çeşitli işlevselliği sağlar. `concat(productsApi.middleware)` ifadesi ile, `productsApi` tarafından sağlanan middleware, varsayılan middleware listesine eklenir. Bu, RTK Query tarafından sağlanan otomatik yeniden fetching, önbelleğe alma ve diğer özelliklerin etkinleştirilmesini sağlar.

3. **Dinleyicilerin Kurulumu:**

- `setupListeners(store.dispatch)` ifadesi, store'daki herhangi bir değişikliği dinleyen ve RTK Query'in otomatik yeniden fetching gibi özelliklerini etkinleştiren dinleyicileri kurar. `store.dispatch` fonksiyonunu argüman olarak alır.

Provider ile dışa aktarım yaparken aslında redux'ın sağladığı state managment ile beraber kullandığınıza dikkat edin . sadece api isteklerinizi yönetecekseniz ApiProvider sizin için daha kullanışlı olacaktır.