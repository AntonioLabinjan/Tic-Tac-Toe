// Uzimamo referencu na elemente HTML-a koje ćemo koristiti
let playerText = document.getElementById('playerText');  // Tekst koji prikazuje trenutnog igrača
let restartBtn = document.getElementById('restartBtn');  // Botun za ponovno pokretanje igre
let boxes = Array.from(document.getElementsByClassName('box'));  // Napravimo polja za igru

// Uzimamo vrijednost definiranu u CSS varijabli za označavanje pobjedničkih polja
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

// Konstante za simbole križića i kružića
const O_TEXT = "O";
const X_TEXT = "X";

// Početni igrač
let currentPlayer = X_TEXT;

// Polja koja sadrže informaciju o stanju igre
let spaces = Array(9).fill(null);

// Funkcija koja započinje igru
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));  // Dodajemo event listener za svako polje
}

// Funkcija koja se poziva kad se klikne na polje
function boxClicked(e) {
    const id = e.target.id;  // Uzimamo ID kliknutog polja

    if (!spaces[id]) {
        spaces[id] = currentPlayer;  // Postavljamo trenutnog igrača u odabrano polje
        e.target.innerText = currentPlayer;  // Prikazujemo simbol igrača na polju

        // Proveravamo da li je igrač pobijedio
        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`;  // Prikazujemo pobjednika
            let winning_blocks = playerHasWon();

            // Mijenjamo boju pozadine pobjedničkih polja
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            return;
        }

        // Mijenjamo igrača nakon svakog poteza
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

// Kombinacije za pojbedu ( na kojima se pozicijama u arrayu moraju poredat simboli za pobjedu)
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Funkcija koja proverava  je li igrač pobjedio (dali je dobija neku od ovih kombinacija gore)
function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        // Provjeravamo da li su polja ista i popunjena
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];  // Vraćamo pobjedničke pozicije
        }
    }
    return false;  // Ako nema pobednikai niki ni spojija 3
}

// Event listener za botun za restart igre
restartBtn.addEventListener('click', restart);

// Funkcija za restart igre
function restart() {
    spaces.fill(null);  // Resetiramo stanje polja tako da ih ispraznimo (popunimo s null)

    // Vraćamo polja u početno stanje
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerText.innerHTML = 'Tic Tac Toe';  // Resetiramo tekst

    currentPlayer = X_TEXT;  // Postavljamo trenutnog igrača na X
}

startGame();  // Pokrećemo igru
