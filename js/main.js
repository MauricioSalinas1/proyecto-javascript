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

    if (montoDeValue === "") {
        updateResult("");
        return;
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

// Función para cargar las tasas de cambio desde la API
async function fetchExchangeRates() {
    const appId = "93136d5f504e4a4a9483ee1291082750";
    const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${appId}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        exchangeRates = data.rates;

        // Llamar a la función para realizar la conversión automáticamente
        performAutoConversion();
    } catch (error) {
        console.error("Error al obtener las tasas de cambio:", error);
    }
}

// Evento para realizar la conversión automáticamente al cambiar el monto
montoDeInput.addEventListener("input", performAutoConversion);

// Evento para realizar la conversión automáticamente al cambiar las monedas
monedaDeSelect.addEventListener("change", performAutoConversion);
monedaASelect.addEventListener("change", performAutoConversion);

// Función para agregar una conversión al historial y almacenarla en localStorage
function addToHistoryAndLocalStorage(conversion) {
    if (conversion) {
        conversionHistory.push(conversion);
        localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));

        const historyItem = document.createElement("p");
        historyItem.classList.add("historial-texto1");

        const parts = conversion.split(" = ");

        const conversionInfo = parts[0];
        const resultInfo = parts[1];

        const texto1 = document.createElement("span");
        texto1.textContent = conversionInfo;
        texto1.classList.add("historial-texto1");

        const texto2 = document.createElement("span");
        texto2.textContent = resultInfo;
        texto2.classList.add("historial-texto2");

        if (conversionInfo.indexOf("Conversión no válida") === -1) {
            const igualSigno = document.createElement("span");
            igualSigno.textContent = " = ";
            igualSigno.classList.add("historial-texto1");
            historyItem.appendChild(texto1);
            historyItem.appendChild(igualSigno);
            historyItem.appendChild(texto2);
        } else {
            historyItem.appendChild(texto1);
            historyItem.appendChild(texto2);
        }

        historialSection.appendChild(historyItem);
    }
}

// Función para cargar el historial de conversiones desde localStorage al cargar la página
function loadConversionHistoryFromLocalStorage() {
    const storedHistory = localStorage.getItem('conversionHistory');
    if (storedHistory) {
        conversionHistory = JSON.parse(storedHistory);
        renderConversionHistory();
    }
}

// Función para renderizar el historial de conversiones en el DOM
function renderConversionHistory() {
    historialSection.innerHTML = '';

    conversionHistory.forEach(conversion => {
        const historyItem = document.createElement("p");
        historyItem.classList.add("historial-texto1");

        const parts = conversion.split(" = ");
        const conversionInfo = parts[0];
        const resultInfo = parts[1];

        const texto1 = document.createElement("span");
        texto1.textContent = conversionInfo;
        texto1.classList.add("historial-texto1");

        const igualSigno = document.createElement("span");
        igualSigno.textContent = " = ";
        igualSigno.classList.add("historial-texto1");

        const texto2 = document.createElement("span");
        texto2.textContent = resultInfo;
        texto2.classList.add("historial-texto2");

        historyItem.appendChild(texto1);
        historyItem.appendChild(igualSigno);
        historyItem.appendChild(texto2);

        historialSection.appendChild(historyItem);
    });
}

// Función para intercambiar las monedas seleccionadas
function swapCurrencies() {
    const moneda1 = monedaDeSelect.value;
    const moneda2 = monedaASelect.value;

    monedaDeSelect.value = moneda2;
    monedaASelect.value = moneda1;

    performAutoConversion();
}

// Asociar la función de intercambio al evento click del botón "Intercambiar monedas"
swapButton.addEventListener("click", swapCurrencies);

// Función para borrar el historial de conversiones y removerlo de localStorage
function clearConversionHistory() {
    historialSection.innerHTML = "";
    conversionHistory = [];
    localStorage.removeItem('conversionHistory');
}

// Evento para el botón de borrar historial
const clearButton = document.getElementById("clear-history");
clearButton.addEventListener("click", () => {
    // Mostrar una alerta de confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se borrará todo el historial de conversiones. Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrar historial',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        confirmButtonColor: '#399B53',
    }).then((result) => {
        // Si el usuario confirma, borrar el historial
        if (result.isConfirmed) {
            clearConversionHistory();
            Swal.fire({
                icon: 'success',
                iconColor: '#399B53',
                title: 'Historial borrado',
                text: 'El historial de conversiones ha sido borrado correctamente.',
            });
        }
    });
});

// Evento para el botón de intercambio
swapButton.addEventListener("click", swapCurrencies);

// Al cargar la página, cargar el historial de conversiones desde localStorage
window.addEventListener("load", loadConversionHistoryFromLocalStorage);

// Llamar a la función para cargar las tasas de cambio desde la API al cargar la página
window.addEventListener("load", fetchExchangeRates);

/// Función para guardar la conversión manualmente
function saveConversion() {
    const monedaDe = monedaDeSelect.value;
    const monedaA = monedaASelect.value;
    const montoDe = parseFloat(montoDeInput.value);

    let result, conversion;
    if (!monedaDe || !monedaA) {
        conversion = "Moneda inválida: Debes elegir ambas monedas.";
    } else if (isNaN(montoDe)) {
        conversion = "Monto inválido: Debes ingresar un monto numérico.";
    } else if (!exchangeRates.hasOwnProperty(monedaDe) || !exchangeRates.hasOwnProperty(monedaA)) {
        conversion = "Conversión no válida: Moneda(s) no soportada(s).";
    } else {
        result = (montoDe / exchangeRates[monedaDe] * exchangeRates[monedaA]).toFixed(2);
        conversion = `${montoDe} ${monedaDe} = ${result} ${monedaA}.`;

        // Mostrar notificación con Toastify JS
        Toastify({
            text: 'La conversión se guardó correctamente.',
            backgroundColor: '#399B53',
            duration: 3000,
            gravity: 'bottom',
            position: 'right',
            close: true,
            className: 'custom-toastify-text'
        }).showToast();
    }

    updateResult(result);
    addToHistoryAndLocalStorage(conversion);
}

// Evento para el botón de "Guardar Conversión"
saveButton.addEventListener("click", saveConversion);