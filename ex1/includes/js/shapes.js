//SETTINGS is global param and available here.

function drawLine(){
  if(SETTINGS.points.length!==2)
    return false;
  //here we have exactly 2 points in SETTINGS.points. draw a line between them:)

  let p0 = SETTINGS.points[0];
  let p1 = SETTINGS.points[1];

  clearPoints();
  const dx =  (p1.x-p0.x);
  const dy =  (p1.y-p0.y);
  let steps   =   Math.abs(dx)>Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
  const xInc  =   dx/steps;
  const yInc  =   dy/steps;
  let x = p0.x;
  let y = p0.y;
  for(let counter=0; counter<steps; counter++){
    x = x+xInc;
    y = y+yInc;
    drawPixel(x,y);
  }
}

function drawCircle(){
  if(SETTINGS.points.length!==2)
    return false;
  //here we have exactly 2 points in SETTINGS.points. calculate radius and draw a circle.

  const p0 = SETTINGS.points[0];
  const p1 = SETTINGS.points[1];
  const radius = Math.sqrt(Math.pow(p1.x-p0.x,2) + Math.pow(p1.y-p0.y,2));

  clearPoints();
  const sensitivity = 1000  //sensitivity of circle segments
  const step = 2*Math.PI/sensitivity;

  for(let theta=0;  theta < 2*Math.PI;  theta+=step){
    let x = p0.x + radius*Math.cos(theta);
    let y = p0.y - radius*Math.sin(theta);
    drawPixel(x,y);
  }
}

function drawBezier(){
  if(SETTINGS.points.length!==4)
    return false;

  let {ctx} = SETTINGS;
  var accuracy = Number($("#bezier-accuracy").val());
  for (var i=0; i<=accuracy; i++){
    let p = bezier(i/accuracy, SETTINGS.points[0], SETTINGS.points[1], SETTINGS.points[2], SETTINGS.points[3]);  //return bezier points accordint to p0...p3
    drawPixel(p.x, p.y);
  }

  clearPoints();
}

function drawFree(event){
  if(SETTINGS.mode!=='free' || SETTINGS.points.length!==0)
    return false;
  if(event.buttons!==1) //mouse left button must be pressed
    return false;

  let pos = canvas.relMouseCoords(event); //misc.js -> mouse clicked (x,y) coords according to canvas
  let {ctx, dot_size} = SETTINGS;

  drawPixel(pos.x, pos.y);
}


function drawPixel(x,y){
  let {ctx, dot_size} = SETTINGS;
  ctx.fillRect(x, y, dot_size, dot_size);
}

function bezier(t, p0, p1, p2, p3){
  var cX = 3 * (p1.x - p0.x),
      bX = 3 * (p2.x - p1.x) - cX,
      aX = p3.x - p0.x - cX - bX;

  var cY = 3 * (p1.y - p0.y),
      bY = 3 * (p2.y - p1.y) - cY,
      aY = p3.y - p0.y - cY - bY;

  var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
  var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

  return {x: x, y: y};
}
