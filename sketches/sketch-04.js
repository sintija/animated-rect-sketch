const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const params = {
  cols: 10,
  rows: 10, 
  scaleMin: 1, 
  scaleMax: 30,
  freq: 0.001, 
  amp: 0.2,
  frame: 0, 
  animate: true,
  lineCap : 'butt',

}; 

const sketch = () => {
  return ({
    context,
    width,
    height,
    frame
  }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    //building a grid with 4 columns and 3 rows 
    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;


    //80% of the canvas
    const gridw = width * 0.80;
    const gridh = height * 0.80;
    //Defining the width and height of each cell of the grid (width of the grid / number of colums)
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    //Defining margins of the grid (one of the left and one of the right)
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    //looping over each cell of the grid 
    for (let i = 0; i < numCells; i++) {
      //calculating the column (returns the remainer of the division of i by cols)
      const col = i % cols;
      //Finding the end of the row or grid cells in the y axis (at every 4 steps the value is increased by 1 )
      const row = Math.floor(i / cols)

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const f = params.animate ? frame : params.frame; 

      //generate the noise 
      //const n = random.noise2D(x + frame * 10, y, params.freq);

      const n = random.noise3D(x, y, f * 10, params.freq);




      //Set the angle of the rotation 
      const angle = n * Math.PI * params.amp;


      //const scale = (n + 1) / 2 * 30; 
      //const scale = (n * 0.5 + 0.5) * 30;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);




      //Starting to draw 
      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);


      context.lineWidth = scale;
      context.lineCap = params.lineCap; 


      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();
      context.restore();

    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder; 
  folder = pane.addFolder({title: 'Grid'});
  folder.addInput(params, 'lineCap', {options: {butt: 'butt', round: 'round', square: 'square'}});
  folder.addInput(params, 'cols', {min: 2, max: 50, step: 1}); 
  folder.addInput(params, 'rows', {min: 2, max: 50, step: 1});
  folder.addInput(params, 'scaleMin', {min: 1, max: 100});  
  folder.addInput(params, 'scaleMax', {min: 1, max: 100}); 


  folder = pane.addFolder({title: 'Noise'});
  folder.addInput(params, 'freq', {min: -0.01, max: 0.01});
  folder.addInput(params, 'amp', {min: 0, max: 1});
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', {min: 0, max: 999});

};

createPane();

canvasSketch(sketch, settings);