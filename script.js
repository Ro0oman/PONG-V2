//OffsetWidth devuelve el ancho de un objeto como un integer
var width = document.getElementById("frame").offsetWidth;
var height = document.getElementById("frame").offsetHeight;
/* Elementos del DOM que usaremos mas tarde */
const root = document.querySelector(':root');
/* Elementos dentro del juego */
const frame = document.getElementById('frame');
const bola = document.getElementById('bola');
const barra1 = document.getElementById('barra1');
const barra2 = document.getElementById('barra2');
const linea = document.getElementById('linea');
const puntos1 = document.getElementById('puntosp1');
const puntos2 = document.getElementById('puntosp2');
/* Elementos del menu */
const botonPlay = document.getElementById('play');
const config = document.getElementById('config');
const dificultad = document.getElementById('dificultad');
var puntosFinales = document.getElementById('puntosFinales');
/* Controles de los jugadores */
const controles = document.getElementById('controles');
const teclasP1_1 = document.getElementById('controlesp1_1');
const teclasP1_2 = document.getElementById('controlesp1_2');
const teclasP2_1 = document.getElementById('controlesp2_1');
const teclasP2_2 = document.getElementById('controlesp2_2');
/* Sonido */
var sonidoGolpe = new Audio('pong.mp3');
sonidoGolpe.volume = 0.5;
var sonidoGolpePelota = new Audio('pelota.mp3');
sonidoGolpePelota.volume = 0.5;

/* Variables globales */
var puntos = 3; //Puntos de partida(siempre y cuando no se especifiquen unos)

var tiempo = 30; //Intervalo de tiempo
let movBarra = 30; //Velocidaa de movimiento de la barra

//Desplazamientos de sus respectivos ejes(de la bola)
var angulox = 10; 
var anguloy = 10;

/* Teclas de los jugadores(si no se modifican) */
var teclaP1_1 = 'w';
var teclaP1_2 = 's';
var teclaP2_1 = 'o';
var teclaP2_2 = 'l';


class Player{ //Datos de los jugadores(en concreto telcas presionadas)
    constructor(teclaPresionada, codigoTecla) {
        this.teclaPresionada = teclaPresionada;
        this.codigoTecla = codigoTecla;
        this.puntosGandos = 0;
    }
};

/* Creacion de los objetos Player*/
var player1 = new Player(false, null);
var player2 = new Player(false, null);

/* Funcion que esconde los objetos del juego */
function menuPrincipal(){
    bola.style.display = 'none';
    linea.style.display = 'none';
    puntos1.style.display = 'none';
    puntos2.style.display = 'none';
    barra1.style.display = 'none';
    barra2.style.display = 'none';
    teclasP1_1.textContent = 'Tecla Player 1  "'+teclaP1_1+'"';
    teclasP1_2.textContent = 'Tecla Player 1  "' +teclaP1_2+'"';
    teclasP2_1.textContent = 'Tecla Player 2  "' +teclaP2_1+'"';
    teclasP2_2.textContent = 'Tecla Player 2  "' +teclaP2_2+'"';

}

/* Funcion que esconde el menu y no obstaculizar la vision cuando se juega*/
function cargarUI(){
    controles.style.display ="none";
    botonPlay.style.display="none";
    config.style.display = 'none';
    bola.style.display = 'block';
    linea.style.display = 'block';
    puntos1.style.display = 'block';
    puntos2.style.display = 'block';
    barra1.style.display = 'block';
    barra2.style.display = 'block';
}

/* Configura la dificultad de la partida dependiendo de la eleccion del usuario */
function configurarDifictad(){
    if(Number(dificultad.value) < 0){ // -1
        tiempo = 60;
        frame.style.backgroundColor = 'black';

    }else if(Number(dificultad.value) == 0){ // 0
        tiempo = 30;
        frame.style.backgroundColor = 'green';
        root.style.setProperty('--tema','yellow');
    }else{ // 1
        tiempo = 20;
        frame.style.backgroundColor = 'red';
        root.style.setProperty('--tema','black');
    } 
}

