# React'a Anahtar Kavramlar

**Component (Bileşen):** React, kullanıcı arayüzlerini bağımsız, yeniden kullanılabilir parçalar olan bileşenler halinde oluşturmayı sağlar. Her bileşen kendi mantığına ve görünümüne sahiptir.

**JSX (JavaScript XML):** React bileşenlerinin yapısını tanımlamak için kullanılan bir sözdizimidir. HTML'e benzer, ancak JavaScript ile doğrudan entegre edilebilir.

**Props (Özellikler):** Bileşenlere veri aktarımı için kullanılır. Ebeveyn bileşenlerden çocuk bileşenlere veri aktarmak için props kullanılır.

**State (Durum):** Bir bileşenin durumunu yönetmek için kullanılır. Bileşenin yaşam döngüsü boyunca değişebilen veriler state ile yönetilir.

**Hooks:** React 16.8 sürümüyle tanıtılan, fonksiyonel bileşenlerde durum yönetimi ve yan etkileri (side effects) kullanmayı sağlayan fonksiyonlardır. useState, useEffect, useContext gibi hooklar en yaygın kullanılanlardır.

**Context API:** Bileşen hiyerarşisi boyunca veri iletimini kolaylaştırmak için kullanılır. Global verilerin (tema, dil gibi) uygulama genelinde kolayca paylaşılmasını sağlar.

**Lifecycle Methods (Yaşam Döngüsü Metotları):** Sınıf bileşenlerinde kullanılır. Bileşenin oluşturulması, güncellenmesi ve yok edilmesi gibi farklı aşamalarda tetiklenen metodlardır.

**Virtual DOM:** React, gerçek DOM ile etkileşimi en aza indirmek için sanal bir DOM kullanır. Bileşenlerdeki değişiklikler önce sanal DOM'da yapılır, ardından gerçek DOM ile sanal DOM arasındaki farklar hesaplanır ve sadece gerçekten değişen kısımlar güncellenir.

**Fragments:** Birden fazla bileşeni gruplamak için kullanılır, ancak DOM'a ekstra düğümler eklemek yerine çocuklarını doğrudan döndürür.

**Higher-Order Components (HOC):** Bir bileşeni alıp, yeni bir bileşen döndüren bir fonksiyondur. Bileşenler arası kod yeniden kullanımı için kullanılır.

**React Router:** Tek sayfa uygulamalarında (SPA) yönlendirme işlemlerini kolaylaştıran bir kütüphanedir.

**Redux:** Uygulama genelinde durum yönetimi için kullanılan, özellikle büyük ve karmaşık uygulamalar için popüler bir kütüphanedir. React ile birlikte kullanılabilir ancak React'a özgü değildir.