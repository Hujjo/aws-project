/*
        MANAGE CLICKS ON CELLS
*/
let manageClick = function() {
    let td = document.querySelectorAll('td.choices');

    for (let t=0 ; t<td.length ; t++){
        // td[t].addEventListener('onclick', function() { man(td[t]);});
        td[t].onclick = function(ev) {
        if(username != null) {        // client is connected
            let choicesClicked = ev.target.childNodes;        // get choices span
            let userChoiceExist = false;    // bool
            let userChoiceElement = null;    // if (userChoiceExist) userChoiceElement = cell
            let o=0;
            while(o<choicesClicked.length && !userChoiceExist) {    // for all choices span
                if(choicesClicked[o].title == username) {     // if it's user choice
                    userChoiceExist = true;
                    userChoiceElement = choicesClicked[o];
                } else {
                    o++;
                }
            }
            if(!userChoiceExist) {    // it's the first time user clicked on td
                addChoice(td[t].dataset.year,td[t].dataset.month,td[t].dataset.day);
            } else {
                // td[t].removeEventListener(man);
                for(o=0 ; o<choicesClicked.length ; o++) {
                    if(choicesClicked[o] != userChoiceElement) {    // darken other choices
                        choicesClicked[o].style = 'background-color: #AFAFAF;';
                    }
                    choicesClicked[o].onclick = function(event) {    // wait for a second click
                        if(event.target.title == username){    // if on user choice
                            deleteChoice(td[t].dataset.year,td[t].dataset.month,td[t].dataset.day);    // delete
                        } else {                                // if elsewhere
                            // get colors back and end
                            choicesClicked[o].style = 'background-color: '+choicesClicked[o].dataset.color+';';
                        }
                    }
                }
            }
        } else {
            alert('Please, connect yourself to add or delete a choice.')
        }
    }
    }
}
manageClick();