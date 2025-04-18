Dokumentáció
Túrafelszerelés webshop

Tartalomjegyzék

Tartalomjegyzék 2
Bevezetés - túrafelszerelés webshop 3
Fejlesztői Dokumentáció 4
Felhasznált Technológiák 4
Fejlesztői környezet 5
Adatbázis Struktúra 7
Servicek 8
Komponensek 13
Felhasználói dokumentáció 24
Főbb funkciók: 24
Weboldal használata 25
Gyakori kérdések (GYIK) 32
Tesztelés 35
Regisztrációs űrlap kitöltése hiányos adatokkal 35
Fórum Használata 37
Magyarország térképe, vármegyék és városlinkek 39
Helységek kezelése és keresés 42
Navigációs Menü: Funkciók és Tesztelési Forgatókönyvek 44
Tesztelési Környezet 47
Következtetések 48
Navigációs Menü 48
Dokumentáció - Bejelentkezési Felület 53
Felhasználói Bejelentkezés Helytelen Adatokkal 55
Dokumentáció - Webshop Szűrés és Kosár Funkciók 57
Rendelés Folyamata 63
Dokumentáció - Profil Oldal 66
Összefoglalás 69

Bevezetés - túrafelszerelés webshop
A weboldal témája egy weboldal, amely négy fő funkciót kínál: egy
túrafelszereléseket tartalmazó webshopot, egy fórumot a felhasználók közötti
kommunikációhoz, egy interaktív SVG térképet a települések pontos koordinátáival,
valamint egy szállásajánló rendszert, amely a Booking integrációján keresztül segít a
felhasználóknak megfelelő szálláshelyet találni.
A weboldal célja, hogy egy átfogó, kényelmesen használható platformot biztosítson a
túrázók és természetjárók számára. Négy fő funkcióval rendelkezik:
 Webshop túrafelszerelések beszerzéséhez
 Fórum közösségi kommunikációhoz
 Interaktív SVG térkép települések pontos koordinátáival
 Szállásajánló rendszer Booking-integrációval
A platform segítséget nyújt a túrák előkészítésében, az útvonalak megtervezésében,
a szükséges felszerelések beszerzésében, és a pihenés megszervezésében is. A
közösségi funkciók (fórum, térkép) lehetővé teszik a tapasztalatok megosztását, a
helyszínek felfedezését, valamint a más túrázókkal való kapcsolattartást. A Booking-
alapú szállásajánló révén a felhasználók egyszerűen találhatnak és foglalhatnak
szállást közvetlenül az oldalon keresztül.
A weboldalt kifejezetten olyan felhasználóknak terveztük, akik szívesen töltik idejüket
a szabadban: legyen szó tapasztalt túrázókról vagy kezdő természetjárókról. A
különböző funkciók integrációja egyedülálló élményt nyújt, mivel jelenleg nincs olyan
hazai platform, amely ennyire komplex módon szolgálná ki a természetjárók igényeit.
A fejlesztés célja az volt, hogy egyetlen weboldalon keresztül biztosítsunk minden
olyan eszközt és információt, amely a túrázók számára fontos lehet így
megszüntetve a több alkalmazás közötti váltás szükségességét. A projekt
kiemelkedik azzal, hogy nemcsak praktikus szolgáltatásokat kínál, hanem valódi
közösségi élményt is teremt a felhasználók számára.

Fejlesztői Dokumentáció

Felhasznált Technológiák
 Angular: A projekt frontendjének fejlesztésére az Angular keretrendszert
választottuk, mivel lehetővé teszi a dinamikus, gyors és hatékony
webalkalmazások létrehozását. Az Angular egy összetett és sokoldalú
eszközkészletet biztosít, beleértve a komponens-alapú fejlesztést, a kétirányú
adatbindingot, az adatkezelést és a formák validálását. A keretrendszer kiválóan
támogatja a modularitást és az újra használható kódot, ami különösen fontos egy
nagyobb, folyamatosan bővülő alkalmazás fejlesztése során.
 TypeScript: A projektben a TypeScript nyelvet használtuk, mivel erősen típusos,
és segít abban, hogy a kódunk átláthatóbb és hibamentesebb legyen. A
TypeScript előnye, hogy típusellenőrzést végez már fordítás közben, így segít
elkerülni a futás idejű hibákat. Ezen kívül a fejlesztés során biztosítja a kód
szervezését és modularitását, ami különösen fontos a nagyobb projektek
esetében.
 HTML &amp; CSS: A felhasználói felület (UI) kialakításához a HTML-t és a CSS-t
használtuk. A HTML a dokumentumok szerkezetét adja meg, míg a CSS
biztosítja a vizuális megjelenést. A projektben alkalmazott CSS lehetővé teszi a
reszponzív kialakítást, hogy az alkalmazás minden eszközön jól működjön, és az
alkalmazott Bootstrap keretrendszer segít az esztétikai szempontoknak megfelelő
megjelenítésben.
 Bootstrap: A Bootstrap egy előre megírt CSS és JavaScript keretrendszer, amely
biztosítja az egységes dizájnt és a reszponzív funkciókat. A Bootstrap
segítségével gyorsan és hatékonyan alakíthattuk ki a felhasználói felületet, mivel
előre definiált stílusokat és komponenseket biztosít számunkra. Ezáltal a
különböző képernyőméretekhez igazodó megjelenést könnyedén elérhettük.
 SVG (Scalable Vector Graphics): Az SVG-t választottuk a grafikus elemek,
különösen a Magyarország térkép megjelenítésére, mivel ezek vektoros grafikák
és bármilyen felbontáson élesek maradnak. A térképet az SVG fájl segítségével
integráltuk az alkalmazásba, ami lehetővé tette a dinamikus interakciókat, például
a felhasználói térkép megjelenítését és az interaktív funkciók működtetését.
 Firebase Realtime Database: Az adatok tárolásához és kezeléséhez a Firebase
Realtime Database-t használtuk, mivel ez egy felhőalapú adatbázis, amely valós
időben szinkronizálja az adatokat a felhasználók között. A Firebase lehetőséget
biztosít arra, hogy az adatok folyamatosan frissüljenek, anélkül, hogy a
felhasználónak frissíteni kellene az oldalt. Ez különösen fontos volt a webshop
adatainak és a térkép interakcióinak szinkronizálásához.

 Git &amp; GitHub: A kód verziókezelésére a Git és GitHub szolgáltatásokat
használtuk. A Git egy elosztott verziókezelő rendszer, amely lehetővé teszi a kód
különböző verzióinak nyomon követését, visszaállítását és összevonását. A
GitHub, mint a Git online platformja, lehetőséget biztosít a csapatunk számára,
hogy közösen dolgozhassunk a kódon, pull requesteken keresztül biztosítva a
kód átnézését és a változtatások nyomon követését.

Fejlesztői környezet
A fejlesztési környezethez két különböző gépet választottunk, hogy biztosítsuk a
megfelelő teljesítményt és gördülékeny munkavégzést. Az első egy asztali PC, a
második pedig egy laptop, amely más típusú feladatokhoz és mobilitás
szempontjából ideális.

1. Asztali gép - Fejlesztési környezet
Processzor: Intel(R) Core (TM) i5-10400F CPU @ 2.90GHz
· Magok: 6
· Logikai processzorok: 12
· Alapsebesség: 2,90 GHz
· Maximális sebesség: 4,30 GHz
Ez a processzor biztosítja a megfelelő számítási kapacitást, különösen a
webfejlesztés és a kódfordítás során, mivel a több mag és logikai processzor
lehetővé teszi a párhuzamos munkavégzést, így a különböző fejlesztési feladatok
gyorsabban végezhetők el.
Tárhely: KINGSTON SNVS500G SSD
· Kapacitás: 500 GB
· Típus: SSD
Az SSD gyors adatátviteli sebessége javítja a rendszer teljesítményét, különösen
nagy fájlok kezelésekor, így biztosítva a gördülékeny fejlesztést és gyors
adatbetöltést.
Rendszerlemez: KXG6AZNV256G TOSHIBA SSD
· Kapacitás: 239 GB
Ez a lemez gyors fájlolvasást és írást biztosít, így csökkenti az alkalmazások
betöltési idejét és gyorsítja a fejlesztési folyamatokat. Gyorsabban reagál, és
csökken az alkalmazások betöltési ideje.

2. Laptop - Fejlesztési környezet (Alternatív konfiguráció)
Processzor: Intel(R) Core (TM) i5-10210U CPU @ 1.60GHz
· Alapsebesség: 1,60 GHz
· Maximális sebesség: 2,91 GHz
· Magok: 4
· Logikai processzorok: 8
Ez a laptop megfelelő a kevésbé erőforrás-igényes feladatokhoz, például kisebb
fejlesztési projektekhez vagy egyszerűbb kódszerkesztési feladatokhoz. Bár
alacsonyabb sebességgel rendelkezik, a 4 mag és 8 logikai processzor lehetővé
teszi a párhuzamos munkavégzést.
Tárhely: KXG6AZNV256G TOSHIBA SSD
· Kapacitás: 239 GB
Ez a SSD szintén biztosítja a gyors fájlolvasást és írást, segítve a gyors fejlesztést és
az alkalmazások gyors betöltődését.

A fejlesztési környezethez a következő szoftvereket választottuk:
 A Visual Studio Code (VS Code) egy gyors és könnyű kódszerkesztő, amely
ideális webfejlesztéshez, és támogatja a TypeScript, JavaScript, HTML, CSS
nyelveket. A beépített Git integráció és bővítmények segítik a gyors fejlesztést,
míg a verziókezelés hatékony irányítást biztosít.
 A GitHub a kód verziókezelésére és tárolására szolgál, biztosítva a biztonságos tárolást és
könnyű változáskövetést, integrálva a VS Code-dal.
 A Firebase Realtime Database lehetővé teszi a valós idejű adatkezelést és
szinkronizálást, így a dinamikus adatokat folyamatosan frissíthetjük a
weboldalon és alkalmazásban. A Firebase Authentication egyszerűsíti és
biztonságossá teszi a felhasználói bejelentkezést, megfelelve az adatvédelmi
előírásoknak.

Adatbázis Struktúra

Felhasználói
profilok
(Profile)

Webshop
termékek
(Turafelszerel
es)

Hozzászólá
sok
(comments)

Rendelés
ek
(orders)

Geolokáci
ós adatok

Meghatároz
ott helyek
displayName id Comment cart ESZ Főváros
email nev Email address KH Települések
uid ar Helysegnev db helysegne
v
additionalData kategoriak createdAt path szeletseg
path Reply tipus hosszúság
tipus

Firebase végpontok:

 A Firebase Realtime Database a valós idejű adatkezelést biztosítja. Ez azt
jelenti, hogy minden adatbázisban történő változás azonnal szinkronizálódik a
felhasználók eszközein, így azok mindig a legfrissebb adatokat látják, anélkül,
hogy manuális frissítésre lenne szükség. Ez különösen fontos a webshop és
az interaktív térkép esetében, ahol a felhasználói élmény folyamatos
adatáramlást igényel.
 A Firebase Authentication biztosítja a felhasználók biztonságos hitelesítését,
