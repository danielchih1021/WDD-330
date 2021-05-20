import { Hike } from './hike.js';

let hikes = [];

let hike1 = new Hike("Hike 1","Bechler Falls", "../hikes/images/falls.jpg", "3 miles","Easy");
let hike2 = new Hike("Hike 2","Teton Canyon", "../hikes/images/falls.jpg", "3 miles", "Easy");
let hike3 = new Hike("Hike 3","Denanda Falls", "../hikes/images/falls.jpg", "7 miles", "Moderate");


hikes.push(hike1);
hikes.push(hike2);
hikes.push(hike3); 
console.log(hikes);

const ul = document.querySelector('#hikes'); 



hikes.forEach(
    hikes =>{
        ul.innerHTML +=
        `
        <h2>${hikes.HikeNumber}</h2>
        <li>
            <div>
                <img id="picture" src="${hikes.Picture}">
            </div>
            
            <div>
                <span id="name">${hikes.Name}</span><br>
                <span id="distance">${hikes.Distance}</span><br>
                <span id="difficulty">${hikes.Difficulty}</span><br>
            </div>
        </li>
        `;
    }
)