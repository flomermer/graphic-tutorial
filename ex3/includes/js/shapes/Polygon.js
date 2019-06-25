class Polygon extends Shape{
  constructor(points_index, color){
    super();
    this.points_index =   points_index;
    this.color        =   color;
    this.syncPoints();
  }
  draw(){
    if(!this.isVisible())
      return false;

    let {ctx, canvas} = App.canvas;
    let points = this.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.fillStyle = this.color;

    for(let i=1; i<this.points.length-1; i++){
      ctx.lineTo(points[i].x,   points[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  oblique(deg){
    const rad  = deg_to_rad(deg);
    const matrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0.5*cos(rad), 0.5*sin(rad), 1, 0],
      [0, 0, 0, 1]
    ]

    let newPoints = [];
    for(let point of this.points){
      const vector = [[point.x, point.y, point.z, 1]];
      const mult = multiplyMatrix(vector, matrix);
      newPoints.push({x: mult[0][0], y: mult[0][1], z:mult[0][2]});
    }
    this.points = newPoints;
    this.setNormal();
  }
  perspective(){
    let newPoints = [];
    for(let point of this.points){
      const Sz = 1 / (1+(point.z/App.canvas.center.z));
      const matrix = [
        [Sz, 0, 0, 0],
        [0, Sz, 0, 0],
        [0,  0, 0, 0],
        [0,  0, 0, 1]
      ];
      const vector = [[point.x, point.y, point.z, 1]];
      const mult = multiplyMatrix(vector, matrix);
      newPoints.push({x: mult[0][0], y: mult[0][1], z:mult[0][2]});
    }
    this.points = newPoints;
    this.setNormal();
  }

  orthographic(){
    let newPoints = [];
    const matrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    for(let point of this.points){
      const vector = [[point.x, point.y, 0, 1]];
      const mult = multiplyMatrix(vector, matrix);
      newPoints.push({x: mult[0][0], y: mult[0][1], z:mult[0][2]});
    }
    this.points = newPoints;
    this.setNormal();
  }

  isVisible(){
    return (this.normal.z < 0);
  }
  syncPoints(){
    this.points = [];
    let orgPoints = [];
    for(let index of this.points_index)
      orgPoints.push(_.clone(App.org_points[index]));

    orgPoints.push(_.clone(App.org_points[this.points_index[0]]));

    this.points = orgPoints;
    this.setNormal();
  }
  setNormal(){
    const p0 = this.points[0];
    const p1 = this.points[1];
    const p2 = this.points[2];

    const a = {x: p0.x - p1.x,      y: p0.y - p1.y,         z: p0.z - p1.z};
    const b = {x: p0.x - p2.x,      y: p0.y - p2.y,         z: p0.z - p2.z};
    let normal = {
      x: a.x * b.z  -   a.z * b.y,
      y: a.z * b.x  -   a.x * b.z,
      z: a.x * b.y  -   a.y * b.x
    }
    this.normal = normal;
  }
}