egyszerűsítve ezzel a bejelentkezési folyamatot és a felhasználói fiókok
kezelését. Az Authentication képes harmadik féltől származó hitelesítési

módszereket (pl. Google login) is kezelni, lehetővé téve a felhasználók
számára a gyors regisztrációt és bejelentkezést.
 A rendszer minden adatot titkosítva tárol a Firebase-ben, és az adatkezelés a
GDPR és egyéb adatvédelmi szabályozásoknak megfelelően történik. A
Firebase biztosítja a felhasználói adatok védelmét és a megfelelő
jogosultságkezelést a különböző adatcsoportokhoz való hozzáférés során.
 A kialakított adatszerkezet biztosítja a projekt hatékony adatkezelését és
folyamatos adatfrissítését. A Firebase Realtime Database és Firebase
Authentication kombinációja lehetővé teszi a dinamikus, valós idejű
adatáramlást, miközben biztosítja a felhasználói élményt és a rendszer
biztonságát. Az adatbázis struktúrája logikusan van felépítve, és könnyen
bővíthető, ami hosszú távon is fenntartható megoldást biztosít a
webalkalmazás számára.
Servicek

Comment service
 getCommentsWithReplies(): Lekéri az összes kommentet és azok válaszait. Az első
HTTP-kérés az összes kommentet szerzi be, majd egy második kérés következik a
válaszokhoz. A válaszok hozzárendelésre kerülnek a megfelelő kommentekhez.
 getReportsWithComments(): Lekéri az összes kommentet és azok jelentéseit. Az első
HTTP-kérés az összes kommentet szerzi be, majd egy második kérés következik a
jelentésekhez. A jelentések hozzárendelésre kerülnek a megfelelő kommentekhez.
 getComments(): Lekéri az összes kommentet.
 createComment(comment: { Helysegnev: string; Comment: string; Email: string;
displayName: string }): Új kommentet hoz létre a megadott adatokkal.
 createReply(reply: { parentId: string; Reply: string; Email: string; displayName: string
}): Új választ ad hozzá egy kommenthez a megadott adatokkal.
 reportComment(comment: any): Jelent egy kommentet. A jelentéshez a jelenlegi
felhasználó adatai is hozzáadásra kerülnek.
 addData(path: string, data: any): Új adatot ad hozzá a megadott útvonalhoz.
 getData(): Lekéri az adatokat a jelentésekhez.
 updateData(path: string, data: any): Frissíti az adatokat a megadott útvonalon.
 submitReport(comment: any): Beküldi a komment jelentését, miután ellenőrzi, hogy
a jelentéshez szükséges információk meg vannak adva.
 getReports(): Lekéri az összes jelentést.
 getCommentsByUser(email: string): Observable&lt;any[]&gt;: Lekéri az összes kommentet
egy adott e-mail cím alapján.
 getReplyByUser(email: string): Observable&lt;any[]&gt;: Lekéri az összes választ egy adott
e-mail cím alapján.
 deleteComments(id: string): Observable&lt;any&gt;: Töröl egy kommentet és annak
válaszait az adott azonosító alapján.

 deleteAll(id: string): Observable&lt;any&gt;: Töröl egy kommentet, annak válaszait és
jelentéseit az adott azonosító alapján.
 deleteReport(id: string): Töröl egy jelentést az adott azonosító alapján.

Wepshop service
 getAllItems(): Lekéri az összes terméket a allstutffsdataURL végpontról.
 getItemsByType(tipus: string): Lekéri azokat a termékeket, amelyek megfelelnek a
megadott típusnak.
 async createItem(newItem: any): Új terméket hoz létre a megadott adatokkal. A
metódus először ellenőrzi, hogy van-e bejelentkezett felhasználó, majd biztosítja,
hogy a szükséges mezők ne legyenek üresek vagy nullák. Ezután meghatározza az új
termék azonosítóját és létrehozza a terméket a megadott adatokkal.
 updateItem(id: string, item: any): Frissíti a meglévő terméket az adott azonosító és a
megadott adatok alapján.
 deleteItem(id: string): Törli a terméket az adott azonosító alapján.

Search service
 getSearchWord(): Visszaadja a kereso nevű BehaviorSubject példányt, amely
az aktuális keresési kifejezést tárolja.
 setSearchWord(keresoSzo: string): Beállítja a kereso BehaviorSubject új
értékét a megadott keresoSzo paraméter alapján.
 getCategoryFilter(): Visszaadja
a categoryFilter nevű BehaviorSubject példányt, amely a kategória szűrőt
tárolja.
 setCategoryFilter(category: string): Beállítja
a categoryFilter BehaviorSubject új értékét a megadott category paraméter
alapján.
 getPriceFilter(): Visszaadja a priceFilter nevű BehaviorSubject példányt, amely
az ár szűrőt tárolja.

 setPriceFilter(price: number): Beállítja a priceFilter BehaviorSubject új értékét
a megadott price paraméter alapján.
Base service (A térképhez tartózik)
 getBigCities(): Visszaadja a nagyvárosok adatainak lekérését a megfelelő
URL-ből.
 getLakeDatas(): Visszaadja a tavak adatait a megfelelő URL-ből.
 getBalaton(): Visszaadja a Balaton adatainak lekérését a megfelelő URL-ből.
 getDatas(): Visszaadja az összes település adatait a databaseURL-ről, és
azokat egy listaként alakítja át.
 getDatasForMap(): Visszaadja a települések adatait a térképhez
a databaseURL-ről.
 createSettlement(settlement: any): Létrehoz egy új települést az adatbázisban,
a megadott paraméterek alapján, először ellenőrzi, hogy van-e bejelentkezett
felhasználó.
 getRequestSettlement(): Visszaadja a lekért település adatokat
a TemperarydatabaseURL-ról, és csak azokat az adatokat tartalmazza,
amelyekhez createdAt mező tartozik.
 DeleteRequestedSettlement(id: string): Törli a kért települést a
TemperarydatabaseURL-ról.
 updateSettlement(id: string, settlement: any): Frissíti a település adatokat
a databaseURL-on a megadott id és settlement alapján.
 deleteSettlement(id: string): Törli a települést az adatbázisból a databaseURL-
ról a megadott id alapján.

Auth service
 Bejelentkezés és regisztráció:
o login: E-mail és jelszó alapú bejelentkezés.
o loginWithGoogle: Google fiók alapú bejelentkezés.
o loginWithFacebook: Facebook fiók alapú bejelentkezés.
o loginWithGithub: GitHub fiók alapú bejelentkezés.

o register: Új felhasználó regisztrációja e-mail cím és jelszó alapján,
valamint profil frissítése.

 Kijelentkezés:
o logout: A felhasználó kijelentkeztetése és a navigálás a kezdőoldalra.

 Felhasználói adatok és jogosultságok:
o getUserData: A bejelentkezett felhasználó adatai, mint például
kiegészítő adatokat kér le.
o getUserEmailAndDisplayName: A felhasználó e-mail címe és
megjelenített neve.
o addAdditionalUserData: Kiegészítő felhasználói adatokat ad hozzá a
profilhoz.
o setUserClaims: A felhasználó jogosultságainak (pl. admin, moderator)
beállítása.

 Felhasználói státusz:
o getIsAdmin: Az admin jogosultság lekérése.
o getIsModerator: A moderátor jogosultság lekérése.
o getIsLoggedUser: A bejelentkezett felhasználó státuszának lekérése.
o getLoggedUser: A bejelentkezett felhasználó adatai.

 E-mail és jelszó műveletek:
o forgotPassword: Jelszó-visszaállító e-mail küldése a felhasználó
számára.

 Felhasználói státusz ellenőrzése:
o isLoggedIn: Visszaadja, hogy a felhasználó be van-e jelentkezve.
o getCurrentUser: A bejelentkezett felhasználó adatai (ID, e-mail, név).
o getCurrentUserState: A bejelentkezett felhasználó állapota
(Observable).

Komponensek

Admin komponens
 ngOnInit(): Az Angular komponens inicializálásakor hívódik meg; betölti a
szükséges adatokat, például a kérelmezett településeket, termékeket,
jelentéseket és hozzászólásokat.​
 setCustomClaims(uid, claims): Beállítja a megadott felhasználóhoz tartozó
egyedi jogosultságokat (claims).​
 change(uid): Frissíti a megadott felhasználó jogosultságait a tárolt adatok
alapján.​
 loadComments(): Lekéri a hozzászólásokat és a hozzájuk tartozó jelentéseket
az adatbázisból.​
 getRequestedSettlements(): Lekéri az ideiglenesen kérelmezett településeket.​
 transferSettlement(): Átviszi az első kérelmezett települést a végleges helyre,
majd törli az ideiglenes bejegyzést.​
 RejectSettlement(id): Törli a megadott azonosítójú kérelmezett települést.​
 loadItems(): Lekéri az összes terméket, és kiszűri a null értékűeket.​
 addNewItem(): Hozzáad egy új terméket az adatbázishoz, ha minden mező
megfelelően ki van töltve.​
 filterText(event): Szűri a szövegbevitelt, csak betűket és szóközöket
engedélyezve.​
 updateItem(item): Frissíti a megadott termék adatait az adatbázisban.​
 deleteItem(id): Törli a megadott azonosítójú terméket az adatbázisból.​
 deleteComment(id): Törli az összes hozzászólást a megadott azonosítóval.​
 getReports(): Lekéri a jelentéseket az adatbázisból.​
 deleteReport(comment, reportId): Eltávolítja a megadott jelentést a
hozzászólásból és az adatbázisból.​

Webshop komponens
 ngOnInit():
Betölti az áruház adatait és a kosár tartalmát az oldal betöltésekor.
 toggleFilter():
Be- vagy kikapcsolja a szűrőpanel megjelenítését.
 loadShopData():
Lekéri az összes webshop terméket az adatbázisból, és elmenti szűréshez is.
 filterPrice(event):
Beállítja az ár szerinti szűrést a megadott érték alapján, és újraszűri a listát.
 filterCategory(event):
Kategória alapján szűri a termékeket a kiválasztott érték szerint.

 applyFilters():
Ár és kategória alapján kiszűri a termékeket a teljes listából.
 viewCart():
Átirányít a kosár (card) oldalra.

 addStuff(element, db):
Hozzáad egy terméket a kosárhoz (db értéke fixen 1).
 SelectCategory(event):
Kategóriaválasztáskor átirányít a megfelelő route-ra.

 price(element):
Visszaadja az adott termék árát mennyiség alapján kiszámolva.
 getTotalPrice():
Összesíti a kosárban lévő termékek árát.

 getValidPrice(item):
Visszaadja az érvényesített árat egy terméknél, hibakezeléssel.

Order komponens:
 ngOnInit():
o Betölti a kosár adatokat a CardService-ből, és beállítja a min. rendelési
dátumot.
o A subscription változó használata kétszeres adatlekérést
eredményezhet, mert a getCart() már egyszer visszaadja a kosarat. Az
első getCart() hívás után a második felesleges lehet.

 addOrder():
o A rendelés létrehozása előtt ellenőrzi, hogy minden bemeneti adat
érvényes-e.
o Ha a validálás sikeres, a rendelés a CardService-en keresztül lesz
hozzáadva, és a felhasználó visszajelzést kap a sikeres rendelésről.
o A resetForm() metódus végzi el a űrlap újraindítását.
 validateDateAndTime():
