function SideWall(canvas) {
	ctx.clearRect(0, 0, 400, 400);
	ctx.beginPath();
	ctx.moveTo(10, 0);
	ctx.lineTo(10, 400);
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(290, 0);
	ctx.lineTo(290, 400);
	ctx.stroke();
}

function CreateWall(canvas, x, y) {
	if ( ! canvas || ! canvas.getContext ) { return false; }
	if(x < 20) x = 20;
	if(x > 280) x = 280;
	ctx.beginPath();
	ctx.moveTo(x-20, y);
	ctx.lineTo(x+20, y);
	ctx.closePath();
	ctx.stroke();
}

function CreateCircle(canvas, x, y) {
	ctx.beginPath();
  	ctx.arc(x, y, 5, 0, Math.PI*2, false);
  	ctx.stroke();
}

var touch_x;
var touch_y;
var touchXY = function(event) {
    var touch = event.changedTouches[0];
    var moveX = touch.pageX;
    var moveY = touch.pageY;
    var clientRect = canvas.getBoundingClientRect();
    var positionX = clientRect.left + window.pageXOffset;
    var positionY = clientRect.top + window.pageYOffset; 

    touch_x = moveX - positionX;
    touch_y = moveY - positionY;
};

var wall1 = [140, 10];
var wall2 = [140, 120];
var circle = [140.0, 60.0, 4.0, 3.0];
var count = 0;

var MoveCircle = function() {
	// speed up
	if(count % 100 == 0) {
		var max = 2;
		var min = 0;
		var r1 = Math.floor(Math.random() * (max + 1 - min)) + min;
		var r2 = Math.floor(Math.random() * (max + 1 - min)) + min;
		if(circle[2] > 0) circle[2] = circle[2] + r1;
		else circle[2] = circle[2] - r1;
		if(circle[3] > 0) circle[3] = circle[3] + r2;
		else circle[3] = circle[3] - r2;
	}
	circle[0] = circle[0] + circle[2];
	circle[1] = circle[1] + circle[3];
	// Side wall
	if(circle[0] < 20) {
		circle[2] = -1 * circle[2];
		circle[0] = 20;
	}
	if(circle[0] > 280) {
		circle[2] = -1 * circle[2];
		circle[0] = 280;
	}
	// player wall
	var a1 = circle[0] - wall1[0];
	var a2 = circle[1] - wall1[1];
	if(Math.sqrt(a1*a1+a2*a2) < 14) {
		circle[1] = 24;
		circle[3] = -1 * circle[3];
	} 	
	if(circle[1] < 10) {
		circle[1] = 24;
		circle[3] = -1 * circle[3];
	}
	var b1 = circle[0] - wall2[0];
	var b2 = circle[1] - wall2[1];
	if(Math.sqrt(b1*b1+b2*b2) < 14) {
		circle[1] = 106;
		circle[3] = -1 * circle[3];
	}
	// out circle
	if(circle[1] < 0 || circle[1] > 300) {
		circle[1] = 60;
		circle[2] = 4;
		circle[3] = 3;
	}	
	// draw	
	SideWall(canvas);
	CreateWall(canvas, wall1[0], wall1[1]);
	CreateWall(canvas, wall2[0], wall2[1]);
	CreateCircle(canvas, circle[0], circle[1]);
	count = count + 1;
}

var canvas = document.getElementById('canvas_main');
var ctx = canvas.getContext('2d');

SideWall(canvas);
CreateWall(canvas, wall1[0], wall1[1]);
CreateWall(canvas, wall2[0], wall2[1]);
CreateCircle(canvas, circle[0], circle[1]);

setInterval(MoveCircle, 50);

canvas.addEventListener('touchmove', function(event) {
	touchXY(event);
	wall2[0] = touch_x;
	SideWall(canvas);
	CreateWall(canvas, wall1[0], wall1[1]);
	CreateWall(canvas, touch_x, wall2[1]);
	CreateCircle(canvas, circle[0], circle[1]);
}, false);
