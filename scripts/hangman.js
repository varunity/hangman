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
}

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
	
}

function resetScore() {
	alert('Score has been reset');
}

// Select random word to guess
function getWord() {
  var a = new Array('abate','aberrant','abscond','accolade','acerbic','acumen','adulation','adulterate','aesthetic','aggrandize','alacrity','alchemy','amalgamate','ameliorate','amenable','anachronism','anomaly','approbation','archaic','arduous','ascetic','assuage','astringent','audacious','austere','avarice','aver','axiom','bolster','bombast','bombastic','bucolic','burgeon','cacophony','canon','canonical','capricious','castigation','catalyst','caustic','censure','chary','chicanery','cogent','complaisance','connoisseur','contentious','contrite','convention','convoluted','credulous','culpable','cynicism','dearth','decorum','demur','derision','desiccate','diatribe','didactic','dilettante','disabuse','discordant','discretion','disinterested','disparage','disparate','dissemble','divulge','dogmatic','ebullience','eccentric','eclectic','effrontery','elegy','eloquent','emollient','empirical','endemic','enervate','enigmatic','ennui','ephemeral','equivocate','erudite','esoteric','eulogy','evanescent','exacerbate','exculpate','exigent','exonerate','extemporaneous','facetious','fallacy','fawn','fervent','filibuster','flout','fortuitous','fulminate','furtive','garrulous','germane','glib','grandiloquence','gregarious','hackneyed','halcyon','harangue','hedonism','hegemony','heretical','hubris','hyperbole','iconoclast','idolatrous','imminent','immutable','impassive','impecunious','imperturbable','impetuous','implacable','impunity','inchoate','incipient','indifferent','inert','infelicitous','ingenuous','inimical','innocuous','insipid','intractable','intransigent','intrepid','inured','inveigle','irascible','laconic','laud','loquacious','lucid','luminous','magnanimity','malevolent','malleable','martial','maverick','mendacity','mercurial','meticulous','misanthrope','mitigate','mollify','morose','mundane','nebulous','neologism','neophyte','noxious','obdurate','obfuscate','obsequious','obstinate','obtuse','obviate','occlude','odious','onerous','opaque','opprobrium','oscillation','ostentatious','paean','parody','pedagogy','pedantic','penurious','penury','perennial','perfidy','perfunctory','pernicious','perspicacious','peruse','pervade','pervasive','phlegmatic','pine','pious','pirate','pith','pithy','placate','platitude','plethora','plummet','polemical','pragmatic','prattle','precipitate','precursor','predilection','preen','prescience','presumptuous','prevaricate','pristine','probity','proclivity','prodigal','prodigious','profligate','profuse','proliferate','prolific','propensity','prosaic','pungent','putrefy','quaff','qualm','querulous','query','quiescence','quixotic','quotidian','rancorous','rarefy','recalcitrant','recant','recondite','redoubtable','refulgent','refute','relegate','renege','repudiate','rescind','reticent','reverent','rhetoric','salubrious','sanction','satire','sedulous','shard','solicitous','solvent','soporific','sordid','sparse','specious','spendthrift','sporadic','spurious','squalid','squander','static','stoic','stupefy','stymie','subpoena','subtle','succinct','superfluous','supplant','surfeit','synthesis','tacit','tenacity','terse','tirade','torpid','torque','tortuous','tout','transient','trenchant','truculent','ubiquitous','unfeigned','untenable','urbane','vacillate','variegated','veracity','vexation','vigilant','vilify','virulent','viscous','vituperate','volatile','voracious','waver','zealous');
  return a[parseInt(Math.random()* a.length)];
}