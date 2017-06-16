/*
        FUNCTIONS
*/
// recuperation du nb de jr du mois courant
function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
//Ajouter la nouvelle balise à l'objet 'parent'. Ex: Ajouter le 'tr' dans le 'table'
function append(parent, balise) {
    return parent.appendChild(document.createElement(balise));
}
function erase_childs(item,index){
    item.parentNode.removeChild(item);
}

/*
        VARIABLES
*/
let username = document.querySelector('#username');
if(username != null) username = username.innerText;
let $ = document.querySelector.bind(document);
let current = new Date();
    
let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']
;

let m = $('.month');
m.innerHTML = monthNames[current.getMonth()] + ' ' + current.getFullYear();

/*
        DRAW CALENDAR
*/
let deleteCalendar = function() {
    let oldCal = document.querySelector('#calendar');
    oldCal.removeChild(oldCal.firstElementChild);
}
let drawCalendar = function(cu) {
    let firstDay = new Date(cu),
        dayCount = getDaysInMonth(cu),
        div = $('#calendar'),
        table = document.createElement('table');

    firstDay.setDate(0); // setDate(0) renvoie premier jour du mois
    let startDay = firstDay.getDay();

    //Inclusion des td pour les carré des mois précédents
    let k,
        column = 0,
        row = append(table, 'tr'),
        cell;
    
    for (k=0 ; k < 7 ; k++) {
        day = append(row,'th')
        day.innerHTML = dayNames[k];
    }
    
    row = append(table, 'tr');
    
    // permet de mettre les deux cellule de debut à vide
    for (let i = 0; i < startDay; i++) {
        cell = append(row, 'td');
        column++;
    }

    for (let i = 1; i <= dayCount; i++)
    {
        if(row == null) {  // if no line we create it
            row = append(table, 'tr');
        }

        cell = append(row, 'td');
        cell.dataset.day = i;
        cell.dataset.month = cu.getMonth()+1;
        cell.dataset.year = cu.getFullYear();
        cell.className = 'choices';
        
        header = append(cell, 'div');
        header.className = 'header';
        header.innerHTML = i ;
        content = append(cell, 'div');
        content.className = 'choices';

        column++;
        if (column == 7) {
            row = null;
            column = 0;
        }
    }
    div.appendChild(table);
}