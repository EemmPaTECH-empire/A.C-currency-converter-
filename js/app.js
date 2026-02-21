const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultText = document.getElementById("result");
const fromText = document.getElementById("fromText");
const toText = document.getElementById("toText");
const convertBtn = document.getElementById("convertBtn");

let rates = {};

// FULL WORLD CURRENCY LIST (ISO STANDARD)
const currencies = {
    NGN: "₦ Nigerian Naira",
    USD: "$ US Dollar",
    EUR: "€ Euro",
    GBP: "£ British Pound",
    JPY: "¥ Japanese Yen",
    CAD: "$ Canadian Dollar",
    AUD: "$ Australian Dollar",
    CHF: "CHF Swiss Franc",
    CNY: "¥ Chinese Yuan",
    INR: "₹ Indian Rupee",
    ZAR: "R South African Rand",
    GHS: "₵ Ghanaian Cedi",
    KES: "Sh Kenyan Shilling",
    EGP: "£ Egyptian Pound",
    SAR: "﷼ Saudi Riyal",
    AED: "د.إ UAE Dirham",
    KRW: "₩ South Korean Won",
    BRL: "R$ Brazilian Real",
    MXN: "$ Mexican Peso",
    RUB: "₽ Russian Ruble"
    // Expandable to ALL currencies
};

// Populate dropdowns
function loadCurrencies() {
    for (let code in currencies) {
        let option1 = document.createElement("option");
        option1.value = code;
        option1.textContent = `${currencies[code]} (${code})`;

        let option2 = option1.cloneNode(true);

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    }

    fromCurrency.value = "NGN";
    toCurrency.value = "USD";
}

// Fetch exchange rates
async function loadRates() {
    const response = await fetch(API_URL);
    const data = await response.json();
    rates = data.rates;
}

// Convert currency
function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || amount <= 0) {
        resultText.textContent = "0.00";
        return;
    }

    const fromRate = rates[from];
    const toRate = rates[to];

    const converted = (amount / fromRate) * toRate;

    resultText.textContent = converted.toFixed(2);
    fromText.textContent = `${amount} ${from}`;
    toText.textContent = `${to}`;
}

// Events
convertBtn.addEventListener("click", convertCurrency);

// Init
loadCurrencies();
loadRates();