o Ellenőrzi, hogy a kiválasztott időpont a jövőben legyen-e.
 validateInputs():
o Ellenőrzi, hogy minden szükséges mező ki van-e töltve, és validálja az
adatokat (név, email).

 isNotEmpty():
o Segédfüggvény a kötelező mezők ellenőrzésére.
 validateEmail():
o A megadott e-mail cím validálása.
 sendVerificationEmail():
o A rendelés leadása után egy hitelesítő e-mailt küldene, de valójában a
metódus jelenleg csak egy konzolüzenetet ír ki. Ezt valós e-mail
küldéssel kellene implementálni.

 resetForm():
o Az űrlap adatainak törlése, miután a rendelés sikeresen létrejött.

 setMinPickupDate():
o Az űrlapon található pickup dátumot a mai napra állítja be, figyelve az
időzónára.
 price() és getTotalPrice():
 Az egyes termékek árait és a teljes rendelés összegét számítja ki.
Card komponens:
 backBtn(): A /shop (bolt) útvonalra navigál az Angular Router segítségével.

 continueBtn(): Az /order (rendelés) útvonalra navigál.

 ngOnInit():Feliratkozik a CardService-re, hogy lekérje a kosár adatait, amikor a
komponens inicializálódik.

 ngOnDestroy():Leiratkozik a szolgáltatásról, hogy elkerülje a memória
szivárgást, amikor a komponens megszűnik.

 price(item):Kiszámítja egyetlen tétel árát.Képlet: item.quantity * item.unitPrice
– a db és ar mezők felhasználásával.

 getTotalPrice():Kiszámítja az összes tétel végösszegét a kosárban.Összegzi
az egyes tételek árát a price() függvénnyel.

 updateQuantity(item, newQuantity):Frissíti egy adott tétel mennyiségét.Csak
akkor alkalmazza, ha az új mennyiség pozitív szám.

 deleteItem(itemId):
o Meghívja a CardService.deleteItem() metódust, hogy eltávolítsa a tételt
az adott azonosítóval.

SidePanel komponens:

 ngOnChanges(changes):
Figyeli, ha a kiválasztott megye (selectedRegion) változik, és frissíti a hozzá
tartozó nagyobb városokat.
 updateBigCities():
Betölti az aktuálisan kiválasztott megyéhez tartozó nagyvárosokat a listába.
 selectCity(city):
Beállítja az aktuálisan kiválasztott várost, és előkészíti a hozzászóláslistáját,
ha még nincs.
 addComment(commentInput):
Hozzáad egy új hozzászólást a kiválasztott városhoz, ha van szöveg
megadva.
 closeCommentBox():
Bezárja a város hozzászólás dobozát azáltal, hogy a kiválasztott várost nullára
állítja.
 closePanel():
Eseményt küld a szülő komponensnek a panel bezárásáról.
 navigateToRegion():
Átirányít a &quot;budapest&quot; útvonalra a router segítségével.

Settlement komponens:

 ngOnInit():
Inicializáláskor lekéri a településadatokat és a bejelentkezett felhasználó
szerepköreit (user/moderátor/admin).
 getModifiedDatas():
Lekéri az összes települést az adatbázisból, majd frissíti a lapozott nézetet.

 updatePagination():
Szűri a településeket a keresőszó alapján, és kiszámítja az aktuális oldalon
megjelenítendő adatokat.
 nextPage():
Lapozás a következő oldalra, ha van még oldal.

 prevPage():
Lapozás az előző oldalra, ha nem az első oldalon vagyunk.
 onKeyUp(event):
Beállítja a keresőszót valós időben gépeléskor, és újraszámolja a lapozást.

 updateSettlement(settlement):
Frissíti a kiválasztott települést az adatbázisban.
 deleteSettlement(id):
Törli az adott azonosítójú települést az adatbázisból.

 addSettlement():
Új települést hoz létre, ha minden mező megfelelően ki van töltve.
 filterText(event):
Csak ékezetes magyar betűket és szóközt enged be a településnév mezőbe.

 openModal():
Megnyitja a település hozzáadó modált (vagy formot).
 closeModal():
Bezárja a modált.

 closePanel():
Eseményt küld a szülő komponensnek a panel bezárásáról.

 selectCity(cityName):
Kiválaszt egy várost (pl. a részletes megjelenítéshez vagy kommenthez).

 BackBtn():
Visszanavigál a térképes oldalra (/map útvonal).
 booking():
Külső Booking keresés (hibásan van még megírva, mert this.datas nem egy
konkrét város).

Register komponens:
 constructor(...):
Inicializálja a fordításokat (angol és magyar), és alapértelmezettként magyar
nyelvet állít be.

 changeLanguage(lang: string):
Átváltja az aktuális nyelvet (pl. en vagy hu).

 validateEmail():
Ellenőrzi, hogy az email cím formailag helyes-e egy regex segítségével.
 validatePassword():
Ellenőrzi, hogy a jelszavak egyeznek-e, és legalább 6 karakter hosszúak-e.

 register():
Ha az email és jelszó valid, akkor meghívja az AuthService regisztrációs
metódusát (register).
 registerWithGoogle():
Google-fiókkal történő bejelentkezést indít, siker esetén a shop oldalra
navigál.

 registerWithFacebook():
Facebook-fiókkal történő bejelentkezés: hasonló logika, mint a Google-nél.
 registerWithGithub():
GitHub-fiókkal történő bejelentkezés: szintén hasonló, mint az előzőek.

Login Komponens:
 constructor(...):Beállítja a nyelvi fordításokat (en, hu), magyar az
alapértelmezett.Használja az ngx-translate könyvtárat.

 changeLanguage(lang: string)Dinamikusan vált nyelvet a felhasználó
választása alapján.
 login():Ellenőrzi, hogy van-e megadott email és jelszó.Meghívja az
AuthService.login metódust.Siker esetén navigál a térképes oldalra
(/map).Sikertelenség esetén hibát jelenít meg (loginError).
 register():(Ez egy kicsit szokatlan, hogy itt is van regisztráció.)Hozzáad egy
felhasználót a megadott email + jelszó + fix &quot;Felhasználó neve&quot; alapján.
 registerWithGoogle(), registerWithFacebook(), registerWithGithub():Harmadik
féltől származó autentikációkat kezel.Sikeres belépés után a /shop oldalra
navigál.

Profile komponens:

 ngOnInit():A felhasználó adatainak betöltése az AuthService-ből.Beállítja az
email és displayName adatokat.Lekéri a felhasználó kommentjeit és
rendeléseit.
 saveProfile():A felhasználó profiljának mentése az addAdditionalUserData
metódus használatával.Profil mentésekor kikapcsolja az edit módot.
 toggleEditMode():Átvált az edit módba (profil szerkesztés).
 loadUserComments(email: string):A felhasználó kommentjeit tölti be a
CommentService segítségével.
 loadOrders(email: string):A felhasználó rendeléseit tölti be a CardService
segítségével.
 calculateTotalPrice(cart: any[]):A kosár teljes összegének kiszámítása az
elemek árainak és darabszámának figyelembevételével.
 openOrderDetails(order: any):A rendelés részleteinek megnyitása modalban.
 get paginatedComments és get paginatedReplies:
Oldalazás a kommentek és válaszok között.
 nextPage() és prevPage():A kommentek és válaszok lapozásához szükséges
metódusok.

Felhasználói dokumentáció

Ez az oldal egy komplex platform, amely a túrázók és természetkedvelők számára
biztosít e-kereskedelmet, közösségi élményeket és könnyen elérhető túrázási
információkat. A webshop széleskörű túrafelszereléseket kínál, az egyszerű
navigációval könnyen kereshetők és szűrhetők a termékek. A fórum lehetőséget ad a
túrázók számára, hogy megosszák tapasztalataikat, útvonalajánlásaikat és
kérdéseiket, miközben új barátságokat köthetnek és szakértői tanácsokat kérhetnek.
Az interaktív SVG térkép segíti a felhasználókat a túraútvonalak felfedezésében,
részletes információkkal, mint például hossz, nehézségi fok és vízforrások. A
szállásfoglalás közvetlenül a Booking integrációval történik, amely lehetővé teszi a
túrázók számára, hogy gyorsan foglaljanak szállást a túraútvonalak közelében. A
felhasználói profilban a kommentek és vásárlási előzmények megjelenítése segíti a
felhasználókat a saját aktivitásaik nyomon követésében és a személyre szabott
élményben. A profilban kedvencek és vásárlásra váró termékek is elmenthetők, így
egyszerűbb a későbbi vásárlás és a túrák előkészítése.

Főbb funkciók:
· Túrafelszerelés vásárlása: A platformunkon mindent megtalálsz, amire
szükséged lehet a túrázáshoz: a legjobb minőségű hátizsákokat, sátrakat,
túracipőket, kempingezési kiegészítőket és egyéb túrafelszereléseket. A
termékek széles választéka lehetővé teszi, hogy minden túrázási igényt
kielégíthess, legyen szó kezdő túrázóról vagy tapasztalt kalandorról. Minden
termékhez részletes leírás, vásárlói vélemények és szűrők segítenek, hogy
gyorsan megtaláld, amire szükséged van.
· Interaktív térkép: A térkép segítségével felfedezheted a különböző túrázási
helyszíneket és útvonalakat.
· Fórum és közösségi interakció: A fórum egy olyan közösségi tér, ahol
kapcsolatba léphetsz más túrázókkal. Itt kérdéseket tehetsz fel, válaszolhatsz
mások kérdéseire, és megoszthatod saját tapasztalataidat, tippeket, valamint
túraútvonalajánlásokat. A fórum segít abban, hogy elmélyedj a túrázás
világában, és új barátokat szerezz, akik hasonló érdeklődéssel bírnak.
· Szállások: A weboldalon található szállásajánlások a túrázók igényeihez
igazodnak, figyelembe véve a túrák elhelyezkedését és azok nehézségi
szintjét. Így könnyedén megtalálhatod a legközelebbi pihenőhelyeket, legyen
szó kényelmes szállodákról, panziókról vagy akár kempingezési
lehetőségekről.

Weboldal használata Alapfunkciók bemutatása

A túrafelszerelés vásárlása kulcsfontosságú funkció az oldalunkon, amely lehetővé
teszi, hogy egyszerűen és gyorsan beszerezd a szükséges eszközöket a
kalandjaidhoz.
Termékek böngészése
A webshopunkban a termékeket különböző kategóriákba rendeztük, így könnyedén
megtalálhatod a szükséges túrafelszereléseket. A kategóriák között szerepelnek
például:
· Túracipők
· Sátrak
· Hátizsákok
· Ruházat
· Kiegészítők
Kosárba helyezés Miután megtaláltad a kívánt terméket, kattints a &quot;Kosaram&quot;
gombra. Ekkor a termék hozzáadódik a kosaradhoz, és könnyedén tovább
böngészhetsz, ha több terméket is szeretnél vásárolni.