/* Configura la cantidad de rondas dependiendo de la eleccion del usuario */
function configurarDuracion(){
    if(Number(puntosFinales.value) < 0 || Number(puntosFinales.value) > 11 ){
        return false;
    }else{
        puntos = Number(puntosFinales.value);
    }
}

/* Funcion que se ejecuta cuando el usuario presiona el boton de play/jugar */
function play(){  
    cargarUI(); //Muestra la interfaz de juego y esconde la interfaz del menu
    configurarDifictad();
    configurarDuracion();
    controlGame = setInterval(intervalo, tiempo); //Intervalo que ejecutará el juego hasta que uno de los jugadores pierda 
    inicializar(); //Posiciona los elementos para un juego comodo
}

function intervalo(){ //Cada 30ms(tiempo) se ejecutará el contenido de dentro
    moverBarras(); //El programa estará a la espera de que el usuario use las teclas
    moverBola(); //El programa moverá la pelota siguiendo las reglas del juego
    puntos1.textContent = player1.puntosGandos; //Registro de los puntos por pantalla
    puntos2.textContent = player2.puntosGandos;
    comprobarGanador(); //El programa comprueba que jugador va a ganar
    colidePlayer1(); //Se comprueban las colisiones de la pelota con las barras
    colidePlayer2(); 
}

function comprobarGanador(){ //Una vez gana uno de los 2 jugadores el intervalo termina y la pagina se reinicia para volver a ejecutar el juego a eleccion del usuario
    if(player1.puntosGandos >= puntos){
        alert('Gana el jugador 1');
        clearInterval(controlGame);
        location.reload();
    }
    if(player2.puntosGandos >= puntos){
        alert('Gana el jugador 2');
        clearInterval(controlGame);
        location.reload();
    }
}

function inicializar(){ //Inicializar el juego
    bola.style.left = 50+'%';
    bola.style.top = 50+'%';
    barra1.style.top = 50+'%';
    barra2.style.top = 50+'%';
}



function moverBarras(){ //El programa estará a la espera de que el usuario use las teclas
    if(player1.teclaPresionada){
        if (player1.codigoTecla == teclaP1_1  && barra1.offsetTop > 0) {
            barra1.style.top = (barra1.offsetTop - movBarra) + 'px'; //Se mueven las barras
        }
        if (player1.codigoTecla == teclaP1_2  && ((barra1.offsetTop + movBarra)+barra1.clientHeight)<height) {
            barra1.style.top = (barra1.offsetTop + movBarra) + 'px';
        }
    }
    if(player2.teclaPresionada){
        if (player2.codigoTecla == teclaP2_1  && barra2.offsetTop > 0) {
            barra2.style.top = (barra2.offsetTop - movBarra) + 'px';
        }
        if (player2.codigoTecla == teclaP2_2  && ((barra2.offsetTop + movBarra)+barra2.clientHeight)<height) {
            barra2.style.top = (barra2.offsetTop + movBarra) + 'px';
        }                                                           
    }
    document.addEventListener('keydown', (event) =>{
        if (event.key == teclaP1_1 || event.key == teclaP1_2 ) {
            player1.codigoTecla = event.key;
            player1.teclaPresionada = true;
        }else if(event.key == teclaP2_1 || event.key == teclaP2_2){
            player2.codigoTecla = event.key;
            player2.teclaPresionada = true;
        }
    })

    document.addEventListener('keyup', (event) =>{
        if (event.key == teclaP1_1 || event.key == teclaP1_2 ) {
            player1.teclaPresionada = false;
        }else if(event.key == teclaP2_1 || event.key == teclaP2_2){
            player2.teclaPresionada = false;
        }
    })
}

