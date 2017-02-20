/* PARTIE 2 */

// Question 2
//console.log("Hello world!");

// Question 3
var NBL = 6;
var NBC = 7;

var game = document.querySelector("#jeu");
var tab = document.createElement('table');
tab.id = "plateau";

var tableau = [];   // Question 4

var activJS = game.firstChild;
activJS.parentNode.removeChild(activJS);

function initGame() {
    // réinitialisation non fonctionnelle
    if(game.hasChildNodes()) {
        var e = game.firstChild;
        game.removeChild(e);
    }
    for(var i=0 ; i<NBL ; i++) {
        tab.appendChild(document.createElement('tr'));
        tableau[i] = [];    // Question 4
        for(var j=0 ; j<NBC ; j++) {
            // affectation => Question 4
            tableau[i][j] = tab.lastElementChild.appendChild(document.createElement('td'));
            // PARTIE 3 // Question 2
            tableau[i][j].dataset['column'] = j;
        }
    }
    game.appendChild(tab);
}
    
// lancement jeu
initGame();

// Question 5
function set(row, column, player) {
    var curElt = tableau[row][column];
    curElt.className = "joueur"+player;
}

// Question 6
var turn = 1;

// Question 7
function play(column) {
    // cherche la 1ère ligne en partant du bas
    var i = NBL-1;
    while(i >= 0) {
        if(tableau[i][column].className == "") {
            set(i,column,turn);     // jeu
            if(coupGagnant(i,column)){
                alert("Player"+turn+" a gagné la partie !");
                initGame();
            }  // on teste si le coup est gagnant
            if(turn == 1) { turn = 2; } else { turn = 1; }  // changement du tour
            i = -2; // break le while
        } else {
            i--;    // ligne prise
        }
    }
    if(i == -1) console.log("Plus de place dans cet emplacement!");
}

/* PARTIE 3 */

// Question 1
var plateau = document.querySelector('#plateau');
plateau.addEventListener("click", function(e){
    //console.log("target : "+e.target);          // cellule
    //console.log("current : "+e.currentTarget);  // table
// Question 3
    //console.log(e.target.dataset['column']);
    if(e.target.dataset['column'] != undefined)
        play(e.target.dataset['column']);
    else
        console.log("Pas de case sélectionnée!");
    
});

/* Partie 4 */
// Question 1 - Coup gagnant
function coupGagnant(row,column) {
    // Les quatre directions à parcourir (en coordonnées projectives)
    var dir = { 'horizontal': [1, 0],
                'diagonal': [1, 1],
                'vertical': [0, 1],
                'antidiagonal': [-1, 1] };
    var lt = {};    // les 4 longueurs de ligne par direction
    var l;          // longueur
    var j = 0;      // 0 = hor ; 1 = dia ; 2 = ver ; 3 = ant
    // On boucle sur chaque direction
    for(var d in dir) {
        l = 1;
        // Pour chaque direction, on boucle sur la longueur gagnante
        var i = 1;
        while(i < 4) {
            // Les coordonnées du prochain pion
            var x = Number(column)  + Number(i) * Number(dir[d][0]);
            var y = Number(row)     + Number(i) * Number(dir[d][1]);
            // Si le pion est sur le plateau de jeu et
            // est au joueur courant, on incrémente l
            if (x>=0 && x<NBC && y>=0 && y<NBL && tableau[y][x].className == "joueur"+turn) {
                l++;
                i++;
            }
            else {          // Le coup ne peut plus être gagnant dans cette direction
                i = 4;      // on termine la boucle
            }
        }
        i = -1;
        while(i > -4) {
            // Les coordonnées du prochain pion
            var x = Number(column)  + Number(i) * Number(dir[d][0]),
                y = Number(row)     + Number(i) * Number(dir[d][1]);
            // Si le point est au joueur courant, on incrémente l
            if (x>=0 && x<NBC && y>=0 && y<NBL && tableau[y][x].className == "joueur"+turn) {
                l++;
                i--;
            }
            // Le coup ne peut plus être gagnant dans cette direction
            else {
                i = -4;    // on termine la boucle
            }
        }
        lt[j] = l;
        j++;
    }
    //console.log(lt);
    if(lt[0] >= 4 || lt[1] >= 4 || lt[2] >= 4 || lt[3] >= 4){
        return true;
    } else {
        return false;
    }
}    
