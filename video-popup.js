var isVideoDisplayed = false;
//start all ids with "ᙳ嬇㬾".
const videoTemplate = 
"<video id='ᙳ嬇㬾popupvideo' width='320' height='240'>" +
"<source src='vidsrc' type='video/mp4'>" +
"</video>" +
"<button id='ᙳ嬇㬾skipbutton' style='display:none'>skip</button>"
;

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
            isVideoDisplayed = true;
            var hasVideoMetadataLoaded = false;
            var video = document.getElementById('ᙳ嬇㬾popupvideo');
            video.play();
            var shouldTestForMetadataLoad = true;
            function onMetadataLoaded() {
                if(video.duration <= 5) {
                    shouldSkip = false;
                } else if(shouldSkip) {
                    var videoSkipPoint = video.duration - 5;
                    var videoEnded = false;
                    var skipButton = document.getElementById('ᙳ嬇㬾skipbutton');
                    if(!videoEnded) {
                        setInterval(function() {
                        if(video.currentTime >= videoSkipPoint) {
                            skipButton.style.display = 'inline-block';
                        }
                    }, 20);
                    }
                    
                }
            }
        }
    } else {
        console.error('VideoPopup size is not a string or an object. It can be a string (ex. "medium"), or an object (ex. {width:512, height:288})');
    }
    video.onended = function() {
        videoEnded = true;
    }
    video.onloadedmetadata = function() {
        if(shouldTestForMetadataLoad) {
            onMetadataLoaded();
        } else {
            setTimeout(function() {
                if(shouldTestForMetadataLoad) {
                    onMetadataLoaded();
                }
            }, 20);
        }
        
    }
}


