

var numbers = document.getElementsByClassName('number'); // Recupere les div avec les nombres
var elements = document.getElementsByClassName('fade');

var arr = Array.prototype.slice.call( numbers ) // Les transforme en tableau
var arr2 = Array.prototype.slice.call( elements ) // Les transforme en tableau

var loaded = [] // Tableau qui servira a savoir si un nombre a deja ete incremente
var loaded2 = []

for (var i = 0; i < arr.length; i++)
  loaded.push(false);// On le remplit de false
  loaded2.push(false);

let increment = (div) => {
  var target = parseInt(div.innerText); // On recupere le chiffre a atteindre
  var time = target / 100 // On choisit le temps qu'il va prendre a arriver au chiffre
  var inc = Math.max(Math.trunc(target / 100), 1) // De combien il va etre incremente a chaque iteration
  var number = 0
  var interval = setInterval(function() {
    div.textContent = number // On modifie le texte de la div
        if (number >= target) clearInterval(interval); // Si le nombre a ete atteint on arrete l'interval
        number += inc;
    }, time);
  }

  function isVisible ( element ) { // Check si un element est visible a l'ecran
        var
            viewPortHeight = $( window ).height(),
            scrollTop = $(window).scrollTop(),
            currElementPosY = $( element ).offset().top,
            elementHeight = $( element ).height();

        var result = ( currElementPosY + elementHeight > scrollTop && currElementPosY < ( viewPortHeight + scrollTop ) )
        return result
    }

    // Animate chart only when you see it
    function animateChartWhenVisible ( div ) {
        for ( var i = 0, count = div.length; i < count; i++ ) {
            if ( isVisible( div[i]) && !loaded[i] ) { // Si l'element est visible a l'ecran et qu'il  a pas encore ete charge
                increment(div[ i ]); // On lance l'incrementation
                loaded[i] = true;
            }
        }
    }
    function animateElementsWhenVisible ( div ) {
        for ( var i = 0, count = div.length; i < count; i++ ) {
            if ( isVisible( div[i]) && !loaded[i] ) { // Si l'element est visible a l'ecran et qu'il  a pas encore ete charge
                div[i].className += " vignets"
                loaded2[i] = true;
            }
        }
    }

    animateChartWhenVisible(arr) // Quand la page se charge la premiere fois
    animateElementsWhenVisible(arr2)
    $(window).scroll(function () { // A chaque scroll
      animateElementsWhenVisible(arr2)
      animateChartWhenVisible(arr)
    })
