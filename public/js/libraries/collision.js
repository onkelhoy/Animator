var Collisions = {
	EllipseCircle: function(e, c, info){
		var ec = Delta(e.x, e.y, c.x, c.y);

		var a = e.r.x, b = e.r.y,
			d = {x: Math.cos(ec.angle - e.rotation) * -ec.length + e.x, y: Math.sin(ec.angle - e.rotation) * -ec.length + e.y},
			x = d.x - e.x, y = d.y - e.y;

		var delta = ((a*b) / Math.sqrt(a*a*y*y + b*b*x*x));
		var point = {
			x: delta * x + e.x,
			y: delta * y + e.y
		}

		delta = Delta(e.x, e.y, point.x, point.y);

		point.x = e.x + Math.cos(delta.angle + e.rotation) * -delta.length;
		point.y = e.y + Math.sin(delta.angle + e.rotation) * -delta.length;

		var dis1 = Delta(e.x, e.y, c.x, c.y).length,
			dis2 = Delta(point.x, point.y, c.x, c.y).length,
			dis3 = Delta(e.x, e.y, point.x, point.y).length;

		if(info){
			return {
				collision: dis2 < c.r || dis3 > dis1,
				distance1: dis1,
				distance2: dis2,
				distance3: dis3,
				point: point
			}
		}
		else return dis2 < c.r || dis3 > dis1;
	},

	CircleCircle: function(c, u, info){
		var d = Delta(c.x, c.y, u.x, u.y);

		if(info) {
			return {
				collision: d.length <= c.r + u.r,
				distance: d.length
			}
		}

		return d.length <= c.r + u.r;
	}
}