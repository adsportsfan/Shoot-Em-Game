const targets = document.querySelectorAll('.target');
const scoreBoard = document.querySelector('.score');
const aims = document.querySelectorAll('.aim');
let lastTarget;
let timeUp = false;
let score = 0;

//create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomTarget(targets){
    const index  = Math.floor(Math.random() * targets.length);
    const target = targets[index];

    //prevent same hole from getting the same number
    if (target === lastTarget){
        return randomTarget(targets);
    }
    lastTarget = target;
    return target;
}

function peep() {
    const time = randomTime(1000, 1000); //get a random time to determine how long mole should peep
    const target = randomTarget(targets); //get the random hole from the randomHole function
    target.classList.add('up'); //add the CSS class so selected mole can "pop up"
    setTimeout(() => {
        target.classList.remove('up'); //make the selected mole "pop down" after a random time
        if(!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000) //show random moles for 15 seconds
}

function wack(e){
    if(!e.isTrusted) return; //** new thing I learned */
    score++;
    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
}

aims.forEach(aim => aim.addEventListener('click', wack))



// hole = target
// holes = targets








