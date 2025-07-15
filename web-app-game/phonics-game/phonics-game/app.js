// ----------------------
// 데이터 샘플 (실제 앱에서는 더 확장 가능)
// ----------------------
const DATA = {
  alphabet: [
    { letter: 'A', sound: 'a.mp3', example: { word: 'Apple', img: '🍎', sound: 'apple.mp3' } },
    { letter: 'B', sound: 'b.mp3', example: { word: 'Ball', img: '⚽', sound: 'ball.mp3' } },
    { letter: 'C', sound: 'c.mp3', example: { word: 'Cat', img: '🐱', sound: 'cat.mp3' } },
    { letter: 'D', sound: 'd.mp3', example: { word: 'Dog', img: '🐶', sound: 'dog.mp3' } },
    { letter: 'E', sound: 'e.mp3', example: { word: 'Egg', img: '🥚', sound: 'egg.mp3' } },
    { letter: 'F', sound: 'f.mp3', example: { word: 'Fish', img: '🐟', sound: 'fish.mp3' } },
    { letter: 'G', sound: 'g.mp3', example: { word: 'Grapes', img: '🍇', sound: 'grapes.mp3' } },
    { letter: 'H', sound: 'h.mp3', example: { word: 'Hat', img: '🎩', sound: 'hat.mp3' } },
    { letter: 'I', sound: 'i.mp3', example: { word: 'Ice', img: '🧊', sound: 'ice.mp3' } },
    { letter: 'J', sound: 'j.mp3', example: { word: 'Juice', img: '🧃', sound: 'juice.mp3' } },
    { letter: 'K', sound: 'k.mp3', example: { word: 'Kite', img: '🪁', sound: 'kite.mp3' } },
    { letter: 'L', sound: 'l.mp3', example: { word: 'Lion', img: '🦁', sound: 'lion.mp3' } },
    { letter: 'M', sound: 'm.mp3', example: { word: 'Monkey', img: '🐵', sound: 'monkey.mp3' } },
    { letter: 'N', sound: 'n.mp3', example: { word: 'Nest', img: '🪺', sound: 'nest.mp3' } },
    { letter: 'O', sound: 'o.mp3', example: { word: 'Orange', img: '🍊', sound: 'orange.mp3' } },
    { letter: 'P', sound: 'p.mp3', example: { word: 'Pig', img: '🐷', sound: 'pig.mp3' } },
    { letter: 'Q', sound: 'q.mp3', example: { word: 'Queen', img: '👑', sound: 'queen.mp3' } },
    { letter: 'R', sound: 'r.mp3', example: { word: 'Rabbit', img: '🐰', sound: 'rabbit.mp3' } },
    { letter: 'S', sound: 's.mp3', example: { word: 'Sun', img: '☀️', sound: 'sun.mp3' } },
    { letter: 'T', sound: 't.mp3', example: { word: 'Tiger', img: '🐯', sound: 'tiger.mp3' } },
    { letter: 'U', sound: 'u.mp3', example: { word: 'Umbrella', img: '☂️', sound: 'umbrella.mp3' } },
    { letter: 'V', sound: 'v.mp3', example: { word: 'Violin', img: '🎻', sound: 'violin.mp3' } },
    { letter: 'W', sound: 'w.mp3', example: { word: 'Whale', img: '🐳', sound: 'whale.mp3' } },
    { letter: 'X', sound: 'x.mp3', example: { word: 'Xylophone', img: '🎼', sound: 'xylophone.mp3' } },
    { letter: 'Y', sound: 'y.mp3', example: { word: 'Yogurt', img: '🥛', sound: 'yogurt.mp3' } },
    { letter: 'Z', sound: 'z.mp3', example: { word: 'Zebra', img: '🦓', sound: 'zebra.mp3' } },
  ],
  cvc: [
    { letter: 'cat', sound: 'cat.mp3', example: { word: 'Cat', img: '🐱', sound: 'cat.mp3' } },
    { letter: 'dog', sound: 'dog.mp3', example: { word: 'Dog', img: '🐶', sound: 'dog.mp3' } },
    // ...
  ],
  digraph: [
    { letter: 'Ch', sound: 'ch.mp3', example: { word: 'Chair', img: '🪑', sound: 'chair.mp3' } },
    { letter: 'Sh', sound: 'sh.mp3', example: { word: 'Ship', img: '🚢', sound: 'ship.mp3' } },
    // ...
  ]
};

// ----------------------
// 상태 관리
// ----------------------
let currentMode = null;
let currentIndex = 0;
let stats = {
  learned: {},
  totalTime: 0,
  correct: 0,
  total: 0,
  badges: 0
};
let timer = null;
let bgmEnabled = true;
let voiceEnabled = true;

// ----------------------
// DOM 요소
// ----------------------
const $ = (id) => document.getElementById(id);
const startScreen = $('start-screen');
const modeSelect = $('mode-select');
const cardLearning = $('card-learning');
const gameMode = $('game-mode');
const statsScreen = $('stats-screen');
const settingsModal = $('settings-modal');
const bgm = $('bgm');

