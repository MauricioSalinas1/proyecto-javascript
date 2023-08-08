// Declaración de tasa de cambio actualizada (Aca utilice la tasa de cambio al dia de hoy y tomando el valor del Dolar Blue y no del Dolar Oficial: 1 USD = 547 ARS)
const exchangeRateUSDToARS = 547;
const exchangeRateARSToUSD = 1 / exchangeRateUSDToARS;

// Referencias a elementos del DOM
const monedaDeSelect = document.getElementById("moneda-1");
const monedaASelect = document.getElementById("moneda-2");
const montoDeInput = document.getElementById("monto-1");
const montoAInput = document.getElementById("monto-2");
const form = document.getElementById("converter-form");
const historialSection = document.getElementById("historial-section");

// Array para almacenar el historial de conversiones
let conversionHistory = [];

// Función para realizar la conversión de ARS a USD
function convertARSToUSD(amountARS) {
    const amountUSD = amountARS * exchangeRateARSToUSD;
    return amountUSD.toFixed(2); // Redondeamos a 2 decimales
}

// Función para realizar la conversión de USD a ARS
function convertUSDToARS(amountUSD) {
    const amountARS = amountUSD * exchangeRateUSDToARS;
    return amountARS.toFixed(2); // Redondeamos a 2 decimales
}

// Función para actualizar el resultado en el DOM
function updateResult(result) {
    montoAInput.value = result;
}

// Función para agregar una conversión al historial y almacenarla en localStorage
function addToHistoryAndLocalStorage(conversion) {
    conversionHistory.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    const historyItem = document.createElement("p");
    historyItem.textContent = conversion;
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
            historialSection.appendChild(historyItem);
        });
    }
}

// Función para intercambiar las monedas seleccionadas
function swapCurrencies() {
    const moneda1 = document.getElementById("moneda-1");
    const moneda2 = document.getElementById("moneda-2");

    const tempValue = moneda1.value;
    moneda1.value = moneda2.value;
    moneda2.value = tempValue;
}

// Función para borrar el historial de conversiones y removerlo de localStorage
function clearConversionHistory() {
    historialSection.innerHTML = ""; // Limpiar el contenido del elemento
    conversionHistory = []; // Vaciar el array
    localStorage.removeItem('conversionHistory');
}

// Referencia al botón de borrar historial
const clearButton = document.getElementById("clear-history");

// Evento para el botón de borrar historial
clearButton.addEventListener("click", clearConversionHistory);

// Evento para el botón de intercambio
const swapButton = document.getElementById("swap-button");
swapButton.addEventListener("click", swapCurrencies);

// Al cargar la página, cargar el historial de conversiones desde localStorage
window.addEventListener("load", loadConversionHistoryFromLocalStorage);

// Función para realizar la conversión
function performConversion(event) {
    event.preventDefault();

    const monedaDe = monedaDeSelect.value;
    const monedaA = monedaASelect.value;
    const montoDe = parseFloat(montoDeInput.value);

    let result, conversion;
    if (monedaDe === "moneda-ars" && monedaA === "moneda-usd") {
        result = convertARSToUSD(montoDe);
        conversion = `${montoDe} ARS equivale a ${result} USD (Dólar Blue).`;
    } else if (monedaDe === "moneda-usd" && monedaA === "moneda-ars") {
        result = convertUSDToARS(montoDe);
        conversion = `${montoDe} USD equivale a ${result} ARS.`;
    } else {
        conversion = "Conversión no válida.";
    }

    updateResult(result);
    addToHistoryAndLocalStorage(conversion);
}

// Asociar la función de conversión al evento submit del formulario
form.addEventListener("submit", performConversion);