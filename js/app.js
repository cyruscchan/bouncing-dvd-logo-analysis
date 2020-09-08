let speed = 20;
let scale = 0.05; // Image scale (I work on 1080p monitor)
let canvas;
let ctx;
let logoColor;
var lastHit = 0; //UNIX time of the last hit
//[0] = total hit, [1] = corner hit, [2] = Average
var hitCount = [0,0];
const counter_desc = ["Hit: ","Hit corner: ","Average: "];
const display_hit = {
    total:document.getElementById("total_count_msg"),
    corner:document.getElementById("count_msg"),
    avg:document.getElementById("avg_msg")
};

let dvd = {
    x: (Math.random() * 615),
    y: (Math.random() * 425),
    xspeed: 10,
    yspeed: 10,
    img: new Image()
}

display_hit.total.innerText = counter_desc[0] + hitCount[0];
display_hit.corner.innerText = counter_desc[1] + hitCount[1];
display_hit.avg.innerText = counter_desc[2] + parseFloat(0).toFixed(10);

(function main(){
    canvas = document.getElementById("tv-screen");
    ctx = canvas.getContext("2d");
    dvd.img.src = 'dvd-logo.png';
    //Make more randomly vector
    var decider = Math.random();
    if (decider<0.4&&decider>0.2) {
        dvd.xspeed *= -1;
    }
    if (decider>0.3&&decider<0.5) {
        dvd.yspeed *= -1;
    }
    //Draw the "tv screen" with correct resolution 
    canvas.width  = 720;
    canvas.height = 480;

    hitEvent();
    update();
})();

function update() {
    setTimeout(() => {
        //Draw the canvas background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //Draw DVD Logo and his background
        ctx.fillStyle = logoColor;
        ctx.fillRect(dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
        ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
        //Move the logo
        dvd.x+=dvd.xspeed;
        dvd.y+=dvd.yspeed;
        //Check for collision 
        checkHitBox();
        update();   
    }, speed)
}

//Check for border collision
function checkHitBox(){
    if(dvd.x+dvd.img.width*scale >= canvas.width || dvd.x <= 0){
        dvd.xspeed *= -1;
        hitEvent();
    }  
    if(dvd.y+dvd.img.height*scale >= canvas.height || dvd.y <= 0){
        dvd.yspeed *= -1;
        hitEvent();
    }    
}

//Pick a random color in RGB format
function hitEvent(){
    //Capture hitting time
    var currentHit = Date.now();
    display_hit.total.innerText = counter_desc[0] + (++hitCount[0]);
    //Count as hit corner when hit 2 in 1 ms or less
    if ((currentHit - lastHit)<=1) {
        display_hit.corner.innerText = counter_desc[1] + (++hitCount[1]);
    }
    //Calculate avarage chance
    display_hit.avg.innerText = counter_desc[2] + parseFloat(hitCount[1]/hitCount[0]).toFixed(10);
    lastHit = currentHit;
    r = Math.random() * (254 - 0) + 30;
    g = Math.random() * (254 - 0) + 30;
    b = Math.random() * (254 - 0) + 30;

    logoColor = 'rgb('+r+','+g+', '+b+')';
}