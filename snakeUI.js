$(function() {
	makeGrid();
	colorGrid();
	play();
})

function play() {
	$(".score").html(0);
	timer = window.setInterval(function() {
		g.step();
		colorGrid();
		$('html').keydown(function (event) {
		  if (event.keyCode === 37) {
				g.snake.turn("left");
		  }
			if (event.keyCode === 38) {
				g.snake.turn("up");
			}
			if (event.keyCode === 39) {
				g.snake.turn("right");
			}
			if (event.keyCode === 40) {
				g.snake.turn("down");
			}
		});

		if(g.checkWallCollision() || g.snake.checkSelfCollision()) {
			clearInterval(timer);
			alert("you dead")
		}

	}, 125);
}



// var interval = window.setInterval()

function makeGrid() {
	_.times(g.size, function(i) {
		_.times(g.size, function(j) {
			var div = $("<div>").attr({ class: "square", id: i + "s" + j});
			$("#container").append(div);
		});
	});
}

function colorGrid() {
	$(".square").css("background-color", "green")
	snakeSquares().forEach(function(square) {
		$(square).css("background-color", "blue");
	});

	var apple = appleSquare();
	$(apple).css("background-color", "red");
}

function appleSquare() {
	var id = g.applePos[0] + "s" + g.applePos[1];
	return $('#' + id);
}

function snakeSquares() {
	squares = []
	var snakeCoords = g.snake.body;
	snakeCoords.forEach(function(pos) {
		var id = pos[0] + "s" + pos[1];
		square = $("#" + id);
		squares.push(square);
	});

	return squares;
}


function getCoords(id) {
	x = parseInt(id.split("s")[0]);
	y = parseInt(id.split("s")[1]);
	return [x, y];
}