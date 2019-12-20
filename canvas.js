let playerScore = 0;
let numOfCircles = 1;
let currentLevel = 0;


// get play btn
const playBtn = document.querySelector('.play-btn');
playBtn.addEventListener('click', () => {
    // hide main menu
    hideMenu();
});

// hide menu and call ready msg
const hideMenu = () => {
    const menu = document.querySelector('.menu');
    menu.style.display = 'none';
    readySetGo();
}

// create ready message before level
const readySetGo = () => {
    let readyStart = `<div class = 'ready'>READY?</div>`;
    document.body.insertAdjacentHTML("beforeend", readyStart);
    let readyText = document.querySelector('.ready');
    setTimeout( ()=> {
        readyText.innerHTML = 'SET';
    }, 800);
    setTimeout( ()=> {
        readyText.innerHTML = '<span class = "primary-color">GO!</span>';
    }, 1600);
    setTimeout( ()=> {
        // delete ready div from document
        readyText.remove();

        // create game canvas
        createCanvas();
    }, 2400);
}

const createCanvas = () => {
    console.log('round:' + currentLevel);


    // create and add canvas to body element
    document.body.appendChild(document.createElement('canvas'));
    const canvas = document.querySelector('canvas');
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    // set canvas height & width
    const setCanvasSize = () => {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        stats.style.left = ((canvasWidth / 2) - 130).toString() + 'px';
    }

    const showStats = () => {
        let stats = document.getElementById("stats");
        let score = document.getElementById("score");

        stats.style.display = 'block';
    }

    showStats();
    setCanvasSize();


    // ****
    // get 2d canvas context
    let c = canvas.getContext('2d');

    let colorsArr = [
        '#8D99AE',
        '#EDF2F4',
        '#EF233C',
        '#D90429'
    ];

    let colorThemes = {
        theme1: [
            '#8D99AE',
            '#EDF2F4',
            '#EF233C',
            '#D90429'
        ]
    }

    // circle obj declaration
    class Circle {
        constructor (x, y, dx, dy, radius, value) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.color = colorsArr[Math.floor(Math.random() * colorsArr.length)];
            this.value = value;
        }

        draw() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
        }

        update() {
            // add left & right boundaries switch movement
            if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            // add top & bottom boundaries switch movement
            if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }

    const calculateValue = (sMultiplier, radius) => {
        let value = 0;
        if ( radius > 30 ) value += 25;
        else if ( radius == 30 ) value += 50;
        else if ( radius < 30 ) value += 75;

        value += sMultiplier * 5;

        return value;
    }

    let circleArr = [];

    const slowDot = {
        radius: 30,
        value: 25,
        speed: 5,
        color: 'red'
    }

    const mediumDot = {
        radius: 25,
        value: 40,
        speed: 6,
        color: 'green'
    }

    const fastDot = {
        radius: 20,
        value: 50,
        speed: 10,
        color: 'blue'
    }

    // creates x amount of circles
    // for (let i = 0; i < numOfCircles; i++) {
    //     let sMultiplier = 5;
    //     let radius = 30;
    //     let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    //     let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    //     let dx = (Math.random() - 0.5) * sMultiplier;
    //     let dy = (Math.random() - 0.5) * sMultiplier;
    //     let value = calculateValue(sMultiplier, radius);
    //
    //     circleArr.push(new Circle(x, y, dx, dy, radius, value));
    // }

    const levelArr = [
            {
                slowDots: 1,
                mediumDots: 1,
                fastDots: 1
            },
            {
                slowDots: 2,
                mediumDots: 2,
                fastDots: 2
            },
            {
                slowDots: 3,
                mediumDots: 3,
                fastDots: 3
            },
            {
                slowDots: 4,
                mediumDots: 4,
                fastDots: 4
            },
            {
                slowDots: 5,
                mediumDots: 5,
                fastDots: 5
            },
            {
                fastDots: 50
            }

    ]

    // const levelArr = [
    //         {
    //             slowDots: 1,
    //             mediumDots: 1,
    //             fastDots: 1
    //         },
    //         {
    //             slowDots: 1,
    //             mediumDots: 1,
    //             fastDots: 1
    //         },
    //         {
    //             slowDots: 1,
    //             mediumDots: 1,
    //             fastDots: 1
    //         },
    //         {
    //             slowDots: 1,
    //             mediumDots: 1,
    //             fastDots: 1
    //         },
    //         {
    //             slowDots: 1,
    //             mediumDots: 1,
    //             fastDots: 1
    //         }
    // ]
    const loadLevelDots = (lvl) => {
        // accepts lvl object

        // checks num of dots
        if (lvl.slowDots > 0) {
            // create num of dots
            for (let i = 0; i < lvl.slowDots; i++) {
                createDot(slowDot);
            }
        }

        if (lvl.mediumDots > 0) {
            for (let i = 0; i < lvl.mediumDots; i++) {
                createDot(mediumDot);
            }
        }

        if (lvl.fastDots > 0) {
            for (let i = 0; i < lvl.fastDots; i++) {
                createDot(fastDot);
            }
        }
    }

    const createDot = (dot) => {
        let x = Math.random() * (window.innerWidth - dot.radius * 2) + dot.radius;
        let y = Math.random() * (window.innerHeight - dot.radius * 2) + dot.radius;
        let dx = (Math.random() - 0.5) * dot.speed;
        let dy = (Math.random() - 0.5) * dot.speed;

        circleArr.push(new Circle(x, y, dx, dy, dot.radius, dot.value));
    }

    // for (let i = 0; i < numOfCircles; i++) {
    //     createDot(fastDot);
    // }

    loadLevelDots(levelArr[currentLevel]);



    let seconds = 10; // 1 * diff.dots
    let time = document.getElementById('time');
    time.innerHTML = seconds;

    const countDownTimer = () => {
        seconds -= 1;
        time.innerHTML = seconds;
    }

    let timerID = setInterval(countDownTimer, 1000);

    // animate
    const animate = () => {
        let id = requestAnimationFrame(animate);
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = 0; i < circleArr.length; i++) {
            circleArr[i].update();
        }

        // checks to see if there are 0 dots
        if (circleArr.length <= 0 ) {
            // cancels animation loop
            cancelAnimationFrame(id);

            // stops timer

            clearInterval(timerID);
            // delete canvas & displays win screen
            canvas.remove();

            if (currentLevel === 4 ) {
                showFinishScreen();
            } else showWinScreen();

            // if (currentLevel === 5)
        }

        if (seconds == 0 ) {
            // cancels animation loop
            cancelAnimationFrame(id);

            // stops timer
            clearInterval(timerID);

            // delete canvas & displays lose screen
            canvas.remove();
            showLoseScreen();
        }

    }
    animate();

    const removeDotClick = (e) => {
        // loop through circles
        for ( let i = 0; i < circleArr.length; i++) {
            // checks to see if circle is clicked
            // compares mouse x/y to circle x/y +/- radius
            if (e.x > (Math.floor(circleArr[i].x) - circleArr[i].radius) && e.x < (Math.floor(circleArr[i].x) + circleArr[i].radius)
                &&
                e.y > (Math.floor(circleArr[i].y) - circleArr[i].radius) && e.y < (Math.floor(circleArr[i].y) + circleArr[i].radius) ) {

                // get value from dot add to player score
                playerScore += circleArr[i].value;
                score.innerHTML = playerScore;
                // remove from array
                circleArr.splice( circleArr.indexOf(circleArr[i]), 1 );
                break;
            }
        }
    }

    const removeDotTouch = (e) => {
        // loop through circles
        for ( let i = 0; i < circleArr.length; i++) {
            // checks to see if circle is clicked
            // compares mouse x/y to circle x/y +/- radius
            if (Math.ceil(e.touches[0].clientX) > (Math.floor(circleArr[i].x) - circleArr[i].radius) &&
                Math.ceil(e.touches[0].clientX) < (Math.floor(circleArr[i].x) + circleArr[i].radius)
                &&
                Math.ceil(e.touches[0].clientY) > (Math.floor(circleArr[i].y) - circleArr[i].radius) &&
                Math.ceil(e.touches[0].clientY) < (Math.floor(circleArr[i].y) + circleArr[i].radius) ) {


                // get value from dot add to player score
                playerScore += circleArr[i].value;
                score.innerHTML = playerScore;
                // remove from array
                circleArr.splice( circleArr.indexOf(circleArr[i]), 1 );
                break;
            }
        }
    }

    // add event listener for resize
    window.addEventListener('resize', () => {
        setCanvasSize();
    });

    // listener for removal of the DOTS
    // click
    window.addEventListener('mousedown', removeDotClick);
    // touch
    window.addEventListener('touchstart', removeDotTouch);
}

