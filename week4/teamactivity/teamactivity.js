let tds = document.querySelectorAll('td');
tds.forEach(
    td => {
        td.textContent = "Unselected";
    }
);

function addPiece (e) {
    console.log(e);
}

td.addEventListener('touchend', addPiece);

