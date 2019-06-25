//App is global param and available here.

function paint(e){ //triggered when canvas clicked
  const {mode} = App.settings;
  if(!App.settings.mode){
    alert("יש לבחור מצב ציור מסרגל הכלים");
    return false;
  }
  const pixel = relMouseCoords(e); //misc.js -> mouse clicked (x,y) coords according to canvas
  markTmpPoint(pixel);

  let points = App.draws.tmp_points;
  let shape;
  switch(mode){
    case 'line':
      if(points.length!==2) return;
      shape = new Line(points[0], points[1]);
      break;
    case 'circle':
      if(points.length!==2) return;
      shape = new Circle(points[0], points[1]);
  }
  shape.draw();
  App.draws.shapes.push(shape);
  clearTmpPoints();
}

function markTmpPoint(pixel){
  pixel.draw();
  App.draws.tmp_points.push(pixel);
}

function clearTmpPoints(){
  const {ctx}    =   App.canvas;
  for(let p of App.draws.tmp_points)
    p.clear();

  App.draws.tmp_points = [];
}

function clearClipboard(){
  if(!window.confirm("האם לנקות את הלוח?")) return false;
  for(let shape of App.draws.shapes)
    shape.hide();

  App.draws.shapes = [];
}
