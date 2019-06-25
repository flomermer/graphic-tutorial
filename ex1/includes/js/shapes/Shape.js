class Shape {
  constructor() {
    if (this.constructor === Shape)
        throw new TypeError('Cannot create instanse of Abstract Shape');

    const abstract_methods = ['draw'];
    for(let method of abstract_methods)
      if(this[method] === undefined)
        throw new TypeError(`${this.constructor.name} not implmenting the ${method} method`);

    this.draws  =  [];
    this.color  =  App.settings.color;
  }
  clear(){
    this.hide();
    this.draws = []; //clean all Shape drawables
  }
  hide(){ //only removes the drawables from the canvas
    for(let p of this.draws)
      p.clear();
  }
  show(){
    for(let p of this.draws)
      p.draw();

    clearTmpPoints();
  }  
}
