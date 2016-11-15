function createUniqueID(arr, length){
	var abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var uID = '';
	for(var i = 0; i < (length ? length : 10); i++){
		uID += abc[Math.round(Math.random() * (abc.length-1))];
	}

	arr.forEach(function(elm){
		if(elm.id == uID){
			return createUniqueID(arr, length);
		}
	});

	return uID;
}

function isSameXY(bone, add){
	return add.x == bone.getEndX() && add.y == bone.getEndY(); 
}

var Delta = function(x1, y1, x2, y2){
	var x = x1 - x2,
		y = y1 - y2;

	return {
		x: x,
		y: y,
		angle: Math.atan2(y, x),
		length: Math.sqrt(x*x + y*y)
	}
}