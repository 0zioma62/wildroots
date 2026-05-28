 const animals = [
  { emoji: '🦁', name: 'Lion' },
  { emoji: '🐘', name: 'Elephant' },
  { emoji: '🦒', name: 'Giraffe' },
  { emoji: '🦓', name: 'Zebra' },
  { emoji: '🐊', name: 'Crocodile' },
  { emoji: '🦏', name: 'Rhino' },
  { emoji: '🐆', name: 'Leopard' },
  { emoji: '🦛', name: 'Hippo' }
];

let cards = [];
let flipped = [];
let matched = 0;
let attempts = 0;
let locked = false;

function shuffle(array) {
  return [...array, ...array]
    .sort(() => Math.random() - 0.5);
}

function updateStats() {
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('matches').textContent = matched;
}

function checkWin() {
  if (matched === animals.length) {
    document.getElementById('final-attempts').textContent = attempts;
    document.getElementById('win-message').classList.remove('hidden');
  }
}

function createCard(animal, index) {
  const tile = document.createElement('div');
  tile.classList.add('card-tile');
  tile.dataset.emoji = animal.emoji;
  tile.dataset.index = index;
  tile.textContent = '🌿';

  tile.addEventListener('click', () => {
    if (locked) return;
    if (tile.classList.contains('flipped')) return;
    if (tile.classList.contains('matched')) return;

    tile.textContent = animal.emoji;
    tile.classList.add('flipped');
    flipped.push(tile);

    if (flipped.length === 2) {
      locked = true;
      attempts++;
      updateStats();

      if (flipped[0].dataset.emoji === flipped[1].dataset.emoji) {
        flipped[0].classList.add('matched');
        flipped[1].classList.add('matched');
        matched++;
        flipped = [];
        locked = false;
        updateStats();
        checkWin();
      } else {
        setTimeout(() => {
          flipped[0].textContent = '🌿';
          flipped[1].textContent = '🌿';
          flipped[0].classList.remove('flipped');
          flipped[1].classList.remove('flipped');
          flipped = [];
          locked = false;
        }, 1000);
      }
    }
  });

  return tile;
}

function initGame() {
  const grid = document.getElementById('game-grid');
  grid.innerHTML = '';
  flipped = [];
  matched = 0;
  attempts = 0;
  locked = false;
  document.getElementById('win-message').classList.add('hidden');
  updateStats();

  cards = shuffle(animals);
  cards.forEach((animal, index) => {
    grid.appendChild(createCard(animal, index));
  });
}

document.getElementById('restart-btn').addEventListener('click', initGame);

initGame();
