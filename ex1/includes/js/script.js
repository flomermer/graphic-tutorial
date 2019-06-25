let App = {
  settings: {
      color: '#000',
      mode: 'line',
  },
  canvas: {
    canvas:   null,
    ctx:      null,
    dot_size: 1,
  },
  draws: {
    tmp_points: [],
    shapes: []
  }
}

$("document").ready(function(){
  initialize();
  /*colorPicker*/
    $("#colorPicker").click(() => $("#txtColorPicker").trigger("click"));
    $("#txtColorPicker").change(colorPicker_changed);
  /*menu modes*/
    $(".mode").click(switchMode);
    $("#erase").click(clearClipboard);

  /*canvas*/
    $("#canvas").click(paint); //check paint.js
})

function initialize(){
  $('#colorPicker').css('color', App.settings.color);
  if(App.settings.mode)
    $(`.mode[data-mode=${App.settings.mode}]`).addClass('selected');

  App.canvas.canvas   =   document.getElementById('canvas');
  App.canvas.ctx      =   App.canvas.canvas.getContext('2d');
}

function colorPicker_changed(){
  let color = $(this).val();
  App.settings.color = color;
  $('#colorPicker').css('color', color);
  App.canvas.ctx.strokeStyle =   color;
  App.canvas.ctx.fillStyle   =   color;

  clearTmpPoints();
}
function switchMode(){
  let mode = $(this).attr("data-mode");
  $(".mode.selected").not(this).removeClass("selected");
  $(this).toggleClass("selected");
  App.settings.mode = $(this).hasClass('selected') ? mode : null;

  clearTmpPoints();
}
