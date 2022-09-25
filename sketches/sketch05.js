const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};
let manager; 
let text = "S";
let fontSize = 1200; 
let fontFamily = 'serif';

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black"; 
    context.font = `${fontSize}px ${fontFamily}`; 
    context.textBaseline = "top"; 
    // context.textAlign = "center"; 


    //measure the text to align it accordigly 
    const metrics  = context.measureText(text); 
    //metric x 
    const mx = metrics.actualBoundingBoxLeft * -1;
    //metric y 
    const my = metrics.actualBoundingBoxAscent * -1;
    // metric width
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    //metric height 
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    //console.log(metrics);

    const x = (width - mw) * 0.5 - mx; 
    const y = (height - mh) * 0.5 - my; 


    context.save(); 
    context.translate(x, y);
    //draw the path 
    context.beginPath(); 
    context.rect(mx, my, mw, mh); 
    context.stroke();



    context.fillText(text, 0, 0);
    context.restore(); 





  };
};

const onKeyUp = (e) => {
  // console.log(e);
  text = e.key; 
  manager.render();

}; 

document.addEventListener('keyup', onKeyUp); 

const start  = async () => {
 manager = await canvasSketch(sketch, settings);
}; 

start(); 




