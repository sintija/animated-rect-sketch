const canvas = document.querySelector('canvas'); 
//function do define if the drawing is 2D or 3D 
const context = canvas.getContext('2d'); 

//params =  x,y,height which define the cordnates on a 2D space
//fillRect function is creating a new shape, drawing a rectangle and filling it with default color
context.beginPath()
context.fillStyle = "#d57b3b";
context.fillRect(100,100,400,400); 


//Drawing a circle
//params x,y,radius, starting angle and ending angle(in radiants not degrees) 
context.beginPath()
context.arc(300, 300,100, 0, Math.PI * 2);
context.fillStyle = '#1e1f17';
context.fill();


//Drawing a triangle

context.fillStyle = '#aa2615';
context.beginPath();     //Begin a path..
context.moveTo(100,100);  //Startpoint (x, y)
context.lineTo(300, 0);
context.lineTo(500, 100);
context.closePath();  
context.fill();







