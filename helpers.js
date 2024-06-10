export const detecType =(type) => {
    switch(type) {
    case "park": // switch case de if ve ? gibi şart burda kontrol ettik parkyeriyse park yazdrdk not alanına 
    return "Park yeri";
    case "home":
    return "Ev";
    case "job":
    return"iş";
    case "Go to":
        
    return"ziyaret";

}
};

//local storage güncelleyecek fonksiyon
export const setStorage = (data) => {
const strData = JSON.stringify(data); // datayı stringe cevirdik

localStorage.setItem("notes", strData); //stringe cevrilen datayı local storage e gönderdik
};

// bir şeyi güncellemek istedgnde local storage de direk set storage i çagırıp datayı içine gönder

var carIcon = L.icon({
    iconUrl: "car.png",
    iconSize: [50, 60],
    
});

var homeIcon = L.icon ({
    iconUrl:"home-marker.png",iconSize:[50, 60]
});

var jobIcon = L.icon ({
    iconUrl:"job.png",iconSize:[50, 60]
});

var visitIcon = L.icon ({
    iconUrl:"visit.png",iconSize:[50, 60]
});

export const detecIcon = (type) => {
    switch(type){
        case "park":
            return carIcon;
        case "home":
            return homeIcon;
        case "job":
            return jobIcon;
        case "Go to":
            return visitIcon;

    }
};