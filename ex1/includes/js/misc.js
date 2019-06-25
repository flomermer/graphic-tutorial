function relMouseCoords(e){
  const {canvas} = App.canvas;
  const rect = this.canvas.getBoundingClientRect();
  const x = Math.round( ((e.clientX - rect.left)  /   (rect.right - rect.left))   *   canvas.width  );
  const y = Math.round( ((e.clientY - rect.top)   /   (rect.bottom - rect.top))   *   canvas.height );

  return new Pixel(x,y);
}
