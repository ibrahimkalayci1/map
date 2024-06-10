import { v4 as uuidv4 } from 'https://jspm.dev/uuid'; 
import {detecIcon,detecType,setStorage} from "./helpers.js";
//HTMLDEN GELENLER
const form = document.querySelector("form");
const list = document.querySelector("ul");

//OLAY İZLEYİCİLERİ
form.addEventListener("submit",handleSubmit);
list.addEventListener("click", handleClick);
// ortak kullanım alanı
var map;
var layerGroup = [];
var notes = JSON.parse(localStorage.getItem("notes")) || [];
var coords = [];
// kullanıcının konmunu ögrenmek için getcurrent metodunu kullandık (window) navigator- geolocation getcurrent...

(navigator.geolocation.getCurrentPosition)(loadMap, errorFunction);
function errorFunction(){
    
}
// haritaya tıklanınca çalışır
function onMapClick(e) {
    //haritaya tıklanıldıgında form bileşeninin display inin flex yaptık
    form.style.display = "flex";
    
//haritada tıkladgmz yerin kordintlrnı coords dizisi içine aktarma
    coords = [e.latlng.lat,e.latlng.lng];
    
}
    

//kullanıcının konumuna göre haritayı ekrana aktarır
function loadMap(e) {
    
    // 1.haritanın kurulumu
    map = L.map('map').setView([e.coords.latitude, e.coords.longitude],13);
L.control;
//2 haritanın nasl görünecegini belirliyo
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//haritada ekrana basacağımız imleçleri tutacağımız katman
layerGroup = L.layerGroup().addTo(map);

// localden gelen notları listeleme
renderNoteList(notes);

// aritada bir tıklanma oldgnda calısacak fonksiyon
map.on('click', onMapClick);
}

function renderMarker(item){
    
    //L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
    //marker oluşturur
    L.marker(item.coords,{icon:detecIcon(item.status) })
    .addTo(layerGroup) //imleçlerin olduğu katmana ekler
    .bindPopup(`${item.desc}`); // üzerine tıklanınca açılacak popup ekleme
}


function handleSubmit(e){
    e.preventDefault(); //sayfanın yenilenmesinin engeller
    
    //formun içindeki inputların dğerlerini alma
    const desc = e.target[0].value;
    const date = e.target[1].value;
    const status = e.target[2].value;

    notes.push({
        id: uuidv4(),
        desc,
        date,
        status,
        coords,

});

//local storage güncelle
setStorage(notes);

// render fonksiyonuna arametre olara notes dizisini gönderdi
renderNoteList(notes)
//form gönderildiğinde kapat
form.style.display = "none";
}

//ekrana notları aktaracak fonksiyon
function renderNoteList(item) {
    
    //notlar(list) alanını temizler
    list.innerHTML="";
    //markerları temizler
    layerGroup.clearLayers();
    //her bir not için li etiketi olustrr ve içergni günceller
    item.forEach((item) => {
      const listElement =  document.createElement("li") // eleman oluşturma
     listElement.dataset.id = item.id; // li ekemanına data-id 
    console.log(listElement);
    listElement.innerHTML = ` 
<div>
    <p>${item.desc}</p>
    <p><span>Tarih:</span>${item.date}</p>
    <p><span>Durum:</span>${detecType(item.status)}</p>
</div>
<i class="bi bi-x" id="delete"></i>
<i class="bi bi-airplane-fill" id="fly"></i>
`;
list.insertAdjacentElement('afterbegin',listElement);
    
renderMarker(item)


});
        
    }
    //notes oaayıbda tıklanma olayını izler
function handleClick (e) {
    //güncellenecek elemanın ıd sini ögrenmek için parant eleman kullandık

    const id = e.target.parentElement.dataset.id;
    if (e.target.id === "delete"){

        //idsini bildiğimiz elemanı filter yöntemi ile diziden kaldırdık
      notes =  notes.filter((note) => note.id != id);
      console.log(notes);
      setStorage(notes);//localstorage i güncelle
      renderNoteList(notes)//ekranı güncelle
    }
    
    if (e.target.id === "fly"){ 
        // tıkladıgımız elemanın id si ile dizi içerisindeki elemanlardn herhangi birinin id si eşleşirse bul
       const note = notes.find((note) => note.id ==id); 
        console.log(note);
        map.flyTo(note.coords); // haritayı bulduğumuz elemana yönlendirir
    }
}