// ----------------------
// 화면 전환 함수
// ----------------------
function showSection(section) {
  [startScreen, modeSelect, cardLearning, gameMode, statsScreen].forEach(s => {
    s.classList.add('hidden');
    s.classList.remove('active');
  });
  section.classList.remove('hidden');
  section.classList.add('active');
}

// ----------------------
// 시작 화면
// ----------------------
$('start-btn').onclick = () => {
  showSection(modeSelect);
};
$('settings-btn').onclick = () => {
  settingsModal.classList.remove('hidden');
};
$('close-settings').onclick = () => {
  settingsModal.classList.add('hidden');
};

$('bgm-toggle').onchange = (e) => {
  bgmEnabled = e.target.checked;
  if (bgmEnabled) bgm.play();
  else bgm.pause();
};
$('voice-toggle').onchange = (e) => {
  voiceEnabled = e.target.checked;
};

// ----------------------
// 모드 선택
// ----------------------
Array.from(document.getElementsByClassName('mode-btn')).forEach(btn => {
  btn.onclick = () => {
    currentMode = btn.dataset.mode;
    if (currentMode === 'game') {
      startGame();
    } else {
      currentIndex = 0;
      showCard();
      showSection(cardLearning);
      startTimer();
    }
  };
});
$('back-to-start').onclick = () => {
  showSection(startScreen);
};

// ----------------------
// 카드 학습
// ----------------------
function showCard() {
  const data = DATA[currentMode];
  if (!data) return;
  const item = data[currentIndex];
  $('card-letter').textContent = item.letter;
  $('example-word').textContent = item.example.word;
  $('example-img').textContent = item.example.img;
}

$('prev-card').onclick = () => {
  const data = DATA[currentMode];
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  showCard();
};
$('next-card').onclick = () => {
  const data = DATA[currentMode];
  currentIndex = (currentIndex + 1) % data.length;
  showCard();
};
$('random-card').onclick = () => {
  const data = DATA[currentMode];
  currentIndex = Math.floor(Math.random() * data.length);
  showCard();
};
$('exit-learning').onclick = () => {
  stopTimer();
  showSection(modeSelect);
};
$('play-sound').onclick = () => {
  if (!voiceEnabled) return;
  playAudio(DATA[currentMode][currentIndex].sound);
};
$('play-word-sound').onclick = () => {
  if (!voiceEnabled) return;
  playAudio(DATA[currentMode][currentIndex].example.sound);
};

// ----------------------
// 게임 모드 (간단한 예시)
// ----------------------
function startGame() {
  showSection(gameMode);
  renderGame();
}
function renderGame() {
  // 예시: 소리 매칭 게임
  const data = DATA['alphabet'];
  const answerIdx = Math.floor(Math.random() * data.length);
  const answer = data[answerIdx];
  const options = shuffle([answer, ...pickRandom(data, 2, answerIdx)]);
  const container = $('game-container');
  container.innerHTML = '';
  const q = document.createElement('div');
  q.innerHTML = `<button id="game-play-sound" class="icon-btn">🔊 소리 듣기</button>`;
  container.appendChild(q);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt.letter;
    btn.onclick = () => {
      stats.total++;
      if (opt === answer) {
        stats.correct++;
        alert('정답!');
      } else {
        alert('아쉬워요!');
      }
      renderGame();
    };
    container.appendChild(btn);
  });
  $('game-play-sound').onclick = () => {
    if (voiceEnabled) playAudio(answer.sound);
  };
}
$('exit-game').onclick = () => {
  showStats();
};

// ----------------------
// 통계 화면
// ----------------------
function showStats() {
  showSection(statsScreen);
  const c = $('stats-content');
  c.innerHTML = `
    <div>학습한 알파벳 개수: <b>${Object.keys(stats.learned).length}</b></div>
    <div>누적 학습 시간: <b>${Math.floor(stats.totalTime/60)}분 ${stats.totalTime%60}초</b></div>
    <div>정답률: <b>${stats.total ? Math.round(stats.correct/stats.total*100) : 0}%</b></div>
    <div>배지: <b>${'⭐'.repeat(stats.badges)}</b></div>
  `;
}
$('back-to-mode').onclick = () => {
  showSection(modeSelect);
};

// ----------------------
// 오디오 재생
// ----------------------
function playAudio(src) {
  const audio = new Audio('assets/' + src);
  audio.play();
}

// ----------------------
// 타이머 (학습 시간 측정)
// ----------------------
function startTimer() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    stats.totalTime++;
  }, 1000);
}
function stopTimer() {
  if (timer) clearInterval(timer);
  timer = null;
}

// ----------------------
// 유틸 함수
// ----------------------
function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}
function pickRandom(arr, n, excludeIdx) {
  const filtered = arr.filter((_, i) => i !== excludeIdx);
  const res = [];
  while (res.length < n && filtered.length) {
    const idx = Math.floor(Math.random() * filtered.length);
    res.push(filtered.splice(idx, 1)[0]);
  }
  return res;
}

// ----------------------
// 초기화
// ----------------------
window.onload = () => {
  showSection(startScreen);
  if (bgmEnabled) bgm.play();
}; 