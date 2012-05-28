// Global variables
var canvas = document.getElementById('stage'),
	word = document.getElementById('word'),
	letters = document.getElementById('letters'),
	wordToGuess,
	wordLength,
	badGuesses,
	correctGuesses;

function init() {
	var helptext = $('#helptext'),
		w = screen.availWidth <= 800 ? screen.availWidth : 800;
	
	// Hide the loading message and display the control buttons
	$('#loading').hide();
	$('#play').css('display', 'inline-block').click(newGame);
	$('#clear').css('display', 'inline-block').click(resetScore);
	$('#help').click(function(e) {
		$('body').append('<div id="mask"></div>');
        helptext.show().css('margin-left', (w-300)/2 + 'px');
    });
	$('#close').click(function(e) {
		$('#mask').remove();
        helptext.hide();
    });
	
	// Rescale the canvas if the screen is wider than 700px
	if (screen.innerWidth >= 700) {
		canvas.getContext('2d').scale(1.5, 1.5);
	}
// Initialize the scores and store locally if not already stored
	if (localStorage.getItem('hangmanWin') == null) {
		localStorage.setItem('hangmanWin', '0');
	} 
	if (localStorage.getItem('hangmanLose') == null) {
		localStorage.setItem('hangmanLose', '0');
	}
	showScore();
}

// Display the score in the canvas
function showScore() {
	var won = localStorage.getItem('hangmanWin'),
	    lost = localStorage.getItem('hangmanLose'),
		c = canvas.getContext('2d');
	// clear the canvas
	canvas.width = canvas.width;
	c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
    c.fillStyle = 'red';
	c.textAlign = 'center';
	c.fillText('YOUR SCORE', 100, 50);
	c.font = 'bold 18px Optimer, Arial, Helvetica, sans-serif';
	c.fillText('Won: ' + won + ' Lost: ' + lost, 100, 80);
}


// Start new game
function newGame() {
	var placeholders = '',
		frag = document.createDocumentFragment(),
		abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	badGuesses = 0;
	correctGuesses = 0;
	wordToGuess = getWord();
	wordLength = wordToGuess.length;
	// create row of underscores the same length as letters to guess
	for (var i = 0; i < wordLength; i++) {
		placeholders += '_';
	}
	word.innerHTML = placeholders;
	// create an alphabet pad to select letters
	letters.innerHTML = '';
	for (i = 0; i < 26; i++) {
		var div = document.createElement('div');
		div.style.cursor = 'pointer';
		div.innerHTML = abc[i];
		div.onclick = getLetter;
		frag.appendChild(div);
	}
	letters.appendChild(frag);
	drawCanvas();
}

// Get selected letter and remove it from the alphabet pad
function getLetter() {
	checkLetter(this.innerHTML);
	this.innerHTML = '&nbsp;';
	this.style.cursor = 'default';
	this.onclick = null;
}

// Check whether selected letter is in the word to be guessed
function checkLetter(letter) {
	var placeholders = word.innerHTML,
	    wrongGuess = true;
	// split the placeholders into an array
	placeholders = placeholders.split('');
	// loop through the array
	for (var i = 0; i < wordLength; i++) {
		// if the selected letter matches one in the word to guess,
		// replace the underscore and increase the number of correct guesses
		if (wordToGuess.charAt(i) == letter.toLowerCase()) {
			placeholders[i] = letter;
			wrongGuess = false;
			correctGuesses++;
			// redraw the canvas only if all letters have been guessed
			if (correctGuesses == wordLength) {
				drawCanvas();
			}
		}
	}
	// if the guess was incorrect, increment the number of bad
	// guesses and redraw the canvas
	if (wrongGuess) {
		badGuesses++;
		drawCanvas();
	}
	// convert the array to a string and display it again
	word.innerHTML = placeholders.join('');
}

