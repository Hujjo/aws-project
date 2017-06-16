/*
        UPDATE CALENDAR WITH CHOICES
*/
let f=0;
let cleanCalendar = function() {
    // removing all old data
    // here squarechoice
    let z,y;
    for(let z=0 ; z<f ; z++) {
        y = document.getElementById(z);
        y.parentNode.removeChild(y);
    }
    f=0;
    // here numberchoices
    let w = document.querySelectorAll('.numberChoices');
    w.forEach(erase_childs);
}
let updateCalendar = function(choices) {
    // add choices
    let a = document.querySelectorAll('div.choices'),
        b,c,d,e,g=0,
        // a = all .choices td
        // b = td with a choice
        // c = elements to add
        // d = scanned days
        // e = scanned choices
        // g = number of choices for a date
        first = new Date(choices[0].dateChoice).getDate(),
        last = new Date(choices[choices.length-1].dateChoice).getDate();
    // choices is order by dateChoice ASC
    // scanning days between first and last choices
    for(d=first ; d<= last ; d++){
        // scanning choices
        for(e=0 ; e<choices.length ; e++){
            // if choice date is the same as day date
            // creating & appending a square element to show choice
            if(d == new Date(choices[e].dateChoice).getDate()){
                g++;
                b = a[d-1];
                c = document.createElement('span');
                c.id = f;
                f++;
                c.className = 'squareChoice';
                c.dataset.color = choices[e].color;
                c.style = 'background-color: '+choices[e].color+';';
                c.title = choices[e].username;
                b.appendChild(c);
            }
        }
        if(g != 0) {
            c = document.createElement('span');
            c.className = 'numberChoices';
            c.innerHTML = g;
            b.appendChild(c);
            g=0;
        }
    }
}

/*
        GET CHOICES DATA WITH AJAX
*/
let getChoices = function() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function(e) {
            console.log('GET CHOICEs - Successfull');
            let obj = xhr.response;
            cleanCalendar();
            if(obj[0] != undefined)
                updateCalendar(obj);
    }
    xhr.onerror = function(e) {
        console.log('GET CHOICEs - Fail');
    }
    xhr.onabort = function(e) {
        console.log('GET CHOICEs - Cancel by user');
    }
    xhr.onprogress = function(e) {
        // console.log('GET CHOICEs - Download...');
    }
    let myY = current.getFullYear();
    let myM = current.getMonth()+1;
    xhr.open('GET','/choices/'+myY+'/'+myM);
    xhr.send();
}