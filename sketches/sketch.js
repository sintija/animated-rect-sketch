const canvasSketch = require("canvas-sketch");

const settings = {
   dimensions: [1000, 1000],

};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    //1% of the width
    context.lineWidth = width *0.01
    //10% of canvas width
    const w = width * 0.10;
    const h = width * 0.10;
    // 20 which is 3% of canvas (width *0.03)
    const gap = width * 0.03;
    //initial x and initial i values 100 / 300 = ~17%
    const ix = width * 0.17
    const iy = height * 0.17
    let x, y;

    //offset used to be 16 which is around 2% of the canvas width
    const off = width * 0.02;

    for (let i = 0; i < 5; i++) {
      //nested loop for adding extra rows
      for (let j = 0; j < 5; j++) {
        context.beginPath();
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;
        context.rect(x, y, w, h);
        context.stroke();
        //changes everytime the page is refreashed
        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + off/2, y + off/2, w - off, h - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
