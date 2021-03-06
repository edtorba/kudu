'use strict';

function Fullscreen(btn) {
    this.btn = document.querySelector(btn);
    this.toggleFullscreen();
};

Fullscreen.prototype.toggleFullscreen = function() {
    this.btn.onclick = function(e) {
        e.preventDefault();

        toggleClass(this, 'icon--resize-full');
        toggleClass(this, 'icon--resize-small');

        // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
        if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods

            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }

        } else {

            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }

        }
    }
};