//Selected The Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

//Get Item From Localstorage
let data = localStorage.getItem("TODO");

//Check If Data Is Not Empty
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length; //Set the ID to the last one in the list
    loadList(LIST); //Load the list to the user interface
} else {
    //If data is not empty
    LIST = [];
    id = 0;
}

//Load Items To User's Interface
function loadList(array){
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Clear The Local Storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Show Todays date
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Add to-do function
function addToDo(toDo, id, done, trash) {
    if(trash) {return;}

    const DONE = done ? CHECK: UNCHECK;
    const LINE = done ? LINE_THROUGH: "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
                </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//Add An Item To The List User The Enter Key
document.addEventListener("keyup", function(even){
    if(event.keyCode == 13) {
        const toDo = input.value;
        //If the input isn't empty
        if(toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //Add Iten To Localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++; 
        }
        input.value = "";
    }
});

//Complete To-Do Item
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remove To-Do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//Target the items created dynamically
list.addEventListener("click", function(){
    const element = event.target; //Return The Clicked Element inside List
    const elementJob = element.attributes.job.value; //Complete or Delete
    if(elementJob == "complete") {
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }
    //Add Item To Localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

