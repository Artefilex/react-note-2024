# React Routing Nedir ?

Bildiğiniz üzere, pure JavaScript ile routing yaparken, bu işlem HTML tarafında gerçekleştirilir ve genellikle `<a>` etiketi ile birlikte bir HTML dosyasına yönlendirme yapılırdı:

```html
<a href="./home.html"></a>
```

Ancak, Single Page Applications (SPA) hayatımıza girdikten sonra routing'e olan yaklaşımımız değişti. Artık, tek bir HTML üzerine kurguladığımız JavaScript ile birlikte sayfamızın UI'ını değiştiriyoruz. Tam bu noktada, bir routing (yönlendirme) ihtiyacımız ortaya çıktı. Bu ihtiyacı karşılamak için, 3. parti bir kütüphane olan react-router-dom'a ihtiyaç duyduk.

React'te routing, uygulamanın farklı bölümleri arasında geçişi yönetmek için kullanılır. Tek bir HTML sayfası üzerinde, JavaScript kullanılarak dinamik olarak içerik değiştirilir ve bu sayede kullanıcıya farklı sayfaların görüntülendiği hissi verilir. Bu işlem, sayfa yenilenmesine gerek kalmadan ve uygulamanın durumunu koruyarak gerçekleştirilir. React Router, bu dinamik içerik değişimini kolaylaştıran bir kütüphanedir.

## React Router Dom

React Router DOM, React tabanlı uygulamalarda sayfalar arası gezinmeyi yönetmek için kullanılan popüler bir 3. parti kütüphanedir. Kullanıcıların, uygulamanın ana URL'sinden ("/") başlayarak, belirlenen path'ler aracılığıyla farklı sayfa veya bileşenlere yönlendirilmesine imkan tanır. Bu sayede, Single Page Applications (SPA) içerisinde sorunsuz bir kullanıcı deneyimi sağlanırken, sayfa yenilenmelerine gerek kalmadan dinamik içerik sunumu yapılır.

**1. react-router-dom projeye ekleme**

```bash
npm install react-router-dom ;
yarn add react-router-dom
```

**2. Geliştirme ortamının hazırlanması**

Paketi projenize ekledikten sonra, ana bileşeninizde (App.js veya ana bileşeninizin adı neyse) `react-router-dom` paketinden `BrowserRouter`'ı içe aktararak bir `Router` bileşeni oluşturmanız gerekir. Bu Router bileşeni, uygulamanızın navigasyon mantığını sarmalayacak ve rotalarınızı tanımlamanıza olanak tanıyacaktır.

`BrowserRouter` React Router DOM kütüphanesinin bir parçasıdır ve modern web uygulamalarında client-side routing için kullanılan bir bileşendir .

**`BrowserRouter`**, modern tarayıcıların sunduğu HTML5 History API'yi kullanır. Bu sayede, URL değişikliklerini takip edebilir ve uygulamanın URL'si değiştiğinde belirli bileşenleri render edebilir, ancak sayfayı yeniden yüklemek zorunda kalmaz.

**`Dinamik Sayfa Yenilemeleri:`** Kullanıcılar uygulama içinde gezindikçe, BrowserRouter sayfa yenilemelerine gerek kalmadan dinamik olarak içerik güncellemeleri yapar. Bu, SPA'larda sorunsuz bir kullanıcı deneyimi sunar.

**`PushState ve ReplaceState:`** Gezinme işlemleri sırasında, BrowserRouter tarayıcı geçmişine yeni girişler eklemek için pushState veya mevcut girişi değiştirmek için replaceState metodlarını kullanır.

```jsx
import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        {/* Uygulamanızın diğer bileşenleri ve rotaları burada yer alacak */}
      </Routes>
    </Router>
  );
}
export default App;
```

**3. Temel Kullanım**

React Router'ı projenize entegre ettikten sonra, uygulamanızda gezinme ve yönlendirme işlevselliğini etkin bir şekilde kullanabilmek için bilmemiz gereken birkaç temel kavram bulunmaktadır: `Route`, `Outlet`, `Link` ve `NavLink`.

