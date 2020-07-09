const body = document.querySelector("body");
const IMG_NUMBER = 3;

function paintImage(imgNumber){
    const image = new Image(); // 이미지 객체 생성
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image); // 뒤에 이미지들을 가리지 않게
}

function getRandom(){
    return Math.floor(Math.random() * IMG_NUMBER) + 1;
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}
init();