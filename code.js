function RenderCard(frontCard, backCard) {
	frontCard.addEventListener("click", function() {
		frontCard.style.transform = 'rotateY(180deg)';
		backCard.style.transform = 'rotateY(360deg)';
		CheckActiveBack(backCard);
		if (!isStartedGame) {
			gameTimer = setInterval(UpdateTimer, 1000);
			isStartedGame = true;
		}
	})

	backCard.addEventListener("click", function() {
		if (!backCard.classList.contains('guessed')) {
			frontCard.style.transform = 'rotateY(0deg)';
			backCard.style.transform = 'rotateY(180deg)';
			activeBack = activeBack.filter(back => back != backCard);
			if (activeBack.length === 1) {
				activeBack[0].style.background = 'white';
			}
			backCard.style.background = 'white';
		}
	})
}

var activeBack = [];

function CheckActiveBack(backCard) {
	activeBack.push(backCard);
	if (activeBack.length === 2) {
		if (activeBack[0].textContent === activeBack[1].textContent) {
			for (var i = 0; i < 2; i++) {
				activeBack[i].style.background = '#5FD573';
				activeBack[i].classList.add('guessed');
			}
			activeBack = [];
		}
		else {
			for (var i = 0; i < 2; i++) {
				activeBack[i].style.background = '#F2453D';
			}
		}
	}
	else if (activeBack.length === 3) {
		var openCards = activeBack.map(back => back.parentNode);
		var lastBack = activeBack[2];
		for (var i = 0; i < 2; i++) {
			var openCard = openCards[i];
			var frontCard = openCard.querySelector('.front');
			var backCard = openCard.querySelector('.back');
			frontCard.style.transform = 'rotateY(0deg)';
			backCard.style.transform = 'rotateY(180deg)';
			backCard.style.background = 'white';
			activeBack.pop();
		}
		activeBack[0] = lastBack;
	}
}

function MakeRandomContent(backCard) {
	var animalsKeys = Object.keys(animals).filter(key => animals[key] !== 2);
	var randomKey = animalsKeys[GetIntRandomNumber(0, animalsKeys.length - 1)];
	animals[randomKey]++;
	backCard.innerHTML = randomKey;
}

function GetIntRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function IsPlayerGuessedEverything() {
	return document.querySelectorAll('.guessed').length === 12;
}

function UpdateTimer() {
	var timer = document.querySelector('.timer');
	if (gameTimeSecond <= 0) {
		timer.innerHTML = '00:00';
		ShowResultGame(false);
		RestartGame();
	}
	var timeStr = '00:';
	if (gameTimeSecond <= 9) {
		timeStr += '0' + gameTimeSecond;
	}
	else {
		timeStr += gameTimeSecond;
	}
	timer.innerHTML = timeStr;

	if (IsPlayerGuessedEverything()) {
		ShowResultGame(true);
		RestartGame();
	}
	gameTimeSecond--;
}

function ShowResultGame(isVictory) {
	var result = document.querySelector('.result');
	var blackout = document.querySelector('.blackout');
	result.style.display = 'block';
	blackout.style.display = 'block';
	var resultTitle = result.querySelector('.result_title');

	if (isVictory) {
		resultTitle.innerHTML = 'Win';
	}
	else {
		console.log(6);
		resultTitle.innerHTML = 'Lose';
	}
}

function RestartGame() {
	clearInterval(gameTimer);
	var restartGame = document.querySelector('.restart_game');
	restartGame.addEventListener("click", function() {
		var timer = document.querySelector('.timer');
		var cards = document.querySelectorAll('.card');
		for (var i = 0; i < cards.length; i++) {
			var card = cards[i];
			var frontCard = card.querySelector('.front');
			var backCard = card.querySelector('.back');
			frontCard.style.transform = 'rotateY(0deg)';
			backCard.style.transform = 'rotateY(180deg)';
			backCard.classList.remove('guessed');
			backCard.style.background = 'white';
		}

		var result = document.querySelector('.result');
		var blackout = document.querySelector('.blackout');
		result.style.display = 'none';
		blackout.style.display = 'none';
		activeBack = [];
		timer.innerHTML = '01:00';
		gameTimeSecond = 59;
		isStartedGame = false;
	});
}


var gameTimeSecond = 59;
var isStartedGame = false;
var gameTimer;

var animals = {"🐹": 0, "🐟": 0, "🐶": 0, "🐷": 0, "🦄": 0, "🐱": 0};

var cards = document.querySelector('.cards').children;

for (var i = 0; i < cards.length; i++) {
	var card = cards[i];
	var frontCard = card.querySelector('.front');
	var backCard = card.querySelector('.back');
	MakeRandomContent(backCard);
	RenderCard(frontCard, backCard);
}