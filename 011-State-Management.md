# Genel Bakış 

React uygulamalarında, bazen bir state'i farklı bileşenler arasında paylaşmak ve yönetmek gerekebilir. Özellikle büyük ve karmaşık uygulamalarda, state yönetimi önemli bir konudur. React'te bir state, doğrudan sadece üst bileşenden alt bileşenlere props olarak geçirilebilir. Bu durum, "prop drilling" olarak bilinen, derin bileşen hiyerarşilerinde state'i aktarmanın zor ve karmaşık hale gelmesine neden olabilir. Bu sorunu çözmek ve uygulama içindeki state yönetimini kolaylaştırmak için çeşitli state yönetim kütüphaneleri ve yaklaşımları kullanırız. Bu kütüphanelere bakmadan önce hangi durumlarda kullandığımıza bakalım.

## Ne Tür Veriler kullanırız

State yönetim sistemleri, uygulamanızın çeşitli bileşenleri arasında veri akışını yönetmek ve durumu (state) merkezi bir konumdan yönetmek için kullanılır. Bu sistemler, uygulamanızın daha öngörülebilir, yönetilebilir ve bakımı kolay hale gelmesine yardımcı olur. Ancak her türlü veriyi state yönetim sistemine taşımak yerine, hangi verilerin bu şekilde yönetilmesi gerektiğine akıllıca karar vermek önemlidir.

1. **Kullanıcı Oturum Bilgileri**

Kullanıcının oturum açma durumu, kullanıcı adı, yetkilendirme token'ları gibi bilgiler uygulamanın birçok yerinde erişilebilir olmalıdır. Bu tür bilgileri merkezi bir yerde tutmak, uygulamanın yetkilendirme durumunu yönetmeyi ve kullanıcıya özel içerik sunmayı kolaylaştırır.

2. **Uygulama Genelinde Paylaşılan Veriler**

Farklı bileşenler veya sayfalar arasında paylaşılması gereken veriler (örneğin, kullanıcı profili bilgileri, yapılandırma ayarları, temalar vb.) state yönetim sistemi aracılığıyla yönetilmelidir. Bu, veri tutarlılığını korumak ve gereksiz API çağrılarını azaltmak için yararlıdır.

3. **Karmaşık İş Akışları veya Durumlar**

Alışveriş sepeti durumu, çok adımlı form işlemleri gibi karmaşık uygulama durumları, merkezi bir state yönetim sistemi kullanılarak daha iyi yönetilebilir. Bu, uygulamanın farklı bölümleri arasında durumun kolayca senkronize edilmesini sağlar ve iş akışlarının yönetimini kolaylaştırır.

4. **Uygulama İçi Bildirimler ve Uyarılar**

Uygulama genelindeki bildirimler, hata mesajları veya uyarılar gibi kullanıcı arayüzü ile ilgili global durumlar, state yönetim araçlarıyla merkezi bir şekilde yönetilebilir. Bu, bildirimlerin ve mesajların yönetilmesini ve gösterilmesini standartlaştırır.

5. **Gerçek Zamanlı Veriler**

WebSockets veya diğer gerçek zamanlı veri akış mekanizmaları aracılığıyla alınan veriler gibi dinamik ve sürekli güncellenen veriler, state yönetim sistemi üzerinden yönetilebilir. Bu, uygulamanın farklı bölümlerinin gerçek zamanlı veri güncellemelerini kolayca takip etmesini ve yansıtmasını sağlar.

6. **Önbelleğe Alınan Veriler veya Sonuçlar**

API çağrılarının sonuçları gibi tekrar tekrar kullanılması muhtemel veriler, performansı iyileştirmek ve gereksiz ağ trafiğini azaltmak için state yönetim sisteminde önbelleğe alınabilir.

## Popüler State Yönetim Kütüphaneleri

1. **Context API**

React'in kendi çözümü olan Context API, uygulama içindeki verileri global olarak yönetmek için kullanılabilir. Context, bir state'i uygulamanın herhangi bir yerinden erişilebilir hale getirerek, prop drilling sorununu ortadan kaldırır. Context API ile bir context oluşturulur, bir provider ile state geçirilir ve sonrasında bu state'e ihtiyaç duyan bileşenlerde consumer veya useContext hook'u ile bu state kullanılabilir.

2. **Redux**

Redux, React uygulamaları için popüler bir state yönetim kütüphanesidir. Uygulamanın tüm state'ini tek bir global depoda (store) tutar. Böylece, herhangi bir bileşenden state'e erişilebilir ve güncellenebilir. Redux, uygulamanın state yönetimini merkezi ve tutarlı bir şekilde yapmayı sağlar, ancak büyük uygulamalar için daha uygun olup, küçük projelerde fazladan karmaşıklık getirebilir.

3. **MobX**

MobX, başka bir popüler state yönetim kütüphanesidir ve daha az boilerplate kod ile daha sezgisel bir yaklaşım sunar. MobX, uygulama state'ini izlenebilir (observable) veriler olarak yönetir ve bu veriler üzerinde yapılan değişiklikler otomatik olarak ilgili bileşenleri günceller. Bu, geliştiricilere daha az kod yazma ve state değişikliklerini daha kolay yönetme imkanı verir.

[MobX için Detay](./011-State-Managment/Mobx.md)
[Temel Kullanımı](../30%20days%20react/src/pages/Mobx-todoApp/)

<a href="https://github.com/mobxjs/mobx-react"> Kaynak </a>


4. **React Query, SWR**

Veri fetch işlemleri için özel olarak tasarlanmış kütüphaneler olan React Query ve SWR, sunucudan gelen verilerin yönetimi ve caching işlemleri için kullanılır. Bu kütüphaneler, veri fetch etme, caching, senkronizasyon ve güncelleme işlemlerini kolaylaştırarak, uygulamanın performansını ve verimliliğini artırır.

5. **Zustand**

Zustand, React için minimal ve hızlı bir state yönetim kütüphanesidir. Redux'a kıyasla daha az boilerplate kod gerektirir ve state'i hook'lar aracılığıyla yönetmeyi kolaylaştırır. Zustand, küçükten orta ölçekli uygulamalar için uygundur ve kolay kullanımı ile popülerdir.

[Zustand için Detay](./011-State-Managment/Zustand.md)
[Temel Kullanımı](../30%20days%20react/src/store/zustand/zustandStore.js)

6. **Recoil** 

Facebook tarafından geliştirilmiş olan Recoil, büyük ve karmaşık React uygulamalarında durum yönetimini kolaylaştırmak için tasarlanmıştır. Recoil, React'in kendi bağlam (context) ve kancalar (hooks) sistemini kullanarak durumları yönetir, böylece React ekosistemine sorunsuz bir şekilde entegre olur.


[Recoil](./011-State-Managment/Zustand.md)


