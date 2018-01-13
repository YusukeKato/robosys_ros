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
	if(x < 30) x = 30;
	if(x > 270) x = 270;
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
var circle = [140, 60, 2, 1];

var MoveCircle = function() {
	circle[0] = circle[0] + circle[2];
	circle[1] = circle[1] + circle[3];
	if(circle[0] < 30) circle[2] = -1 * circle[2];
	if(circle[0] > 270) circle[2] = -1 * circle[2];
	var a1 = circle[0] - wall1[0];
	var a2 = circle[1] - wall1[1];
	if(Math.sqrt(a1*a1+a2*a2) < 3) {
		circle[3] = -1 * circle[3];
	} 	
	var b1 = circle[0] - wall2[0];
	var b2 = circle[1] - wall2[1];
	if(Math.sqrt(b1*b1+b2*b2) < 3) {
		bricle[3] = -1 * circle[3];
	}
	SideWall(canvas);
	CreateWall(canvas, wall1[0], wall1[1]);
	CreateWall(canvas, wall2[0], wall2[1]);
	CreateCircle(canvas, circle[0], circle[1]);
}

var canvas = document.getElementById('canvas_main');
var ctx = canvas.getContext('2d');

SideWall(canvas);
CreateWall(canvas, wall1[0], wall1[1]);
CreateWall(canvas, wall2[0], wall2[1]);
CreateCircle(canvas, circle[0], circle[1]);

setInterval(MoveCircle, 100);

canvas.addEventListener('touchmove', function(event) {
	touchXY(event);
	SideWall(canvas);
	CreateWall(canvas, wall1[0], wall1[1]);
	CreateWall(canvas, touch_x, wall2[1]);
	CreateCircle(canvas, circle[0], circle[1]);
}, false);
