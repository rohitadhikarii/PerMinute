// Word sets for different complexity levels
const wordSets = {
  newbie: ['cat', 'dog', 'sun', 'run', 'big', 'red', 'yes', 'no', 'go', 'up', 'me', 'we', 'he', 'she', 'it', 'and', 'the', 'is', 'to', 'of', 'in', 'on', 'at', 'be', 'or', 'an', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with', 'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'has', 'let', 'put', 'say', 'she', 'too', 'use'],
  
  beginner: ['time', 'work', 'life', 'home', 'good', 'make', 'come', 'take', 'know', 'look', 'find', 'give', 'tell', 'call', 'move', 'live', 'feel', 'seem', 'show', 'help', 'play', 'turn', 'keep', 'mean', 'want', 'need', 'think', 'write', 'start', 'right', 'great', 'small', 'large', 'every', 'where', 'after', 'never', 'again', 'other', 'place', 'world', 'group', 'house', 'state', 'school', 'people', 'public', 'around', 'during', 'between', 'through', 'without', 'because', 'however', 'although', 'together', 'important', 'different', 'something', 'everything'],
  
  intermediate: ['consider', 'increase', 'interest', 'program', 'problem', 'possible', 'develop', 'general', 'present', 'national', 'personal', 'approach', 'standard', 'question', 'business', 'government', 'education', 'community', 'experience', 'management', 'technology', 'information', 'environment', 'particular', 'relationship', 'opportunity', 'organization', 'development', 'performance', 'application', 'recognition', 'responsibility', 'understanding', 'administration', 'communication', 'establishment', 'implementation', 'characterization', 'recommendation', 'transformation'],
  
  advanced: ['philosophical', 'psychological', 'technological', 'anthropological', 'chronological', 'methodological', 'epidemiological', 'archaeological', 'physiological', 'meteorological', 'entrepreneurial', 'interdisciplinary', 'multidimensional', 'electromagnetic', 'characteristics', 'responsibilities', 'representatives', 'implementations', 'transformations', 'recommendations', 'acknowledgments', 'accomplishments', 'considerations', 'manifestations', 'interpretations', 'specifications', 'amplifications', 'simplifications', 'diversifications', 'classifications', 'predispositions', 'telecommunications', 'biotechnology', 'nanotechnology', 'consciousness', 'subconscious', 'unconsciousness', 'metamorphosis', 'photosynthesis'],
  
  master: ['pneumonoultramicroscopicsilicovolcanoconiosis', 'floccinaucinihilipilification', 'antidisestablishmentarianism', 'supercalifragilisticexpialidocious', 'pseudopseudohypoparathyroidism', 'hippopotomonstrosesquippedaliophobia', 'spectrophotofluorometrically', 'tetraiodophenolphthalein', 'hepaticocholangiocholecystenterostomies', 'psychoneuroendocrinological', 'radioimmunoelectrophoresis', 'pneumoencephalographically', 'psychopharmacologically', 'immunoelectrophoretically', 'esophagogastroduodenoscopy', 'electroencephalographically', 'meningoencephalomyelitis', 'otorhinolaryngological', 'roentgenographically', 'electrocardiographically', 'magnetohydrodynamically', 'spectrophotometrically', 'electroretinographically', 'pneumoventriculography', 'esophagogastrostomy']
};

let gameTime = 30 * 1000; // Default 30 seconds
let currentComplexity = 'newbie';
let words = wordSets[currentComplexity];
const wordsCount = () => words.length;
window.timer = null;
window.gameStart = null;
window.pauseTime = 0;

function addClass(el,name) {
  el.className += ' '+name;
}
function removeClass(el,name) {
  el.className = el.className.replace(name,'');
}

function randomWord() {
  const randomIndex = Math.ceil(Math.random() * wordsCount());
  return words[randomIndex - 1];
}

function updateSettings() {
  const timeSelect = document.getElementById('timeSelect');
  const complexitySelect = document.getElementById('complexitySelect');
  
  gameTime = parseInt(timeSelect.value) * 1000;
  currentComplexity = complexitySelect.value;
  words = wordSets[currentComplexity];
}

