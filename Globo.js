var GameEngine = (function(GameEngine) {
	
	class Globo{
		constructor(x, y, speed, direccion, live, cw, color){
			this.x = x;
			this.y = y;
			this.w = 20;
			this.h = 20;
			this.vx = 2;
			this.speed = speed;
			this.direccion = direccion;
			this.live = live;
			this.cw = cw;
			this.color = color;
			this.direccion = direccion;
		}

		processInput(){}

		update(elapsed){
			this.x += this.vx * this.speed * this.direccion;
			if(this.x > this.cw-this.w)
				this.x = 0;
			if(this.x < 0)
				this.x = this.cw-this.w;
		}

		render(ctx){
			ctx.save();
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,this.w,this.h);
			ctx.restore();
		}
	}

	GameEngine.Globo = Globo;
	return GameEngine;
})(GameEngine || {})