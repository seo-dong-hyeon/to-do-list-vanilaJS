const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date(); // 시간을 가져올 수 있는 객체
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${hours < 10 ? `0${hours}`: hours}:${minutes < 10 
        ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}`: seconds}`

}


function init(){
    getTime();
    setInterval(getTime,1000); // 1000sec마다 한번씩 getTime 함수 호출
}
init();