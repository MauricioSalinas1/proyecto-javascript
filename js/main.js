// Declaración de tasas de cambio actualizadas
const exchangeRates = {
    "ARS": 283.61,
    "USD": 1,
    "EUR": 0.91176,
    "GBP": 0.78481,
    "JPY": 143.188,
    "CAD": 1.34266,
    "AUD": 1.53101,
    "CHF": 0.87512,
    "CNY": 7.20877,
    "INR": 82.8597
};

// Referencias a elementos del DOM
const monedaDeSelect = document.getElementById("moneda-1");
const monedaASelect = document.getElementById("moneda-2");
const montoDeInput = document.getElementById("monto-1");
const montoAInput = document.getElementById("monto-2");
const form = document.getElementById("converter-form");
const historialSection = document.getElementById("historial-section");
const saveButton = document.getElementById("save-conversion");
const swapButton = document.getElementById("swap-button");

// Array para almacenar el historial de conversiones
let conversionHistory = [];

// Función para actualizar el resultado en el DOM
function updateResult(result) {
    montoAInput.value = result !== undefined ? result : "";
}

// Función para realizar la conversión automáticamente y actualizar el resultado en tiempo real
function performAutoConversion() {
    const monedaDe = monedaDeSelect.value;
    const monedaA = monedaASelect.value;
    const montoDeValue = montoDeInput.value;

    // Verificar si el campo de monto está vacío
    if (montoDeValue === "") {
        updateResult(""); // Dejar el resultado vacío
        return; // Salir de la función sin hacer la conversión
    }

    const montoDe = parseFloat(montoDeValue);

    let result;
    if (exchangeRates.hasOwnProperty(monedaDe) && exchangeRates.hasOwnProperty(monedaA)) {
        result = (montoDe / exchangeRates[monedaDe] * exchangeRates[monedaA]).toFixed(2);
    } else {
        result = "Conversión no válida.";
    }

    updateResult(result);
}

// Evento para realizar la conversión automáticamente al cambiar el monto
montoDeInput.addEventListener("input", performAutoConversion);

// Evento para realizar la conversión automáticamente al cambiar las monedas
monedaDeSelect.addEventListener("change", performAutoConversion);
monedaASelect.addEventListener("change", performAutoConversion);

// Función para agregar una conversión al historial y almacenarla en localStorage
function addToHistoryAndLocalStorage(conversion) {
    conversionHistory.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    const historyItem = document.createElement("p");
    historyItem.textContent = conversion;
    historyItem.classList.add("historial-texto1");
    historialSection.appendChild(historyItem);
}

// Función para cargar el historial de conversiones desde localStorage al cargar la página
function loadConversionHistoryFromLocalStorage() {
    const storedHistory = localStorage.getItem('conversionHistory');
    if (storedHistory) {
        conversionHistory = JSON.parse(storedHistory);
        conversionHistory.forEach(conversion => {
            const historyItem = document.createElement("p");
            historyItem.textContent = conversion;
            historyItem.classList.add("historial-texto1");
            historialSection.appendChild(historyItem);
        });
    }
}

// Función para intercambiar las monedas seleccionadas
function swapCurrencies() {
    const moneda1 = monedaDeSelect.value;
    const moneda2 = monedaASelect.value;

    monedaDeSelect.value = moneda2;
    monedaASelect.value = moneda1;

    performAutoConversion(); // Actualizar la conversión automáticamente
}

// Asociar la función de intercambio al evento click del botón "Intercambiar monedas"
swapButton.addEventListener("click", swapCurrencies);

// Función para borrar el historial de conversiones y removerlo de localStorage
function clearConversionHistory() {
    historialSection.innerHTML = ""; // Limpiar el contenido del elemento
    conversionHistory = []; // Vaciar el array
    localStorage.removeItem('conversionHistory');
}

// Evento para el botón de borrar historial
const clearButton = document.getElementById("clear-history");
clearButton.addEventListener("click", clearConversionHistory);

// Evento para el botón de intercambio
swapButton.addEventListener("click", swapCurrencies);

// Al cargar la página, cargar el historial de conversiones desde localStorage
window.addEventListener("load", loadConversionHistoryFromLocalStorage);

// Función para guardar la conversión manualmente
function saveConversion() {
    const monedaDe = monedaDeSelect.value;
    const monedaA = monedaASelect.value;
    const montoDe = parseFloat(montoDeInput.value);

    let result, conversion;
    if (isNaN(montoDe)) {
        conversion = "Conversión inválida: Ingresa un monto numérico.";
    } else if (exchangeRates.hasOwnProperty(monedaDe) && exchangeRates.hasOwnProperty(monedaA)) {
        result = (montoDe / exchangeRates[monedaDe] * exchangeRates[monedaA]).toFixed(2);
        conversion = `${montoDe} ${monedaDe} = ${result} ${monedaA}.`;
    } else {
        conversion = "Conversión no válida.";
    }

    updateResult(result);
    addToHistoryAndLocalStorage(conversion);
}

// Evento para el botón de "Guardar Conversión"
saveButton.addEventListener("click", saveConversion);