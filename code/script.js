document.addEventListener('DOMContentLoaded', () => {
  const images = [
    '🍎', '🍎',
    '🍌', '🍌',
    '🍊', '🍊',
    '🍇', '🍇',
    '🍉', '🍉',
    '🍒', '🍒',
    '🥥', '🥥',
    '🍓', '🍓',
    '🍋', '🍋',
    '🥝', '🥝'
  ];

  let flippedCards = [];
  let locked = false;
  let timerInterval;
  let seconds = 0;
  let gameStarted = false;
  let playerName = '';

  const nameForm = document.getElementById('nameForm');
  const playerNameContainer = document.getElementById('player-name');

  function updateBestResultDisplay() {
    // Gauti rezultatus
    let times = JSON.parse(sessionStorage.getItem('times')) || [];

    // Sortinti rezultatus ir įrašyti geriausią
    let sortedScores = times.slice().sort(function(a, b){return a-b});
    let bestResult = sortedScores[0];

    // Atnaujinti geriausią ruzultataą
    if (bestResult) {
      document.getElementById('bestResult').textContent = 'Geriausias rezultatas: ' + bestResult + ' s';
    } else {
      document.getElementById('bestResult').textContent = 'Geriausias rezultatas: -';
    }
  }

  // Display the best result on page load
  updateBestResultDisplay();

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }


  function createBoard() {
    const gameContainer = document.getElementById('game-container');
    const timer = document.getElementById('timer');
    const shuffledImages = shuffle(images.slice());

    shuffledImages.forEach((image, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.index = index;

      const front = document.createElement('div');
      front.classList.add('front');
      front.textContent = '🃏';

      const back = document.createElement('div');
      back.classList.add('back');
      back.textContent = image;

      card.appendChild(front);
      card.appendChild(back);
      gameContainer.appendChild(card);

      card.addEventListener('click', () => {
        if (locked) return;
        if (card.classList.contains('flip')) return;

        card.classList.add('flip');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          locked = true;
          setTimeout(() => {
            if (flippedCards[0].querySelector('.back').textContent !== flippedCards[1].querySelector('.back').textContent) {
              flippedCards.forEach(flippedCard => flippedCard.classList.remove('flip'));
            } else {
              const openedCards = document.querySelectorAll('.card.flip');
              if (openedCards.length === shuffledImages.length) {
                clearInterval(timerInterval);

                // Išsaugoti rezultatus į localStorage
                let times = JSON.parse(sessionStorage.getItem('times')) || [];
                let time = seconds;
                times.push(time);
                sessionStorage.setItem("times", JSON.stringify(times));

                alert('Sveikinu, laimėjote!! Jūsų žaidimo trukmė: ' + seconds + ' s.');
                window.location.reload();
              }
            }
            flippedCards = [];
            locked = false;
          }, 500);
        }
      });
    });


    // Laikmačio pradžia
    timerInterval = setInterval(() => {
      if (gameStarted) {
        seconds++;
        timer.textContent = 'Trukmė: ' + seconds + ' s';
      }
    }, 1000);
  }

  nameForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    if (username.trim() !== '') {
      if (!gameStarted) {
        console.log('Game started');
        gameStarted = true;
        nameForm.style.display = 'none';

        playerNameContainer.querySelector('span').textContent = username; 
        createBoard();
      }
    }
  });

});