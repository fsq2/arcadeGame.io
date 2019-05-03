'use strict';
// a counter that I will use for the 3 images
let live = 3;
//for the score
let scorey = 0;
//flags
let isfirstclick = true;
let click = true;
const easy = document.querySelector('.easy');
const hard = document.querySelector('.hard');
const playag = document.querySelector('.reseat');
const buttonmo = document.querySelector('.resat');
const mees = document.querySelector('#mese');
const imgremove = document.querySelectorAll('.lives');
let life = [...imgremove];
const scor = document.querySelector('.score');
scor.textContent = scorey;
// Enemies our player must avoid
class Enemy {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/enemy-bug.png';
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

	// Draw the enemy on the screen, required method for game
	update(dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		this.x = this.x + this.speed * dt;
		if (this.x >= 505) {
			this.x = 0;
		}
		//check fo collision
		if (this.x < player.x + 50 && this.x + 60 > player.x && this.y < player.y + 40 && 40 + this.y > player.y) {
			live--;
			player.reset();
			reducelives();
		}
	}
}

// here I did  an array that will have Enemy  objects
let allEnemies = [];
//click on easy mode
easy.addEventListener('click', () => {
	if (isfirstclick === true) {
		isfirstclick = false;
		//push the objects into the array
		return allEnemies.push(new Enemy(0, 220, Math.random() * 200 + 300), new Enemy(0, 150, Math.random() * 150 + 120),
			//math.random for speed to make the speed an predictable
			new Enemy(0, 60, Math.random() * 350 + 400));
	}
});
//click on hard mode
hard.addEventListener('click', () => {
	if (isfirstclick === true) {
		isfirstclick = false;
		//push the objects into the array
		return allEnemies.push(new Enemy(0, 220, Math.random() * 900 + 1000), new Enemy(0, 150, Math.random() * 700 + 800),
			//math.random for speed to make the speed an predictable
			new Enemy(0, 60, Math.random() * 550 + 600));
	}
});
class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.sprite = 'images/char-boy.png';
		//for the score
		scorey = 0;
	}
	// a reseat methode if the player reach the end or hit
	reset() {
		this.x = 200;
		this.y = 400;
	}
	//how to calculate the points
	theEnd() {
		if (player.y === 0) {
			player.reset();
			scorey++;
			scor.textContent = scorey;
		}
		gamewon();
	}
	handleInput(arrowKeyPress) {
		if (arrowKeyPress === 'right') {
			this.x += 101;
		}
		if (arrowKeyPress === 'left') {
			this.x -= 101;
		}

		if (arrowKeyPress === 'up') {
			this.y -= 84;
		}
//draw player in the screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	Player.prototype.theEnd();
};
//player cant get out of the game
Player.prototype.update = function(dt) {
	if (this.x > 400) {
		this.x = 400;
	}
	if (this.x < 0) {
		this.x = 0;
	}
	if (this.y > 400) {
		this.y = 400;
	}
	if (this.y < 0) {
		this.y = 0;
	}
};
var player = new Player();
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//handel player movment
Player.prototype.handleInput = function(arrowKeyPress) {
	if (arrowKeyPress === 'right') {
		this.x += 101;
	}
	if (arrowKeyPress === 'left') {
		this.x -= 101;}

	if (arrowKeyPress === 'up') {
		this.y -= 84;
	}
	if (arrowKeyPress === 'down') {
		this.y += 84;
	}
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});
//a model will show if you win or lose
function endgame() {
	const mees = document.querySelector('#mese');
	const contanier = document.querySelector('.modl').style;
	const canvasDiv = document.getElementsByTagName('canvas')[0].style;
	mees.innerHTML = 'you won the game ';
	canvasDiv.display = 'none';
	contanier.display = 'flex';
	const hideing = document.querySelectorAll('.divbutton');
	let hide = [...hideing];
	for (i of hide){};
	i.remove(i[3]);
	i.remove(i[3]);
	i.remove(i[3]);
	//to relaode the page if the player hit the reseat button
	buttonmo.addEventListener('click', function() {
		location.reload();
	});
}
//to relode the page if the player hit the reseat button
playag.addEventListener('click', function() {
	location.reload();
});
// to remove  the pics  shown as player liefs and losing the game
function reducelives() {
	if (live === 2) {
		life[0].remove();
	}
	if (live === 1) {
		life[1].remove();
	}
	if (live === 0) {
		life[2].remove();
		endgame();
		mees.innerHTML = 'you lost  the game  ): ';
	}
}
// if the player reach a score of 10 points
function gamewon() {
	if (scorey === 10) {
		endgame();
	}
}

//this two Listener is needed to make sure the player is choosing between hard ,easy
hard.addEventListener('click', () => {
	if (click === true) {
		click = false;
		return player = new Player(200, 400, 50);
	}
});
easy.addEventListener('click', () => {
	if (click === true) {
		click = false;
		return player = new Player(200, 400, 50);
	}
});
