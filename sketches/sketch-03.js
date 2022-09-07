const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

//animatin function if not using the canvas sketch, canvas sketch function is animate:true
// const animate =() => {
//  console.log('it is animating'); 
//  requestAnimationFrame(animate);
// }; 

// animate();

const sketch = ({ context, width, height }) => {

  const agents =[];

  for (let i = 0; i <40; i++ ) {
    const x = random.range(0,width); 
    const y = random.range(0,height);
    agents.push(new Agent(x,y));
  }



  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    // const point = {x: 800, y: 400, radius: 10};
    // const agentA  = new Agent(800, 400);
    // const agentB  = new Agent(300, 700);
    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width,height)
    });

  };
};

canvasSketch(sketch, settings);

class Vector{
  constructor(x,y) {
    this.x = x;
    this.y = y;
    
  }
}

//Class for seperating the vector from the dot drawn on the canvas
 
class Agent {
  constructor(x,y) {
    this.pos =new Vector(x,y); 
    //Adding agent animation 
    this.vel = new Vector(random.range(-1,1), random.range(-1,1)); 
    this.radius = random.range(4,12);
  }

  //Method for the circles to bounce back once the reached the boundries of canvas
  //invert the velocity on these conditions 
bounce(width, height) {
  if(this.pos.x <=0 || this.pos.x >= width) this.vel.x = -1; 
  if(this.pos.y <=0 || this.pos.y >= width) this.vel.y = -1; 
}




  update () {
    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y; 

  }

  draw(context) {
    context.save(); 
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 4;
    context.beginPath(); 
    context.arc(0,0, this.radius, 0,Math.PI *2);
    context.fill();
    context.stroke();

    context.restore();
  }
}