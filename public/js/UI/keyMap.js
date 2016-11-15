var keys = {};
function keydown(e){
	setkey(e, 1);
}
function keyup(e){
	setkey(e, 0);
}
function setkey(e, click){
	try {
		var k = keys[e.key];
		k.click = click;
		if(click == 0) k.pressed = 0;
	}
	catch (err) {}//key is not set
}

function registerKeys(keyarr){
	keyarr.split(',').forEach(registerKey);
}
function registerKey(name){
	keys[name] = Key.create(name);
}

var Key = Key || {
	click: 0,
	pressed: 0,
	name: '',
	create: function(name){
		var o = Object.create(this);
		o.click = 0;
		o.pressed = 0;
		o.name = name;
		return o;
	},
	clicked: function(){
		var state = this.click == 1 && this.pressed == 0;
		if(state) this.pressed = 1;
		return state;
	}
}