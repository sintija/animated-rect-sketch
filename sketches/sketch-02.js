const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

//Converting radians to degrees
const radToDeg = (degrees) => {
  return degrees / 180 * Math.PI;
}

//using random numbers for defining a scale 
const randomRange = (min,max) => {
return Math.random() *(max-min) + min;
}


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
    const num = 12;
    const radius = width * 0.3


    for (let i = 0; i < num; i++) {

      //A circle is 360 degrees (size of the slice)
      const slice = radToDeg(360 / num);
      //Defining the angle this will loop 0,30, 60 degrees and so on
      const angle = slice * i;
      x = cx + radius  * Math.sin(angle);
      y = cy + radius  * Math.cos(angle);

      context.save()
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(randomRange(1,3),1);
      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();
    }

  };
};

canvasSketch(sketch, settings);