const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random'); 
const math = require('canvas-sketch-util/math');


const settings = {
  dimensions: [1080, 1080], 
  animate: true
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
    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;


    //80% of the canvas
    const gridw = width * 0.80;
    const gridh = height * 0.80;  
    //Defining the width and height of each cell of the grid (width of the grid / number of colums)
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    //Defining margins of the grid (one of the left and one of the right)
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) *0.5; 

    //looping over each cell of the grid 
    for(let i = 0; i < numCells; i++) {
      //calculating the column (returns the remainer of the division of i by cols)
      const col = i % cols; 
      //Finding the end of the row or grid cells in the y axis (at every 4 steps the value is increased by 1 )
      const row = Math.floor(i / cols)

      const x = col * cellw; 
      const y = row * cellh; 
      const w  = cellw * 0.8; 
      const h = cellh * 0.8; 
      
      //generate the noise 
      const n = random.noise2D(x + frame * 10,y, 0.001); 
      //Set the angle of the rotation 
      const angle = n * Math.PI * 0.2; 


      //const scale = (n + 1) / 2 * 30; 
      //const scale = (n * 0.5 + 0.5) * 30;
      const scale = math.mapRange(n, -1, 1, 1, 30);




      //Starting to draw 
      context.save(); 
      context.translate(x,y);
      context.translate(margx,margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);


      context.lineWidth = scale;


      context.beginPath(); 
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();
      context.restore();


    }




  };
};

canvasSketch(sketch, settings);