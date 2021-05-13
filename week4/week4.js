import {Car} from './car.js';

let cars = [];

let car1 = new Car('Toyota', 'Tundra', 2007, 'Gold');
let car2 = new Car('Ford', 'F-150', 2021, 'Silver');

cars.push(car1);
cars.push(car2);

// cars.forEach(
//     car => {
//         if (car.Color) {
//             console.log(car.Color)
//         } else {
//             console.log('This car color is unknown');
//         }
//     }
// )

// console.log(cars);

localStorage.setItem('cars', JSON.stringify(cars));

let ul = document.querySelector('ul');

cars.forEach(
    car => {
        ul.innerHTML +=
            `<li>${car.Make} ${car.Model} ${car.Year}</li>`
    }
)

// let make = 'Toyota';
// let model = 'Tundra';
// let year = '2007';
// let color = 'Gold';

// function print(make, model, year, color){
//     console.log(make);
//     console.log(model);
//     console.log(year);
//     console.log(color);
// }