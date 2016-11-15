function checkKeyState(rig){
	
	if(keys.a.clicked() && keys.Control.click == 1){
		//add bone
		addBone(rig, 100);
	}
	if(keys.Delete.clicked()){
		rig.removeSelected();
	}
	// if(keys.m.clicked()){
	// 	//select to move
	// 	Eventlib.move = true;
	// }
	if(keys.r.clicked()){
		//select to move
		if(rig.cbone){
			var d = Delta(rig.cbone.x, rig.cbone.y, mouse.x, mouse.y);
			Eventlib.rotate = {
				relative: d.angle,
				now: rig.cbone.angle
			}

			console.log(Eventlib.rotate);
		}
	}



	if(mouse.click.left){
		cursor.update(mouse.x, mouse.y);

		//confirms
		if(Eventlib.rotate) Eventlib.rotate = false;
		if(Eventlib.move) Eventlib.rotate = false;
		mouse.click.left = false;
	}

	if(mouse.click.right){
		//cancle
		if(Eventlib.rotate){
			rig.cbone.angle = Eventlib.rotate.now;
			Eventlib.rotate = false;
		}
		if(Eventlib.move){

			Eventlib.move = false;
		}
	}

}




// rig third party functions
function addBone(rig, length){
	var options = {
		offset: undefined,
		position: null
	};
	if(rig.cbone && !isSameXY(rig.cbone, cursor) || !rig.cbone){
		options.position = {
			x: cursor.x, 
			y: cursor.y
		};
		options.offset = true;
	}
	

	rig.addBone(length, options);
	cursor.update(rig.cbone.getEndX(), rig.cbone.getEndY());
}
