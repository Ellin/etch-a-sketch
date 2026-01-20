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
        pixel.classList.add('ink');
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