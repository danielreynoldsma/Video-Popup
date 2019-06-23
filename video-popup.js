var isVideoDisplayed = false;
//start all ids with "ᙳ嬇㬾", so as not to mix up with other ids.
const videoTemplate = 
"<video id='ᙳ嬇㬾popupvideo' width='vidwidth' height='vidheight'>" +
"<source src='vidsrc' type='video/mp4'>" +
"</video>" +
"<button id='ᙳ嬇㬾skipbutton' style='display:none'>skip</button>" +
"<div style='display:none' id='ᙳ嬇㬾closebutton'>x</div>"
;

document.head.innerHTML += '<style>#ᙳ嬇㬾popupvideo{display:inline-block;position:absolute;right:0;bottom:0;border:solid #000 1px;box-shadow:2px 2px;margin:4px}#ᙳ嬇㬾skipbutton{position:absolute;right:0;margin:0;width:80px;height:36px;background-color:#666666DD;margin:4px;border:none;cursor:pointer}#ᙳ嬇㬾closebutton{border-radius:50%;color:#fff;background-color:#000;width:20px;height:20px;text-align:center;font-family:Arial,Helvetica,sans-serif;right:4px;margin:4px;position:absolute;cursor:pointer}</style>'

function VideoPopup(url, size, shouldSkip = false) {
    if(!isVideoDisplayed) {
        if(typeof size === 'string') {
            if(size === 'small' || size === 'medium' || size === 'large') {
                if(size === 'small') {
                    size = {width:320, height:240};
                }else if(size === 'medium') {
                    size = {width:480, height:360};
                }else if(size === 'large') {
                    size = {width:640, height:480};
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
                document.body.innerHTML += videoTemplate.replace('vidsrc', url).replace('vidwidth', size.width).replace('vidheight', size.height);
                isVideoDisplayed = true;
                var hasVideoMetadataLoaded = false;
                var video = document.getElementById('ᙳ嬇㬾popupvideo');
                document.getElementById('ᙳ嬇㬾closebutton').style.bottom = size.height - 24 + 'px';
                video.play();
                var shouldTestForMetadataLoad = true;
                var videoEnded = false;
                function onMetadataLoaded() {
                    if(video.duration <= 5) {
                        shouldSkip = false;
                    } else if(shouldSkip) {
                        var videoSkipPoint = video.duration - 5;
                        var skipButton = document.getElementById('ᙳ嬇㬾skipbutton');
                        if(!videoEnded) {
                            if(video.currentTime >= videoSkipPoint) {
                                skipButton.style.bottom = size.height/6 + 'px';
                                skipButton.style.display = 'inline-block';
                            }
                        }
                                
                    }
                    if(videoEnded) {
                        document.getElementById('ᙳ嬇㬾closebutton').style.display = 'inline-block';
                    }  
                }
            }
        } else {
            console.error('VideoPopup size is not a string or an object. It can be a string (ex. "medium"), or an object (ex. {width:512, height:288})');
        }
        video.onended = function() {
            videoEnded = true;
        }
        var i = 0;
        video.onloadedmetadata = function() {
            metadataTest();
            function metadataTest() {
                if(!videoEnded) {
                    if(shouldTestForMetadataLoad) {
                        onMetadataLoaded();
                        setTimeout(metadataTest, 20);
                    } else {
                        setTimeout(metadataTest, 20);
                    }
                }
                onMetadataLoaded();
                
            }
            
        }
    }
    document.getElementById('ᙳ嬇㬾closebutton').addEventListener('click', function() {
        removeElement('ᙳ嬇㬾closebutton');
        removeElement('ᙳ嬇㬾skipbutton');
        removeElement('ᙳ嬇㬾popupvideo');
        isVideoDisplayed = false;
    });
    document.getElementById('ᙳ嬇㬾skipbutton').addEventListener('click', function() {
        video.currentTime = video.duration - 0.01;
    });
}

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}


