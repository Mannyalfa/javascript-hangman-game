var hangman = {
    // allowed guesses 
    guesses: 6,
    // Available words for guessing
    dictionary: ["impress", "incapable", "satisfaction", "develop", "determine"],

    // (B) FLAGS
    word: null, // Current word
    wordlen: 0, // length
    rights: 0, // correct words
    wrongs: 0, //  wrong guesses

    // (C) HTML ELEMENTS
    hImg: null, // hangman image
    hWord: null, // current word
    hChar: null, // available characters
    hLives: null, // lives remaining

    // (D) INIT
    init: function () {
        // html elements
        hangman.hImg = document.getElementById("hangman-img");
        hangman.hWord = document.getElementById("hangman-words");
        hangman.hChar = document.getElementById("hangman-char");
        hangman.hLives = document.getElementById("hangman-lives");

        // generate letters
        for (var i = 65; i < 91; i++) {
            let charnow = document.createElement("input");
            charnow.type = "button";
            charnow.value = String.fromCharCode(i);
            charnow.disabled = true;
            charnow.addEventListener("click", hangman.check);
            hangman.hChar.appendChild(charnow);
        }

        // start game
        let rst = document.getElementById("hangman-reset");
        rst.addEventListener("click", hangman.reset);
        rst.disabled = false;
        hangman.reset();
    },

    // (E) enable/disable characters
    toggle: function (disable) {
        let all = hangman.hChar.getElementsByTagName("input");
        for (var i of all) { i.disabled = disable; }
    },

    // game start/reset
    reset: function () {
        // (F1) RESET STATS
        hangman.rights = 0;
        hangman.wrongs = 0;
        hangman.hLives.innerHTML = hangman.guesses;
        hangman.hImg.style.opacity = 0;

        // (F2) CHOOSE A RANDOM WORD FROM THE DICTIONARY
        hangman.word = hangman.dictionary[Math.floor(Math.random() * Math.floor(hangman.dictionary.length))];
        hangman.word = hangman.word.toUpperCase();
        hangman.wordlen = hangman.word.length;
        // CHEAT!
        // console.log(hangman.word);

        // draw blanks
        hangman.hWord.innerHTML = "";
        for (var i = 0; i < hangman.word.length; i++) { var charnow = document.createElement("span"); charnow.innerHTML = "_"; charnow.id = "hangword-" + i; hangman.hWord.appendChild(charnow); } // (F4) ENABLE ALL CHARACTERS hangman.toggle(false); }, // (G) CHECK IF SELECTED CHARACTER IS IN THE CURRENT WORD check : function () { // (G1) CHECK FOR HITS var index = 0, hits = []; while (index >= 0) {
        index = hangman.word.indexOf(this.value, index);
        if (index == -1) { break; }
        else {
            hits.push(index);
            index++;
        }
    }

      // reveal word
      if(hits.length > 0) {
        // Reveal words
        for (var hit of hits) {
    document.getElementById("hangword-" + hit).innerHTML = this.value;
}

// win
hangman.rights += hits.length;
if (hangman.rights == hangman.wordlen) {
    hangman.toggle(true);
    alert("YOU WIN!");
}
      }

      // wrong answer
      else {
    // Update hangman
    hangman.wrongs++;
    var livesleft = hangman.guesses - hangman.wrongs;
    hangman.hLives.innerHTML = livesleft;
    hangman.hImg.style.opacity = (1 - (livesleft / hangman.guesses)).toFixed(2);

    // player lose
    if (hangman.wrongs == hangman.guesses) {
        hangman.toggle(true);
        alert("YOU LOSE!");
    }
}

// disable letter
this.disabled = true;
    }
  };

window.addEventListener("DOMContentLoaded", hangman.init);