// Iegūst vēsturi no esošās websesijas vai izveido tukšu masīvu, ja vēsture nav pieejama
let history = JSON.parse(localStorage.getItem('history')) || [];

// Pievieno vērtību displejam
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Notīra displeju
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Aprēķina izteiksmi un parāda rezultātu displejā
function calculate() {
    const display = document.getElementById('display');
    try {
        const expression = display.value;
        const result = eval(expression); // Izvērtē izteiksmi
        display.value = result;
        addToHistory(`${expression}=${result}`); // Pievieno izteiksmi un rezultātu vēsturei
    } catch (error) {
        display.value = 'Error'; // Parāda kļūdas ziņojumu, ja izteiksme nav derīga
    }
}

// Pievieno ierakstu vēsturei
function addToHistory(entry) {
    history.push(entry);
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

// Atjauno vēstures sarakstu HTML
function renderHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Notīra esošo vēsturi
    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${entry} <button onclick="deleteHistory(${index})">Dzēst</button>`;
        historyList.appendChild(li); // Pievieno jaunu vēstures ierakstu sarakstam
    });
}

// Dzēš konkrētu vēstures ierakstu pēc indeksa
function deleteHistory(index) {
    history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory(); // Atjauno vēstures sarakstu
}

// Notīra visu vēsturi
function clearHistory() {
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory(); // Atjauno vēstures sarakstu
}

// Kad lapa ir ielādēta, atjauno vēstures sarakstu
document.addEventListener('DOMContentLoaded', renderHistory);

// Klausās uz tastatūras notikumiem un izpilda atbilstošās funkcijas
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendToDisplay(key); // Pievieno ciparu displejam
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key); // Pievieno operatoru displejam
    } else if (key === 'Enter') {
        calculate(); // Izpilda aprēķinu
    } else if (key === 'Backspace') {
        const display = document.getElementById('display');
        display.value = display.value.slice(0, -1); // Dzēš pēdējo rakstzīmi no displeja
    } else if (key === 'Escape') {
        clearDisplay(); // Notīra displeju
    }
});