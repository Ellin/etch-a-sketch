"use strict"

const container = document.querySelector('.container');


function generatePixels(gridDimension) {
    for (let i = 0; i < gridDimension ** 2; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.width = ((1/gridDimension) * 100) + '%';
        container.append(pixel);
    }

    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
    pixel.addEventListener('mouseenter', () => {
        const currentPixelColor = pixel.style.backgroundColor;

        if (!currentPixelColor) {
            pixel.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        } else if (currentPixelColor != 'rgb(0, 0, 0)') { // opacity is >= 0.1 and <= 0.9; Note: 'rgba(0, 0, 0, 1)' automatically becomes 'rgb(0, 0, 0)' 
            const opacity = Number(currentPixelColor.slice(14, 17)); // gets opacity: 'rgba(0, 0, 0, 0.2)' --> 0.2
            pixel.style.backgroundColor = `rgba(0, 0, 0, ${opacity + 0.1})`;
        }

    });
});
}

generatePixels(16);


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
