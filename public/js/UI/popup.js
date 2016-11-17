var PopupSystem = PopupSystem || {
	popups: [],

	create: function(){
		var o = Object.create(this);
		o.init();
		return o;
	},
	init: function(){

	}
};

var Popup = Popup || {
	yarn: null,
	box: null,
	boxPos: {x: 0, y: 0},
	base: {x: 0, y: 0},
	msg: "",
	animation: null,

	create: function(x, y, msg, options){
		var o = Object.create(this);
		o.init(x, y, msg, options);
		return o;
	},
	init: function(x, y, msg, options){
		this.boxPos.x = this.base.x = x;
		this.boxPos.y = this.base.y = y;


		this.msg = msg;
		this.createBox(x, y);
		this.setAnimation(options);
		

		this.yarn = Rig.create(x, y, {stick: true, firstbone: false, joints: false});
		var count = options.length/5;
		for(var i = 0; i < count; i++){
			this.yarn.addBone(5);
		}

		this.yarn.addIK(this.yarn.cbone.parent, undefined, this.yarn.bones.length-2);
	},

	createBox: function(x, y){
		//creating the box
		this.box = document.createElement("div");
		this.box.className = "popupBox";
		this.box.style.left = x+'px';
		this.box.style.top 	= y+'px';

		//close button
		var closeButton = document.createElement("button");
		var iclose = document.createElement("i");
		iclose.className = "fa fa-times";
		closeButton.appendChild(iclose);

		//text
		var p = document.createElement("p");
		p.innerHTML = this.msg;

		//append the elements to box
		this.box.appendChild(closeButton);
		this.box.appendChild(p);
		//append box to body
		document.body.appendChild(this.box);
	},

	setAnimation: function(options){
		var moveto = {x: 0, y: 0},
			bound = this.box.getBoundingClientRect(),
			length = options.length/2;

		var angle = Math.random() * Math.PI*2;

		if(Math.cos(angle)*length+bound.left < 0 || Math.cos(angle)*length+bound.right > w){
			
		}

		if(Math.sin(angle)*length+bound.top < 0 || Math.sin(angle)*length+bound.bottom > h){
			
		}
	},

	update: function(mouse, ctx){
		if(this.animation){

		}
		else if(this.yarn) {


			var bound = this.box.getBoundingClientRect();
			this.yarn.reach(bound.left, bound.bottom);
			this.yarn.update(undefined, ctx);
		}
	},

	remove: function(){
		this.box.parentNode.removeChild(this.box);
		this.yarn = null;
	}
};