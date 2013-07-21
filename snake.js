var SnakeGame = (function () {
	function Snake() {
		this.direction = "up";
		this.body = [[19, 9], [18, 9], [17, 9]];
	}

	Snake.prototype.turn = function(direction) {
		this.direction = direction;
	}

	Snake.prototype.checkSelfCollision = function() {
		var that = this;
		for (var i = 0; i < that.body.length - 1; i++) {
			for (var j = i + 1; j < that.body.length; j++) {
				if (comparePositions(that.body[i], that.body[j])) {
					return true;
				}
			}
		}
		return false;
	}


	function comparePositions(pos1, pos2) {
		return ((pos1[0] === pos2[0]) && (pos1[1] === pos2[1]));
	}

	Snake.prototype.move = function() {

		var head = this.body[this.body.length - 1]
		var newX, newY;

		switch(this.direction) {
		case "right":
			newX = head[0];
			newY = head[1] + 1;
			break;
		case "left":
			newX = head[0];
			newY = head[1] - 1;
			break;
		case "up":
			newX = head[0] - 1;
			newY = head[1];
			break;
		case "down":
			newX = head[0] + 1;
			newY = head[1];
			break;
		}

		this.body.push([newX, newY])
	}

	function Board(size) {
		this.size = size;
	}


	function Game(size) {
		this.size = size;
		this.snake = new Snake();
		this.applePos = this.setApple();
	}

	Game.prototype.step = function() {
		var snakeHead = this.snake.body[this.snake.body.length - 1]
		if (!comparePositions(this.applePos, snakeHead)) {
			this.snake.body.shift();
		}
		else{
			this.applePos = this.setApple();
			$(".score").html(parseInt($(".score").html()) + 1);
		}
		this.snake.move();
	}

	Game.prototype.checkWallCollision = function() {
		var x = this.snake.body[this.snake.body.length - 1][0];
		var y = this.snake.body[this.snake.body.length - 1][1];
		return x === this.size || y === this.size || x < 0 || y < 0;
	}

	Game.prototype.setApple = function() {
		var x = Math.floor(this.size * Math.random());
		var y = Math.floor(this.size * Math.random());
		return [x, y];
	}

	return {
		Snake: Snake,
		Game: Game
	};

})();

g = new SnakeGame.Game(20);





