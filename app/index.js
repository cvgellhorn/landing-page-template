// Styles
import 'styles/font.scss';
import 'styles/index.scss';

// Libs
import debounce from 'debounce';
import Trianglify from 'trianglify';

const canvasWrapper = document.getElementById('trianglify-wrapper');

function drawPattern() {
    const pattern = Trianglify({
        width: window.innerWidth,
        height: window.innerHeight,
        x_colors: 'Spectral',
        cell_size: 75
    });

    // const svg = pattern.svg();
    // const serializedSVG = new XMLSerializer().serializeToString(svg);

    // console.log('svg', svg);

    canvasWrapper.innerHTML = '';
    canvasWrapper.appendChild(pattern.canvas());
    // canvasWrapper.style.background = `url(data:image/svg+xml;utf8,${serializedSVG})`;
}

window.addEventListener('resize', debounce(() => {
    drawPattern();
}));

drawPattern();
