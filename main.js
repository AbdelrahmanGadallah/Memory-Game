let controlDiv = document.querySelector(".control-switch");
let controlBtn = document.querySelector(".control-switch span");
let nameSpan = document.querySelector(".name span");

// set Duration 
let duration = 1000;

controlBtn.onclick = function () {

    let user = prompt("Whats Your Name?");

    if (user == null || user == "") {
        nameSpan.innerHTML = "unkown";
    } else {
        nameSpan.innerHTML = user;
    }
    controlDiv.remove();
}

let blocksContainer = document.querySelector(".blocks-container");
let gameBlocks = Array.from(blocksContainer.children);

let orderRange = Array.from(Array(gameBlocks.length).keys());

// console.log(orderRange);
// trigger shuffle function
createShuffle (orderRange);

// console.log(orderRange);

gameBlocks.forEach(function (block, index) {
    // add random order on each block
    block.style.order = orderRange[index];
    block.onclick = function () {
        
        // trigger filp block function
        createFlipBlock (block);
    }
});

// create shufle function

function createShuffle (arr) {

 let current = arr.length;

 while (current > 0) {

    let random = Math.floor(Math.random() * current);
    current--;
    
    let temp = arr[current];
    arr[current] = arr[random];
    arr[random] = temp;
 }
 return arr;
};


// 1- create flip block function

function createFlipBlock (selectedBlock) {

    selectedBlock.classList.add("is-flipped");

    // filter selected blocks
    let allFlippedBlocks = gameBlocks.filter(block => block.classList.contains("is-flipped"));
    
    // add no click on container
    if (allFlippedBlocks.length === 2) {
        stopClicking ();
        checkFlippedBlocks (allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

//create stopClicking function
function stopClicking () {

    blocksContainer.classList.add("no-click");
        
    setTimeout (() => {

        blocksContainer.classList.remove("no-click");
    }, duration)
}

// check filpped blocks function
function checkFlippedBlocks (firstBlock, secondBlock) {

    if (firstBlock.dataset.character === secondBlock.dataset.character) {

        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-matched");
        secondBlock.classList.add("has-matched");
        document.querySelector("#succed").play();
    } else {

        setTimeout (() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration)
        document.querySelector("#failed").play();
        let tries = document.querySelector(".tries span");
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
    };
};