function formatWord(word) {
  return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function newGame() {
  updateSettings(); // Update settings before starting new game
  document.getElementById('words').innerHTML = '';
  for (let i = 0; i < 200; i++) {
    document.getElementById('words').innerHTML += formatWord(randomWord());
  }
  addClass(document.querySelector('.word'), 'current');
  addClass(document.querySelector('.letter'), 'current');
  document.getElementById('info').innerHTML = (gameTime / 1000) + 's';
  window.timer = null;
  window.gameStart = null;
  
  // Reset game state
  removeClass(document.getElementById('game'), 'over');
  document.getElementById('cursor').style.display = 'block';
  
  // Remove any extra letters that might exist from previous games
  document.querySelectorAll('.letter.extra').forEach(letter => letter.remove());
}

function getWpm() {
  const words = [...document.querySelectorAll('.word')];
  const lastTypedWord = document.querySelector('.word.current');
  const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1;
  const typedWords = words.slice(0, lastTypedWordIndex);
  const correctWords = typedWords.filter(word => {
    const letters = [...word.children];
    const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'));
    const correctLetters = letters.filter(letter => letter.className.includes('correct'));
    return incorrectLetters.length === 0 && correctLetters.length === letters.length;
  });
  return correctWords.length / gameTime * 60000;
}

function gameOver() {
  clearInterval(window.timer);
  addClass(document.getElementById('game'), 'over');
  const result = getWpm();
  const accuracy = getAccuracy();
  document.getElementById('info').innerHTML = `WPM: ${Math.round(result)} | Accuracy: ${Math.round(accuracy)}%`;
  document.getElementById('cursor').style.display = 'none';
}

function getAccuracy() {
  // Only consider letters that have been typed (have correct or incorrect class)
  const typedLetters = [...document.querySelectorAll('.letter.correct, .letter.incorrect')];
  const correctLetters = [...document.querySelectorAll('.letter.correct')];
  
  if (typedLetters.length === 0) return 0;
  return (correctLetters.length / typedLetters.length) * 100;
}

document.getElementById('game').addEventListener('keyup', ev => {
  const key = ev.key;
  const currentWord = document.querySelector('.word.current');
  const currentLetter = document.querySelector('.letter.current');
  const expected = currentLetter?.innerHTML || ' ';
  const isLetter = key.length === 1 && key !== ' ';
  const isSpace = key === ' ';
  const isBackspace = key === 'Backspace';
  const isFirstLetter = currentLetter === currentWord.firstChild;

  if (document.querySelector('#game.over')) {
    return;
  }

  console.log({key,expected});

  if (!window.timer && isLetter) {
    window.timer = setInterval(() => {
      if (!window.gameStart) {
        window.gameStart = (new Date()).getTime();
      }
      const currentTime = (new Date()).getTime();
      const msPassed = currentTime - window.gameStart;
      const sPassed = Math.round(msPassed / 1000);
      const sLeft = Math.round((gameTime / 1000) - sPassed);
      if (sLeft <= 0) {
        gameOver();
        return;
      }
      document.getElementById('info').innerHTML = sLeft + 's';
    }, 1000);
  }

  if (isLetter) {
    if (currentLetter) {
      addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
      removeClass(currentLetter, 'current');
      if (currentLetter.nextSibling) {
        addClass(currentLetter.nextSibling, 'current');
      }
    } else {
      // Don't add extra letters to the word - just ignore extra keystrokes
      // This prevents the word from getting longer when typing beyond the actual word
      return;
    }
  }

  if (isSpace) {
    if (expected !== ' ') {
      const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
      lettersToInvalidate.forEach(letter => {
        addClass(letter, 'incorrect');
      });
    }
    removeClass(currentWord, 'current');
    addClass(currentWord.nextSibling, 'current');
    if (currentLetter) {
      removeClass(currentLetter, 'current');
    }
    addClass(currentWord.nextSibling.firstChild, 'current');
  }

  if (isBackspace) {
    if (currentLetter && isFirstLetter) {
      // make prev word current, last letter current
      removeClass(currentWord, 'current');
      addClass(currentWord.previousSibling, 'current');
      removeClass(currentLetter, 'current');
      addClass(currentWord.previousSibling.lastChild, 'current');
      removeClass(currentWord.previousSibling.lastChild, 'incorrect');
      removeClass(currentWord.previousSibling.lastChild, 'correct');
    }
    if (currentLetter && !isFirstLetter) {
      // move back one letter, invalidate letter
      removeClass(currentLetter, 'current');
      addClass(currentLetter.previousSibling, 'current');
      removeClass(currentLetter.previousSibling, 'incorrect');
      removeClass(currentLetter.previousSibling, 'correct');
    }
    if (!currentLetter) {
      // Remove any extra letters that might have been added
      const extraLetters = currentWord.querySelectorAll('.letter.extra');
      if (extraLetters.length > 0) {
        // Remove the last extra letter
        extraLetters[extraLetters.length - 1].remove();
      } else {
        // If no extra letters, make the last original letter current
        const lastOriginalLetter = currentWord.querySelector('.letter:last-child:not(.extra)');
        if (lastOriginalLetter) {
          addClass(lastOriginalLetter, 'current');
          removeClass(lastOriginalLetter, 'incorrect');
          removeClass(lastOriginalLetter, 'correct');
        }
      }
    }
  }

  // move lines / words
  if (currentWord.getBoundingClientRect().top > 400) {
    const words = document.getElementById('words');
    const margin = parseInt(words.style.marginTop || '0px');
    words.style.marginTop = (margin - 50) + 'px';
  }

  // move cursor
  const nextLetter = document.querySelector('.letter.current');
  const nextWord = document.querySelector('.word.current');
  const cursor = document.getElementById('cursor');
  if (nextLetter || nextWord) {
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 2 + 'px';
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';
  }
});

document.getElementById('newGameBtn').addEventListener('click', () => {
  gameOver();
  newGame();
});

// Add event listeners for the dropdown controls
document.getElementById('timeSelect').addEventListener('change', () => {
  if (!window.timer) { // Only update if game is not running
    updateSettings();
    document.getElementById('info').innerHTML = (gameTime / 1000) + 's';
  }
});

document.getElementById('complexitySelect').addEventListener('change', () => {
  if (!window.timer) { // Only update if game is not running
    updateSettings();
  }
});

// Initialize the game
updateSettings();
newGame();