const loadNextLevel = () => {
    // checks to see if canvas doesnt exist
    if (document.querySelector('canvas') == null){
        // increment level then create canvas
        // createCanvas();
        // cause errors
        if (document.querySelector('.ready') == null){
            currentLevel++;
            readySetGo();
        }
    }
}

const showMainMenu = () => {
    // reset score & level
    let score = document.getElementById("score");
    score.innerHTML = '0';
    playerScore = 0;
    currentLevel = 0;

    // display main menu
    const mainMenu = document.querySelector('.menu');
    mainMenu.style.display = 'block';
}

const showWinScreen = () => {
    const winScreen = document.querySelector('.win-screen');
    winScreen.style.display = 'block';

    const stats = document.getElementById("stats");
    stats.style.textAlign = "center";
    stats.style.position = "inherit";

    const nextBtn = document.querySelector('#next-btn');

    nextBtn.addEventListener('click', () => {
        console.log('next round');
        winScreen.style.display = 'none';
        stats.style.textAlign = "left";
        stats.style.position = "absolute";
        stats.style.display = 'none';
        loadNextLevel();
    });

    const menuBtn = document.querySelectorAll('.menu-btn')[0];
    menuBtn.addEventListener('click', () => {
        // hide win screen & stats
        winScreen.style.display = 'none';
        stats.style.display = 'none';
        stats.style.position = "absolute";

        showMainMenu();
    });
}

