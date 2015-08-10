var _ = require('lodash');

var playerInfo = require('./playerInfo');
var deckInfo = require('./deckInfo');
var bets = {};

function getPlayerPoints(player, playerName) {
	var points = 0;
	player.cards.forEach(function addPoints(card){
		points += card.value;
	});
	console.log(playerName + ' has ' + points + ' points.')
	return points;
};

function serveCard(player, playerName) {
	console.log('player:' + playerName);
	playerInfo.updatePlayerCards(playerName, deckInfo.drawCard());
}

function playTurn(player, playerName) {
	var currPoints = getPlayerPoints(player, playerName);
	var cardCount = deckInfo.getDeck().length;
	console.log(cardCount);
	while(currPoints < 17 && cardCount > 0) {
		serveCard(player,playerName);
		currPoints = getPlayerPoints(player, playerName);
		cardCount = deckInfo.getDeck().length;
	}
	if(playerName === 'dealer'){
		if(currPoints > 21) {
			playerInfo.updatePlayerBalance(playerName, -bets[playerName]);
			bets[playerName] = 0;
			console.log(playerName + ' lost!');
		} else {
			console.log("I will figure this out later!");
		}
	} else {
		if(currPoints === 21) {
			console.log(bets[playerName]);
			playerInfo.updatePlayerBalance(playerName, bets[playerName]);
			bets[playerName] = 0;
			console.log(playerName + ' won!');
		} else if(currPoints > 21) {
			console.log(bets[playerName]);
			playerInfo.updatePlayerBalance(playerName, -bets[playerName]);
			bets[playerName] = 0;
			console.log(playerName + ' lost!');
		}
	}	
}

function placeBets() {
	_.forIn(playerInfo.getPlayerList(), function placeBet(player, playerName) {
		var amount = 100;
		if(playerName !== 'dealer') {
			bets[playerName] = amount;
			console.log(playerName + ' bet $' + amount);
		}
	});
	deckInfo.createDeck();
	console.log('The game has started');
	for(var i = 0; i < 2; i++) {
		_.forIn(playerInfo.getPlayerList(), serveCard);
	}
	_.forIn(playerInfo.getPlayerList(), playTurn);
}

function startGame() {
	var playerName = process.argv[2];
	playerInfo.createPlayer(playerName);
	placeBets();
	console.log('The game has ended');
}

startGame();