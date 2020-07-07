const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greetings = document.querySelector(".js-greetings");
const USER_LS = "currentUser", 
    SHOWING_CN = "showing";


function saveName(name){
    localStorage.setItem(USER_LS,name); // {key : value}의 쌍으로 저장 -> value는 반드시 string
}

function handleSubmit(event){
    event.preventDefault(); // 기본적으로 submit은 내용을 없애고 페이지 새로고침 -> 그 과정을 막음
    // 기본적으로 다루는 모든 요소들에 display: none
    // showing class는 display:block -> 보여짐
    // 상황에 따라 보여주고 싶은 태그에 showing class 추가, 가리고 싶은 태그에 showing class 제거
    form.classList.remove(SHOWING_CN);
    greetings.classList.add(SHOWING_CN);
    
    greetings.innerText = `Hello ${input.value}`; // 제출된 input의 내용을 넣으려는 태그의 내용으로
    saveName(input.value);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greetings.classList.add(SHOWING_CN);
    greetings.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){ 
      askForName();
    }
    else{
        paintGreeting(currentUser);
    }
  }

function init(){
    loadName();
}
init();