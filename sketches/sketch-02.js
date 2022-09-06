const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math'); 
const random = require('canvas-sketch-util/random'); 

const settings = {
  dimensions: [1080, 1080]
};

//Converting radians to degrees
// const degToRad = (degrees) => {
//   return degrees / 180 * Math.PI;
// }

//using random numbers for defining a scale 
// const randomRange = (min,max) => {
// return Math.random() *(max-min) + min;
// }


const sketch = () => {
  return ({
    context,
    width,
    height
  }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = "black";


    //X an y for the centre of the circle 
    const cx = width * 0.5;
    const cy = height * 0.5;

    // Height and width for each of the strokes 
    let x,y;


    //30% of the width and height of the canvas 
    const w = width * 0.01;
    const h = height * 0.1;

    //Creating a variable for the number of copies of the shape 
    const num = 40;
    const radius = width * 0.3


    for (let i = 0; i < num; i++) {

      //A circle is 360 degrees (size of the slice)
      const slice = math.degToRad(360 / num);
      //Defining the angle this will loop 0,30, 60 degrees and so on
      const angle = slice * i;

      x = cx + radius  * Math.sin(angle);
      y = cy + radius  * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      //updating the scale
      context.scale(random.range(0.1,3),random.range(0.2, 0.5));
      context.beginPath();
      //offsetting strokes so that there are not so well alligned .0.5 half of the height and width
      context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      context.save(); 
      //Translate to the centre of the circle 
      context.translate(cx,cy);
      context.rotate(-angle);

      context.lineWidth  = random.range(5,20);

    
      context.beginPath();
      //align the arc with the stroke by using negative starting angle and positive ending angle
      context.arc(0,0,radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
      context.stroke();
      context.restore();
    }

  };
};

canvasSketch(sketch, settings);