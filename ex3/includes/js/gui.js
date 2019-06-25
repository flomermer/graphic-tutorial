function gui(){
  initializeGUI();
  $("#btnUploadInput").click(loadInput);
  $(".proj").click(setProjection);
  $("#obliqueDeg").change(drawPolygons);
  $('.rotation').change(setRotation);
  $('rotation').change(setRotation);
  $("#rotate").click(doRotation);
  $("#scalePercent").change(setScale);
  $("#scale").click(doScale);
  $("#help").click(help);  
}

function initializeGUI(){
  let {axis, deg}   =   App.settings.rotation;
  let {projection}  =   App.settings;
  $(`.rotation[data-field='axis']`).val(axis);
  $(`.rotation[data-field='deg']`).val(deg);
  $(`.proj[data-val=${projection}]`).find('i').addClass('selected');
  $("#scalePercent").val(App.settings.scale.percent);
}
function setProjection(){
  let value = $(this).attr("data-val");
  $(".proj").find('i').removeClass('selected');
  $(this).find('i').addClass('selected');
  App.settings.projection = value;
  if(value==='oblique')
    $("#obliqueDeg").closest('.row').show();
  else
    $("#obliqueDeg").closest('.row').hide();

  drawPolygons();
}

function setRotation(){
  let field = $(this).attr("data-field");
  let value = $(this).val();
  App.settings.rotation[field] = value;
}
function setScale(){
  App.settings.scale.percent = $(this).val();
}

function help(){
  $("#modalHelp").modal('show');
}