**`1. Route`**

`Route` bileşeni, belirli bir URL yoluyla eşleştiğinde uygulamanızda hangi bileşenin `render` edileceğini tanımlar. Her Route bileşeni, bir `path` prop'u alır; bu prop, bileşenin hangi yol ile eşleşeceğini belirtir. Eşleşme durumunda Route, belirtilen bileşeni kullanıcıya gösterir.

React Router kullanırken, uygulamanızda tanımladığınız rotaları (Route) yönetmek için `Routes` bileşenini kullanmanız gerekir. `Routes` bileşeni, uygulamanızın farklı yolları (paths) arasında tek bir yerde yönlendirme mantığını gruplamak için kullanılır. Bu yapı, hangi bileşenin hangi URL yolunda render edileceğini belirlemenize olanak tanır. Ayrıca, sayfanın ilk yüklenmesi sırasında gösterilecek bileşen ve kullanıcının mevcut rotalar dışında bir yola gitmeye çalıştığında gösterilecek hata veya "bulunamadı" sayfası gibi durumları yönetmenize yardımcı olur.

- **Anasayfa Component'i :** Sayfanın ilk yüklenmesi sırasında varsayılan olarak gösterilmesi gereken bir bileşen tanımlamak istiyorsanız, o bileşenin Route'unu / path'i ile tanımlamalısınız. Bu, uygulamanızın kök dizinine (/) erişildiğinde gösterilecek olan ana sayfanız olacaktır.

- **Hata veya Bulunamadı Sayfası :** Kullanıcılar, tanımlanmamış bir yola gittiğinde veya manuel olarak mevcut olmayan bir URL girdiğinde gösterilmek üzere bir hata veya "bulunamadı" sayfası tanımlamak istiyorsanız, `*` wildcard path'ini kullanabilirsiniz. `*` path'i, belirlenen rotalar dışındaki herhangi bir URL için eşleşme sağlar ve genellikle uygulamanızda genel bir hata sayfası veya 404 Bulunamadı sayfası göstermek için kullanılır.

```jsx
<Routes>
  <Route path="/" component={HomePage} />
  <Route path="*" component={NotFoundPage} />
  <Route path="/about" component={AboutPage} />
</Routes>
```

**`2. Outlet`**

`Outlet` bileşeni, iç içe (nested) rotalar oluştururken kullanılır. Bir Route bileşeninin render edeceği bileşen içinde Outlet kullanıldığında, o Outlet kısmında çocuk rotaların bileşenleri render edilir. Bu, uygulamanızın yapısını modüler bir şekilde organize etmenize olanak tanır.

```jsx
function Layout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* Çocuk rotalar burada render edilir */}
      <Footer />
    </div>
  );
}
```

**`3. Link`**

`Link` bileşeni, uygulama içindeki farklı yollara (path) yönlendirme yapmanızı sağlar. `<a>` HTML etiketi gibi davranır, ancak sayfa yeniden yüklenmesine neden olmadan, client-side routing kullanarak adresi değiştirir.

```jsx
<Link to="/about">Hakkımızda</Link>
```

**`4. NavLink`**

`NavLink` bileşeni, `Link` bileşeninin özel bir halidir ve genellikle navigasyon bağlantıları için kullanılır. `NavLink`, aktif olduğunda (yani navigasyonun gösterdiği adresle eşleştiğinde) ekstra stil veya işaretlemeler eklemek için kullanışlıdır.

```jsx
<NavLink to="/about" activeClassName="active">
  Hakkımızda
</NavLink>
```

## Dinamik Routing Nedir ve Neden Kullanılır

React Router ile dinamik routing , genellikle uygulamanızda dinamik verilere sahip sayfalara erişim sağlamak için kullanılır. Bu, özellikle e-ticaret siteleri, bloglar veya herhangi bir içerik yönetim sistemi gibi, kullanıcı etkileşimine bağlı olarak değişken içerik sunan uygulamalar için önemlidir. Dinamik routing, belirli bir yapıyı takip eden URL'ler üzerinden farklı verilere erişilmesini sağlar, böylece tek bir bileşen, farklı veri setleri ile yeniden kullanılabilir.

