var GameEngine = (function(GameEngine) {
	
	class Trampolin{
		constructor(x,y,w,h){
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		}


		processInput(){}


		update(elapsed){}


		render(ctx){
			ctx.save();

			ctx.fillStyle = "#000fff";
			ctx.fillRect(this.x, this.y, this.w, this.h);

			ctx.restore();
		}
	}

	GameEngine.Trampolin = Trampolin;
	return GameEngine;
})(GameEngine || {})