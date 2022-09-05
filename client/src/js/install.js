const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible';

    butInstall.addEventListener('click', () => {
        console.log('clicked')
        event.prompt();
        // disable the button once installed
        butInstall.setAttribute('disabled', true);
        butInstall.textContent = 'Installed!';
    });
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('appinstalled', event)
});
