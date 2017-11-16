var simonGame = {
  round: 0,
  posibility: ['#green', '#yell', '#red', '#blue'],
  currentGame: [],
  player: [],
  sound: {
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    yell: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  strict: false
}

function newGame() {
  clearGame();
}

function strict() {
  if (simonGame.strict == false) {
    simonGame.strict = true;
    $("#strict").html("Is currently On").removeClass("btn-primary").addClass("btn-danger");
  } else {
    simonGame.strict = false;
    $("#strict").html("Is Currently Off").removeClass("btn-danger").addClass("btn-primary");
  }
  newGame();
}

function clearGame() {
  simonGame.currentGame = [];
  simonGame.round = 0;
  addRound();
}

function addRound() {
  simonGame.round++;
  $(".round").addClass("animated fadeOutDown");

  setTimeout(function(){
    $(".round").removeClass("animated fadeOutDown").html(simonGame.round).addClass("animated fadeInDown");
  }, 200);

  generateMove();
}

function generateMove() {
  simonGame.currentGame.push(simonGame.posibility[(Math.floor(Math.random() * 4))]);
  showMoves();
}

function showMoves() {
  var i = 0;
  var moves = setInterval(function(){
    playGame(simonGame.currentGame[i]);
    i++;
    if (i >= simonGame.currentGame.length) {
      clearInterval (moves);
    }
  }, 600);

  clearPlayer();
}

function sound(name) {
  switch(name) {
    case '#green':
      simonGame.sound.green.play();
      break;
    case '#yell':
      simonGame.sound.yell.play();
      break;
    case '#red':
      simonGame.sound.red.play();
      break;
    case '#blue':
      break;
  }
}

function playGame(field) {
  $(field).addClass('hover');
  sound(field);
  setTimeout(function(){
      $(field).removeClass('hover');
  }, 300);
}

function clearPlayer() {
  simonGame.player = [];
}

function addToPlayer(id) {
  var field = "#"+id
  console.log(field);
  simonGame.player.push(field);
  playerTurn(field);
}

function playerTurn(x) {
  if (simonGame.player[simonGame.player.length -1] !== simonGame.currentGame[simonGame.player.length - 1]) {
    if (simonGame.strict) {
      alert("Try again! ...From scratch!");
      newGame();
    } else {
      alert("Wrong move! Try again");
      showMoves()
    }
  } else {
    console.log('Good Move!');
    sound(x);
    var check = simonGame.player.length === simonGame.currentGame.length;
    if(check) {
      if(simonGame.round == 20) {
        alert("you won! Congrats.");
      } else {
        alert("Next round!");
        nextLevel();
      }
    }
  }
}

function nextLevel() {
  addRound();
}

newGame();
