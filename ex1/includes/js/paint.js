//SETTINGS is global param and available here.

function paint(event){ //triggered when canvas clicked
  if(!SETTINGS.mode){
    alert("לא נבחר מצב ציור");
    return false;
  }
  if(SETTINGS.mode==='free')
    return false;

  var point = canvas.relMouseCoords(event); //misc.js -> mouse clicked (x,y) coords according to canvas
  markPoint(point);
  switch(SETTINGS.mode){
    case 'line':
      drawLine();
      break;
    case 'circle':
      drawCircle();
      break;
    case 'bezier':
      drawBezier();
      break;
  }
}

function markPoint(point){
  let {ctx,dot_size} = SETTINGS;
  ctx.fillRect(point.x, point.y, dot_size, dot_size);
  SETTINGS.points.push(point);
}
function clearPoints(){
  let {ctx,dot_size} = SETTINGS;
  SETTINGS.points.forEach(p => {
    ctx.clearRect(p.x, p.y, SETTINGS.dot_size, SETTINGS.dot_size)  ;
  })
  SETTINGS.points = [];
}
function clearClipboard(){
  if(!window.confirm("האם לנקות את הלוח?")) return false;
  let {ctx} = SETTINGS;
  ctx.clearRect(0,0, canvas.width, canvas.height);
}
