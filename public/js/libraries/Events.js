var mouse = {
	x: 0,
	y: 0,
	click: {
		left: false,
		right: false
	}
};

var Eventlib = {
	rotate: false,
	move: false,
	scale: false
};
	
function Events (c) {
	mouseAndKeyboardEvents(c);
	
	window.onorientationchange = resetCanvas;  
	window.onresize = resetCanvas;  
}


function mouseAndKeyboardEvents (c) {
	registerKeys('a,x,c,v,z,r,s,Del,Delete,Shift,Control');

	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	c.addEventListener('mousemove', mouseMove);
	c.onmousedown = mouseDown;
	c.onmouseup = mouseUp;
}
function mouseMove (e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY-40;
}
function mouseDown (e) {
	if(e.button == 0) mouse.click.left = true;
	if(e.button == 2) mouse.click.right = true;
}
function mouseUp (e) {
	if(e.button == 0) mouse.click.left = false;
	if(e.button == 2) mouse.click.right = false;
}
