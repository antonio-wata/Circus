var GameEngine = (function(GameEngine){
	let cw;
	let ch;

	let contador = 0;
	var vida = true;
	var over = "Game Over";

	let KEY = GameEngine.KEY;

	class Game {
		constructor(ctx){
			cw = ctx.canvas.width;
			ch = ctx.canvas.height;
			this.ctx = ctx;

			this.contador = contador;

			this.balancin = new GameEngine.Balancin(cw/2,ch-35,200,10);

			this.trampolinI = new GameEngine.Trampolin(0,ch-60,50,60);
			this.trampolinD = new GameEngine.Trampolin(cw-50,ch-60,50,60);
			this.trampolin = new GameEngine.Trampolin(0,0,50,60);

			this.filaUp = new GameEngine.Fila(20,-1,50,cw, "#ff0000");
			this.filaMid = new GameEngine.Fila(20,1,90,cw, "#4128ff");
			this.filaDown = new GameEngine.Fila(20,-1,130,cw, "#ffe40a");

			this.monito = new GameEngine.Sprite(cw/2+90,ch-80,50,100, true,"persona1.svg");
			this.personaje = new GameEngine.Personaje(25, ch-130,50,100,"persona2.svg", cw, ch);


			this.score = new GameEngine.Texto(100, 25, this.contador);
			this.tscore = new GameEngine.Texto(20,25, "Score:")
			this.heart = new GameEngine.Texto(900, 25, "\u2764:");
			this.live = new GameEngine.Texto(950,25, 3);
			this.finish = new GameEngine.Texto(400,300, over);

			window.addEventListener("keydown", function(evt){
				KEY.onKeyDown(evt.keyCode);
			});
			window.addEventListener("keyup", function(evt){
				KEY.onKeyUp(evt.keyCode);
			});
		}


		processInput(){
			this.balancin.processInput();
			this.monito.processInput();
			this.personaje.processInput();
			if(this.live.cadena == 0)
				if(KEY.isPress(KEY.SPACE)){
					this.score.cadena = 0;
					vida = true;
					this.live.cadena = 3;
				}
		}


		update(elapsed){

			if(this.balancin.x < 145){
				this.balancin.x += 5;
			}
			if(this.balancin.x > cw-145){
				this.balancin.x -= 5;
			}
			if(this.monito.x < 235 && this.monito.mitad){
				this.monito.x += 5;
			}else if(this.monito.x < 55 && !this.monito.mitad){
				this.monito.x += 5;
			}
			if(this.monito.x > cw-235 && !this.monito.mitad){
				this.monito.x -= 5;
			}else if(this.monito.x > cw-55 && this.monito.mitad){
				this.monito.x -= 5;
			}

			if(this.monito.mitad == true){
				if(this.personaje.x > this.monito.x-90 && this.personaje.x <= this.monito.x){
					if(this.personaje.y > ch-30 && vida){
						vida = false;
						this.live.cadena -= 1;
					}		
				}else if(this.personaje.x < this.monito.x-90 && this.personaje.x >= this.monito.x-180){
					if(this.personaje.y >= ch-130){
						this.personaje.x += 180;
						this.monito.changePosition = true;
						this.balancin.changeRotation = true;
						this.personaje.estadoY = true;
					}
				}
			}else if(this.monito.mitad == false){
				if(this.personaje.x < this.monito.x+90 && this.personaje.x >= this.monito.x){
					if(this.personaje.y > ch-30 && vida){
						vida = false;
						this.live.cadena -= 1;
					}
				}
				if(this.personaje.x > this.monito.x+90 && this.personaje.x <= this.monito.x+180){
					if(this.personaje.y >= ch-130){
						this.personaje.x -= 180;
						this.monito.changePosition = true;
						this.balancin.changeRotation = true;
						this.personaje.estadoY = true; 
					}
				}
			}

			if(!vida && this.monito.mitad){
				this.personaje.x = cw-25;
				this.personaje.y = ch-130;
				this.personaje.estadoX = false;
				this.personaje.estadoY = true;
				vida = true;
			}
			if(!vida && !this.monito.mitad){
				this.personaje.x = 25;
				this.personaje.y = ch-130;
				this.personaje.estadoX = true;
				this.personaje.estadoY = true;
				vida = true;
			}

			if(this.personaje.y == ch-130 && this.personaje.x < 50){
				this.personaje.estadoX = true;
				this.personaje.estadoY = true;
			}

			if(this.personaje.y == ch-130 && this.personaje.x > cw-50){
				this.personaje.estadoX = false;
				this.personaje.estadoY = true;
			}


			if(this.live.cadena < 1){
				this.personaje.bandera = false;
			}


			if(this.personaje.x < 20){
				this.personaje.estadoX = true;
			}
			if(this.personaje.x > cw-20){
				this.personaje.estadoX = false;
			}
			if(this.personaje.y < 30){
				this.personaje.estadoY = false;
			}
			if(this.personaje.y > ch-10){
				this.personaje.estadoY = true;
			}

			if(this.personaje.y > ch-30 && vida){
				vida = false;
				this.live.cadena -= 1;
			}

			if(this.personaje.y == 130){
				let numVivos = this.filaDown.numGlobos;
				for(let i = 0; i < this.filaDown.numGlobos; i++){
					let globo = this.filaDown.globos[i];
					if(globo.x <= this.personaje.x && this.personaje.x <= globo.x+20 && globo.live){
						globo.live = false;
						numVivos--;
						this.personaje.x -=5;
						this.personaje.y += 10;
						this.personaje.estadoY = false;
						this.score.cadena += 20;
					}
				}
				if(numVivos == 0){
					this.filaDown = new GameEngine.Fila(20,-1,130,cw, "#ffe40a");
				}
			}

			if(this.personaje.y == 90){
				let numVivos = this.filaMid.numGlobos;
				for(let i = 0; i < this.filaMid.numGlobos; i++){
					let globo = this.filaMid.globos[i];
					if(globo.x <= this.personaje.x && this.personaje.x <= globo.x+20 && globo.live){
						globo.live = false;
						numVivos--;
						this.personaje.x +=5;
						this.personaje.y += 10;
						this.personaje.estadoY = false;
						this.score.cadena += 50;
					}
				}
				if(numVivos == 0){
					this.filaMid = new GameEngine.Fila(20,1,90,cw, "#4128ff");
				}
			}

			if(this.personaje.y == 50){
				let numVivos = this.filaUp.numGlobos;
				for(let i = 0; i < this.filaUp.numGlobos; i++){
					let globo = this.filaUp.globos[i];
					if(globo.x <= this.personaje.x && this.personaje.x <= globo.x+20 && globo.live){
						globo.live = false;
						numVivos--;
						this.personaje.x -=5;
						this.personaje.y += 10;
						this.personaje.estadoY = false;
						this.score.cadena += 100;
					}
				}
				if(numVivos == 0){
					this.filaMid = new GameEngine.Fila(20,-1,50,cw, "#ff0000");
				}
			}

			this.personaje.update(elapsed);
			this.monito.update(elapsed);
			this.balancin.update(elapsed);
			this.filaUp.update(elapsed);
			this.filaMid.update(elapsed);
			this.filaDown.update(elapsed);
		}


		render(){
			this.ctx.clearRect(0, 0, cw, ch);
			this.ctx.beginPath();
			
			
			//pintamos Balancin
			this.balancin.render(this.ctx);

			//pintamos trampolin izquierdo
			this.trampolinI.render(this.ctx);

			//pintamos trampolin derecho
			this.trampolinD.render(this.ctx);

			//Fila de globos
			this.filaUp.render(this.ctx);
			this.filaMid.render(this.ctx);
			this.filaDown.render(this.ctx);

			//pintamos el personaje en el balancin
			this.monito.render(this.ctx);
			this.personaje.render(this.ctx);

			//pintamos el score
			this.tscore.render(this.ctx);
			this.score.render(this.ctx);

			//pintamos las vidas:
			this.heart.render(this.ctx);
			this.live.render(this.ctx);

			//pintamos mensaje de que el jugador perdio
			if(this.live.cadena == 0){
				this.finish.render(this.ctx);
			}

		}

	}

	GameEngine.Game = Game;
	return GameEngine;
})(GameEngine || {})