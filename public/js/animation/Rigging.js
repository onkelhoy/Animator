/* A bone with ik
 *
 *
 */

var Rig = Rig || {
	bones: null,
	cbone: null,
	x: 0,
	y: 0,
	stick: true,
	joints: true,
	firstbone: true,
	selected: [],

	create: function(x, y, options){
		var o = Object.create(this);
		o.init(x, y, options);
		return o;
	},

	init: function(x, y, options){
		this.x = x;
		this.y = y;

		this.bones = [];
		var bone = Bone.create(x, y, 30, -Math.PI / 2);
		if(options !== undefined) {
			bone.stick = options.stick;
			this.stick = options.stick;
		}
		bone.id = 'start';
		if(options && options.joints == false) this.joints = false;
		// this.cbone = bone;
		if(options && options.firstbone == false) this.firstbone = false;
		else this.bones.push(bone);
	},

	selectBone: function(index){
		if(!this.isEmpty() && this.bones.length > index){
			this.cbone = this.bones[index];
		}
	},

	removeSelected: function(){
		var index = this.getindex(this.cbone);
		this.cbone = null;
		if(index > 0) this.bones.splice(index, 1);
	},

	getindex: function(bone){
		for(var i = 0; i < this.bones.length; i++){
			if(bone.id == this.bones[i].id) return i;
		}
		return -1;
	},

	unselect: function(){
		this.cbone = null;
	},

	isEmpty: function(){
		return this.bones.length < 2; //first bone doesnt count
	},

	addBone: function(length, options){
		var angle = -Math.PI/2;//(this.cbone ? this.cbone.getAngle() : this.bones[0].getAngle());
		// if(this.cbone) angle -= this.cbone.getAngle();

		var bone = Bone.create(0, 0, length, angle);
		bone.stick = this.stick;
		var id = createUniqueID(this.bones);
		bone.id = id;

		if(this.cbone) bone.addParent(this.cbone);
		else if(this.firstbone) bone.addParent(this.bones[0]);
		else { bone.x = this.x; bone.y = this.y; }
		
		if(options) {
			if(options.offset !== undefined){
				//add bone with an offset
				bone.x = options.position.x;
				bone.y = options.position.y;
				bone.relation();
			}
		}

		bone.update(this.x, this.y);

		this.cbone = bone;
		this.bones.push(bone);
	},

	addIK: function(follow, joint, count){
		if(this.cbone){ //the cbone is the bone that the ik will follow 'follow'
			if(joint) {
				joint.addParent(this.cbone);
				joint.relation(); //it follows the current bone, with an offset
				// this.bones.push(joint); -> it should already be in there

			}

			this.cbone.ik = {
				follow: follow,
				joint: joint,
				count: count
			};
		}
	},

	reach: function(x, y){
		if(this.cbone && this.cbone.ik) {
			this.cbone.x = x;
			this.cbone.y = y;

			if(this.cbone.ik.joint) this.cbone.ik.follow.drag(this.cbone.ik.joint.x, this.cbone.ik.joint.y, this.cbone.ik.count);
			this.cbone.ik.follow.drag(this.cbone.x, this.cbone.y, this.cbone.ik.count);
		}
	},

	rotate: function(angle){
		if(this.cbone) this.cbone.setAngle(angle);
	},

	update: function(mouse, ctx){
		var x = this.x, y = this.y;
		this.bones.forEach(function(bone){
			bone.update(x, y);

			if(ctx) {
				if(this.cbone && this.cbone.id == bone.id) bone.render(ctx, '#FFF224')
				else bone.render(ctx);
			}
		});
	},

	render: function(ctx){
		for(var i = 0; i < this.bones.length; i++) {
			this.bones[i].render(ctx, this.joints);
		}
	}
}

