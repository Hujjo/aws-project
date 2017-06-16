/*
        ADD A CHOICE WITH AJAX
*/
let addChoice = function(year,month,day) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function(e) {
        console.log('ADD CHOICE - Successfull');
        getChoices();
    }
    xhr.onerror = function(e) {
        console.log('ADD CHOICE - Fail');
    }
    xhr.onabort = function(e) {
        console.log('ADD CHOICE - Cancel by user');
    }
    xhr.onprogress = function(e) {
        // console.log('ADD CHOICE - Download...');
    }
    xhr.open('GET', '/add/'+username+'/'+year+'/'+month+'/'+day);
    xhr.send();
}

/*
        DELETE A CHOICE WITH AJAX
*/
let deleteChoice = function(year,month,day) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function(e) {
        console.log('DELETE CHOICE - Successfull');
        getChoices();
    }
    xhr.onerror = function(e) {
        console.log('DELETE CHOICE - Fail');
    }
    xhr.onabort = function(e) {
        console.log('DELETE CHOICE - Cancel by user');
    }
    xhr.onprogress = function(e) {
        // console.log('DELETE CHOICE - Download...');
    }
    xhr.open('GET', '/delete/'+username+'/'+year+'/'+month+'/'+day);
    xhr.send();
}