class Line extends Shape{
  constructor(p0, p1){
    super();
    this.p0 = p0;
    this.p1 = p1;
  }
  draw(){
    this.bresenham();
    super.show();
  }

  bresenham(){
    const {p0, p1} = this;
    const dx = Math.abs(p1.x - p0.x);
    const dy = Math.abs(p1.y - p0.y);
    var sx = (p0.x < p1.x) ? 1 : -1;
    var sy = (p0.y < p1.y) ? 1 : -1;
    var err = dx - dy;

    let {x,y} = p0;
    while(true) {
      this.draws.push(new Pixel(x,y));

      if ((x === p1.x) && (y === p1.y)) break;
      var e2 = 2*err;
      if (e2 > -dy) { err -= dy; x  += sx; }
      if (e2 < dx)  { err += dx; y  += sy; }
    }
  }
}
