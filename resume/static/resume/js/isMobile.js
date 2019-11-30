console.log(7);
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var elem = $('.hvr-glow')
    elem.addClass('mobile');
    alert("Hello there, I see you are viewing this on a mobile device.  While this site will still work on a mobile, I would recommend viewing on a traditional computer for a better user experience for now. When I have some free time I will make this site fully responsive to the screen size of the viewer's device.  --Mike")
}