var Bone = Bone || {
	x: 0,
	y: 0,
	length: 0,
	angle: 0,
	id: NaN,
	parent: null,
	offset: false,
	ik: null,
	stick: true,

	create: function(x, y, length, angle){
		var obj = Object.create(this);
		obj.init(x, y, length, angle);
		return obj;
	},

	init: function(x, y, length, angle){
		this.x = x;
		this.y = y;
		this.length = length;
		this.angle = angle;
	},

	getAngle: function(){
		var angle = this.getLocalAngle();
		if(this.offset && !this.ik) angle += this.offset.angle;
		return angle;
	},

	getLocalAngle: function(){
		var angle = this.angle;
		if(this.parent && !this.ik) angle += this.parent.getAngle();

		return angle;
	},

	setAngle: function(angle){
		//now it should set the angle to angle based on parent angle
		this.angle = angle;
		this.angle -= this.parent.getAngle();
	},

	getEndX: function() {
		return this.x + Math.cos(this.getLocalAngle()) * this.length;
	},

	getEndY: function() {
		return this.y + Math.sin(this.getLocalAngle()) * this.length;
	},

	getSelect: function(){
		//return ellipse if collision works.. else mayby just a circle or ´just use the line circle collision..
	},

	pointAt: function(x, y) {
		var dx = x - this.x,
			dy = y - this.y;

		this.angle = Math.atan2(dy, dx);
	},

	drag: function(x, y, count){ //offset should not even use drag, so it wont be 
		if(count > 0) {
			if(this.ik == null) {
				if(this.parent) this.angle += this.parent.getAngle();
				this.ik = true;
			}
			this.pointAt(x, y);

			this.x = x - Math.cos(this.angle) * this.length;
			this.y = y - Math.sin(this.angle) * this.length;


			count--;
			if(this.parent){
				this.parent.drag(this.x, this.y, count);
			}
		}
	},

	relation: function(){
		var d = {x: this.x - this.parent.getEndX(), y: this.y - this.parent.getEndY()};
		this.offset = {
			length: Math.sqrt(d.x * d.x + d.y * d.y),
			angle: Math.atan2(d.y, d.x) - this.parent.getAngle()
		};

		// this.angle -= this.offset.angle;
	},

	addParent: function(parent){
		this.parent = parent;
		if(!this.ik) this.angle -= parent.getAngle();
	},

	moveLower: function(x, y){
		var p = {x: this.getEndX(), y: this.getEndY()};
		this.x = x;
		this.y = y;

		if(this.offset){
			//the changes should only apply if the offset has been made!
			this.relation();
			this.moveUpper(p.x, p.y);
		}
	},

	moveUpper: function(x, y){
		var d = Delta(this.x, this.y, x, y);
		this.angle = d.angle - this.parent.getAngle();
		this.length = d.length;
	},

	update: function(x, y){
		if(this.offset){
			var angle = this.offset.angle + this.parent.angle;
			this.x = this.parent.getEndX() + Math.cos(angle) * this.offset.length;
			this.y = this.parent.getEndY() + Math.sin(angle) * this.offset.length;
		}
		else if(this.parent) {
			this.x = this.parent.getEndX();
			this.y = this.parent.getEndY();
		}
		else {
			this.x = x;
			this.y = y;
		}
	},

	render: function(context, color, joints){

		context.beginPath();
		 context.strokeStyle = (color ? color : "#000");
		if(this.stick){
			context.lineWidth = (color ? 3 : 1.5);
			
			context.moveTo(this.x, this.y);
			context.lineTo(this.getEndX(), this.getEndY());


			context.stroke();
			context.closePath();

			if(joints) {
			context.beginPath();
			 context.arc(this.x, this.y, 2, 0, Math.PI * 2);
			 context.stroke();
			context.closePath();
			context.beginPath();
			 context.arc(this.getEndX(), this.getEndY(), 2, 0, Math.PI * 2);
			 context.stroke();
			context.closePath();
			}
		}
		else {
			context.moveTo(this.x, this.y);
			context.lineTo(this.x + Math.cos(this.getLocalAngle() + Math.PI / 10) * this.length/4, this.y + Math.sin(this.getLocalAngle() + Math.PI / 10) * this.length/4);
			context.lineTo(this.getEndX(), this.getEndY());
			context.lineTo(this.x + Math.cos(this.getLocalAngle() - Math.PI / 10) * this.length/4, this.y + Math.sin(this.getLocalAngle() - Math.PI / 10) * this.length/4);
			context.lineTo(this.x, this.y);


			context.lineWidth = (color ? 2 : 1);

			context.stroke();
			context.closePath();

			context.beginPath();
			 context.arc(this.x, this.y, this.length/8, 0, Math.PI * 2);
			 context.stroke();
			context.closePath();
			context.beginPath();
			 context.arc(this.getEndX(), this.getEndY(), this.length/8, 0, Math.PI * 2);
			 context.stroke();
			context.closePath();
		}
	}
};