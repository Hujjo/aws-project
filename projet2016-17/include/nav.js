/*
        PREVIOUS MONTH
*/
let previousMonth = document.querySelector('.previous');
previousMonth.onclick = function() {
    cleanCalendar();
    deleteCalendar();
    if(current.getMonth() == 0) {
        console.log('January to December');
        current = new Date(current.getFullYear()-1, 11, 20, 11, 30, 30);
    } else {
        console.log('Month was not January');
        current = new Date(current.getFullYear(), current.getMonth()-1, 20, 11, 30, 30);
    }
    drawCalendar(current);
    m.innerHTML = monthNames[current.getMonth()] + ' ' + current.getFullYear();
    manageClick();
    getChoices();
}

/*
        NEXT MONTH
*/
let nextMonth = document.querySelector('.next');
nextMonth.onclick = function() {
    cleanCalendar();
    deleteCalendar();
    if(current.getMonth() == 11) {
        console.log('December to January');
        current = new Date(current.getFullYear()+1, 0, 20, 11, 30, 30);
    } else {
        console.log('Month was not December');
        current = new Date(current.getFullYear(), current.getMonth()+1, 20, 11, 30, 30);
    }
    drawCalendar(current);
    m.innerHTML = monthNames[current.getMonth()] + ' ' + current.getFullYear();
    manageClick();
    getChoices();
}