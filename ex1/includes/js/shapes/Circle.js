class Circle extends Shape{
  constructor(p0, p1){
    super();
    this.center = p0;
    this.radius = Math.round(Math.sqrt( Math.pow((p0.x-p1.x), 2) + Math.pow((p0.y-p1.y), 2) ));
  }
  draw(){
    this.bresenheim();
    super.show();
  }

  bresenheim(){
    let x = 0;
    let y = this.radius;
    let p = 3 - (2*this.radius);
    while(x<y){
      this.plot_circle_points(x, y);
      if(p<0) {
        p += 4 * x + 6;
      } else {
        p += 4 * (x - y) + 10;
        y--;
      }
      x++;
    }
    if(x==y)
      this.plot_circle_points(x, y);
  }
  plot_circle_points(x, y){
    const center_x = this.center.x;
    const center_y = this.center.y;

    this.draws.push(new Pixel( x+center_x,  y+center_y));
    this.draws.push(new Pixel( y+center_x,  x+center_y));
    this.draws.push(new Pixel(-x+center_x,  y+center_y));
    this.draws.push(new Pixel(-y+center_x,  x+center_y));
    this.draws.push(new Pixel(-x+center_x,  -y+center_y));
    this.draws.push(new Pixel(-y+center_x,  -x+center_y));
    this.draws.push(new Pixel( x+center_x,  -y+center_y));
    this.draws.push(new Pixel( y+center_x,  -x+center_y));
  }
}
