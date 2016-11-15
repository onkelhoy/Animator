var Cursor = Cursor || {
	x: 0,
	y: 0,
	before: {
		x: 0,
		y: 0
	},
	r: 0,

	create: function(x, y, r){
		var o = Object.create(this);
		o.init(x, y, r);
		return o;
	},

	init: function(x, y, r){
		this.x = x;
		this.y = y;
		this.before.x = x;
		this.before.y = y;
		this.r = r;
	},

	update: function(x, y){
		this.x = x;
		this.y = y;
	},

	render: function(ctx){
		ctx.beginPath();
		 ctx.moveTo(this.x, this.y - this.r - this.r/2);
		 ctx.lineTo(this.x, this.y + this.r + this.r/2);
		 ctx.moveTo(this.x - this.r - this.r/2, this.y);
		 ctx.lineTo(this.x + this.r + this.r/2, this.y);

		 ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		 ctx.strokeStyle = '#190846';
		 ctx.lineWidth = 1;
		 ctx.stroke();
		ctx.closePath();
	}
}