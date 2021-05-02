function addNum(){
    event.preventDefault();
    let numbers = document.querySelector("input").value;
    document.querySelector("#numbers").textContent = numbers;
}


function addSum(){
    event.preventDefault();
    let numbers = document.querySelector("#sum").value;
    let sum = 0;
    for(x = 0; x <= numbers; x++){
        sum += x;
        console.log(sum);
    }
    document.querySelector("#total").textContent = sum;
}

function squish(){
    event.preventDefault();
    let number1 = document.querySelector("#sums").value;
    let number2 = document.querySelector("#sums2").value;
    let sum = Number(number1) + Number(number2);
    document.querySelector("#out").textContent = sum;
}

let button = document.querySelector('#texting');
button.addEventListener('click', addNum);

let add = document.querySelector('#plus');
add.addEventListener('click', addSum);

let sums = document.querySelector("#adding");
sums.addEventListener('click', squish);