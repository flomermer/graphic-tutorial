var SETTINGS = {
  color: '#000',
  mode: null,
  ctx: null,
  points: [],
  dot_size: 1
}

$("document").ready(function(){
  initialize();
  /*colorPicker*/
    $("#colorPicker").click(() => $("#txtColorPicker").trigger("click"));
    $("#txtColorPicker").change(colorPicker_changed);
  /*menu modes*/
    $(".mode").click(modeClick);
    $("#erase").click(clearClipboard);

  /*canvas*/
    $("#canvas").click(paint); //check paint.js
    $("#canvas").mousemove(drawFree);
})

function initialize(){
  $('#colorPicker').css('color', SETTINGS.color);
  if(SETTINGS.mode)
    $(`.mode[data-mode=${SETTINGS.mode}]`).addClass('selected');

  SETTINGS.ctx = document.getElementById('canvas').getContext('2d');
}

function colorPicker_changed(){
  let color = $(this).val();
  SETTINGS.color = color;
  $('#colorPicker').css('color', SETTINGS.color);
  SETTINGS.ctx.strokeStyle =   SETTINGS.color;
  SETTINGS.ctx.fillStyle   =   SETTINGS.color;

  clearPoints();
}
function modeClick(){
  let mode = $(this).attr("data-mode");
  $(".mode.selected").not(this).removeClass("selected");
  $(this).toggleClass("selected");
  SETTINGS.mode = $(this).hasClass('selected') ? mode : null;

  $("#bezier-accuracy").hide();
  if(SETTINGS.mode==='bezier')
    $("#bezier-accuracy").show();
  clearPoints();
}
