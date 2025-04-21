var GameEngine = (function(GameEngine) {
	
	class Fila{
		constructor(numGlobos, direccion,altura, cw, color, delayActivation=1){
			this.numGlobos = numGlobos;
			this.globos = [];
			for(let i = 0; i < numGlobos; i++){
				this.globos.push(new GameEngine.Globo(i*49, altura, 1, direccion, true, cw, color));
			}
		}

		processInput(){}

		update(elapsed){
			for(let i = 0, l = this.globos.length; i < this.numGlobos; i++){
				if(this.globos[i].live){
					this.globos[i].update(elapsed);
				}
			}
		}

		render(ctx){
			for(let i = 0, l = this.globos.length; i < this.numGlobos; i++){
				if(this.globos[i].live){
					this.globos[i].render(ctx);
				}
			}
		}

	}

	GameEngine.Fila = Fila;
	return GameEngine;
})(GameEngine || {})