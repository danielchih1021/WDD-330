let firstName = "Daniel";
let lastName = "Chih";
let iNumber = '111222333';

let student1 = {
    firstName: "Daniel",
    lastName: "Chih",
    iNumber:'1112223333'
}

log(firstName);

let students = [];

students.push(student1);

localStorage.setItem("students", JSON.stringify(students));

//function declaration
function log(variableName){
    console.log(variableName);
}