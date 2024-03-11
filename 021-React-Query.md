# React-Query

React Query, modern React uygulamalarında veri alışverişi işlemlerini kolaylaştırmak için tasarlanmış bir kütüphanedir. API'dan veri çekme, verileri önbelleğe alma, veri senkronizasyonu ve güncelleme gibi işlemleri çok daha verimli bir şekilde yönetmenizi sağlar. Genellikle veri alışverişi gerektiren uygulamalarda, özellikle de RESTful veya GraphQL API'ler ile çalışırken tercih edilir. React Query, veri yönetimi konusunda Redux veya Context API gibi diğer state yönetim kütüphanelerine alternatif bir çözüm sunar ve bazı durumlarda onlarla birlikte de kullanılabilir.

React Query birkaç temel özellik sunar

1. **Veri Fetching:** API'dan veri çekmek için kullanılır. React Query, fetching işlemlerini otomatik olarak yönetir ve yeniden fetch etme, veri yenileme gibi işlemleri kolaylaştırır.

2. **Caching:** Çekilen verileri önbelleğe alır. Bu sayede aynı veriye tekrar ihtiyaç duyulduğunda, API'ya yeniden istek yapmak yerine, daha hızlı bir şekilde önbellekten yüklenir.

3. **Background Updates:** Uygulama arka planda çalışırken bile verileri güncel tutabilir

4. **Data Synchronization:** Farklı bileşenler arasında veri senkronizasyonunu sağlar.

5. **Automatic Refetching:** Pencere odaklandığında veya ağ bağlantısı tekrar kurulduğunda verileri otomatik olarak yeniden çeker.

## useQuery Dönüş ve Konfigürasyon Parametreleri

useQuery hooku içerisine bir obje alır ve bu objenin ilk paremetresi benzersiz bir sorgu ismine sahip olması için `queryKey` parametresi ve bu veri çekme işlemini gerçekleştirecek `queryFn` fonksiyonudur.

`useQuery` hook'unun dönüş değerleri ve konfigürasyon parametrelerinin ne işe yaradığını kısaca açıklayayım:

```jsx
const {"dönüş Değerleri"} = useQuery({konfigürasyon parametreleri})
```

**Dönüş Değerleri**

- **data:** Sorgudan dönen veriyi temsil eder.

- **dataUpdatedAt:** Verinin son güncellendiği zamanın timestamp'ını temsil eder.

- **error:** Sorgu sırasında oluşan hata nesnesini temsil eder.

- **errorUpdatedAt:** Hatanın son güncellendiği zamanın timestamp'ını temsil eder.

- **failureCount:** Sorgu kaç kez başarısız olduysa o sayıyı temsil eder.

- **failureReason:** Son başarısızlığın nedenini temsil eder.

- **fetchStatus:** Sorgunun fetch durumunu temsil eder (fetching, paused, idle gibi).

- **isError:** Sorgunun hata ile sonuçlanıp sonuçlanmadığını temsil eder (boolean).

- **isFetched:** Sorgunun en az bir kez başarılı bir şekilde tamamlanıp tamamlanmadığını temsil eder (boolean).

- **isFetchedAfterMount:** Bileşen monte edildikten sonra sorgunun tamamlanıp tamamlanmadığını temsil eder (boolean).

- **isFetching:** Sorgunun şu anda çekme işlemi yapılıp yapılmadığını temsil eder (boolean).

- **isInitialLoading:** İlk çekme işleminin yapılıp yapılmadığını temsil eder (boolean).

- **isLoading:** Sorgunun yüklenme durumunda olup olmadığını temsil eder (boolean).

- **isLoadingError:** Yüklenirken bir hata olup olmadığını temsil eder (boolean).

- **isPaused:** Sorgunun duraklatılıp duraklatılmadığını temsil eder (boolean).

- **isPending:** Sorgunun bekleyen bir durumda olup olmadığını temsil eder (boolean).

- **isPlaceholderData:** Geçici veri kullanılıp kullanılmadığını temsil eder (boolean).

- **isRefetchError:** Yeniden çekme işlemi sırasında bir hata olup olmadığını temsil eder (boolean).

- **isRefetching:** Sorgunun yeniden çekme işlemi yapılıp yapılmadığını temsil eder (boolean).

- **isStale:** Verinin eskimiş (stale) olup olmadığını temsil eder (boolean).

- **isSuccess:** Sorgunun başarıyla tamamlanıp tamamlanmadığını temsil eder (boolean).

- **refetch:** Sorguyu manuel olarak yeniden çalıştırmak için kullanılan fonksiyon.

- **status:** Sorgunun durumunu temsil eder (loading, error, success gibi)

**Konfigürasyon Parametreleri**

- **queryKey:** Sorgunun benzersiz anahtarı.

- **queryFn:** Veri çekme işlemini gerçekleştirecek fonksiyon.

- **gcTime:** Garbage collection (çöp toplama) zamanı; önbellekten silinmeden önce geçmesi gereken süre.

- **enabled:** Sorgunun otomatik olarak çalışıp çalışmayacağını belirler (boolean).

- **networkMode:** Sorgunun ağ modunu belirler (always, online, offline).

- **initialData:** Başlangıç verisi olarak kullanılacak değer.

