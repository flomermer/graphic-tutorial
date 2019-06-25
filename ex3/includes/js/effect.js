/*Projections: implements inside Polygon*/
  const oblique = (deg) => {
    for(let polygon of App.draws.polygons)
      polygon.oblique(deg);
  }
  const perspective = () => {
    for(let polygon of App.draws.polygons)
      polygon.perspective();
  }
  const orthographic = () => {
    for(let polygon of App.draws.polygons)
      polygon.orthographic();
  }

/*Rotatation & Scale: implments on origin points*/
const scale = (k) => {
  App.org_points.forEach((point, i) => {
    let newPoint = {
      x: ((point.x-App.canvas.center.x) * k)+App.canvas.center.x,
      y: ((point.y-App.canvas.center.y) * k)+App.canvas.center.y,
      z: point.z * k,
    }
    App.org_points[i] = newPoint;
  })
  syncPoints();
}
const rotateX = (deg) => {
  const rad  = this.deg_to_rad(deg);
  const matrix = [
    [1,            0,             0,              0],
    [0,           cos(rad),     sin(rad),         0],
    [0,           -sin(rad),    cos(rad),         0],
    [0,            0,             0,              1]
  ];

  App.org_points.forEach((point, i) => {
    const vector = [[point.x-App.canvas.center.x, point.y-App.canvas.center.y, point.z, 1]];
    const mult = multiplyMatrix(vector, matrix);
    let newPoint = {x: mult[0][0]+App.canvas.center.x, y: mult[0][1]+App.canvas.center.y, z:mult[0][2]};
    App.org_points[i] = newPoint;
  })
  syncPoints();
}
const rotateY = (deg) => {
  const rad  = this.deg_to_rad(deg);
  const matrix = [
    [cos(rad),    0,            -sin(rad),        0],
    [0,           1,                0,            0],
    [sin(rad),    0,            cos(rad),         0],
    [0,           0,             0,              1]
  ];

  App.org_points.forEach((point, i) => {
    const vector = [[point.x-App.canvas.center.x, point.y-App.canvas.center.y, point.z, 1]];
    const mult = multiplyMatrix(vector, matrix);
    let newPoint = {x: mult[0][0]+App.canvas.center.x, y: mult[0][1]+App.canvas.center.y, z:mult[0][2]};
    App.org_points[i] = newPoint;
  })
  syncPoints();
}
const rotateZ = (deg) => {
  const rad  = this.deg_to_rad(deg);
  const matrix = [
    [cos(rad),    sin(rad),         0,            0],
    [-sin(rad),   cos(rad),         0,            0],
    [0,             0,              1,            0],
    [0,             0,              0,            1]
  ];

  App.org_points.forEach((point, i) => {
    const vector = [[point.x-App.canvas.center.x, point.y-App.canvas.center.y, point.z, 1]];
    const mult = multiplyMatrix(vector, matrix);
    let newPoint = {x: mult[0][0]+App.canvas.center.x, y: mult[0][1]+App.canvas.center.y, z:mult[0][2]};
    App.org_points[i] = newPoint;
  })
  syncPoints();
}


const syncPoints = () => { //sync every polygon with it's concurrent global points
  for(let polygon of App.draws.polygons)
    polygon.setOriginalPoints();
  /*
      example:
        after RotationX(45) for example -> all of the global points would be changed
        each Polygon continas a const array of its points as an index. for example: [1,6,8,2]
        the syncPoints would sync the local points of the Polygon with the current global point value
  */
}
