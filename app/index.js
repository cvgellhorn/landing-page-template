// Styles
import 'styles/index.scss';

// Libs
import debounce from 'debounce';
import Trianglify from 'trianglify';

const canvasWrapper = document.getElementById('trianglify-wrapper');

function drawPattern() {
    const pattern = Trianglify({
        width: window.innerWidth,
        height: window.innerHeight,
        x_colors: 'PuOr',
        cell_size: 40
    });

    canvasWrapper.innerHTML = '';
    canvasWrapper.appendChild(pattern.canvas());
}

window.addEventListener('resize', debounce(() => {
    drawPattern();
}));

drawPattern();
