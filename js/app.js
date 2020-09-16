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

/**
 * Check for border collision
 */
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

/**
 * Pick a random color in RGB format
 */
function hitEvent(){
    var corner = false;
    //Capture hitting time
    var currentHit = Date.now();
    display_hit.total.innerText = counter_desc[0] + (hitCount[0]++);
    //Count as hit corner when hit 2 in 50 ms or less
    if ((currentHit - lastHit)<=parseInt(timing_condition.value)) {
        display_hit.corner.innerText = counter_desc[1] + (++hitCount[1]);
        corner = true;
    }
    //Calculate avarage chance
    display_hit.avg.innerText = counter_desc[2] + parseFloat(hitCount[1]/hitCount[0]).toFixed(10);
    console.log({msg:"Hit!",isCorner:corner,timeUsed:((currentHit-lastHit)/1000)+'s'});
    lastHit = currentHit;
    r = Math.random() * (254 - 0) + 30;
    g = Math.random() * (254 - 0) + 30;
    b = Math.random() * (254 - 0) + 30;

    logoColor = 'rgb('+r+','+g+', '+b+')';
}

/**
 * Adjust hitting corner time, and reset
 */
function change_timing_event(init) {
    display_timing.setAttribute("value",timing_condition.value);
    if (!init) {
        hitCount = [0,0];
        display_hit.total.innerHTML = counter_desc[0] + "Timing has been reset";
        display_hit.corner.innerText = counter_desc[1] + hitCount[1];
    }
}

const speed = 16.666;
const scale = 0.05; // Image scale (I work on 1080p monitor)
var canvas, ctx, logoColor;
var lastHit = Date.now()-1000; //UNIX time of the last hit
//[0] = total hit, [1] = corner hit
var hitCount = [0,0];
const counter_desc = ["Hit: ","Hit corner: ","Average: "];
const display_hit = {
    total:document.getElementById("total_count_msg"),
    corner:document.getElementById("count_msg"),
    avg:document.getElementById("avg_msg")
};
var timing_condition = document.getElementById("condition_time");
var display_timing = document.getElementById("timing_display");

let dvd = {
    x: (Math.random() * 600),
    y: (Math.random() * 375),
    xspeed: 2.5,
    yspeed: 2.5,
    img: new Image()
}

display_hit.total.innerText = counter_desc[0] + hitCount[0];
display_hit.corner.innerText = counter_desc[1] + hitCount[1];
display_hit.avg.innerText = counter_desc[2] + parseFloat(0).toFixed(10);
change_timing_event(true);
canvas = document.getElementById("tv-screen");
ctx = canvas.getContext("2d");
dvd.img.src = 'dvd-logo.png';
//Make more randomly vector
var decider = Math.random();
if (decider<0.3) {
    dvd.xspeed *= -1;
}
if (decider>=0.2&&decider<0.5) {
    dvd.yspeed *= -1;
}
//Draw the "tv screen" with correct resolution 
canvas.width  = 720;
canvas.height = 480;
hitEvent();
update();
