import {Todo} from './todo.js';

let toDoList = [];

if(localStorage.getItem('toDoList')){
   toDoList = JSON.parse(localStorage.getItem('toDoList'));      
}

displayTodos(toDoList);

function displayTodos(todos) {
    let ul = document.querySelector('ul'); 
    ul.innerHTML="";
    todos.forEach((todoItem)=>{
        ul.innerHTML += 
                    `<li> 
                        <input type="checkbox" data-id="${todoItem.Id}" ${todoItem.Completed ? 'checked' : ''}>
                        <span>${ todoItem.Content }</span>
                        <button data-id="${todoItem.Id}"}>X</button>
                    <li>`;
    });

    let todoCheckboxes = document.querySelectorAll('input[type="checkbox"]');

    todoCheckboxes.forEach(
        todoCheckbox => {
            todoCheckbox.addEventListener('touchend', (e) => {
                let selectedId = e.target.dataset.id;
                let selectedTodo = toDoList.find(todo => todo.Id === parseInt(selectedId));
                
                selectedTodo.Completed = !selectedTodo.Completed;

                localStorage.setItem('toDoList', JSON.stringify(toDoList));
                console.log(selectedTodo);
                let countNotCompleted = 0;
                toDoList.forEach(
                    (toDoListItem) => {
                        if (toDoListItem.Completed == false){
                            countNotCompleted += 1;
                        }
                    }
                )
    document.querySelector("#countTask").innerHTML= countNotCompleted+" tasks left";
            });
        });

    //ToDO: add event listener for each button to delete
    let todoDeleteButtons = document.querySelectorAll('button');

    todoDeleteButtons.forEach((todoDeleteButton) => {
        todoDeleteButton.addEventListener('touchend', (e) => {
            let selectedId = e.target.dataset.id;
            let selectedTodoIndex = toDoList.findIndex(todo => todo.Id === parseInt(selectedId)); 
            
            // delete object from the array
            toDoList.splice(selectedTodoIndex, 1);

            localStorage.setItem("toDoList", JSON.stringify(toDoList));


            displayTodos(toDoList);
        });
    });

    let countNotCompleted = 0;
    toDoList.forEach(
        (toDoListItem) => {
            if (toDoListItem.Completed == false){
                countNotCompleted += 1;
            }
        }
    )
    document.querySelector("#countTask").innerHTML= countNotCompleted+" tasks left";
}


let add = document.querySelector("#add");
add.addEventListener("touchend", (e) => {
    e.preventDefault();
    let input = document.querySelector("#newTask");

    let newToDoItem = new Todo(input.value);
    toDoList.push(newToDoItem);
    input.value="";
    
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    displayTodos(toDoList);
});

document.querySelector("#all").addEventListener("touchend", displayTodos(toDoList)); 
document.querySelector("#active").addEventListener("touchend", displayTodos(toDoList.filter(todo => todo.Completed == false)));
document.querySelector("#completed").addEventListener("touchend", displayTodos(toDoList.filter(todo => todo.Completed == true)));

