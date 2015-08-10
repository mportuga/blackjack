var _ = require('lodash');
var playerList = {
	'dealer': {
		balance: 10000,
		cards:[]
	}
};

module.exports.createPlayer = function createPlayer(playerName) {
	if(playerList[playerName]){
		console.log('A player by that name already exists, please'+
			' choose another name!');
	} else if(_.keys(playerList).length === 5){
		console.log('The game is currently full');
	} else {
		var newPlayer = {
			balance: 1000,
			cards: []
		};
		playerList[playerName] = newPlayer;
		console.log('New Player created! Welcome ' + playerName + 
			', your balance is ' + newPlayer.balance);
	}
};

module.exports.getPlayer = function getPlayer(playerName) {
	console.log(playerList[playerName]);
	return playerList[playerName];
};

module.exports.getPlayerList = function getPlayerList() {
	return playerList;
};

module.exports.deletePlayer = function deletePlayer(playerName) {
	delete playerList[playerName];
	console.log(playerName + ' has been removed from the game');
	return playerList;
};

module.exports.updatePlayerBalance = function updatePlayerBalance(playerName, value) {
	playerList[playerName].balance += value;
	console.log(playerName + "'s new balance is " + playerList[playerName].balance);
	return playerList[playerName];
};

module.exports.getPlayerCards = function getPlayerCards(playerName) {
	console.log(playerList[playerName].cards);
	return playerList[playerName].cards;
};

module.exports.updatePlayerCards = function updatePlayerCards(playerName, card) {
	playerList[playerName].cards.push(card);
	var cardsLength = playerList[playerName].cards.length - 1;
	console.log(playerName + ' drew ' + playerList[playerName].cards[cardsLength].card + 
		' of ' + playerList[playerName].cards[cardsLength].suit);
	console.log(playerList[playerName]);
};

module.exports.resetPlayerCards = function resetPlayerCards(playerName) {
	playerList[playerName].cards = [];
};

