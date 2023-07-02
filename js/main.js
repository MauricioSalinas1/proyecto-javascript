function greet(nombre) {
    console.log(userName);
    alert('¡Hola ' + userName + '! Quiero jugar un piedra, papel o tijeras con vos. ¿Crees que me vas a ganar?');
}

let userName = prompt('Ingrese su nombre');

greet();

let userSelect = prompt('¡Por favor escribe tu elección! "Piedra", "Papel" o "Tijera"');

if (userSelect == 'Piedra') {
    alert('¡Me ganaste ' + userName + '! Yo he elegido Tijera.');
} else if (userSelect == 'Papel') {
    alert('¡Hemos empatado ' + userName + '! Yo tambien he elegido Papel.');
} else if (userSelect == 'Tijera') {
    alert('¡Te gané ' + userName + '! Yo he elegido Piedra.');
} else {
    alert(userName + ' "' + userSelect + '" ' + 'no es un elemento del piedra papel o tijeras. Por favor escribe "Piedra", "Papel" o "Tijeras".');
}