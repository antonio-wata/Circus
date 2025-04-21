var GameEngine = (function(GameEngine) {
	
	let KEY = GameEngine.KEY;

	class Personaje{
		constructor(x,y,w,h,img_path, cw, ch){
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.cw = cw;
			this.ch = ch;
			this.speed = 5;
			this.angle = (50 * Math.random()) * Math.PI/180;
			this.vx = Math.cos(this.angle); //2;
			this.vy = -5;
			this.bandera = false;
			this.estadoX = true;
			this.estadoY = true;

			this.image = null;
			if(img_path){
				this.image = new Image();
				this.image.src = img_path;
			}
		}

		processInput(){
			if(KEY.isPress(KEY.SPACE)){
				this.bandera = true;
			}
		}

		update(elapsed){
			if(this.bandera){
				if(this.estadoX)
					this.x += this.vx;
				if(!this.estadoX)
					this.x -= this.vx;
				if(this.estadoY)
					this.y += this.vy;
				if(!this.estadoY)
					this.y -= this.vy;
			}
			

		}

		render(ctx){
			if(this.bandera)
				if(this.image){
					ctx.save();
					ctx.translate(this.x, this.y);
					ctx.drawImage(this.image, -this.w/2, 0, this.w, this.h);
					ctx.restore();
				}
		}
	}

	GameEngine.Personaje = Personaje;
	return GameEngine;
})(GameEngine || {})