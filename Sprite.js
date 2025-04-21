var GameEngine = (function(GameEngine) {

	let KEY = GameEngine.KEY;
	
	class Sprite{
		constructor(x,y,w,h,mitad,img_path){
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.vx = 0;
			this.vy = 0;
			this.waitPosition = 1;
			this.waitCounter = this.waitPosition;
			this.mitad = mitad;

			this.image = null;
			if(img_path){
				this.image = new Image();
				this.image.src = img_path;
			}
		}

		processInput(){
			this.changePosition = false;
			if(KEY.isPress(KEY.LEFT)){
				this.x -= 5;
			}
			if(KEY.isPress(KEY.RIGHT)){
				this.x +=5;
			}
			if(KEY.isPress(KEY.Z)){
				this.changePosition = true;
			}
		}

		update(elapsed){
			if(this.changePosition){
				this.waitCounter += elapsed;
				if(this.waitCounter > this.waitPosition){
					if(this.mitad){
						this.x -= 180;
						this.mitad = false;
					}
					else{
						this.x += 180;
						this.mitad = true;
					}
					this.waitCounter = 0;
				}
			}else{
				this.waitCounter = this.waitPosition;
			}
		}

		render(ctx){
			if(this.image){
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.drawImage(this.image, -this.w/2, 0, this.w, this.h);
				ctx.restore();
			}
		}
	}

	GameEngine.Sprite = Sprite;
	return GameEngine;
})(GameEngine || {})