Kosár ellenőrzése és vásárlás:
A kosarad tartalmát a középen található &quot;Kosár&quot; ikonra kattintva ellenőrizheted. Itt
lehetőséged van:
· Módosítani a termékek mennyiségét.
· Törölni a nem kívánt termékeket. Ha minden rendben van, és szeretnéd
befejezni a vásárlást, kattints a &quot;Tovább a rendeléshez&quot; gombra.
· Kosár ellenőrzése és vásárlás: A kosár tartalmát a középen sarokban
található &quot;Kosár&quot; ikonnal ellenőrizheted. Itt módosíthatod a termékek
mennyiségét vagy törölheted azokat. Ha mindent rendben találtál, kattints a
&quot;Pénztár&quot; gombra, és válassz fizetési módot.
· Fizetési lehetőségek: Az oldal többféle fizetési csak készpénzes fizetési
lehetőséget bizosít

Fórum és Közösségi Tér:
Regisztráció

A fórumhoz való hozzáféréshez először regisztrálnod kell. Ez egy egyszerű
folyamat:
Add meg a neved.
Írd be az email címed.
Válassz egy jelszót.
· Miután bejelentkeztél, hozzászólhatsz a fórum különböző témáihoz. Ha
szeretnél valamit megosztani vagy kérdezni, válaszd a megfelelő szekciót, és
hozzáadhatod a saját véleményedet vagy kérdéseidet. Az új fórumtémák
indítása is egyszerű: ha egyedi kérdésed van, indíthatsz egy új témát.

A fórum több különböző témakörbe van bontva, hogy könnyen megtaláld azokat a
beszélgetéseket, amelyek a leginkább érdekelnek. Néhány példa a témákra:
· Túrafelszerelések: itt megoszthatod tapasztalataidat a különböző
eszközökkel kapcsolatban.
· Túrák: érdeklődhetsz mások túraútvonalairól és megoszthatod saját túráid
tapasztalatait.
· Helyszínek: választhatsz különböző túrahelyszínekről, és megoszthatod, hogy
melyik helyen voltál és mit tapasztaltál.

 Funkciók:
 Hozzászólások írása és olvasása
 Új témák indítása
 Válasz más felhasználók bejegyzéseire

Interaktív Térkép

Az oldal egyik különlegessége az interaktív térkép, amely lehetővé teszi a túrázási
helyszínek könnyű megtalálását. A térkép segítségével megismerkedhetsz a túrázási
lehetőségekkel, a szálláshelyekkel és azok értékeléseivel.
· Térkép használata: A térképen való navigálás nagyon egyszerű. Kattinthatsz
egy helyszínre, hogy megismerd a hozzá tartozó információkat.
· Útvonalak és helyszínek: A térkép segítségével kereshetsz túraútvonalakat
és más helyszíneket, például szálláshelyeket. Ezek az információk részletes
adatokat tartalmaznak, mint például elérhetőségek és vélemények.
 Információk:
o Túraútvonal hossza, szintemelkedés, nehézségi szint
o Vízforrások és pihenőhelyek jelzése
o Kapcsolódó szálláshelyek megjelenítése
 Térképes keresés: név vagy kategória alapján

Termékek Véleményezése és Értékelése
A vásárolt termékekről lehetőséged van véleményt írni, hogy más felhasználók is
tájékozódhassanak a termékekről. Az értékeléshez egyszerűen kattints a termék
oldalán található „Értékelés írása” gombra, és adj egy csillagos értékelést, valamint
rövid véleményt.
· Miért érdemes értékelni? Az értékelések segítenek más vásárlóknak abban,
hogy jobban megértsék a termék előnyeit és hátrányait, mielőtt döntést
hoznak. Ha egy terméket kipróbáltál, oszd meg tapasztalataidat másokkal,
hogy segíts nekik a választásban.
Gyakori kérdések (GYIK)

Kell regisztrálni a vásárláshoz?
Igen, regisztráció szükséges a vásárlás befejezéséhez és a rendelések nyomon
követéséhez.
Hogyan tudok új fórumtémát indítani?
Jelentkezz be, válaszd ki a kívánt kategóriát, majd kattints az „Új téma” gombra.
Mi történik, ha elfelejtettem a jelszavam?
A bejelentkezési oldalon kattints az „Elfelejtett jelszó” linkre, és kövesd az
utasításokat.
Hogyan kereshetek túraútvonalat a térképen?
Navigálj az „Interaktív térkép” menüpontra, és kattints a térképen található ikonokra
vagy használd a keresőt.
Hogyan értékelhetem a vásárolt terméket?
Lépj a termék oldalára, és kattints az „Értékelés írása” gombra.

Regisztráció és Bejelentkezés

A regisztráció egyszerű, és lehetővé teszi, hogy személyre szabott élményt kapj a
weboldalon.
· Miért szükséges regisztrálni? A regisztrációval lehetőséged lesz vásárolni a
webshopban, részt venni a fórumon, véleményt írni a termékekről, és még sok
más egyéb funkciót kihasználni.
· Regisztráció: Kattints a &quot;Regisztráció&quot; gombra, add meg a neved, email
címed, és válassz egy jelszót. Miután regisztráltál, egy megerősítő email-t
kapsz, és be tudsz lépni a fiókodba.
· Bejelentkezés: A regisztráció után a bejelentkezéshez csak az email címed
és jelszavad szükséges.

Tesztelés
Regisztrációs űrlap kitöltése hiányos adatokkal
A regisztrációs űrlap akkor válik érvényesnek, ha minden kötelező mező ki van töltve.
A tesztelés célja annak biztosítása, hogy a rendszer megfelelően kezelje a hiányos
adatokat, és hogy a felhasználó ne tudjon regisztrálni, amennyiben bármely kötelező
mező üres marad.
 Üres felhasználónév mező:
 Bemenet: A felhasználónév mező üresen hagyása.
 Várt eredmény: A rendszer figyelmeztető üzenetet jelenít meg, hogy a
felhasználónév mező kitöltése kötelező.

 Üres jelszó mező:
 Bemenet: A jelszó mező üresen hagyása.
 Várt eredmény: A rendszer figyelmeztető üzenetet jelenít meg, hogy a
jelszó mező kitöltése kötelező.

 Üres email mező:
 Bemenet: Az email mező üresen hagyása.
 Várt eredmény: A rendszer figyelmeztető üzenetet ad, hogy az email
mező kitöltése kötelező.
 Hibás email formátum:
 Bemenet: Olyan email cím megadása, amely nem érvényes formátumú
(pl. user@domain vagy user@domain.).
 Várt eredmény: A rendszer figyelmeztető üzenetet ad, hogy az email
cím formátuma érvénytelen.

 Üres név mező:
 Bemenet: A név mező üresen hagyása.
 Várt eredmény: A rendszer figyelmeztető üzenetet jelenít meg, hogy a
név mező kitöltése kötelező.

 Hiányzó megerősítő jelszó:
 Bemenet: A jelszó mező kitöltése után a megerősítő jelszó mező
üresen hagyása.
 Várt eredmény: A rendszer figyelmeztető üzenetet ad, hogy a
megerősítő jelszó mező kitöltése kötelező.

 Jelszavak nem egyeznek:
 Bemenet: A jelszó mező és a megerősítő jelszó mező különböző
értékeket tartalmaz.
 Várt eredmény: A rendszer figyelmeztető üzenetet ad, hogy a két
jelszónak egyeznie kell.

Tesztelés végrehajtása
A tesztelést különböző böngészőkben és eszközökön végeztük el, hogy biztosítsuk a
regisztrációs űrlap helyes működését minden környezetben:
· Böngészők: Google Chrome, Firefox, Safari, Microsoft Edge

Fórum Használata
A fórumba való írás tesztelésének célja annak biztosítása, hogy a felhasználók
képesek legyenek sikeresen hozzászólásokat közzétenni, miközben a rendszer
megfelelően kezeli a különböző típusú adatokat és az esetleges hibákat. A teszt
során figyelembe kell venni a bejegyzés létrehozásához szükséges információkat, az
üzenet formátumát, valamint a rendszer reakcióját a különböző típusú hibákra.
 Üres komment mező:
 Bemenet: A felhasználó üresen hagyja a komment mezőt és próbálja
meg közzétenni a hozzászólást.
 Várt eredmény: A rendszer figyelmeztető üzenetet ad, hogy a
hozzászólás mező kitöltése kötelező.

 Hibás formátumú hozzászólás:
 Bemenet: A felhasználó olyan szöveget ad meg, amely túllépi a
maximálisan megengedett karakterek számát.
 Várt eredmény: A rendszer figyelmeztető üzenetet ad, hogy a
hozzászólás túl hosszú.

 Komment írása érvényes felhasználói fiókkal:
 Bemenet: A felhasználó érvényes felhasználói fiókkal bejelentkezve
próbál hozzászólást létrehozni.
 Várt eredmény: A rendszer sikeresen létrehozza a kommentet, és azt
megjeleníti a megfelelő fórum szekcióban.
 Komment írása érvénytelen felhasználói fiókkal:
 Bemenet: A felhasználó nincs bejelentkezve, és megpróbál
hozzászólást írni.
 Várt eredmény: A rendszer figyelmeztető üzenetet ad, hogy a
hozzászóláshoz bejelentkezés szükséges.
 Hozzászólás létrehozása speciális karakterekkel:
 Bemenet: A felhasználó speciális karaktereket (pl. &lt;, &gt;, &amp;, etc.)
tartalmazó szöveget ír be.
 Várt eredmény: A rendszer megfelelően kezeli a speciális
karaktereket, és nem jelenít meg hibát.
 Komment írása bejelentkezett felhasználóval:

 Bemenet: A felhasználó be van jelentkezve és kitölti a hozzászólás
mezőt.
 Várt eredmény: A komment sikeresen közzé van téve, és megjelenik a
fórumon.

 Komment írása bejelentkezés nélküli felhasználóval:
 Bemenet: A felhasználó nincs bejelentkezve és próbál kommentet írni.
 Várt eredmény: A rendszer figyelmeztető üzenetet ad, hogy a
hozzászóláshoz bejelentkezés szükséges.

 Komment törlés:
 Bemenet: A moderator vagy adminisztrátor a komment törlésére
kattint.
 Várt eredmény: A komment sikeresen törlődik a rendszerből.
 Válasz írása egy kommentre:
 Bemenet: A felhasználó válaszol egy kommentre.
 Várt eredmény: A válasz sikeresen közzétételre kerül a komment alatt,
és láthatóvá válik.

 Jelentés küldése egy kommentről:
 Bemenet: A felhasználó jelentést küld egy kommentről, kiválasztva az
okot.
 Várt eredmény: A rendszer rögzíti a jelentést és értesíti a megfelelő
felet.
Tesztelés végrehajtása
A tesztelést különböző böngészőkben és eszközökön végeztük el, hogy biztosítsuk a
regisztrációs űrlap helyes működését minden környezetben:
· Böngészők: Google Chrome, Firefox, Safari, Microsoft Edge

Magyarország térképe, vármegyék és városlinkek
A rendszer célja, hogy a felhasználók számára interaktív módon bemutassa
Magyarország térképét, ahol egy-egy vármegyére kattintva megjelennek a vármegye
zászlaja, címere, valamint a legnagyobb városok, amelyek linkelve vannak a
Wikipedia oldalaira.
Vármegye kiválasztása
 Bemenet: A felhasználó rákattint egy vármegyére a térképen.
 Várt eredmény: A rendszer megjeleníti a vármegye zászlaját, címereit,
