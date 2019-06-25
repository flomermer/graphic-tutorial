/*** created by: Tomer Flom 303015671 & Adiel Perez 308101062 ***/
let App = {
  settings: {
    fill_colors: [],
    projection: 'orthographic',
    rotation: {
      axis: 'x',
      deg:  15
    },
    scale: {
      percent: 100
    }
  },
  canvas: {
    canvas:   null,
    center:   null,
    ctx:      null,
    dot_size: 1,
  },
  org_points: [],
  org_polygons: [],
  draws: {
    polygons: []
  }
}

$("document").ready(function(){
  initialize();
  gui();
})

function initialize(){
  App.canvas.canvas   =   document.getElementById('canvas');
  App.canvas.ctx      =   App.canvas.canvas.getContext('2d');
  let {canvas}        =   App.canvas;
  App.canvas.center   =   {x: canvas.width/2, y: canvas.height/2, z: -500};
}

async function loadInput(){
  $.getJSON("./input/input.json", async function(input) {
    initializePolygons(input);
  }).catch((e) => { //in case not running web on localhost -> load will fail. therefore -> use static input from input.js
    initializePolygons(INPUT);
  });
}

function initializePolygons(input){
  App.org_points            =   input.points;
  App.org_polygons          =   input.polygons;
  let colors                =   getRandomColorsArray(App.org_polygons.length);

  normalizePoints();
  App.org_polygons.forEach((polygon_pts, i) => {
    App.draws.polygons.push(new Polygon(polygon_pts, colors[i]));
  });

  drawPolygons();
}


function drawPolygons(){
  clearPolygons();
  doProjection();
  for(let polygon of App.draws.polygons)
    polygon.draw();
}
function doProjection(){
  switch(App.settings.projection){
    case 'oblique':
      let oblique_deg = $("#obliqueDeg").val();
      oblique(oblique_deg);
      break;
    case 'perspective':
      perspective();
      break;
    case 'orthographic':
      orthographic();
      break;
  }
}
function doRotation(){
  let {axis, deg} = App.settings.rotation;
  switch(axis){
    case 'x':
      console.log(`rotate x`);
      rotateX(deg);
      break;
    case 'y':
      console.log(`rotate y`);
      rotateY(deg);
      break;
    case 'z':
      console.log(`rotate z`);
      rotateZ(deg);
      break;
  }
  drawPolygons();
}
function doScale(){
    let {percent} = App.settings.scale;
    let k = percent/100;
    scale(k);
    drawPolygons();
}
function clearPolygons(){
  let {ctx, canvas} = App.canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0,0);

  for(let polygon of App.draws.polygons)
    polygon.clear();
}

function normalizePoints(){
  let points    =  App.org_points;
  let clone_pts =  _.cloneDeep(App.org_points);

  let {canvas}  =   App.canvas;
  const xMax = _.maxBy(clone_pts, 'x').x;
  const yMax = _.maxBy(clone_pts, 'y').y;
  const xMin = _.minBy(clone_pts, 'x').x;
  const yMin = _.minBy(clone_pts, 'y').y;

  let newPoints = [];
  clone_pts.forEach((point, i) => {
    let newPoint = {
      x: Math.abs(point.x - xMin) + Math.round((canvas.width/2  - xMax)),  //to centerize
      y: Math.abs(point.y - yMin) + Math.round((canvas.height/2 - yMax)),  //to centerize
      z: point.z
    }
    newPoints.push(newPoint);
  })
  App.org_points = newPoints;
}
function colorPicker_changed(){
  let color = $(this).val();
  App.settings.color = color;
  $('#colorPicker').css('color', color);
  App.canvas.ctx.strokeStyle =   color;
  App.canvas.ctx.fillStyle   =   color;
}
function switchMode(){
  let mode = $(this).attr("data-mode");
  $(".mode.selected").not(this).removeClass("selected");
  $(this).toggleClass("selected");
  App.settings.mode = $(this).hasClass('selected') ? mode : null;
}
