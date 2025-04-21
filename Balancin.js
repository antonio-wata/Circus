var GameEngine = (function(GameEngine) {

	let KEY = GameEngine.KEY;

	class Balancin{
		constructor(x, y, w, h){
			this.x = x;
			this.y = y;
			this.vx = 0;
			this.vy = 0;
			this.rotation = 15*Math.PI/180;
			this.w = w;
			this.h = h;
			this.waitRotation = 1;
			this.waitCounter = this.waitRotation;
		}

		processInput(){
			this.vx = 0;
			this.changeRotation = false;
			if(KEY.isPress(KEY.LEFT)){
				this.x -= 5;
			}
			if(KEY.isPress(KEY.RIGHT)){
				this.x += 5;
			}
			if(KEY.isPress(KEY.Z)){
				this.changeRotation = true;
			}
		}

		update(elapsed){
			if(this.changeRotation){
				this.waitCounter += elapsed;
				if(this.waitCounter > this.waitRotation){
					this.rotation *= -1;
					this.waitCounter = 0;
				}
			}else{
				this.waitCounter = this.waitRotation;
			}
		}

		render(ctx){
			
			ctx.save();

			ctx.translate(this.x,this.y);
			ctx.rotate(this.rotation);
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(-this.w/2,0,this.w,this.h);
			
			ctx.restore();
		}
	}

	GameEngine.Balancin = Balancin;
	return GameEngine;
})(GameEngine || {})