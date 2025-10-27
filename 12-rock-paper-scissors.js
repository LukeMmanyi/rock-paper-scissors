const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

const confiramtion = document.querySelector('.js-confirmation')

const reset = document.querySelector('.reset-score-button')

const resetScore = () => {
  score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
}

let isConfirming = false

reset.addEventListener('click', () => {
    confiramtion.innerHTML = 'Are you sure you want to reset the score? <button class="decision js-yes">Yes</button>  <button class="decision js-no">No</button>'
    isConfirming = true

    if (isConfirming) {
      const yes = document.querySelector('.js-yes')
      const no = document.querySelector('.js-no')
      
      yes.addEventListener('click', () => {
        confiramtion.innerHTML = ''
        resetScore();
        isConfirming = false
      })
      
      no.addEventListener('click', () => {
        confiramtion.innerHTML = ''
        isConfirming = false
      })
     
      }
})




let isAutoPlaying = false;
let IntervalID;

const autoPlayButton = document.querySelector('.auto-play-button')


const autoPlay = () => {
autoPlayButton.addEventListener('click', () => {
  toggleAutoPlay();
 
})
}
autoPlay();

const toggleAutoPlay = () => {
  if (!isAutoPlaying) {
    IntervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    autoPlayButton.innerHTML = 'Stop playing';
    isAutoPlaying = true;
  } else {
    clearInterval(IntervalID);
    autoPlayButton.innerHTML = 'Auto play'
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock')
  } )

  document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper')
  } )

  document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors')
  } )





document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');  
  } else if (event.key === 'p') {
    playGame('paper');  
  } else if (event.key === 's') {
    playGame('scissors')
  } else if (event.key === 'a') {
    toggleAutoPlay();
  } else if (event.key === 'Backspace'){
    resetScore();
  }

});




function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
    <img class="move-icon" src="images/${playerMove}-emoji.png" alt="">
    <img class="move-icon" src="images/${computerMove}-emoji.png" alt="">
    Computer`;
}


function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) return 'rock';
  else if (randomNumber < 2 / 3) return 'paper';
  else return 'scissors';
}