// Draw the canvas
function drawCanvas() {
	var c = canvas.getContext('2d');
	// reset the canvas and set basic styles
	canvas.width = canvas.width;
	c.lineWidth = 10;
	c.strokeStyle = 'green';
	c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
	c.fillStyle = 'red';
	// draw the ground
	drawLine(c, [20,190], [180,190]);
		


	// start building the gallows if there's been a bad guess
	if (badGuesses > 0) {

			//draw good man	
			c.strokeStyle = 'black';
			c.lineWidth = 3;
			//draw head
			c.beginPath();
			c.arc(45, 45, 15, 0, (Math.PI/180)*360);
			c.stroke(); 
			// draw body
			drawLine(c, [45,60], [45,130]);
			// draw left arm
			drawLine(c, [45,80], [10,90]);
			// draw right arm
			drawLine(c, [45,80], [80,90]);
			// draw left leg
			drawLine(c, [45,130], [30,170]);
			// draw right leg 
			drawLine(c, [45,130], [60,170]);



		if (badGuesses > 1) {
			c.strokeStyle = 'black';
			c.lineWidth = 3;
			
			//draw bad man
			// draw head
			c.moveTo(160, 45);
			c.arc(145, 45, 15, 0, (Math.PI/180)*360);
			c.stroke(); 
		}
		if (badGuesses > 2) {
			// draw body
			drawLine(c, [145,60], [145,130]);
		}
		if (badGuesses > 3) {
			// draw right leg
			drawLine(c, [145,130], [160,170]);
			}
		if (badGuesses > 4) {
			// draw left leg
			drawLine(c, [145,130], [130,170]);
		}
		if (badGuesses > 5) {
			// draw right arm
			drawLine(c, [145,80], [180,90]);
				}
		if (badGuesses > 6) {
			// draw left arm
			drawLine(c, [145,80], [110,90]);
		}
		if (badGuesses > 7) {
			// draw gun and end game
			drawLine(c, [110,90],[110,80]);
			drawLine(c, [110,80],[90,80]);
			c.fillText('Game over', 45, 110);
			// remove the alphabet pad
			letters.innerHTML = '';
			// display the correct answer
			// need to use setTimeout to prevent race condition
			setTimeout(showResult, 300);
			// increase score of lost games
			localStorage.setItem('hangmanLose', 1 + parseInt(localStorage.getItem('hangmanLose')));
			// display the score after two seconds
			setTimeout(showScore, 2000);
		}
	}
	// if the word has been guessed correctly, display message,
	// update score of games won, and then show score after 2 seconds
	if (correctGuesses == wordLength) {
		letters.innerHTML = '';
		c.fillText('You won!', 45,110);
        // increase score of won games
        // display score
		localStorage.setItem('hangmanWin', 1 + parseInt(localStorage.getItem('hangmanWin')));
		setTimeout(showScore, 2000);
	}
}

function drawLine(context, from, to) {
	context.beginPath();
	context.moveTo(from[0], from[1]);
	context.lineTo(to[0], to[1]);
	context.stroke();
}

// When the game is over, display missing letters in red
function showResult() {
	var placeholders = word.innerHTML;
    placeholders = placeholders.split('');
	for (i = 0; i < wordLength; i++) {
		if (placeholders[i] == '_') {
			placeholders[i] = '<span style="color:red">' + wordToGuess.charAt(i).toUpperCase() + '</span>';
		}
	}
	word.innerHTML = placeholders.join('');
}

// Reset stored scores to zero
function resetScore() {
	localStorage.setItem('hangmanWin', '0');
	localStorage.setItem('hangmanLose', '0');
	showScore();
}

// Select random word to guess
function getWord() {
  var a = new Array('a go', 'accompong', 'ackee', 'agony', 'aks', 'alias', 'almshouse', 'an', 'armagideon', 'asham', 'ot', 'babylon', 'bad', 'bad bwai', 'badness', 'bafan, bafhan, bafhand', 'bag-a-wire', 'baggy', 'bait', 'bakra', 'baldhead, balhead', 'balmyard', 'bamba yay', 'bambu, bamboo', 'bammy', 'bandulu', 'bang belly', 'bangarang', 'bankra', 'banton', 'bashment', 'bashment', 'bat', 'batty', 'battybwoy', 'battyman', 'bax, box', 'beast', 'beat', 'bee', 'beef', 'beenie', 'bere', 'bex', 'bhuttu', 'big bout yah', 'bills', 'biscuit', 'bissy', 'black up', 'blackheart man', 'blem', 'blouse and skirt', 'bly', 'boasie', 'boasin tone', 'bobo dread', 'bobo', 'boderation', 'boonoonoonous', 'boops', 'boss', 'box', 'braa', 'braata', 'breddrin', 'bredren', 'breed', 'brindle', 'brinks', 'broughtupsy', 'bubu', 'buck up', 'bucky', 'bucky massa', 'bud', 'bufu-bufu', 'buguyaga', 'bull bucka', 'bulla', 'bumbo', 'bumbo claat', 'bun', 'bungo');
  return a[parseInt(Math.random()* a.length)];
}
