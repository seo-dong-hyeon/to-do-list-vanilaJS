const weather = document.querySelector(".js-weather");
const COORDS = "coords",
    API_KEY = "2346fd7d513b885368a65494701b0e5d";


function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function(response){ // 순차적 처리 -> return 값
            return response.json();
        })
        .then(function(json){
            const temperture = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperture} @ ${place}`;
        })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){ // 성공 시 위치정보를 매개변수로 전달하여 호출
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, // latitude: latitude
        longitude // longitude: longititue
    
    };
    saveCoords(coordsObj);
    getWeather(coordsObj.latitude,coordsObj.longitude);
}

function handleGeoFail(position){
    console.log("Geo Load Fail")
}

function askForCoords(){
    // navigator -> 위치를 가져옴
    // geolocation -> 객체 반환
    // getCurrentPosition -> 함수인자로 -> 성공 시, 실패 시 수행 할 함수
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();