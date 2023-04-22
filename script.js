window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // canvas settings
    ctx.fillStyle = 'blue';
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgb(0, 0, 0, 0.6)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 4;


    // effect settings
    let size = canvas.width < canvas.height ? canvas.width * 
    0.3 : canvas.height * 0.3;
    const maxLevel = 5;
    const branches = 2;

    let sides = 5;
    let scale = 0.5;
    let spread = 0.5;
    let color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
    let lineWidth = Math.floor(Math.random() * 20 + 10);

    //controls
    const randomButton = document.getElementById('random')
    const resetButton = document.getElementById('reset')
    const slider_spread = document.getElementById('spread');
    const lable_spread = document.querySelector('[for="spread"]');
    slider_spread.addEventListener('change', function(e){
        spread = e.target.value;
        updateSliders();
        drawFractal();
    });
    slider_sides = document.getElementById('sides');
    lable_sides = document.querySelector('[for="sides"]')
    slider_sides.addEventListener('change', function(e){
        sides = e.target.value;
        updateSliders();
        drawFractal();
    });

    function drawBranch(level){
        if (level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();
        for (let i = 0; i < branches; i++){
        ctx.save();
        ctx.translate(size - (size/branches) * i,0);
        ctx.scale(scale, scale);

        ctx.save();
        ctx.rotate(spread);
        drawBranch(level + 1);
        ctx.restore();

        ctx.save();
        ctx.rotate(-spread);
        drawBranch(level + 1);
        ctx.restore();

        ctx.restore();
        }
    }
    

    function drawFractal(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx. lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.translate(canvas.width/2, canvas.height/2);
        for(let i= 0; i < sides; i++){
            ctx.rotate((Math.PI * 2) * 2/sides);
            drawBranch(0);
        }
        ctx.restore();
    }
    drawFractal();

    function randomizeFractal(){
        sides = Math.floor(Math.random() * 7 + 2);
        scale = Math.random() * 0.2 + 0.4;;
        spread = Math.random() * 2.9 + 0.1;
        color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        lineWidth = Math.floor(Math.random() * 20 + 10);
        randomButton.style.backgroundColor = color;
        
    }
    randomButton.addEventListener('click', function(){
        randomizeFractal();
        updateSliders();
        drawFractal();

    });

    function resetFractal(){
        sides = 5;
        scale = 0.5;
        spread = 0.7;
        color = 'hsl(290%, 100%, 50%)'
        lineWidth = 15;
    }
    resetButton.addEventListener('click', function(){
        resetFractal();
        updateSliders();
        drawFractal();
    });

    function updateSliders(){
        slider_spread.value = spread;
        lable_spread.innerText = 'Spread: ' + Number(spread).
        toFixed(1);
        slider_sides.value = sides;
        lable_sides.innerText = 'Sides:  ' + sides;

    }
    updateSliders();

    
});