var ros = new ROSLIB.Ros({url:'ws://' + location.hostname + ':9090'});

ros.on('connection', function(){ console.log("WebSocket: connected");});
ros.on('error', function(error){ console.log("WebSocket error: ", error);});
ros.on('close', function(){ console.log("WebSocket: closed");});

var wall1 = [140, 10];
var wall2 = [140, 120];
var circle = [140, 60, 4, -3];
var y_sub = 0;

var subscriber1 = new ROSLIB.Topic({
    ros : ros,
    name : '/subscriber1',
    messageType : 'robosys_ros/WallPosition'
});

var subscriber2 = new ROSLIB.Topic({
    ros : ros,
    name : '/subscriber2',
    messageType : 'robosys_ros/WallPosition'
});

var subscriber3 = new ROSLIB.Topic({
	ros : ros,
	name : '/subscriber3',
	messageType : 'robosys_ros/WallPosition'
});

function sub_pub(){
	var msg = new ROSLIB.Message({x:wall2[0], y:wall2[1]});
	subscriber2.publish(msg);	
	console.log("sub_pub2");
}

subscriber1.subscribe(function(message) {
	wall1[0] = message.x;
	y_sub = message.y;
	console.log("sub1");
});

subscriber3.subscribe(function(message) {
	circle[0] = message.x;
	circle[1] = 120 - message.y;
	console.log("sub3");
});

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

var count = 0;

var MoveCircle = function() {
	// speed up
	if(count % 100 == 0) {
		if(circle[2] > 0) circle[2] = circle[2] + 1;
		else circle[2] = circle[2] - 1;
		if(circle[3] > 0) circle[3] = circle[3] + 1;
		else circle[3] = circle[3] - 1;
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
	CreateWall(canvas, wall1[0], 10);
	CreateWall(canvas, wall2[0], wall2[1]);
	CreateCircle(canvas, circle[0], circle[1]);
	count = count + 1;
}

function draw() {
	SideWall(canvas);
	CreateWall(canvas, wall1[0], 10);
	CreateWall(canvas, wall2[0], wall2[1]);
	CreateCircle(canvas, circle[0], circle[1]);
}

function onClick() {
	//mouse
        var rect = event.target.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
	wall2[0] = x;
	SideWall(canvas);
        CreateWall(canvas, wall1[0], 10);
        CreateWall(canvas, touch_x, wall2[1]);
        CreateCircle(canvas, circle[0], circle[1]);
}

var canvas = document.getElementById('canvas_main');
var ctx = canvas.getContext('2d');
canvas.addEventListener('click', onClick, false);

setInterval(draw, 50);
//setInterval(MoveCircle, 50);
setInterval(sub_pub, 100);

canvas.addEventListener('touchmove', function(event) {
	//touch
	touchXY(event);
	wall2[0] = touch_x;
	SideWall(canvas);
	CreateWall(canvas, wall1[0], 10);
	CreateWall(canvas, touch_x, wall2[1]);
	CreateCircle(canvas, circle[0], circle[1]);
}, false);
