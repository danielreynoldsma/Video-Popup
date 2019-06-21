var isVideoDisplayed = false;
const videoTemplate = 
"<video id='popupvideo' width='320' height='240 controls>" +
"<source src='vidsrc' type'video/mp4'>" +
"</video>";

function VideoPopup(url, size, shouldSkip = false) {
    if(typeof size === 'string') {
        if(size === 'small' || size === 'medium' || size === 'large') {
            if(size === 'small') {
                size = {width:320, height:240};
            }else if(size === 'medium') {
                size = {width:640, height:480};
            }else if(size === 'large') {
                size = {width:1024, height:768};
            }
        } else {
            console.error('VideoPopup size is a string, but is not "small", "medium", or "large".');
        }
    }
    if(typeof size === 'object') {
        if('width' in size) {
            var hasWidth = true;
        } else {
            var hasWidth = false;
        }
        if('height' in size) {
            var hasHeight = true;
        } else {
            var hasHeight = false;
        }
        if(!hasHeight && !hasHeight) {
            console.error('VideoPopup missing width and height parameters in size.');
        }
        if(!hasHeight) {
            console.error('VideoPopup missing height parameter in size.');
        }
        if(!hasWidth) {
            console.error('VideoPopup missing width parameter in size.');
        }
        if(hasHeight && hasWidth) {
            size = {width:size.width, height:size.height};
            document.body.innerHTML += videoTemplate.replace('vidsrc', url);
        }
    } else {
        console.error('VideoPopup size is not a string or an object. It can be a string (ex. "medium"), or an object (ex. {width:512, height:288})');
    }
}

