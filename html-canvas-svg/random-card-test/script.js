// 알파벳 카드 목록 생성 (대문자, 소문자, 혼합)
const upper = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
const lower = Array.from({length: 26}, (_, i) => String.fromCharCode(97 + i));
const mixed = upper.map((u, i) => u + lower[i]);
const allCards = [...upper, ...lower, ...mixed];

// 상태 관리
let history = [];
let currentIdx = -1;

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn');
const cardDiv = document.getElementById('card');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const endBtn = document.getElementById('end-btn');
const upperCheck = document.getElementById('upper-check');
const lowerCheck = document.getElementById('lower-check');
const mixedCheck = document.getElementById('mixed-check');
const optionForm = document.getElementById('option-form');
const cardCounter = document.getElementById('card-counter');

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showCard(card, transition = true) {
  if (transition) {
    cardDiv.classList.remove('fade-in');
    cardDiv.classList.add('fade-out');
    setTimeout(() => {
      cardDiv.textContent = card;
      cardDiv.classList.remove('fade-out');
      cardDiv.classList.add('fade-in');
      updateCardCounter();
    }, 200);
  } else {
    cardDiv.textContent = card;
    cardDiv.classList.remove('fade-out');
    cardDiv.classList.add('fade-in');
    updateCardCounter();
  }
}

function updateButtons() {
  prevBtn.disabled = currentIdx <= 0;
  nextBtn.disabled = currentIdx >= history.length - 1;
}

function updateCardCounter() {
  if (history.length > 0 && currentIdx >= 0) {
    cardCounter.textContent = `${currentIdx + 1} / ${history.length}`;
  } else {
    cardCounter.textContent = '';
  }
}

function startGame() {
  let selectedCards = [];
  if (upperCheck.checked) selectedCards = selectedCards.concat(upper);
  if (lowerCheck.checked) selectedCards = selectedCards.concat(lower);
  if (mixedCheck.checked) selectedCards = selectedCards.concat(mixed);
  if (selectedCards.length === 0) {
    alert('최소 한 개의 카드 종류를 선택하세요.');
    return;
  }
  history = shuffle(selectedCards);
  currentIdx = 0;
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  showCard(history[currentIdx], false);
  updateButtons();
  updateCardCounter();
}

function endGame() {
  gameScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  cardCounter.textContent = '';
}

function prevCard() {
  if (currentIdx > 0) {
    currentIdx--;
    showCard(history[currentIdx]);
    updateButtons();
  }
}

function nextCard() {
  if (currentIdx < history.length - 1) {
    currentIdx++;
    showCard(history[currentIdx]);
    updateButtons();
  }
}

optionForm.addEventListener('submit', function(e) {
  e.preventDefault();
  startGame();
});
endBtn.addEventListener('click', endGame);
prevBtn.addEventListener('click', prevCard);
nextBtn.addEventListener('click', nextCard);

// 초기화
window.onload = () => {
  startScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
  cardDiv.textContent = '';
}; 