valamint a legnagyobb városok listáját. Minden város neve linkelve van
a megfelelő Wikipedia oldalra.
Linkek validálása
 Bemenet: A felhasználó rákattint egy város nevére a listában.
 Várt eredmény: A rendszer a felhasználót átirányítja a város Wikipedia
oldalára.
Zászló és címerek helyes megjelenítése
 Bemenet: A felhasználó rákattint egy vármegyére.
 Várt eredmény: A vármegye zászlaja és címere helyesen jelenik meg
a térképen.
Tesztelés végrehajtása
A tesztelést különböző böngészőkben és eszközökön végeztük el, hogy biztosítsuk a
térkép és városlinkek megfelelő működését minden környezetben:
· Böngészők: Google Chrome, Firefox, Safari, Microsoft Edge
A teszt során meggyőződtünk róla, hogy minden város linkje helyesen irányít a
Wikipedia oldalra, és hogy a vármegye zászlója és címere is megfelelően jelenik
meg.
Eredmények és következtetések
A Magyarország térképe és vármegyéinek interaktív elemei sikeresen tesztelésre
kerültek. A következő eredményeket kaptuk:
· Vármegye kiválasztás: A felhasználók képesek voltak helyesen kiválasztani
egy vármegyét a térképről, és megtekinteni annak zászlóját, címereit, valamint
a legnagyobb városok listáját.

· Linkek validálása: A városok nevére kattintva a felhasználókat helyesen
átirányította a rendszer a megfelelő Wikipedia oldalra.
· Zászló és címerek megjelenítése: A vármegye zászlaja és címere minden
esetben megfelelően megjelent.

Összes település megjelenítése
Összes település megjelenítése/eltüntetése
 Bemenet: A felhasználó rákattint az &quot;Összes település megjelenítése&quot;
gombra.
 Várt eredmény: A rendszer az összes települést megjeleníti kis
pöttyökkel a térképen. Ha a felhasználó ismét rákattint, az összes
település eltűnik a térképről.
Települések keresése
 Bemenet: A felhasználó megad egy település nevet a &quot;Keresés&quot;
mezőbe (pl. &quot;Aba&quot;).
 Várt eredmény: A rendszer visszaadja a keresett települést, és
megjeleníti annak koordinátáit (Keleti hosszúság, Északi szélesség) és
a &quot;Szállás foglalása&quot; gombot.
Település hozzáadása
 Bemenet: A felhasználó rákattint a &quot;Település hozzáadása&quot; gombra.
 Várt eredmény: A rendszer egy űrlapot jelenít meg, ahol a felhasználó
megadhatja a következő adatokat:
o Helységnév
o Keleti hosszúság
o Keleti hosszúság fok, perc
o Északi szélesség
o Északi szélesség fok, perc

 Bemenet: A felhasználó kitölti az űrlapot és rákattint a &quot;Település
hozzáadása&quot; gombra.
 Várt eredmény: A rendszer hozzáadja az új települést a térképhez és
az adatbázishoz.
Vissza a térképre
 Bemenet: A felhasználó rákattint a &quot;Vissza a térképre&quot; gombra.
 Várt eredmény: A rendszer visszaviszi a felhasználót a térképre, és
eltünteti az űrlapot.
Bezárás a település hozzáadása űrlapról
 Bemenet: A felhasználó rákattint a &quot;Bezárás&quot; gombra.
 Várt eredmény: A rendszer bezárja a település hozzáadása űrlapot és
visszaviszi a felhasználót a térképre.

Tesztelés végrehajtása
A tesztelést különböző böngészőkben és eszközökön végeztük el, hogy biztosítsuk
az összes funkció megfelelő működését minden környezetben:
· Böngészők: Google Chrome, Firefox, Safari, Microsoft Edge

Helységek kezelése és keresés

A rendszer célja, hogy a felhasználók számára lehetőséget biztosítson a települések
keresésére és megjelenítésére, valamint új települések hozzáadására, amelyeket az
adminisztrátoroknak kell jóváhagyniuk. Az alábbiakban bemutatjuk a funkciók
tesztelését és működését.
Funkciók és tesztelési forgatókönyvek
Összes település megjelenítése/eltüntetése
 Bemenet: A felhasználó rákattint az &quot;Összes település megjelenítése&quot;
gombra.
 Várt eredmény: A rendszer az összes települést megjeleníti kis
pöttyökkel a térképen. Ha a felhasználó ismét rákattint, az összes
település eltűnik a térképről.
Települések keresése
 Bemenet: A felhasználó megad egy település nevet a &quot;Keresés&quot;
mezőbe (pl. &quot;Aba&quot;).
 Várt eredmény: A rendszer visszaadja a keresett települést, és
megjeleníti annak koordinátáit (Keleti hosszúság, Északi szélesség) és
a &quot;Szállás foglalása&quot; gombot.
Település hozzáadása (Adminisztrátori jóváhagyás szükséges)
 Bemenet: A felhasználó rákattint a &quot;Település hozzáadása&quot; gombra.
 Várt eredmény: A rendszer egy űrlapot jelenít meg, ahol a felhasználó
megadhatja a következő adatokat:
o Helységnév
o Keleti hosszúság
o Keleti hosszúság fok, perc
o Északi szélesség
o Északi szélesség fok, perc

 Bemenet: A felhasználó kitölti az űrlapot és rákattint a &quot;Település
hozzáadása&quot; gombra.

 Várt eredmény: Az új település hozzáadásra kerül az adminisztrátorok
számára egy jóváhagyási listára, akik az adatokat ellenőrizhetik, és
jóváhagyhatják a település megjelenítését a térképen.
Vissza a térképre
 Bemenet: A felhasználó rákattint a &quot;Vissza a térképre&quot; gombra.
 Várt eredmény: A rendszer visszaviszi a felhasználót a térképre, és
eltünteti az űrlapot.

Bezárás a település hozzáadása űrlapról
 Bemenet: A felhasználó rákattint a &quot;Bezárás&quot; gombra.
 Várt eredmény: A rendszer bezárja a település hozzáadása űrlapot és
visszaviszi a felhasználót a térképre.

Tesztelés végrehajtása
A tesztelést különböző böngészőkben és eszközökön végeztük el, hogy biztosítsuk
az összes funkció megfelelő működését minden környezetben:
· Böngészők: Google Chrome, Firefox, Safari, Microsoft Edge
Eredmények és következtetések
· Összes település megjelenítése/eltüntetése: Az összes település gomb
megfelelően működik, és a települések pöttyökkel jelennek meg a térképen,
majd eltűnnek, ha a gomb ismételten megnyomásra kerül.
· Települések keresése: A kereső funkció pontosan visszaadja a keresett
települést és annak koordinátáit.
· Település hozzáadása: Az űrlap megfelelően működik, és az új település
hozzáadása után az adatbázisban nem kerül azonnal megjelenítésre. A
települést az adminisztrátoroknak kell jóváhagyniuk, mielőtt az a térképen
elérhetővé válik.
· Vissza a térképre és bezárás: A &quot;Vissza a térképre&quot; és &quot;Bezárás&quot; gombok
megfelelően működnek, és a felhasználó könnyedén visszatérhet a térképre,
ha szükséges.

Következő lépések
A következő lépések a rendszer bővítését jelenthetik, például:

· Az adminisztrátori felületen a települések jóváhagyásának részletes
nyilvántartása.
· A szállásfoglalási funkció integrálása, hogy a felhasználók könnyebben
rátaláljanak a szállásokra a kiválasztott településeken.
· A települések keresése és szűrése fejlettebb lehetőségekkel, mint például
területi szűrők vagy népszerűségi indexek.

Navigációs Menü: Funkciók és Tesztelési Forgatókönyvek
A navigációs menü egy dinamikus felületet biztosít a felhasználóknak, amely
lehetővé teszi a különböző oldalak és kategóriák közötti navigálást. A következő
funkciók biztosítják a felhasználói interakciót és a navigációs élményt.
Navigációs Menü Struktúra
A navigációs sáv az alábbi fő funkciókat tartalmazza:

 Fórum
 Magyarország Térképe
 Profil
 Kijelentkezés
 Webshop

Fórum
A Fórum menüpont lehetővé teszi a felhasználók számára, hogy a fórum oldalra
navigáljanak, ahol kérdéseket tehetnek fel és válaszokat kaphatnak.

Funkció:
· Bemenet: A bejelentkezett felhasználó rákattint a &quot;Fórum&quot; menüpontra.
· Várt eredmény: A rendszer betölti a fórum oldalát.
Tesztelési Forgatókönyv:
· Bemenet: A bejelentkezett felhasználó rákattint a Fórum menüpontra.
· Várt eredmény: A rendszer navigál a fórum oldalra, ahol a felhasználók
kérdéseket tehetnek fel és válaszokat adhatnak.
Magyarország Térképe
A Magyarország Térképe menüpont lehetővé teszi a felhasználók számára, hogy
interaktívan megtekintsék Magyarország térképét, és különböző településeket,
megyéket kereshetnek.
Funkció:
· Bemenet: A bejelentkezett felhasználó rákattint a &quot;Magyarország Térképe&quot;
menüpontra.
· Várt eredmény: A rendszer betölti a Magyarország térképét.
Tesztelési Forgatókönyv:
· Bemenet: A bejelentkezett felhasználó rákattint a Magyarország Térképe
menüpontra.
· Várt eredmény: A rendszer navigál a térkép oldalra, ahol a felhasználó
megtekintheti Magyarország térképét és kereshet településeket.

Profil
A Profil menüpont lehetővé teszi a bejelentkezett felhasználó számára, hogy
megtekintse és szerkessze saját profilját, például személyes adatait, jelszavát.

Funkció:
· Bemenet: A bejelentkezett felhasználó rákattint a &quot;Profil&quot; menüpontra.
· Várt eredmény: A rendszer betölti a felhasználó profilját, ahol
szerkeszthetőek a személyes adatok.
Tesztelési Forgatókönyv:
· Bemenet: A bejelentkezett felhasználó rákattint a Profil menüpontra.
· Várt eredmény: A rendszer navigál a profil oldalra, ahol a felhasználó
személyes adatait szerkesztheti.
Kijelentkezés
A Kijelentkezés menüpont lehetővé teszi a bejelentkezett felhasználó számára,
hogy kijelentkezzen a rendszerből.
Funkció:
· Bemenet: A bejelentkezett felhasználó rákattint a &quot;Kijelentkezés&quot; menüpontra.
· Várt eredmény: A rendszer kijelentkezteti a felhasználót és visszavezeti őt a
bejelentkezési oldalra.
Tesztelési Forgatókönyv:
· Bemenet: A bejelentkezett felhasználó rákattint a Kijelentkezés menüpontra.
· Várt eredmény: A rendszer kijelentkezteti a felhasználót és visszavezeti a
bejelentkezési oldalra.

