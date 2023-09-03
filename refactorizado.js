const viñeta_man = document.querySelector(".vin"),
    text = document.querySelector(".text"),
    text_woman = document.querySelector(".text-w"),
    vineta_woman = document.querySelector(".vin-w"),
    prev = document.getElementById("prev"),
    next = document.getElementById("next"),
    playBtn = document.getElementById("play"),
    iconMedia = document.querySelector(".play i");

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

next.addEventListener("click", avanzarHistoria);
prev.addEventListener("click", retrocederHistoria);
playBtn.addEventListener("click", reproduccionAutomatica)

let charIndex = 0,
    contador_woman = 0,
    contador_man = 0,
    myTimeOutWoman,
    myTimeOutMan,
    avanzar = 1,
    timeOut,
    check = false,
    timeOutDos,
    pausarHistoria = false,
    nameViñeta = "";

prev.disabled = true;

function general_type(mensajes, contador, containerText) {
    // console.log(`El valor de ${nameViñeta} es : ${contador} `)
    if (charIndex < mensajes[contador].length) {
        containerText.textContent += mensajes[contador].charAt(charIndex);
        charIndex++;
        setTimeout(function () {
            general_type(mensajes, contador, containerText);
        }, 50);
        manejoBtns(next,true)
        manejoBtns(prev,true)
        return;
    }
    charIndex = 0;
    manejoBtns(next,false);
    manejoBtns(prev,false);
    checkBtns();
    if (contador_woman >= mensajes.length) manejoBtns(next,true);
    if (contador_man <= 1) manejoBtns(prev,true);
    if (contador_woman >= 1) manejoBtns(prev,false);
}

function avanzarHistoria() {
    avanzar++;
    if (avanzar % 2 === 0) {
        nameViñeta = "contador Man ";
        agregarVinetasDinamicas(viñeta_man, vineta_woman, text_woman)
        general_type(texto_man, contador_man, text);
        contador_man++;
    } else if (avanzar % 2 !== 0) {
        nameViñeta = "contador Woman";
        agregarVinetasDinamicas(vineta_woman, viñeta_man, text)
        general_type(texto_woman, contador_woman, text_woman);
        contador_woman++;
    }
}

function retrocederHistoria() {
    check = false;
    if (avanzar % 2 !== 0) {
        contador_woman--;
        avanzar--;
        agregarVinetasDinamicas(viñeta_man,vineta_woman,text_woman)
        general_type(texto_man, contador_woman, text);
        return;
    }
    contador_man--;
    avanzar--;
    agregarVinetasDinamicas(vineta_woman,viñeta_man,text)
    general_type(texto_woman, contador_man, text_woman);
    
}

function reproduccionAutomatica() {
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
        agregarVinetasDinamicas(viñeta_man,vineta_woman,text_woman)
        avanzar++;
        general_type(texto_man, contador_man, text);
        
        timeOutDos = setTimeout(() => {
            agregarVinetasDinamicas(vineta_woman,viñeta_man,text)
            avanzar++;
            general_type(texto_woman, contador_woman, text_woman);
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
        manejoBtns(prev,true);
        manejoBtns(next,true)
        reproduciendoHistoria();
        return;
    } 
    manejoBtns(prev,false);
    manejoBtns(next,false)
    
}

function agregarVinetasDinamicas(nameVineta, vinetaTextContainer, textoName) {
    vinetaTextContainer.classList.add("hidden");
    nameVineta.classList.remove("hidden");
    nameVineta.style.transition = "all .5s ease"
    textoName.textContent = "";
}

function manejoBtns(nombre,estado) {
    nombre.disabled = estado;
}

