// Declaración de tasa de cambio actualizada (Aca utilice la tasa de cambio al dia de hoy y tomando el valor del Dolar Blue y no del Dolar Oficial: 1 USD = 547 ARS)
const exchangeRateUSDToARS = 547;
const exchangeRateARSToUSD = 1 / exchangeRateUSDToARS;

// Array para almacenar el historial de conversiones
const conversionHistory = [];

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

// Función para mostrar las opciones de conversión disponibles
function showOptions() {
    alert("Opciones de conversión:\n1. ARS a USD\n2. USD a ARS");
}

// Función principal para el proceso de conversión
function currencyConverter() {
    let continueConversion = true;

    while (continueConversion) {
        // Mostrar las opciones de conversión disponibles
        showOptions();

        // Capturar entrada mediante prompt() para la opción seleccionada
        const option = parseInt(prompt("Ingrese el número de opción (1 o 2):"));

        // Validar la opción ingresada
        if (option !== 1 && option !== 2) {
            alert("Opción no válida. Por favor, ingrese 1 o 2.");
            continue;
        }

        // Capturar entrada del monto a convertir mediante prompt()
        const amount = parseFloat(prompt("Ingrese el monto a convertir:"));

        // Realizar la conversión según la opción seleccionada
        let result, conversion;
        if (option === 1) {
            result = convertARSToUSD(amount);
            conversion = `${amount} ARS equivale a ${result} USD (Dólar Blue).`;
            alert(conversion);
        } else {
            result = convertUSDToARS(amount);
            conversion = `${amount} USD equivale a ${result} ARS.`;
            alert(conversion);
        }

        // Agregar el registro al historial de conversiones
        conversionHistory.push(conversion);

        // Preguntar al usuario si desea realizar otra conversión
        const continueResponse = prompt("¿Desea realizar otra conversión? (Sí / No)");
        if (continueResponse && continueResponse.toLowerCase() === "no") {
            continueConversion = false;
        }
    }

    // Mostrar el historial de conversiones en la consola
    console.log("Historial de conversiones:");
    showConversionHistory();
}

// Función para mostrar el historial de conversiones
function showConversionHistory() {
    conversionHistory.forEach((conversion, index) => {
        console.log(`Conversión ${index + 1}: ${conversion}`);
    });
}

// Llamar a la función principal para iniciar el proceso
currencyConverter();