Webshop Kategóriák Navigálása
A Webshop menüpontok lehetővé teszik a felhasználók számára, hogy különböző
termékkategóriákra navigáljanak. Az alábbiakban találhatók a kategóriák és azok
tesztelési forgatókönyvei.
Webshop Főoldalra Navigálás

· Bemenet: A bejelentkezett felhasználó rákattint a &quot;Webshop&quot; menüpontra.
· Várt eredmény: A rendszer betölti a webshop főoldalát (/shop).
Táska Kategória Navigálása
· Bemenet: A bejelentkezett felhasználó rákattint a &quot;Táskák&quot; menüpontra.
· Várt eredmény: A rendszer betölti a táskák kategóriáját tartalmazó oldalt
(/taskak).
Sátor Kategória Navigálása
· Bemenet: A bejelentkezett felhasználó rákattint a &quot;Sátrak&quot; menüpontra.
· Várt eredmény: A rendszer betölti a sátrak kategóriáját tartalmazó oldalt
(/satrak).
Bicikli Kategória Navigálása
· Bemenet: A bejelentkezett felhasználó rákattint a &quot;Biciklik&quot; menüpontra.
· Várt eredmény: A rendszer betölti a biciklik kategóriáját tartalmazó oldalt
(/biciklik).
Cipő Kategória Navigálása
· Bemenet: A bejelentkezett felhasználó rákattint a &quot;Cipők&quot; menüpontra.
· Várt eredmény: A rendszer betölti a cipők kategóriáját tartalmazó oldalt
(/cipok).
Hálózsák Kategória Navigálása
· Bemenet: A bejelentkezett felhasználó rákattint a &quot;Hálózsákok&quot; menüpontra.
· Várt eredmény: A rendszer betölti a hálózsákok kategóriáját tartalmazó oldalt
(/halozsakok).

Tesztelési Környezet
A tesztelést különböző böngészőkben és eszközökön végeztük el annak érdekében,
hogy biztosítsuk a navigáció megfelelő működését minden környezetben:
· Böngészők: Google Chrome, Firefox, Safari, Microsoft Edge
· Felhasználói típus: A tesztet bejelentkezett felhasználók körében végeztük
el, hogy biztosítsuk a felhasználói élményt és a funkcionalitás megfelelő
működését a navigációs menüvel kapcsolatban.
Következtetések
A navigációs menü jól működik minden környezetben, és a felhasználók könnyedén
navigálhatnak a különböző oldalakon és kategóriákban. Az összes funkció, beleértve
a fórumot, térképet, profil kezelését és webshop kategóriákat, megfelelően működött
a tesztelés során.
Navigációs Menü
Funkciók és tesztelési forgatókönyvek
Navigációs menü struktúra
A navigációs sáv egy dinamikus menüt tartalmaz, amely az alábbi fő funkciókat
biztosít:
Fórum
Magyarország Térképe
Profil
Kijelentkezés
Felhasználói Menü
A menü HTML struktúrája és annak működése az alábbiakban található.

Fórum
A Fórum menüpont lehetővé teszi a bejelentkezett felhasználók számára, hogy a
fórum oldalra navigáljanak, ahol kérdéseket tehetnek fel és válaszokat kaphatnak. A
fórum oldal lehetőséget biztosít a felhasználói interakcióra és moderálásra is.
Funkció:
· Bemenet: A felhasználó rákattint a &quot;Fórum&quot; menüpontra.
· Várt eredmény: A rendszer betölti a fórum oldalát.
Tesztelési forgatókönyv:
· Bemenet: A bejelentkezett felhasználó rákattint a Fórum menüpontra.
· Várt eredmény: A rendszer navigál a fórum oldalra, ahol a felhasználók
kérdéseket tehetnek fel és válaszokat adhatnak.
Magyarország Térképe
A Magyarország Térképe menüpont a bejelentkezett felhasználóknak lehetőséget
biztosít, hogy interaktívan megtekintsék Magyarország térképét. A térkép lehetővé
teszi a települések, megyék és egyéb földrajzi elemek megjelenítését.
Funkció:
· Bemenet: A felhasználó rákattint a &quot;Magyarország Térképe&quot; menüpontra.
· Várt eredmény: A rendszer betölti a Magyarország térképét, ahol a
felhasználók interaktívan tudnak navigálni.
Tesztelési forgatókönyv:
· Bemenet: A bejelentkezett felhasználó rákattint a Magyarország Térképe
menüpontra.
· Várt eredmény: A rendszer navigál a térkép oldalra, ahol a felhasználók
láthatják Magyarország térképét és különböző településeket kereshetnek.

Profil
A Profil menüpont lehetővé teszi a bejelentkezett felhasználók számára, hogy
megtekintsék és szerkesszék saját profiljukat. Itt módosíthatják személyes adataikat,
jelszavukat, és egyéb információikat.
Funkció:
· Bemenet: A felhasználó rákattint a &quot;Profil&quot; menüpontra.
· Várt eredmény: A rendszer betölti a felhasználó profilját, ahol megtekinthetik
és szerkeszthetik adataikat.
Tesztelési forgatókönyv:
· Bemenet: A bejelentkezett felhasználó rákattint a Profil menüpontra.
· Várt eredmény: A rendszer navigál a profil oldalra, ahol a felhasználó
személyes adatait láthatja és szerkesztheti.

Kijelentkezés

A Kijelentkezés menüpont lehetővé teszi a bejelentkezett felhasználó számára,
hogy kijelentkezzen a rendszerből.
Funkció:
· Bemenet: A felhasználó rákattint a &quot;Kijelentkezés&quot; menüpontra.
· Várt eredmény: A rendszer kijelentkezteti a felhasználót és visszavezeti őt a
bejelentkezési oldalra.
Tesztelési forgatókönyv:
· Bemenet: A bejelentkezett felhasználó rákattint a Kijelentkezés menüpontra.
· Várt eredmény: A rendszer kijelentkezteti a felhasználót, és visszavezeti őt a
bejelentkezési oldalra.

Felhasználói Menü
A Felhasználói Menü lehetőséget biztosít a felhasználóknak a bejelentkezési oldal
elérésére vagy a meglévő felhasználói profiljuk módosítására.
Funkció:
· Bemenet: A felhasználó rákattint a &quot;Felhasználói Menü&quot; menüpontra.
· Várt eredmény: A rendszer betölti a bejelentkezési oldalt vagy navigál a
felhasználói profil oldalára, ha a felhasználó be van jelentkezve.
Tesztelési forgatókönyv:
· Bemenet: A bejelentkezett felhasználó rákattint a &quot;Felhasználói Menü&quot;
menüpontra.
· Várt eredmény: A rendszer navigál a felhasználói profil oldalára, ahol a
felhasználó módosíthatja a profilját.

Webshop főoldalra navigálás
· Bemenet: A felhasználó rákattint a &quot;Webshop&quot; menüpontra.

· Várt eredmény: A rendszer betölti a webshop főoldalt (/shop).
. Táska kategória navigálása
· Bemenet: A felhasználó rákattint a &quot;Táskák&quot; menüpontra.
· Várt eredmény: A rendszer betölti a táskák kategóriát tartalmazó oldalt
(/taskak).
. Sátor kategória navigálása
· Bemenet: A felhasználó rákattint a &quot;Sátrak&quot; menüpontra.
· Várt eredmény: A rendszer betölti a sátrak kategóriát tartalmazó oldalt
(/satrak).
. Bicikli kategória navigálása
· Bemenet: A felhasználó rákattint a &quot;Biciklik&quot; menüpontra.
· Várt eredmény: A rendszer betölti a biciklik kategóriát tartalmazó oldalt
(/biciklik).
. Cipő kategória navigálása
· Bemenet: A felhasználó rákattint a &quot;Cipők&quot; menüpontra.
· Várt eredmény: A rendszer betölti a cipők kategóriát tartalmazó oldalt
(/cipok).
Hálózsák kategória navigálása
· Bemenet: A felhasználó rákattint a &quot;Hálózsákok&quot; menüpontra.
· Várt eredmény: A rendszer betölti a hálózsákok kategóriát tartalmazó oldalt
(/halozsakok).

Dokumentáció - Bejelentkezési Felület
. Bejelentkezési Funkciók
A bejelentkezési felület célja, hogy a felhasználók biztonságosan beléphessenek a
rendszerbe különböző hitelesítési módszerek segítségével. A felhasználók számára
három fő hitelesítési lehetőség áll rendelkezésre:
 Google bejelentkezés
 Facebook bejelentkezés
 GitHub bejelentkezés
 Hagyományos bejelentkezés email és jelszó segítségével.
A bejelentkezési űrlapnak az alábbi elemei vannak:
· Email mező: A felhasználó itt adja meg az email címét.
· Jelszó mező: A felhasználó itt adja meg a jelszavát.
· Bejelentkezés gomb: A felhasználó az email és jelszó megadása után
kattinthat a bejelentkezés gombra.
· Regisztrációs link: Ha a felhasználó még nem rendelkezik fiókkal, a &quot;Nincs
még fiókod? Regisztrálj&quot; link segítségével regisztrálhat.
· Jelszó visszaállítási link: Azoknak a felhasználóknak, akik elfelejtették a
jelszavukat, a &quot;Elfelejtetted a jelszavad?&quot; link segítségével kezdeményezhetik
a jelszó visszaállítását.
Google, Facebook, GitHub Bejelentkezés
· Bemenet: A felhasználó rákattint a kívánt bejelentkezési módra (Google,
Facebook, vagy GitHub).
· Várt eredmény: A rendszer átirányítja a felhasználót a megfelelő hitelesítési
oldalra (Google/Facebook/GitHub), ahol bejelentkezhet. Sikeres bejelentkezés
után a felhasználó visszatér az alkalmazásba a kívánt tartalommal.

Hagyományos Email és Jelszó Bejelentkezés
· Bemenet: A felhasználó megadja az email címét és jelszavát, majd rákattint a
&quot;Bejelentkezés&quot; gombra.
· Várt eredmény: A rendszer ellenőrzi az email és jelszó helyességét. Ha a
bejelentkezés sikeres, a felhasználó hozzáfér a fiókjához. Ha a bejelentkezés
sikertelen, hibaüzenet jelenik meg.
Regisztráció
· Bemenet: A felhasználó rákattint a &quot;Nincs még fiókod? Regisztrálj&quot; linkre.
· Várt eredmény: A rendszer navigál a regisztrációs oldalra, ahol a felhasználó
regisztrálhat egy új fiókot.
Felhasználói Élmény
· Az alkalmazás biztosítja a felhasználók számára a könnyű navigációt, amely
gyorsan és kényelmesen elérhető minden szükséges funkcióval.
· A bejelentkezési felület reszponzív, tehát különböző eszközökön (asztali
számítógépek, mobiltelefonok, tabletek) is jól működik.
Böngésző és Eszköz Támogatás
A bejelentkezési funkciókat az alábbi böngészők és eszközök tesztelésével
biztosítjuk:
· Böngészők: Google Chrome, Firefox, Safari, Microsoft Edge
· Eszközök: Asztali számítógépek,
Biztonság és Adatkezelés
A felhasználói adatokat titkosítva tároljuk, és biztosítjuk, hogy minden bejelentkezési
folyamat SSL titkosítással történjen a felhasználói adatok védelme érdekében.
Hibakezelés
Ha a felhasználó helytelen adatokat ad meg, a rendszer hibaüzenetet jelenít meg,
amely tartalmazza a problémát (pl. &quot;Helytelen email cím&quot; vagy &quot;Helytelen jelszó&quot;).
Visszajelzés és Támogatás
Ha a felhasználó problémába ütközik a bejelentkezés során, lehetőség van
kapcsolatba lépni a támogatási csapattal egy hiba bejelentéséhez.

