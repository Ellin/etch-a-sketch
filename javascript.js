"use strict"

const container = document.querySelector('.container');

generatePixels(16);
addGridLines();
addDarkeningEffect();

// Returns true if opaque (i.e. no alpha channel or alpha channel is 1)
// Example inputs: 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 1)',  'rgba(0,0,0,1)' (no spaces), 'rgba(0,0,0,0.1)'
function isOpaque(rgbString) {
    return (!rgbString.includes('rgba') || (rgbString.includes('rgba') &&  parseFloat(rgbString.split(',')[3]) === 1)); 
}

function generatePixels(gridDimension) {
    for (let i = 0; i < gridDimension ** 2; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.width = ((1/gridDimension) * 100) + '%';
        container.append(pixel);
    }
}

// Increase pixel opacity by 10% every time the mouse passes through
function addDarkeningEffect() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
        pixel.addEventListener('mouseenter', () => {
            const currentPixelColor = pixel.style.backgroundColor;

            if (!currentPixelColor) {
                pixel.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            } else if (!isOpaque(currentPixelColor)) { // opacity is >= 0.1 and <= 0.9;
                const opacity = Number(currentPixelColor.slice(-4, -1)); // gets opacity: 'rgba(0, 0, 0, 0.2)' --> 0.2
                pixel.style.backgroundColor = `rgba(0, 0, 0, ${opacity + 0.1})`;
            }
        });
    });
}

const gridSizeForm = document.querySelector('#grid-size-form');

gridSizeForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevents automatic page refresh on form submission
    const gridSizeEl = document.querySelector('#grid-size');
    const gridSize = Number(gridSizeEl.value);

    redrawGrid(gridSize);
});


function clearGrid() {
    container.innerHTML = '';
}

function redrawGrid(gridSize) {
    clearGrid();
    generatePixels(gridSize);
    if (gridlinesToggle.checked) addGridLines();
    addDarkeningEffect();
}


function removeGridLines() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
        pixel.style.border = 'none';
    });
}

function addGridLines() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
        pixel.style.border = '1px solid black';
    });
}


const gridlinesToggle = document.querySelector('#gridlines-toggle');

gridlinesToggle.addEventListener('change', (e) => {
    if (gridlinesToggle.checked) {
        addGridLines();
    } else {
        console.log(gridlinesToggle.checked);
        removeGridLines();
    }
});
