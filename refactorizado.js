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
prev.addEventListener("click", retrocederHistoria)

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


function general_type(mensajes, contador, containerText) {
    // console.log(`El valor de ${nameViñeta} es : ${contador} `)
    if (charIndex < mensajes[contador].length) {
        containerText.textContent += mensajes[contador].charAt(charIndex);
        charIndex++;
        setTimeout(function () {
            general_type(mensajes, contador, containerText);
        }, 50);
        return;
    }
    if (contador_woman >= mensajes.length) next.disabled = true;

    charIndex = 0;
}

function avanzarHistoria() {
    avanzar++;
    if (avanzar % 2 === 0) {
        nameViñeta = "contador Man "
        agregarVinetasDinamicas(viñeta_man, vineta_woman, text_woman)
        general_type(texto_man, contador_man, text);
        contador_man++;
    } else if (avanzar % 2 !== 0) {
        nameViñeta = "contador Woman"
        agregarVinetasDinamicas(vineta_woman, viñeta_man, text)
        general_type(texto_woman, contador_woman, text_woman);
        contador_woman++;
    }
}

function retrocederHistoria() {
    check = false;
    if (avanzar % 2 !== 0) {
        console.log("es par")
        
        contador_woman--;
        avanzar--;
        agregarVinetasDinamicas(viñeta_man,vineta_woman,text)
        general_type(texto_man, contador_man, text);
        return;
    }
    console.log("es impar")
    contador_man--;
    avanzar--;
    agregarVinetasDinamicas(vineta_woman,viñeta_man,text_woman)
    general_type(texto_woman, contador_woman, text_woman);
    
}

function agregarVinetasDinamicas(nameVineta, vinetaTextContainer, textoName) {
    vinetaTextContainer.classList.add("hidden");
    nameVineta.classList.remove("hidden");
    nameVineta.style.transition = "all .5s ease"
    textoName.textContent = "";
}

