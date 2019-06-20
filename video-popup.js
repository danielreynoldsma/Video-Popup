VideoPopup('C:\\Users\\DJRco_000\\Videos\\Roblox\\robloxapp-20170828-1334197.wmv');

function VideoPopup(url, skip) {
    if(skip === undefined) {
        skip = 'false';
    }
    window.alert(skip);
}

document.getElementById('popupvid').addEventListener('click', VideoPopup('C:\\Users\\DJRco_000\\Videos\\Roblox\\robloxapp-20170828-1334197.wmv'));