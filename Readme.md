# Basit Duygu Analizi Uygulaması

Bu örnekte, Electron çerçevesini kullanarak basit bir masaüstü uygulaması oluşturacağım. Uygulama, kullanıcının girdiği metnin duygusal tonunu analiz edecek.

Gereksinimler:

Node.js ve npm: Bilgisayarda Node.js ve npm'in kurulu olması gerekmektedir. Eğer kurulu değilse, https://nodejs.org/ adresinden indirebiliriz.
Kod Editörü: Visual Studio Code, Atom, Sublime Text veya tercih ettiğiniz herhangi bir kod editörü.

## Adım 1: Proje Klasörünü Oluşturma

Öncelikle bilgisayarınızda bir proje klasörü oluşturun. 

## Adım 2: Proje Dosyalarını Oluşturma

Proje klasörünüzün içinde aşağıdaki dosyaları oluşturun:

package.json (Proje yapılandırma dosyası)
main.js (Electron uygulamasının ana dosyası)
index.html (Uygulama arayüzünün HTML dosyası)
renderer.js (Arayüz ile etkileşim için JavaScript dosyası)

## Adım 3: package.json Dosyasını Yapılandırma

package.json dosyasını aşağıdaki gibi yapılandırın. Bu dosya, projenizin bilgilerini ve bağımlılıklarını tanımlar.

```json
//package.json
{
  "name": "basic-ai-electron-app",
  "version": "1.0.0",
  "description": "Basit bir AI Electron uygulaması örneği",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "keywords": [
    "electron",
    "ai",
    "sentiment",
    "example"
  ],
  "author": "AI Yardımcısı",
  "license": "MIT",
  "dependencies": {
    "electron": "^28.0.0",
    "sentiment": "^5.0.2"
  }
}
```
Bu yapılandırmada:

"dependencies" bölümünde, electron ve sentiment paketlerinin projeye bağımlılık olarak ekleneceğini belirtiyoruz. sentiment paketi, duygu analizi için kullanacağımız bir JavaScript kütüphanesidir.

## Adım 4: main.js Dosyasını Oluşturma

main.js dosyası, Electron uygulamasının ana giriş noktasıdır. Bu dosya, uygulamanın penceresini oluşturacak ve temel Electron işlevlerini yönetecek.

```js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Renderer sürecinde Node.js kullanımına izin verir (basitlik için)
      contextIsolation: false // Context Isolation'ı devre dışı bırakır (basitlik için)
    }
  });

  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools(); // Geliştirici araçlarını açmak için (isteğe bağlı)
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
```
Bu kod da:

BrowserWindow ile uygulamanın ana penceresini oluşturuyoruz.
webPreferences ayarları ile renderer sürecinde (arayüz tarafında) Node.js ve bazı özellikleri kullanabilmeyi sağlıyoruz (bu örnek için basitlik amacıyla).
loadFile('index.html') ile pencerede index.html dosyasını yüklüyoruz.
app olaylarını dinleyerek uygulamanın yaşam döngüsünü yönetiyoruz.

## Adım 5: index.html Dosyasını Oluşturma

index.html dosyası, uygulamanın kullanıcı arayüzünü oluşturacak.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Basit AI Electron Uygulaması</title>
</head>
<body>
  <h1>Duygu Analizi</h1>
  <textarea id="inputText" rows="4" cols="50" placeholder="Buraya metin girin..."></textarea><br><br>
  <button id="analyzeButton">Analiz Et</button><br><br>
  <div id="resultArea">Sonuç: </div>
  <script src="renderer.js"></script>
</body>
</html>
```
Bu HTML kodunda:

Bir başlık (<h1>Duygu Analizi</h1>), bir metin alanı (<textarea>), bir buton (<button>) ve sonuçların gösterileceği bir alan (<div>) oluşturuyoruz.
renderer.js dosyasını <script> etiketi ile sayfaya dahil ediyoruz.

## Adım 6: renderer.js Dosyasını Oluşturma

renderer.js dosyası, arayüzdeki etkileşimleri ve yapay zeka (duygu analizi) işlemlerini yönetecek JavaScript kodlarını içerecek.

```js
const sentiment = require('sentiment'); // Sentiment kütüphanesini dahil ediyoruz
const analyzeButton = document.getElementById('analyzeButton');
const inputText = document.getElementById('inputText');
const resultArea = document.getElementById('resultArea');

