var Circle = function(x, y, r){
	var c = new Object(this);

	c.x = x;
	c.y = y;
	c.r = r;

	c.render = function(ctx){
		ctx.beginPath();
		 ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		 ctx.lineWidth = 1;
		 ctx.strokeStyle = 'blue';
		 ctx.stroke();
		ctx.closePath();
	};
};

var Ellipse = function(x, y, rx, ry, rotation){
	var e = new Object(this);

	e.x = x;
	e.y = y;
	e.r = {
		x: rx,
		y: ry
	};

	e.rotation = rotation;

	e.render = function(ctx, color){
		ctx.beginPath();
		 ctx.ellipse(this.x, this.y, this.r.x, this.r.y, this.rotation, 0, Math.PI * 2, false);
		 ctx.moveTo(this.x, this.y);
		 ctx.lineTo(this.x + Math.cos(this.rotation-Math.PI/2) * this.r.y, this.y + Math.sin(this.rotation-Math.PI/2) * this.r.y)


		 ctx.lineWidth = 1;
		 ctx.strokeStyle = (color ? color : 'black');
		 ctx.stroke();
		ctx.closePath();
	};
};

var Vector = function(x, y){
	var v = new Object(this);
	v.x = x;
	v.y = y;

	v.add = function(u){
		v.x += u.x;
		v.y += u.y;
	};
	v.reset = function(x, y){
		v.x = x;
		v.y = y;
	};
	v.subtract = function(u){
		v.x -= u.x;
		v.y -= u.y;
	};
	v.subract = function(u){
		return new Vector(v.x - u.x, v.y - u.y);
	};
	v.add = function(u){
		return new Vector(v.x + u.x, v.y + u.y);
	};

	v.multiplicate = function(term){
		v.x *= term;
		v.y *= term;
	};
	v.multi = function(term){
		return new Vector(v.x * term, v.y * term);
	};
	v.middle = function(u){
		return new Vector((v.x + u.x) / 2, (v.y + u.y) / 2);
	};
	v.distance = function(u){
		var d = v.delta(u);
		return Math.sqrt(d.x * d.x + d.y * d.y);
	};

	v.angle = {
		get: function() {
			return Math.atan2(v.y, v.x);
		},
		add: function(angle) {
			v.angle.set(v.angle.get() + angle);
		},
		set: function(angle) {
			var length = v.length.get();
			v.x = Math.cos(angle) * length;
			v.y = Math.sin(angle) * length;
		}
	}
	v.length = {
		get: function(){
			return Math.sqrt(v.x * v.x, v.y * v.y);
		},
		add: function(length) {
			v.length.set(v.length.get() + length);
		},
		set: function(length) {
			var angle = v.angle.get();
			v.x = Math.cos(angle) * length;
			v.y = Math.sin(angle) * length;
		}
	}
	v.delta = function(u){
		return {x: v.x - u.x, y: v.y - u.y};
	}
	v.clone = function(){
		return new Vector(v.x, v.y);
	};
	return v;
};