- **initialDataUpdatedAt:** Başlangıç verisinin güncellenme zamanı.

- **meta:** Sorgu meta verisi.

- **notifyOnChangeProps:** Hangi değişikliklerin bileşeni yeniden render etmesi gerektiğini belirler.

- **placeholderData:** Yükleme durumunda gösterilecek geçici veri.

- **queryKeyHashFn:** queryKey'i hash'lemek için kullanılan fonksiyon.

- **refetchInterval:** Belirli aralıklarla otomatik yeniden çekme süresi.

- **refetchIntervalInBackground:** Arka planda yeniden çekme işleminin yapılıp yapılmayacağını belirler.

- **refetchOnMount:** Bileşen her monte edildiğinde sorgunun yeniden çekilip çekilmeyeceği.

- **refetchOnReconnect:** Ağ bağlantısı yeniden kurulduğunda sorgunun yeniden çekilip çekilmeyeceği.

- **refetchOnWindowFocus:** Pencere tekrar odaklandığında sorgunun yeniden çekilip çekilmeyeceği.

- **retry:** Sorgu başarısız olduğunda yeniden deneme sayısı veya yeniden deneme stratejisi.

- **retryOnMount:** Bileşen monte edildiğinde başarısız sorguların yeniden denenip denenmeyeceği.

- **retryDelay:** Yeniden deneme gecikmesi (milisaniye cinsinden veya gecikme hesaplamak için kullanılan bir fonksiyon).

- **select:** Çekilen veriden bir kısmını seçmek için kullanılan fonksiyon.

- **staleTime:** Verinin eskimeden önce geçmesi gereken süre.

- **structuralSharing:** Verinin yapısal paylaşımını etkinleştirip etkinleştirmeme.

- **throwOnError:** Hata durumunda hata fırlatılıp fırlatılmayacağını belirler.

Geliştirme yaparken birçoğunu kullanmayacak olsanızda bilmekte fayda var.

## Uygulama

1.  Kurulum

```bash
 yarn add @tanstack/react-query ;
 npm install @tanstack/react-query
```

2.  Entegrasyon

uygulamamızı başlatırken öncelikle `QueryClient` ile beraber yeni bir client olulturuyoruz daha sonra `QueryClientProvider` ile beraber uygulamayı sarmalıyoruz.

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

3. useQuery

`useQuery` hooku data fetching yaparken kullanılır. `useQuery` hooku ile sadece veri üzerinde okuma yaparız http isteklerinde get request gibi düşünebiliriz.

```jsx
import { useQuery } from "@tanstack/react-query";

function Products() {
  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    return response.json();
  };

  const { data, status, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchInterval: 15000, // her 15 sn bir güncel veriyi çek
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <ul>
      {data.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}
```

3. useMutation

React Query'nin useMutation hook'u, genellikle POST, PUT, PATCH ya da DELETE gibi HTTP istekleri gibi yan etkili işlemleri gerçekleştirmek için kullanılır. useMutation veri eklemek, güncellemek ya da silmek gibi işlemler yaparken bu işlemlerin durumunu yönetmeyi ve yanıtlarını işlemeyi kolaylaştırır. İşlem başarılı olursa veya bir hata oluşursa buna göre bir yanıt döndürür.

useMutation kullanımı temel olarak üç kısma ayrılabilir: Mutasyon fonksiyonunun tanımlanması, useMutation hook'unun bu fonksiyon ile kullanılması ve mutasyonun tetiklenmesi.

- **mutation fonksiyonunun tanımlanması**
  Mutasyon işlemi gerçekleştirecek asenkron fonksiyonunuz. Bu, veritabanına bir kayıt eklemek, bir kaydı güncellemek ya da silmek gibi işlemleri içerebilir.

  ```jsx
  const createItem = async (item) => {
    const response = await fetch("/api/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };
  ```

- **useMutation Hook'unun Kullanımı**

useMutation hook'u, yukarıda tanımladığınız mutasyon fonksiyonunu parametre olarak alır ve bir dizi değer döndürür. Bu değerler arasında mutasyonun sonucunu, durumunu ve mutasyonu tetiklemek için kullanılabilecek bir fonksiyon bulunur.

useMutation tarafından döndürülen mutate fonksiyonu, mutasyon işlemini tetiklemek için kullanılır. Bu fonksiyona, mutasyon fonksiyonunuza iletmek istediğiniz argümanlar verilir.

```jsx
import { useMutation } from '@tanstack/react-query';

const MutationComponent = () => {
 const { mutate, isLoading, isError, error, data, isSuccess } = useMutation(createItem);

 return <button onClick={() => mutate({ name: 'New Item' })}>Add Item</button>
};

```


RTK Query ve React Query, veri çekme işlemleri sırasında otomatik olarak birçok faydalı durum bilgisi ve parametreyi sağlayarak, kullanıcı deneyimini iyileştirmemize yardımcı olur. Bu parametreleri manuel olarak oluşturmak, zaman alıcı ve karmaşık bir süreç olurdu. Bu yüzden, projelere RTK Query veya React Query entegre ederek, bu süreçleri basitleştirebilir ve geliştirme sürecini hızlandırabiliriz.



