let students = [];

if (localStorage.getItem('students')){
    students = JSON.parse(localStorage.getItem('students'));
} else {

let student1 = {
    firstName: 'Tim',
    lastName: "Thayne",
    iNumber: '1112223333'
};

let student2 = {
    firstName: 'Daniel',
    lastName: "Chih",
    iNumber: '1112223333'
};

let student3 = {
    firstName: 'Steve',
    lastName: "Jobs",
    iNumber: '1112223333'
};

// console.log(student1.firstName);

let student4 = {
    firstName: 'Mike',
    lastName: "Tyson",
    iNumber: '1112223333'
}



students.push(student1);
students.push(student2);
students.push(student3);
students.push(student4);

localStorage.setItem('students', JSON.stringify(students));

};

// console.log(students);

//Good
// for (var i = 0; i < students.length; i++) {

// }

let tbody = document.querySelector('tbody');

//Better
function displayStudents(){

    //Clear table
    tbody.innerHTML = '';
    students.forEach(
        student => {
            tbody.innerHTML += 
            `
            <tr>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.iNumber}</td>
            </tr>`;   
        }
    );
};

displayStudents();

let trTags = document.querySelectorAll('tr');
trTags.forEach(
    trTag => {
        trTag.addEventListener('click', (e) => {
            console.log(e.target);
        })
    }
);

// students.forEach(
//     student => {
//         let tr = document.createElement('tr');
//         tr.addEventListener('click', (e) => {
//             console.log(e.target);
//         });
//         let tdFirstName = document.createElement('td');
//         tdFirstName.textContent = student.firstName;
//         let tdLastName = document.createElement('td');
//         tdLastName.textContent = student.lastName;
//         let tdINumber = document.createElement('td'); 
//         tdINumber.textContent = student.iNumber;
    
//         tr.appendChild(tdFirstName);
//         tr.appendChild(tdLastName);
//         tr.appendChild(tdINumber);

//         tbody.appendChild(tr);
//     }
// );

//Best
// let studentsUpper = students.map(
//     student => {
//         return student.lastName.toUpperCase();
//     }
// );

// console.log(studentsUpper);

let button = document.querySelector('button');
button.addEventListener("click", () => {
    console.log('in button click event');
    let newStudent = {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        iNumber: document.querySelector('#iNumber').value,
    };
    students.push(newStudent);

    localStorage.setItem('students', JSON.stringify(students))

    displayStudents();
});