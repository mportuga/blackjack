var deck = [];

function getCardValue(cardNumber) {
	if(cardNumber > 10){
		return 10;
	} else {
		return cardNumber;
	}
}

function getCardName(cardNumber) {
	switch(cardNumber){
		case 1:
			return 'Ace';
		case 11:
			return 'Jack';
		case 12:
			return 'Queen';
		case 13:
			return 'King';
		default:
			return cardNumber;
	}
}

module.exports.createDeck = function createDeck() {
	for(var i = 0; i<4; i++){
		var suit = ['clubs', 'diamonds', 'hearts', 'spades'];
		for(var j = 1; j<14; j++) {
			var card = {
				suit: suit[i],
				card: getCardName(j),
				value: getCardValue(j)
			};
			deck.push(card);
		}
	}
	console.log('New deck created!');
	return deck;
};

module.exports.deleteDeck = function deleteDeck(){
	deck = [];
	console.log("Your deck has been cleared!");
	return deck;
}

module.exports.getDeck = function getDeck(){
	return deck;
}

module.exports.drawCard = function drawCard(){
	var card = Math.floor((Math.random() * deck.length));
	var drawnCard = deck.splice(card, 1);
	console.log('The deck has ' + deck.length + ' cards left.');
	return drawnCard[0];
}