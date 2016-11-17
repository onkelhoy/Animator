/***************************************************************
		GAME VARIABLES
***************************************************************/
var c, ctx, w, h, cursor, rig;
var yarn;
/***************************************************************
		GAME INIT
***************************************************************/

window.onload = function(){
	c = document.getElementById("c");
	ctx = c.getContext("2d");
	resetCanvas();
	Events(c);

	load();
	gameLoop();

}
function resetCanvas (e) {
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight - 150;

	//make sure we scroll to the top left. 
	window.scrollTo(0,0); 
	refresh(); //refresh all objects position etc..
}


/***************************************************************
		GAME FUNCTIONS
***************************************************************/
function load(){
	cursor = Cursor.create(0, 0, 10);

	rig = Rig.create(w/2, h/2, {stick: false});

	console.log(document.getElementById("controllers").getBoundingClientRect());
}


function refresh(){

}

function update(){
	if(Eventlib.rotate){
		var angle = Delta(rig.cbone.x, rig.cbone.y, mouse.x, mouse.y).angle - Eventlib.rotate.relative + Eventlib.rotate.now;
		rig.rotate(angle);
	}

	// rig.select(mouse);


	checkKeyState(rig);
}

function render(){
	ctx.clearRect(0, 0, w, h);

	if(rig){
		rig.update(mouse, ctx);
	}
	//should be last

	if(Eventlib.rotate){
		ctx.beginPath();
		 ctx.moveTo(rig.cbone.x, rig.cbone.y);
		 ctx.lineTo(mouse.x, mouse.y);

		 ctx.setLineDash([2, 4]);
		 ctx.strokeStyle = '#555';
		 ctx.stroke();

		 ctx.setLineDash([1, 0]);
		ctx.closePath();
	}
	cursor.render(ctx);
}

function gameLoop(){
	update();
	render();
	requestAnimationFrame(gameLoop);
}