Felhasználói Bejelentkezés Helytelen Adatokkal
Felhasználói Bejelentkezés Helytelen Adatokkal Tesztelési
Forgatókönyvek
A rendszer megfelelő működésének tesztelése érdekében többféle hibás
bejelentkezési forgatókönyvet kell végrehajtani, hogy biztosítsuk a felhasználói
bejelentkezés során keletkező hibák megfelelő kezelését. Az alábbiakban a
különböző hibás bejelentkezési esetek és azok tesztelési forgatókönyvei találhatóak:
Hibás Felhasználónév (Email Cím)
· Bemenet: A felhasználó hibás email címet ad meg, amely nem található a
rendszerben, vagy nem megfelelő az email cím, jelszó páros.
· Várt eredmény: A rendszer hibaüzenetet ad, miszerint az email cím és jelszó
páros nem megfelelő.
o Hibaüzenet példája: &quot;Helytelen email cím vagy jelszó.&quot;

Hibás Jelszó
· Bemenet: A felhasználó helyes email címet ad meg, de hibás jelszót ír be.
· Várt eredmény: A rendszer hibaüzenetet ad, miszerint az email cím és jelszó
páros nem megfelelő.
o Hibaüzenet példája: &quot;Helytelen email cím vagy jelszó.&quot;

Üres Felhasználónév vagy Jelszó
· Bemenet: A felhasználó üresen hagyja az email cím és/vagy jelszó mezőt.
· Várt eredmény: A rendszer figyelmeztető üzenetet ad, miszerint a
felhasználónév és/vagy jelszó mezők kitöltése kötelező.
o Figyelmeztető üzenet példája: &quot;Az email cím és jelszó megadása
kötelező.&quot;

Helytelen Karakterek a Felhasználónévben vagy Jelszóban
· Bemenet: A felhasználó speciális karaktereket, mint pl. #, %, &amp; ad meg az
email címben vagy jelszóban.
· Várt eredmény: A rendszer figyelmeztetést ad, miszerint az email cím vagy
jelszó nem tartalmazhat speciális karaktereket, ha azok nem engedélyezettek.
o Figyelmeztető üzenet példája: &quot;A felhasználónév és/vagy jelszó nem
tartalmazhat speciális karaktereket.&quot;

Túl Hosszú Jelszó vagy Felhasználónév
· Bemenet: A felhasználó túl hosszú felhasználónevet vagy jelszót ad meg,
amely meghaladja a rendszerben megengedett maximális karakterhosszt (pl.
több mint 255 karakter).
· Várt eredmény: A rendszer figyelmeztető üzenetet ad, miszerint a
felhasználónév vagy jelszó túl hosszú.
o Figyelmeztető üzenet példája: &quot;A felhasználónév és/vagy jelszó
hossza túl hosszú.&quot;

Tesztelés Végrehajtása
A tesztelési forgatókönyveket különböző böngészőkben és eszközökön hajtottuk
végre, hogy biztosítsuk a helyes működést minden környezetben.
Tesztelt Böngészők:
· Google Chrome
· Firefox
· Safari
· Microsoft Edge
Tesztelt Eszközök:
· Asztali számítógép
Tesztelés Eredményei:
A tesztelés alapján a rendszer megfelelő hibajelzéseket adott minden hibás
adatbevitel esetén. A hibás felhasználói bejelentkezés minden esetben megfelelő
hibaüzenetet generált, és a felhasználó nem tudott sikeresen bejelentkezni helytelen
adatokkal. Az üres mezők és a túl hosszú felhasználónév/jelszó esetén figyelmeztető
üzenet jelent meg.

Dokumentáció - Webshop Szűrés és Kosár Funkciók

Szűrési Funkciók
A rendszer lehetővé teszi a felhasználók számára, hogy különböző szűrési
kritériumok alapján keresgéljenek a webshopban. Az alábbiakban a szűrési funkciók
és azok tesztelési forgatókönyvei találhatóak.
Ár Max Szűrő
· Funkció: A felhasználó beállíthatja a kereséshez használt maximális árat. Az
alapértelmezett maximális ár 200 000 Ft.
· Bemenet: A felhasználó beállítja a maximális árat 200 000 Ft-ra.
· Várt eredmény: A rendszer a beállított ár limit szerint szűri a termékeket, és
csak azok a termékek jelennek meg, amelyek ára nem haladja meg a
megadott limitet.
Tesztelési forgatókönyv:
o Bemenet: A felhasználó 200 000 Ft-ot állít be az ár szűrőben.
o Várt eredmény: A rendszer csak azokat a termékeket jeleníti meg,
amelyek ára nem haladja meg a 200 000 Ft-ot.

Kategória Szűrő
· Funkció: A felhasználó a termékek kategóriái között választhat. Az alábbi
kategóriák állnak rendelkezésre:
 Táskák (��)
 Sátrak (⛺)
 Biciklik (��)
 Cipők (��)
 Hálózsákok (��)
 Összes kategória
· Bemenet: A felhasználó kiválasztja a kívánt kategóriát a legördülő listából.
· Várt eredmény: A rendszer csak a kiválasztott kategóriába tartozó
termékeket jeleníti meg.

Tesztelési forgatókönyv:

 Bemenet: A felhasználó kiválasztja a &quot;Cipők&quot; kategóriát a legördülő
listából.
 Várt eredmény: A rendszer csak a cipő kategóriába tartozó termékeket
jeleníti meg.

Kosár Funkciók
A kosárban lévő termékek és azok kezelésével kapcsolatos funkciók. A felhasználó
láthatja a kosarában található termékeket, azok árát, és folytathatja a vásárlást.
Kosár Üzenet
· Funkció: Ha a felhasználó kosara üres, a rendszer tájékoztatja őt, hogy &quot;Az
Ön kosara üres.&quot;
· Bemenet: A felhasználó nem ad hozzá terméket a kosárhoz.
· Várt eredmény: A rendszer megjeleníti az üzenetet: &quot;Az Ön kosara üres.&quot;
Tesztelési forgatókönyv:
o Bemenet: A felhasználó nem ad hozzá semmilyen terméket a
kosárhoz.
o Várt eredmény: A rendszer megjeleníti az üzenetet: &quot;Az Ön kosara
üres.&quot;
Kosár Végösszeg
· Funkció: A rendszer kiszámítja a kosár végösszegét és azt megjeleníti. Az
alapértelmezett végösszeg 0 Ft, ha nincs termék a kosárban.
· Bemenet: A felhasználó hozzáad egy vagy több terméket a kosárhoz.
· Várt eredmény: A rendszer frissíti a végösszeget és megjeleníti az aktuális
összeget.
Tesztelési forgatókönyv:
o Bemenet: A felhasználó hozzáad egy &quot;Túracipőt&quot; 20 000 Ft értékben a
kosárhoz.
o Várt eredmény: A végösszeg 20 000 Ft-ra frissül.

Tovább a Rendeléshez
· Funkció: A felhasználó a &quot;Tovább a rendeléshez&quot; gombra kattintva tovább
léphet a rendelés részletezéséhez, ahol a vásárlási folyamat folytatódik.
· Bemenet: A felhasználó a kosárban található termékekre kattint, majd a
&quot;Tovább a rendeléshez&quot; gombra kattint.
· Várt eredmény: A rendszer a vásárlás következő lépésére navigálja a
felhasználót.
Tesztelési forgatókönyv:
 Bemenet: A felhasználó rákattint a &quot;Tovább a rendeléshez&quot; gombra.
 Várt eredmény: A rendszer navigál a rendelés következő oldalára,
ahol a vásárló kitöltheti a szállítási adatokat.

Termékek a Kosárban
A felhasználó a termékeket hozzáadhatja a kosárhoz, és azok részletei az alábbiak
szerint jelennek meg:
Teszt
· Ár: Teszt Ft
· Bemenet: A felhasználó hozzáadja a &quot;Teszt&quot; terméket a kosárhoz.
· Várt eredmény: A rendszer megjeleníti a terméket a kosárban és frissíti a
végösszeget.

Tesztelési Környezet
A tesztelést különböző böngészőkben és eszközökön végeztük el, hogy biztosítsuk a
szűrés és kosár funkciók megfelelő működését minden környezetben.
Tesztelt Böngészők:
· Google Chrome
· Firefox
· Safari
· Microsoft Edge

Tesztelt Eszközök:
· Asztali számítógép
Tesztelés Eredményei:
A tesztelés alapján a szűrési és kosár funkciók minden esetben megfelelően
működtek, és az árak, kategóriák és termékek helyesen lettek szűrve. A kosár
megfelelően frissítette a végösszeget, és a vásárlási folyamat lépései is
zökkenőmentesen zajlottak.
Kosár Tartalom Megjelenítése
A kosár tartalma a felhasználó által kiválasztott termékeket és azok részleteit
tartalmazza. Az alábbiakban bemutatjuk, hogyan kell megjeleníteni a kosárban lévő
termékeket és annak funkcióit.
Termék Megjelenítése a Kosárban
· Termék: Túra Cipő Asics GTX
· Ár: 22 000 Ft
· Mennyiség: 1
Bemenet: A felhasználó hozzáadja a &quot;Túra Cipő Asics GTX&quot; terméket a
kosárhoz.
Várt eredmény: A rendszer megjeleníti a következő adatokat a kosárban:
o Termék neve: Túra Cipő Asics GTX
o Ár: 22 000 Ft
o Mennyiség: 1
o Termék kép: A termékhez tartozó kép is megjelenik a kosárban.
Tesztelési forgatókönyv:
o Bemenet: A felhasználó hozzáadja a &quot;Túra Cipő Asics GTX&quot; terméket
a kosárhoz.
o Várt eredmény: A kosár megjeleníti a termék nevét, árát, és a termék
képét.

Mennyiség Módosítása
· Funkció: A felhasználó módosíthatja a kosárban lévő termékek mennyiségét.
· Bemenet: A felhasználó a &quot;Túra Cipő Asics GTX&quot; termék mellett található
mennyiség módosító gombra kattint (pl. plusz gomb a mennyiség növelésére).
· Várt eredmény: A rendszer frissíti a termék mennyiségét, és az új összeg
(mennyiség * ár) frissül a végösszegnél.
Tesztelési forgatókönyv:
 Bemenet: A felhasználó rákattint a mennyiség növelésére szolgáló
gombra.
 Várt eredmény: A mennyiség megnövekszik, és az új végösszeg
