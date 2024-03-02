# Memoization Nedir?

Memoization, hesaplama maliyeti yüksek olan fonksiyonların sonuçlarını önbelleğe alarak (saklayarak/kaydederek) programın performansını artıran bir optimizasyon tekniğidir. Bir fonksiyon ilk kez çağrıldığında, sonuç hesaplanır ve bir önbelleğe (genellikle bir sözlük veya hash tablosu şeklinde) kaydedilir. Bu fonksiyon aynı argümanlarla tekrar çağrıldığında, fonksiyonun hesaplama yapması gerekmez; bunun yerine sonuç doğrudan önbellekten alınır ve döndürülür. Bu, özellikle maliyetli hesaplama işlemlerinin tekrar tekrar yapıldığı durumlarda büyük bir performans kazancı sağlar.

React'a memoization için üç temel yöntem kullanırız bunlar `React.memo`, `useMemo` ve `useCallback` detaylıca her bir hook'a bakalım. ve sonra ne gibi sorunlar doğuracak bunu tartışalım .

## React.memo

React.memo bir Higher Order Component (HOC) olup, fonksiyon bileşenlerinin yalnızca props değiştiğinde yeniden render edilmesini sağlar. Bu, özellikle sık render edilen veya ağır hesaplama işlemleri içeren bileşenler için performansı iyileştirebilir.

```jsx
const myComponent = React.memo((props) => {
  /* render using props */
});

export default myComponent;
```

**Ne Zaman Kullanmalı**

Temel amacı kullanıldığı component'de gereksiz renderden kurtarmak olsa da her aklınıza estiği yerde kulanamazsınız. Bunun sebebi memoization hooklarınıı kullanırken her bir hookun da kendince bir maliyeti olmasından kaynaklanmaktadır. Yani performans optimizasyonu saglamaya çalışırken performans kaybına yol açabilirsiz.

Bir bileşeni ne zaman ve nerede memoize edeceğinizi bilmek önemlidir, aksi takdirde amacını yerine getirmez. Örneğin, React Memo, bileşeninizin durumu veya bağlamında bir değişiklik olmadığında gereksiz yeniden renderlamaları önlemek için kullanılır. Eğer bileşeninizin durumu ve içeriği HER ZAMAN değişecekse, React Memo işe yaramaz hale gelir. İşte diğer bazı noktalar:

- Bileşeniniz sık sık render edilecekse React Memo kullanın. Bu, özellikle liste veya tablo gibi yapıları render eden bileşenlerde etkilidir.

- Bileşeniniz genellikle aynı prop'larla render ediliyorsa kullanın. Bu, ebeveyn bileşeni render edildiğinde aynı prop'larla yeniden render edilmeye zorlanan çocuk bileşenlerde sıkça yaşanır.

- Yalnızca saf fonksiyonel bileşenlerde kullanın. Eğer sınıf bileşeni kullanıyorsanız, React.PureComponent kullanın.

- Bileşeniniz yeterince büyükse (makul miktarda UI elementi içeriyorsa) prop'lar eşitliğini kontrol etmek için kullanın.

```jsx
const ListItem = React.memo(function ListItem({ item }) {
  // Bu bileşen sadece `item` prop'u değiştiğinde yeniden render edilir.
  console.log("Rendering:", item.text);
  return <div>{item.text}</div>;
});

function ItemList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
```

## useMemo

Bir fonksiyonun sık sık tekrar render edilmesini veya her bir bileşen güncellendiğinde yoğun hesaplamalar yapmasını düşünün. Bu durum uygulamanın performansını düşürebilir. useMemo kullanarak, maliyetli bir hesaplamanın sonucunun depolanmasını ve sadece gerekli olduğunda tekrar hesaplanmasını sağlayabilirsiniz.

```jsx
const memoizedValue = useMemo(() => expensiveFunction(a, b), [a, b]);
```

yukardaki kullanıma baktığımızda useMemo hooku tıpkı useEffect hook'u gibi davranır bir bağımlılık arrayi vardır ve expensiveFunction'u a ve b parametrelerine bağlı olarak yeniden hesaplar.

