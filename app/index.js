// Styles
import 'styles/index.scss';

// Libs
import debounce from 'debounce';
import Trianglify from 'trianglify';

const canvasWrapper = document.getElementById('trianglify-wrapper');

function addContactMail(address) {
    const mail = atob(address);
    const mailLetters = mail.split('');
    const linkNode = document.getElementById('contact-mail');

    for (let i = 0; i < mailLetters.length; i++) {
        if (Math.floor(Math.random() * 10) % 2) {
            mailLetters[i] = `<span>${mailLetters[i]}</span>`;
        }
    }

    linkNode.href = `mailto:${mail}`;
    linkNode.innerHTML = mailLetters.join('');
}

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

addContactMail(CONTACT_MAIL);
drawPattern();
