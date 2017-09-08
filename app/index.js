// Styles
import 'styles/index.scss';

// Libs
import debounce from 'debounce';
import Trianglify from 'trianglify';
import mailRedactor from 'mail-redactor';

const canvasWrapper = document.getElementById('trianglify-wrapper');

function addContactMail(address) {
    const mail = atob(address);
    const linkNode = document.getElementById('contact-mail');

    linkNode.href = `mailto:${mail}`;
    linkNode.innerHTML = mailRedactor(mail);
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
