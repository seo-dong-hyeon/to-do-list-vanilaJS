const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input")
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = []; // 변경 가능해야

function saveToDos(){
    // localStorage는 string 타입만 저장 가능
    // localStorage에 배열형태로 저장 가능
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); 
}

function deleteToDo(event){
    const btn = event.target; // event가 일어난 객체
    const li = btn.parentNode; // delete가 속한 부모 li
    toDoList.removeChild(li); // ul에서 제거

    // filter -> 참인 것만 리턴 -> toDos 배열에 제거되지 않은 객체들 저장
    const cleanToDos = toDos.filter(function(todo){
        return todo.id !== parseInt(li.id);  // li의 id는 string
    });
    toDos = cleanToDos;
    saveToDos();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "X";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.id = newId; // li 객체에 id 값 설정

    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);

    toDoObj = {
        id: newId,
        text: text
      };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    paintToDo(toDoInput.value);
    toDoInput.value = ""; // 초기화 
}

function loadToDos(){
    loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // string -> object list    
        
        /* array의 list들을 한번씩 수행 */
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}
init();