# Video Popup
Video Popup is a simple, lightweight, JavaScript Library that allows you to display a small video or advertsement on *any* webpage.  
It has just one simple function:
```
VideoPopup(url, size, shouldSkip);
```
`url`: String - the url to the video (mp4 only, for now).  
`size`: String or object - The size of the video popup. "small", "medium", or "large", or {width:##, height:##}.  
`shouldSkip`: Boolean - if a skip button should appear after 5 seconds of video (default is `false`).  