import {Todo} from './todo.js';

let toDoList = [];

let todo1= new Todo('Mow the lawn');
let todo2= new Todo('Do the dishes');
let todo3= new Todo('Visit grandma');
let todo4= new Todo('Sweeping');

toDoList.push(todo1);
toDoList.push(todo2);
toDoList.push(todo3);
toDoList.push(todo4);

let ul = document.querySelector('ul');

toDoList.forEach(
    todoItem => {
        ul.innerHTML += 
            `<li> 
                <input type="checkbox" id="">
                <span>${ todoItem.Content }</span>
                <button>X</button>
            <li>`;
    }
);