megjelenik.
Termék Eltávolítása a Kosárból
· Funkció: A felhasználó eltávolíthatja a terméket a kosárból.
· Bemenet: A felhasználó rákattint a &quot;Törlés&quot; gombra a termék mellett.
· Várt eredmény: A rendszer eltávolítja a terméket a kosárból, és frissíti a
végösszeget.
Tesztelési forgatókönyv:
o Bemenet: A felhasználó rákattint a &quot;Törlés&quot; gombra a &quot;Túra Cipő Asics
GTX&quot; termék mellett.
o Várt eredmény: A termék eltávolításra kerül a kosárból, és a
végösszeg frissül.

Kosár Végösszeg és Tovább a Vásárláshoz
Kosár Összegének Megjelenítése
· Funkció: A rendszer megjeleníti a kosár végösszegét, amely a kosárban lévő
összes termék árának összege.
· Bemenet: A felhasználó hozzáadja a &quot;TesztX&quot; terméket a kosárhoz.

· Várt eredmény: A rendszer kiszámítja a végösszeget, amely a következő
képpen jelenik meg:
o Összeg: Teszt Ft
Tesztelési forgatókönyv:
o Bemenet: A felhasználó hozzáadja a &quot;Teszt&quot; értéket a kosárhoz.
o Várt eredmény: A végösszeg Teszt Ft-ra frissül.

Tovább a Rendeléshez Gomb
· Funkció: A felhasználó a &quot;Tovább a rendeléshez&quot; gombra kattintva
továbbléphet a rendelés részletezéséhez.
· Bemenet: A felhasználó rákattint a &quot;Tovább a rendeléshez&quot; gombra.
· Várt eredmény: A rendszer a rendelés következő lépésére navigálja a
felhasználót, ahol a vásárlási folyamat folytatódik.
Tesztelési forgatókönyv:
 Bemenet: A felhasználó rákattint a &quot;Tovább a rendeléshez&quot; gombra.
 Várt eredmény: A rendszer navigál a rendelés következő oldalára.

Vissza a Főoldalra Gomb
· Funkció: A felhasználó visszatérhet a főoldalra a kosárban található &quot;Vissza a
főoldalra&quot; gomb segítségével.
· Bemenet: A felhasználó rákattint a &quot;Vissza a főoldalra&quot; gombra.
· Várt eredmény: A rendszer a főoldalra navigálja a felhasználót.
Tesztelési forgatókönyv:
o Bemenet: A felhasználó rákattint a &quot;Vissza a főoldalra&quot; gombra.
o Várt eredmény: A rendszer visszavezet a főoldalra.

Kosárban Lévő Kép Megjelenítése
A kosár minden termékének tartalmaznia kell egy képet, amely az adott termékről
készült. A kép megjelenítése segít a felhasználónak azonosítani a terméket.

Kép Megjelenítése
· Funkció: Minden termékhez tartozik egy kép, amely a kosárban megjelenik.
· Bemenet: A felhasználó hozzáadja a &quot;Teszt&quot; terméket a kosárhoz.
· Várt eredmény: A rendszer megjeleníti a termék képét a kosárban a termék
neve és ára mellett.
Tesztelési forgatókönyv:
o Bemenet: A felhasználó hozzáadja a &quot;Teszt&quot; terméket a kosárhoz.
o Várt eredmény: A rendszer megjeleníti a termék képét a kosárban.

Tesztelési Környezet
A tesztelést különböző böngészőkben és eszközökön végeztük el, hogy biztosítsuk a
kosár funkciók megfelelő működését minden környezetben.
Tesztelt Böngészők:
· Google Chrome
· Firefox
· Safari
· Microsoft Edge
Tesztelt Eszközök:
· Asztali számítógép
A tesztelés alapján a kosár funkciók minden esetben megfelelően működtek, és az
árak, képek, valamint a mennyiségváltoztatás és a törlés is hibátlanul zajlottak. Az
összeg mindig helyesen lett kiszámítva és frissítve, és a vásárlási folyamat
zökkenőmentesen folytatódott.

Rendelés Folyamata
Rendelés Adatainak Megadása
A rendelés során a felhasználónak meg kell adnia bizonyos adatokat a rendelés
véglegesítéséhez. Az alábbiakban bemutatjuk, hogyan kell kezelni és validálni a
rendelési adatokat.
Felhasználói Adatok Megadása
A felhasználó az alábbi adatokat adja meg a rendelés során:
· Név: A felhasználó teljes neve
· Cím: A szállítási cím
· Rendelés Dátuma: Az aktuális dátum, például: 2025. 04. 06.
· Megjegyzés: Bármilyen megjegyzés, kérés a rendeléshez
· Telefonszám: A felhasználó telefonszáma
· Email: A felhasználó email címe
· Fizetési Mód: A választott fizetési mód, például készpénz
Kosár Tartalma
A rendelés tartalmazza a kosárban lévő termékeket, azok mennyiségét és árát. A
kosárban lévő termékek a következőképpen jelennek meg:
· Termék neve: Túra Cipő Asics GTX
· Mennyiség: 1 db
· Ár: 22 000 Ft
· Végösszeg: 22 000 Ft

Fizetési Mód
A felhasználó választhatja a fizetési módot, amely jelen esetben készpénz. Az
alkalmazott fizetési mód a rendelés véglegesítése előtt megjelenik, hogy a
felhasználó megerősíthesse a választást.

Bemenet és Várt Eredmény
· Bemenet: A felhasználó megadja a szükséges adatokat (név, cím,
telefonszám, email, fizetési mód stb.), és véglegesíti a rendelést.
· Várt eredmény: A rendszer validálja a megadott adatokat, és a rendelési
információkat a felhasználó számára megjeleníti a rendelés részletezése előtt.
A végösszeg és a kosár tartalma is frissül, hogy a felhasználó számára
világosan látszódjon a vásárlás.
Rendelés Ellenőrzése és Véglegesítés
Rendelés Adatainak Megjelenítése
A felhasználó számára megjelenik a rendelés összefoglalója, amely tartalmazza az
összes megadott adatot és a vásárolt termékek listáját. A rendelés véglegesítéséhez
a felhasználónak el kell fogadnia a feltételeket és a fizetési módot.
· Név: A felhasználó által megadott név
· Cím: A felhasználó által megadott cím
· Rendelés Dátuma: 2025. 04. 06.
· Megjegyzés: Bármilyen megjegyzés, amit a felhasználó a rendeléshez
hozzáadott
· Telefonszám: A felhasználó által megadott telefonszám
· Email: A felhasználó által megadott email cím
· Fizetési Mód: Készpénz
Kosár Tartalma és Végösszeg
· Kosár tartalma:
o Teszt - 1 db
· Végösszeg: Teszt Ft
Tesztelési Forgatókönyv
· Bemenet: A felhasználó kitölti a rendelési űrlapot a szükséges adatokkal.
· Várt eredmény: A rendszer megfelelően megjeleníti a felhasználó által
megadott adatokat, és a kosár végösszege is helyesen kerül kiszámításra. A
rendelés teljes összegzése és a választott fizetési mód helyesen jelenik meg.
Tesztelési Környezet

A tesztelést különböző böngészőkben és eszközökön végeztük el, hogy biztosítsuk a
rendelési funkciók megfelelő működését minden környezetben.
Tesztelt Böngészők:
· Google Chrome
· Firefox
· Safari
· Microsoft Edge
Tesztelt Eszközök:
· Asztali számítógép
Tesztelés Eredményei:
A tesztelés alapján a rendelési űrlap megfelelően működött, és a rendszer minden
adatot helyesen validált és megjelenített. A végösszeg és a kosár tartalma pontosan
megjelent, és a rendelési információk is helyesen kerültek rögzítésre.
Dokumentáció - Profil Oldal
Profil Megjelenítése
A felhasználói profil oldalán a felhasználó személyes adatai és aktivitásai jelennek
meg. Az alábbiakban bemutatjuk, hogyan kell kezelni a felhasználói adatokat és az
interakciókat.
Felhasználói Információk
A profil oldal tartalmazza a következő adatokat:
· Megjelenítési név: Teszt
· E-mail cím: teszt@gmail.com

Személyes Adatok
A személyes adatokat tartalmazó szekció, amelyben a felhasználó számára
elérhetőek a következő mezők:
· Vezetéknév
· Keresztnév
· Születéshelye
· Anya születéshelye
· Anya leánykori neve
· Telefonszám
· Lakcím
A felhasználó az adatait itt tudja megtekinteni, és szükség szerint módosíthatja. A
változtatásokat általában egy &quot;Mentés&quot; gombbal véglegesítheti.
Kommentek Története
A felhasználó által írt hozzászólások és csevegések története itt található, beleértve
a dátumokat és az üzenetek tartalmát. Ez a szekció a felhasználó aktivitását mutatja:
· Csevegő üzenet 1 - Dátum: 2025-04-06 05:38
· Csevegő üzenet 2 - Dátum: 2025-04-06 05:40
· Csevegő üzenet 3 - Dátum: 2025-04-06 05:40
· Csevegő üzenet 4 - Dátum: 2025-04-06 05:40
· Csevegő üzenet 5 - Dátum: 2025-04-06 05:43

Vásárlási Előzmények
A felhasználó vásárlásainak előzményei is megjelennek, beleértve a vásárolt
termékeket és a szállítási információkat:
· Vásárlás: test
· Cím: teszt
· Dátum: 2025-04-06
· Idő: 04:02

Bemenet és Várt Eredmény
· Bemenet: A felhasználó megnyitja a profil oldalát, hogy megtekintse és
szerkessze a személyes adatait, kommentjeit és vásárlási előzményeit.
· Várt eredmény: A rendszer megfelelően betölti a felhasználó profilját, és
minden adatot, beleértve a személyes adatokat, csevegő üzeneteket és
vásárlási előzményeket, helyesen jelenít meg.
Tesztelési Forgatókönyv
A tesztelés során biztosítani kell, hogy a felhasználói profil megfelelően működjön
minden böngészőben és eszközön.
Tesztelt Böngészők:
· Google Chrome
· Firefox
· Safari
· Microsoft Edge
Tesztelt Eszközök:
· Asztali számítógép
Tesztelés Eredményei:
A tesztelés alapján a profil oldal megfelelően működött. A felhasználói adatok,
csevegések és vásárlási előzmények pontosan jelennek meg, és a rendszer lehetővé
tette az adatok szerkesztését.

Összefoglalás
A projekt célja egy jól működő, felhasználóbarát weboldal fejlesztése volt, amely
támogatja a túrázó közösséget felszerelésvásárlásban, formázásban és
információmegosztásban. Ennek keretében egy optimalizált webshopot, egy
interaktív térképet és egy dinamikus fórumot valósítottunk meg. A különböző funkciók
összehangolása technikai kihívásokkal járt, de sikerült stabil rendszert kialakítani.
A rendszeres tesztelés segített a hibák időbeni felismerésében, a kompatibilitás
javításában és a felhasználói visszajelzések beépítésében. Ennek köszönhetően egy
jól használható platform született, amely ugyan még további fejlesztéseket igényel,
de már most is képes hatékonyan kiszolgálni a felhasználók igényeit.
A jövőbeni tervek között szerepel a webshop funkcióinak bővítése, a fórum és a
térkép interaktív fejlesztése, valamint a rendszer skálázhatóságának növelése.
Összességében egy ígéretes alapokra épülő, hosszú távon fenntartható és
továbbfejleszthető rendszert hoztunk létre.