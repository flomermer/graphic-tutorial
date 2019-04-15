//SETTINGS is global param and available here.

function drawLine(){
  if(SETTINGS.points.length!==2)
    return false;
  //here we have exactly 2 points in SETTINGS.points. draw a line between them:)

  let {ctx} = SETTINGS;
  let p0 = SETTINGS.points[0];
  let p1 = SETTINGS.points[1];

  clearPoints();
  let dx =  (p1.x-p0.x);
  let dy =  (p1.y-p0.y);
  let m  =  dy/dx;
  let n  =  p0.y-m*p0.x;    //y-mx
  console.log(`linear: ${m}X+${n}`);

  let startX = p1.x>p0.x ? p0.x : p1.x;
  let endX   = p1.x>p0.x ? p1.x : p0.x;
  let startY = p1.y>p0.y ? p0.y : p1.y;
  let endY   = p1.y>p0.y ? p1.y : p0.y;

  for(let x=startX; x<=endX; x++){
    let y = (m*x + n);
    drawPixel(x,y);
  }
  for(let y=startY; y<=endY; y++){
    let x = (y-n)/m; //x = (y-n)/m
    drawPixel(x,y);
  }

  /* EASY WAY */
  // ctx.beginPath();
  // ctx.moveTo(p0.x, p0.y);
  // ctx.lineTo(p1.x, p1.y);
  // ctx.stroke();
}

function drawCircle(){
  if(SETTINGS.points.length!==2)
    return false;
  //here we have exactly 2 points in SETTINGS.points. calculate radius and draw a circle.

  let {ctx} = SETTINGS;
  let p0 = SETTINGS.points[0];
  let p1 = SETTINGS.points[1];
  let radius = Math.sqrt(Math.pow(p1.x-p0.x,2) + Math.pow(p1.y-p0.y,2));

  clearPoints();
  var step = 2*Math.PI/1000 //sensitivity of circle;
  var h = p0.x;
  var k = p0.y;

   for(var theta=0;  theta < 2*Math.PI;  theta+=step){
      var x = p0.x + radius*Math.cos(theta);
      var y = p0.y - radius*Math.sin(theta);
      drawPixel(x,y);
    }

  // easy way!!
  // ctx.beginPath();
  // ctx.arc(p0.x, p0.y, Math.round(radius), 0, 2 * Math.PI);
  // ctx.stroke();
}

function drawBezier(){
  if(SETTINGS.points.length!==4)
    return false;

  let {ctx} = SETTINGS;
  var accuracy = 0.001;
  for (var i=0; i<1; i+=accuracy){
    let p = bezier(i, SETTINGS.points[0], SETTINGS.points[1], SETTINGS.points[2], SETTINGS.points[3]);  //return bezier points accordint to p0...p3
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
