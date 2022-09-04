const canvas = document.querySelector('canvas'); 
//function do define if the drawing is 2D or 3D 
const context = canvas.getContext('2d'); 

context.lineWidth = 4;


const width = 60; 
const height = 60; 
const gap = 20;
let x,y; 

for(let i = 0; i<5; i++) {
    //nested loop for adding extra rows 
    for (let j=0; j <5; j++) {
        context.beginPath(); 
        x = 100 + (width + gap) *i;
        y = 100 + (height + gap) * j;
        context.rect(x,y,width,height);
        context.stroke();
        //changes everytime the page is refreashed
        if(Math.random() > 0.5) {
            context.beginPath()
            context.rect(x+8, y+8, width-16, height-16)
            context.stroke();
        }

    }
}