Dinamik routing, URL'de yer alan değişken bir parametreye (örneğin bir ürün ID'si veya bir kategori adı) göre içerik sunan sayfalar için kullanılır. Bu yaklaşım, her bir ürün veya kategori için ayrı bir sayfa oluşturma ihtiyacını ortadan kaldırır. Bunun yerine, bir şablon olarak düşünebileceğiniz tek bir bileşen üzerinden, URL'den alınan parametreye bağlı olarak farklı veriler gösterilir.

**`1. Nasıl oluşturulur`**

Öncelikle bir adet mock data oluşturalım böylelikle sanki bir API'ye istek atıyormuş gibi davranalım

```js
export const productData = [
  { id: 1, title: "title 1", url: "url1", description: "1. açıklama" },
  { id: 2, title: "title 2", url: "url2", description: "2. açıklama" },
  { id: 3, title: "title 3", url: "url3", description: "3. açıklama" },
  { id: 4, title: "title 4", url: "url4", description: "4. açıklama" },
];
```

Dinamik bir route oluşturmak için `:` işaretini kullanırız. Bu örnekte ise `products` URL altında dinamik bir routing kullanacağımızı belirttik . Bunun dinamik bir route olduğunu belirtmemiz için ise bir `productId` isimlendirmesini yaptık. artık `ProductDetail` altında productData altındaki verilere dinamik olarak erişebiliriz.

```jsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/products/ProductPage";
import ProductDetail from "./pages/products/ProductDetail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/products" Component={ProductPage} />
        <Route path="/products/:productId" Component={ProductDetail} />
      </Routes>
    </Router>
  );
}

export default App;
```

```jsx
// ProductPage
import { Link } from "react-router-dom";
import { productData } from "../../mock/ProductsData";
function ProductPage() {
  return (
    <div>
      {productData.map((product) => (
        <Link key={product.id} to={`/products/${product.url}`}>
          {" "}
          {product.title}{" "}
        </Link>
      ))}
    </div>
  );
}

export default ProductPage;
```

Burada kullandığımız `` to={`/products/${product.url} `` ifadesi ile beraber artık products url arltında datadan gelen urle göre bir özelleştirme yaptık böylelikle dinamik şekilde urller oluşturduk.

**`2. Nasıl erişim sağlanır`**

Şimdi bu noktada dinamik route tanımlamamızı yaptık, Artık yapmamız gereken React Router Dom altından gelen useParam hookunu kullanarak bu productId pathine erişim sağlamak olacak. daha sonra bu pathe bağlı olarak oluşturduğumuz şablondaki verileri useEffect ile beraber her `productId` değişmesinde güncellemiş olacağız.

```jsx
// ProductDetail

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../../mock/ProductsData";
function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const detailData = productData.find(
      (singelProduct) => singelProduct.url === productId
    );
    setProduct(detailData);

    console.log(productId);
  }, [productId]);

  console.log(product);
  return <div>{product.description}</div>;
}

export default ProductDetail;
```

Yukarıdaki örnekte, öncelikle mock bir data seti oluşturduk ve bu data seti üzerinden dinamik URL'ler ile ürün detay sayfalarına erişim sağladık. ProductPage bileşeninde, ürünlerin bir listesi gösterdik ve her bir ürün için dinamik bir şekilde oluşturulan URL'lere link verdik. Kullanıcı bu linklere tıkladığında, ProductDetail bileşenine yönlendiridik ve burada useParams hook'u kullanılarak URL'den alınan productId parametresine göre ilgili ürünün detayları gösterdik.

Bu yaklaşım, her bir ürün için ayrı sayfalar oluşturma ihtiyacını ortadan kaldırır ve tek bir şablon üzerinden, URL parametresine bağlı olarak farklı içeriklerin sunulmasına olanak tanır. Dinamik rotalama, modern web uygulamalarında esnek ve etkili bir içerik yönetimi sağlar.