function moverBola(){ //La bola se mueve siguiendo las condiciones

    if((bola.offsetLeft + angulox) >= frame.offsetWidth - bola.offsetWidth){ // Borde derecho
        angulox = -angulox;
        player1.puntosGandos++;
        inicializar();
    }

    if((bola.offsetLeft + angulox) <= -5){ // Borde Izquierdo
        angulox = angulox * -1;
        player2.puntosGandos++;
        inicializar();
    }

    if((bola.offsetTop + anguloy) >= frame.offsetHeight - bola.offsetWidth){ //Borde inferior
        anguloy = -anguloy;
        sonidoGolpePelota.play();
    }

    if((bola.offsetTop + anguloy) <= -10 ){ //Borde superior
        anguloy = anguloy * -1;
        sonidoGolpePelota.play();
    }

    if (colidePlayer1) {
        angulox = angulox * -1;
    }
    if(colidePlayer2){
        angulox = -angulox;
    }


    bola.style.left = (bola.offsetLeft + angulox) + 'px';
    bola.style.top = (bola.offsetTop + anguloy) + 'px'; 

}

function colidePlayer1(){ //Comprueba las colisiones de la pelota con la barra1
    let rectBola = bola.getBoundingClientRect();
    let rectbarra1 = barra1.getBoundingClientRect();

    if((rectBola.left <= rectbarra1.right) && (rectBola.bottom >= rectbarra1.top &&
        rectBola.top <= rectbarra1.bottom)){
        sonidoGolpe.play();
        angulox = angulox * -1;
    }

    return false;
}
function colidePlayer2(){//Comprueba las colisiones de la pelota con la barra2
    let rectBola = bola.getBoundingClientRect();
    let rectbarra2 = barra2.getBoundingClientRect();
    
    if((rectBola.right >= rectbarra2.left) && (rectBola.top <= rectbarra2.bottom &&
        rectBola.bottom >= rectbarra2.top)){
        angulox = -angulox;
        sonidoGolpe.play();
    }
    return false;

}

/* Controles jugador 1  */

/* Modifica los controles de los jugadores y sus respectivas teclas */

function controlesp1_1(){
    teclasP1_1.textContent = 'Presiona una tecla';
    document.addEventListener('keypress', function(event){
        teclaP1_1 = event.key;
        teclasP1_1.textContent = event.key;
        teclasP1_1.textContent = 'Tecla Player 1  "'+teclaP1_1+'"';
        console.log("Teclas Player 1 -> "+teclaP1_1+" - "+teclaP1_2);
    },{once : true});
}

function controlesp1_2(){
    teclasP1_2.textContent = 'Presiona una tecla';
    document.addEventListener('keypress', function(event){
        teclaP1_2 = event.key;
        teclasP1_2.textContent = event.key;
        teclasP1_2.textContent = 'Tecla Player 1  "'+teclaP1_2+'"';
        console.log("Teclas Player 1 -> "+teclaP1_1+" - "+teclaP1_2);
    },{once : true});
}

/* Controles jugador 2  */

function controlesp2_1(){
    teclasP2_1.textContent = 'Presiona una tecla';
    document.addEventListener('keypress', function(event){
        teclaP2_1 = event.key;
        teclasP2_1.textContent = event.key;
        teclasP2_1.textContent = 'Tecla Player 1  "'+teclaP2_1+'"';
        console.log("Teclas Player 1 -> "+teclaP2_1+" - "+teclaP2_2);
    },{once : true});
}

function controlesp2_2(){
    teclasP2_2.textContent = 'Presiona una tecla';
    document.addEventListener('keypress', function(event){
        teclaP2_2 = event.key;
        teclasP2_2.textContent = event.key;
        teclasP2_2.textContent = 'Tecla Player 1  "'+teclaP2_2+'"';
        console.log("Teclas Player 1 -> "+teclaP2_1+" - "+teclaP2_2);
    },{once : true});
}






    