analyzeButton.addEventListener('click', () => {
  const text = inputText.value;
  const analysis = sentiment(text); // Metni analiz ediyoruz
  let sentimentResult = "";
  if (analysis.score > 0) {
    sentimentResult = "Pozitif";
  } else if (analysis.score < 0) {
    sentimentResult = "Negatif";
  } else {
    sentimentResult = "Nötr";
  }
  resultArea.textContent = `Sonuç: Metin ${sentimentResult} olarak değerlendirildi.  Puan: ${analysis.score}`;
});
```
Bu JavaScript kodunda:

sentiment kütüphanesini require('sentiment') ile dahil ediyoruz.
"Analiz Et" butonuna tıklama olayını dinliyoruz.
Butona tıklanınca, metin alanındaki (inputText) metni alıyoruz.
sentiment(text) fonksiyonu ile metnin duygu analizini yapıyoruz. Bu fonksiyon, metnin puanını (analysis.score) ve diğer bilgileri içeren bir obje döndürür.
Analiz sonucuna göre (analysis.score) metnin pozitif, negatif veya nötr olduğunu belirliyoruz ve sonucu resultArea (<div>) içinde gösteriyoruz.

## Adım 7: Bağımlılıkları Yükleme

Proje klasörünüzde terminali (veya komut istemini) açın ve aşağıdaki komutu çalıştırarak electron ve sentiment bağımlılıklarını yükleyin:

```bash
npm install
```
Bu komut, package.json dosyasındaki "dependencies" bölümünde belirtilen paketleri (Electron ve sentiment) node_modules klasörüne indirecektir.

## Adım 8: Uygulamayı Çalıştırma

Yine terminalde, proje klasörünüz içindeyken aşağıdaki komutu çalıştırarak uygulamayı başlatabilirsiniz:

```bash
npm start
```
Bu komut, package.json dosyasındaki "scripts" bölümünde tanımladığımız "start": "electron ." komutunu çalıştıracak ve Electron uygulamanızı başlatacaktır.

Uygulamanın Çalışması

Uygulama başlatıldığında, basit bir pencere açılacaktır. Bu pencerede bir metin alanı ve "Analiz Et" butonu göreceksiniz.

Metin Girin: Metin alanına analiz etmek istediğiniz bir metin yazın. Örneğin: "Bugün hava çok güzel ve mutluyum!".
Analiz Et'e Tıklayın: "Analiz Et" butonuna tıkladığınızda, renderer.js dosyasındaki kod çalışacak, metin analiz edilecek ve sonuçlar (metnin duygusal tonu ve puanı) sonuç alanında görüntülenecektir. Örneğin: "Sonuç: Metin Pozitif olarak değerlendirildi. Puan: 3".
Örneği Geliştirme Fikirleri:

Daha Gelişmiş Arayüz: HTML ve CSS kullanarak uygulamaya daha çekici bir arayüz tasarlayabilirsiniz.
Duygu Görselleştirme: Duygu analiz sonuçlarını grafikler veya emojilerle görselleştirebilirsiniz.
Farklı AI Kütüphaneleri: sentiment yerine daha gelişmiş doğal dil işleme (NLP) veya yapay zeka kütüphanelerini (örneğin, TensorFlow.js ile tarayıcıda çalışan modeller) entegre edebilirsiniz.
Daha Fazla Özellik: Uygulamaya metin özetleme, dil çevirisi gibi başka yapay zeka destekli özellikler ekleyebilirsiniz.
Electron Özelliklerini Keşfetme: Electron'ın menüler, diyaloglar, sistem tepsisi gibi diğer özelliklerini kullanarak uygulamayı zenginleştirebiliriz.

Gelistirme Fikirleri:

"Basit Duygu Analizi Uygulaması" örneğinde, yapay zeka (YZ) şu aşamada devreye giriyor:

Adım 6: renderer.js Dosyasında Duygu Analizi İşlemi

Tam olarak renderer.js dosyasındaki şu satırlar, yapay zeka işlevini yerine getiriyor:

JavaScript

const sentiment = require('sentiment'); // Sentiment kütüphanesini dahil ediyoruz
// ...
analyzeButton.addEventListener('click', () => {
  const text = inputText.value;
  const analysis = sentiment(text); // Metni analiz ediyoruz
  // ...
});
1. const sentiment = require('sentiment'); Satırı: Yapay Zeka Kütüphanesini Dahil Etme

Bu satır, sentiment adlı bir JavaScript kütüphanesini projenize dahil ediyor. sentiment kütüphanesi, önceden eğitilmiş (pre-trained) basit bir yapay zeka modelidir. Bu model, metinlerdeki duygusal tonu (pozitif, negatif, nötr) analiz etmek için tasarlanmıştır.
Kabaca düşünecek olursak, bu kütüphane, duygu analizi görevini yapmak için "hazır bir yapay zeka aracı" gibidir. Sizin bu yapay zeka modelini sıfırdan eğitmenize gerek kalmıyor, sadece kütüphaneyi projenize dahil edip kullanıyorsunuz.
2. const analysis = sentiment(text); Satırı: Duygu Analizi Yapma

Bu satırda, sentiment() fonksiyonuna kullanıcının girdiği text değişkenini (metni) iletiyoruz.
İşte burada sentiment kütüphanesi içindeki yapay zeka modeli devreye giriyor. sentiment() fonksiyonu, bu metni alır ve kendi içindeki algoritma ve verilere dayanarak analiz eder.
Analiz sonucunda, analysis değişkenine bir obje döner. Bu obje, metnin duygusal skorunu (analysis.score) ve kelime düzeyinde detaylı analiz bilgilerini içerir. Örneğin, pozitif ve negatif kelime sayıları gibi.
Özetle Yapay Zeka Nerede Devrede?

sentiment kütüphanesi İÇİNDE: Esas yapay zeka, sentiment kütüphanesinin kendisinde saklıdır. Bu kütüphane, duygu analizi yapabilen, önceden eğitilmiş bir model içerir.
sentiment(text) Fonksiyon Çağrısı İLE: Siz renderer.js dosyasında sentiment(text) fonksiyonunu çağırarak, bu yapay zeka modelini aktif hale getiriyor ve metin üzerinde duygu analizi işlemini başlatıyorsunuz.
Daha Detaylı Bakış: sentiment Kütüphanesi Nasıl "Yapay Zeka"?

sentiment kütüphanesi, aslında basit bir "lexicon-based" (sözlük tabanlı) duygu analizi yaklaşımı kullanır.  Yani, pozitif ve negatif kelimelerin bir sözlüğüne sahiptir. Bir metni analiz ederken:

Metindeki kelimeleri tek tek inceler.
Her kelimeyi, kendi sözlüğündeki pozitif ve negatif kelimelerle karşılaştırır.
Pozitif kelimelerin sayısını ve negatif kelimelerin sayısını sayar.
Bu sayılara göre bir skor hesaplar. Örneğin, daha çok pozitif kelime varsa, pozitif skor verir; daha çok negatif kelime varsa, negatif skor verir.
Bu yöntem, gerçek anlamda çok gelişmiş bir "derin öğrenme" veya "sinir ağı" temelli yapay zeka modeli değildir. Ancak, basit metinlerdeki temel duygusal tonu (iyi-kötü, olumlu-olumsuz) belirlemek için yeterli ve hızlı bir yöntemdir. Bu nedenle, "yapay zeka destekli" olarak adlandırılabilir, çünkü belirli bir zeka (duygu analizi yapma yeteneği) sergiler.

Daha Gelişmiş Yapay Zeka Uygulamaları İçin:

Eğer daha karmaşık yapay zeka görevleri (örneğin, daha derinlemesine anlam analizi, farklı dillerde duygu analizi, daha hassas ve bağlama duyarlı analiz) yapmak isterseniz, sentiment kütüphanesi yetersiz kalabilir.  Bu durumda:

Daha gelişmiş NLP (Doğal Dil İşleme) kütüphaneleri: Natural, Nlp.js, SpaCy.js gibi daha gelişmiş JavaScript NLP kütüphanelerini kullanabilirsiniz. Bu kütüphaneler, daha karmaşık algoritmalar ve modeller sunar.
Özel Eğitilmiş Modeller: Kendi veri setinizle, derin öğrenme çerçeveleri (TensorFlow.js, Brain.js gibi) kullanarak özel yapay zeka modelleri eğitebilir ve bu modelleri Electron uygulamanıza entegre edebilirsiniz.
Bulut Tabanlı YZ Servisleri: Google Cloud AI, Amazon AI, Microsoft Azure AI gibi bulut platformlarının sunduğu hazır yapay zeka servislerini (örneğin, bulut tabanlı duygu analizi API'leri) kullanabilirsiniz. Bu servisler genellikle daha güçlü ve gelişmiş modeller sunar.
Özet:

Basit örneğimizde, yapay zeka sentiment kütüphanesi aracılığıyla, renderer.js dosyasında, sentiment(text) fonksiyonu çağrıldığında devreye giriyor. Bu kütüphane, basit bir sözlük tabanlı yöntemle duygu analizi yaparak metnin duygusal tonunu belirliyor. Daha gelişmiş yapay zeka uygulamaları için, daha sofistike kütüphaneler veya özel eğitilmiş modeller kullanmak gerekebilir.

