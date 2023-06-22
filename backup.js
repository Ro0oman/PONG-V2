const frame = document.querySelector('.frame');
const botonPlay = document.querySelector('.play');
const campoVelocidadPelota = document.getElementById('velocidadPelota');
const interfaz = document.getElementById('interfaz');
const puntos = document.querySelector('.puntos');

function perdido(){
    location.reload();

}

function play(){    
    var temporizador = 3;
    var cuentaAtras = setInterval(function(){
        if(temporizador <= 0){
            clearInterval(cuentaAtras);
        }
        botonPlay.textContent = 0 + temporizador;
        temporizador -= 1;
    }, 1000);


    setTimeout('jugar()',4000);
}

function darVelocidad(){
    if(Number(campoVelocidadPelota.value) > 0){
        return 30;
    }else if(Number(campoVelocidadPelota.value) < 0){
        return 60;
    }else{
        return 15;
    }
}

function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }


function jugar(){
    puntos.textContent = 0;
    var velocidadPelota = darVelocidad();
    console.log(velocidadPelota);
    botonPlay.style.display='none';
    interfaz.style.display = 'none';
    frame.style.display = 'block';

    var contador = 0;

    var velocidadBarra = 90;
    console.log(velocidadBarra);


    var angulox = Math.ceil(getRandomArbitrary(-10,10));
    var anguloy = Math.ceil(getRandomArbitrary(-10,10));

    console.log(angulox)
    console.log(anguloy)

    const pala = document.getElementById('pala');
    const bola = document.getElementById('bola');


    bola.style.top = '50%';
    bola.style.left = '50%';

    document.addEventListener('keypress', (event) =>{
        if(event.key == 'w'){
            if ((pala.offsetTop - velocidadBarra) < 0) {
                pala.style.top = '0px';
            }else{
                pala.style.top = (pala.offsetTop - velocidadBarra) + 'px';
            }
        }
        if(event.key == 's'){
            if ((pala.offsetTop + velocidadBarra) > 450) {
                pala.style.top = '450px';
            }else{
                pala.style.top = (pala.offsetTop + velocidadBarra) + 'px';
            }
        }

    })

    movimientoBola = setInterval(moverBola, velocidadPelota);

    function moverBola(){

        if((bola.offsetLeft + angulox) >= 580){ // Borde derecho
            angulox = -angulox;
        }

        if((bola.offsetLeft + angulox) <= -5){ // Borde Izquierdo
            clearInterval(movimientoBola);
            perdido();
        }

        if((bola.offsetTop + anguloy) >= 580){ //Borde inferior
            anguloy = -anguloy;
        }

        if((bola.offsetTop + anguloy) <= -10){ //Borde superior
            anguloy = anguloy * -1;
        }

        if(bola.offsetLeft <= pala.offsetLeft){
            comprobarColision();
        }

        bola.style.left = (bola.offsetLeft + angulox) + 'px';
        bola.style.top = (bola.offsetTop + anguloy) + 'px'; 

    }

    function comprobarColision(){
        let rectBola = bola.getBoundingClientRect();
        let rectPala = pala.getBoundingClientRect();

        if((rectBola.left <= rectPala.right) &&
        (rectBola.bottom >= rectPala.top &&
            rectBola.top <= rectPala.bottom)){
                angulox = angulox * -1;
                contador++;
                puntos.textContent = contador;
        }
    }
}
