"use strict"

const container = document.querySelector('.container');

function generatePixels(gridDimension) {
    for (let i = 0; i < gridDimension ** 2; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.width = ((1/gridDimension) * 100) + '%';
        container.append(pixel);
    }
}

generatePixels(16);

const pixels = document.querySelectorAll('.pixel');

pixels.forEach((pixel) => {
    pixel.addEventListener('mouseenter', () => {
        pixel.classList.add('ink');
    });
});