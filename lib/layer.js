module.exports = Layer;

function Layer(route, fn){
	this.path = route;
	this.handle = fn;

	this.match = function(route){

			if(this.path === route){
				
				return {path : this.path};
			}else if(route.substr(0, this.path.length) === this.path){

				return {path : this.path};
			}else{

				return undefined;
			}
		}	
}