const showFinishScreen = () => {
    const finishScreen = document.querySelector('.finish-screen');
    finishScreen.style.display = 'block';

    const stats = document.getElementById("stats");
    stats.style.textAlign = "center";
    stats.style.position = "inherit";

    const bonusBtn = document.querySelector('#bonus-btn');

    bonusBtn.addEventListener('click', () => {
        console.log('next round');
        finishScreen.style.display = 'none';
        stats.style.textAlign = "left";
        stats.style.position = "absolute";
        stats.style.display = 'none';
        loadNextLevel();
    });

    const menuBtn = document.querySelectorAll('.menu-btn')[1];
    menuBtn.addEventListener('click', () => {
        // hide win screen & stats
        finishScreen.style.display = 'none';
        stats.style.display = 'none';
        stats.style.position = "absolute";

        showMainMenu();
    });
}

const showLoseScreen = () => {
    const loseScreen = document.querySelector('.lose-screen');
    loseScreen.style.display = 'block';

    const stats = document.getElementById("stats");
    stats.style.textAlign = "center";
    stats.style.position = "inherit";

    const menuBtn = document.querySelectorAll('.menu-btn')[2];
    menuBtn.addEventListener('click', () => {
        // hide lose screen & stats
        loseScreen.style.display = 'none';
        stats.style.display = 'none';
        stats.style.position = "absolute";

        showMainMenu();
    });

    const tryAgainBtn = document.querySelector('#try-again-btn');

    tryAgainBtn.addEventListener('click', () => {
        // hide lose screen & stats
        loseScreen.style.display = 'none';
        stats.style.position = "absolute";
        stats.style.display = 'none';

        // checks to see if canvas doesnt exist
        if (document.querySelector('canvas') == null){
            if (document.querySelector('.ready') == null){
                readySetGo();
            }
        }

    });

}
