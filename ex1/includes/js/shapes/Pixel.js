class Pixel extends Shape{
  constructor(x,y){
    super();
    this.x = x;
    this.y = y;
  }
  get(){
    return {x,y};
  }
  draw(){
    let {ctx, dot_size} = App.canvas;
    ctx.fillRect(this.x, this.y, dot_size, dot_size);
  }
  clear(){
    let {ctx, dot_size} = App.canvas;
    ctx.clearRect(this.x, this.y, dot_size, dot_size);
  }
}