Bunu bir örnekle anlatmak gerekirse eğer varsayalım ki içinde birçok kitabı barındıran bir datamız var ve bu veri üzerinden bir sorgu çalıştıracağız

```jsx

function App() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState(['Harry Potter', 'Lord of the Rings', 'Hobbit', 'Percy Jackson' , ...]);
   // books arrayini bir milyon veri barındırdığını düşünün
    const filteredBooks = useMemo(() =>
        books.filter(book => book.toLowerCase().includes(query.toLowerCase())),
        [books, query]
    );

    return (
        <div>
            <input
                type="text"
                value={query}
                placeholder="Bir kitap ara..."
                onChange={e => setQuery(e.target.value)}
            />
            <ul>
                {filteredBooks.map(book => (
                    <li key={book}>{book}</li>
                ))}
            </ul>
        </div>
    );
}

```

normal bir senaryoda useMemo kullanmadan yapsaydık bunu sayda her render edildiğinde , yeni bir kitap atandığında inputa bir değer girildiğind sürekli yeniden hesaplanıp performans kaybına yol açacaktı Ancak useMemo hooku'nu kullanarak optimize ettik.

**useMemo ile Yapılan Yaygın Hatalar**

**Aşırı kullanım**: Her bir değerin veya fonksiyonun bileşende hatırlanması gerekmez. useMemo'yu sadece gerektiğinde kullanın, çünkü gereksiz karmaşıklık ve iş yükü ekleyebilir.

**Bağımlılıkları unutmak:** Her zaman useMemo geri çağrısı içinde kullanılan her değerin bağımlılık dizisinde listelendiğinden emin olun. Bağımlılıkları atlamak, eski değerlere ve zor hata ayıklama sorunlarına yol açabilir.

**useMemo Ne Zaman Kullanılır?**

- Ağır hesaplamalarla uğraşıyorsanız.

- Aynı hesaplama birden çok kez tekrarlanır ve aynı girişler için aynı sonucu döndürüyorsa.

- Büyük listeleri veya veri tablolarını render ediyorsanız ve gereksiz tekrar render önlemek istiyorsanız.

**Furkan Türkyılmaz*

## useCallback 

useMemo nun aksine aldığı işlevin sonucunu saklamak yerine işlevin kendisini saklar. deps olarak verilen değerleri değişmediği sürece de sakladığı işlevi döndürür.

aslında bunu en iyi anlayacağın bir video bırakıyorum buraya

<a href="https://www.youtube.com/watch?v=MxIPQZ64x0I">useCallback Video </a>

```jsx

const memoizedCallback = useCallback( () =>{
    doSomething(a , b)
}, [a,b])

```

## Sonuç

Performans optimizasyonu, uygulamanızın gereksinimlerine ve karşılaştığınız sorunlara bağlı olarak değişir. React.memo ve diğer memoization tekniklerini doğru yerde ve doğru zamanda kullanmak, gereksiz yeniden render'ları azaltarak uygulamanızın performansını iyileştirebilir. Ancak, her bileşeni otomatik olarak memoize etmek genellikle gereksizdir ve bazen performansı olumsuz etkileyebilir. Performansı dikkatlice izlemek ve optimizasyonları ihtiyaç duyulan yerlere uygulamak önemlidir.

**Performansı Değerlendirme**

**React Developer** Tools, bileşenlerinizin render süreçlerini ve performansını izlemenize olanak tanır. Bu araçla, gereksiz render'ların hangi bileşenlerde gerçekleştiğini görebilir ve memoization tekniklerinin etkisini değerlendirebilirsiniz.

- **Components** sekmesinde, her bileşenin ne kadar sürede render edildiğini görebilirsiniz.

- **Profiler** sekmesi, uygulamanızın render süreçlerini kaydederek, hangi bileşenlerin en çok yeniden render edildiğini ve performans darboğazlarını ortaya çıkarabilir.

**Performans Profili Oluşturma**
Uygulamanızı geliştirme modunda çalıştırırken, Profiler sekmesini kullanarak bir performans profili oluşturun. Uygulamanızın farklı bölümlerini gezin ve hangi bileşenlerin gereksiz yere yeniden render edildiğini analiz edin.
