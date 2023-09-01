const viñeta = document.querySelector(".vin"),
    text = document.querySelector(".text"),
    text_woman = document.querySelector(".text-w"),
    vineta_woman = document.querySelector(".vin-w"),
    prev = document.getElementById("prev"),
    next = document.getElementById("next"),
    playBtn = document.getElementById("play"),
    iconMedia = document.querySelector(".play i")

const texto_man = [
    "Hola como estas desde donde nos estan llamando a claro",
    "Quisiera verte",
    "Por donde andas",
    "Yo tambien tengo muchas ganas de poder verte",
    "Me gustaria tenerte encima de mi"
];

const texto_woman = [
    "Como estas Daniel de tiempo que no te veo",
    "Quisiera poder verte",
    "Ahora mismo estoy por Arequipa y me gustaria verte",
    "Nose como poder encontrarte",
    "Hay veces que me encuentro muy sola"
]

prev.disabled = true;

let charIndexMan = 0,
    charIndexWoman = 0,
    contador_woman = 0,
    contador_man = 0,
    myTimeOutWoman,
    myTimeOutMan,
    avanzar = 1,
    timeOut,
    check = false,
    timeOutDos,
    pausarHistoria = false;

playBtn.addEventListener("click", () => {
    check = true;
    iconMedia.classList.toggle("bx-play");
    iconMedia.classList.toggle("bx-pause");
    
    if (pausarHistoria) console.log("renaudando historia")
    if (iconMedia.classList.contains("bx-play")) {
        pausandoHistoria();
    } else {
        next.disabled = true;
        console.log("PLAY")
        reproduciendoHistoria();
    }
    if (iconMedia.classList.contains("bx-reset")) {
        resetHistory();
        iconMedia.classList.remove("bx-reset");
        iconMedia.classList.remove("bx-play")
        iconMedia.classList.add("bx-pause");
    } 
})

next.addEventListener("click", () => {
    avanzar++;
  
    if (avanzar % 2 === 0) {
        viñeta.classList.remove("hidden");
        vineta_woman.classList.add("hidden");
        viñeta.style.transition = "all .5s ease";
        text_woman.textContent = "";
        contador_man++;
        console.log("VALOR DE CONTADOR MAN DENTRO DE NEXT " + contador_man)
        type_man();
    } else if (avanzar % 2 !== 0) {
        text.textContent = "";
        vineta_woman.classList.remove("hidden");
        viñeta.classList.add("hidden");
        vineta_woman.style.transition = "all .5s ease";
        contador_woman++;
       
       console.log("VALOR DE CONTADOR WOMAN DENTRO DE NEXT " + contador_woman)
        type_woman();
       
    }

});

prev.addEventListener("click", () => {
    check = false;
    if (avanzar % 2 === 0) {
        vineta_woman.classList.remove("hidden")
        viñeta.classList.add("hidden");
        text.textContent = "";
        contador_man--;
        avanzar--;
        console.log("desde par")
        type_woman();
        return;
    }
    console.log("desde impar")
    console.log("VALOR DE CONTADOR MAN DENTRO DE IMPAR " + contador_man)
    vineta_woman.classList.add("hidden");
    viñeta.classList.remove("hidden");
    contador_woman--;
    avanzar--;
    text_woman.textContent = ""
    type_man();
})

function type_man() {

    if (charIndexMan < texto_man[contador_man - 1].length) {
        text.textContent += texto_man[contador_man - 1].charAt(charIndexMan);
        charIndexMan++;
        myTimeOutMan = setTimeout(type_man, 50);
        next.disabled = true;
        prev.disabled = true;
       
        return;
    }

    //Parte de código a refactorizar
    if (check) {
        prev.disabled = true;
        next.disabled = true;

    } else {
        next.disabled = false;
        prev.disabled = false;
    }

    if (contador_man <= 1) prev.disabled = true;
    
    
    charIndexWoman = 0;

}

function type_woman() {
    if (charIndexWoman < texto_woman[contador_woman - 1].length) {
        text_woman.textContent += texto_woman[contador_woman - 1].charAt(charIndexWoman);
        charIndexWoman++;
        myTimeOutWoman = setTimeout(type_woman, 50);
        next.disabled = true;
        prev.disabled = true;
        return;
    }

    checkBtns();
    if (contador_woman >= texto_woman.length) {
        next.disabled = true;
        console.log("hola")
    } else if (contador_woman > text_woman.length) {
        contador_woman = 0;
        console.log("RESETEO CONTADOR WOMAN")
    }
    charIndexMan = 0;

   
    
}

function pausandoHistoria() {
    console.log(charIndexMan)
    pausarHistoria = true;
    console.log("Pausando historia")
    if (avanzar % 2 === 0) {
        
        clearTimeout(myTimeOutMan)
        clearTimeout(timeOutDos)
        prev.disabled = false;
        next.disabled = false;
        console.log(avanzar)
       
    } else if (avanzar % 2 !== 0) {
        console.log("SOY WOMAN " + avanzar)
        clearTimeout(myTimeOutWoman)
        prev.disabled = false;
        next.disabled = false;
    }
}

function reproduciendoHistoria() {
    contador_man += 1;
    contador_woman += 1;
    
    
    timeOut = setTimeout(() => {
        viñeta.classList.remove("hidden");
        vineta_woman.classList.add("hidden");
        text_woman.textContent = "";
        viñeta.style.transition = "all .5s ease";
        avanzar++;
        
        type_man();
        
        timeOutDos = setTimeout(() => {
            vineta_woman.classList.remove("hidden"); 
            console.log("VALOR DE CONTADOR WOMAN DENTRO TIMEOUT DOS " + contador_woman)
            text.textContent = "";
            viñeta.classList.add("hidden");
            vineta_woman.style.transition = "all .5s ease";
            avanzar++;
            type_woman();
        }, 4000);
    },2000);
    
    if (contador_man > texto_man.length) {
        contador_man -= 1;
        
    } 
    if (contador_woman > texto_woman.length) {
        console.log("hola")
        contador_woman -= 1;            
        prev.disabled = false;
        clearInterval(timeOut);
        iconMedia.classList.add("bx-reset");
    } 
}

function checkBtns () {
    if (check) {
        prev.disabled = true;
        next.disabled = true
        reproduciendoHistoria();
        return;
    } 
    next.disabled = false;
    prev.disabled = false;
    
}

function resetHistory() {
    contador_woman = 0,
    contador_man = 0,
    avanzar = 1;
    reproduciendoHistoria()
    console.log("Resetenado Historia")
}


//DESAHABILITAR LOS BOTONES CUANDO ESTE REPRODUCIONDOSE DE FORMA AUTOMATICA 
//pausar la historia
//AL darle pausar habilitar los botones de antes y despues
//Cuando la historia llegue al final habilitar los botones de antes y despues
//Cuando la historia llegue al final al darle click en reset ,volver a reproducir la historia
//Si el texto se sale del contenido de la viñeta desaparecer lo anterior o remplazar por el texto saliente