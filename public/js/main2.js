// Buttons
let btns = {
  a: 0,
  b: 0,
  reset: 0
}

// Array to store videos
let videos = [];

let imgDom;
let counter = 0;
let accueil;

// Socket initialization
const socket = io()
socket.on('connected', data => console.log('connected'))

socket.on('arduinoData', data => {
  // Converts data into a list of integers
  [btns.a, btns.b, btns.reset] = data.split(',').map(c => parseInt(c));

  if(btns.reset == 1) {
    hideAllVideos()
    counter = 0
    accueil.show()
  }

  // console.log(btns)
  if (btns.a == 1 && btns.b == 1) {
	  accueil.hide();
	  hideAllVideos();
	
    videos[counter].show();
    videos[counter].play();
    console.log(`[Debug] Video ${counter} is playing...`)
  }  
  else {
    videos[counter].pause();
    console.log(`[Debug] Video ${counter} is now hidden`)
  }
});


function onvideoload(){
	accueil.volume(0)
	accueil.autoplay();
	accueil.loop();
	accueil.size(windowWidth,windowHeight);
}

// Helper that creates an image
function showImage(path) {
  let img = document.querySelector(`img[src="${path}"]`)
  if(!img) {
    img = document.createElement("img");
    img.src = path;
    document.body.appendChild(img);
    img.width = windowWidth;
    img.height = windowHeight;
  }
  
  img.style.display = 'block'
}
function hideImage(path) {
  let img = document.querySelector(`img[src="${path}"]`)
	if(img) img.style.display = 'none'
}


// Helper that adds a video element to the videos array
function initVideo(path, hide, finished) {

  // Create video with callback on loaded
  let vid = createVideo(path, () => console.log(`[loader] video "${path}" loaded`));

  vid.size(windowWidth, windowHeight); // Set video size
  vid.volume(0); // Mute video
  
  if (hide) vid.hide(); // Hide video if parameter 'hide' is true
  if (finished) vid.onended(finished); // Ondended function
  
  videos.push(vid); // Add video to the videos array
}

function hideAllVideos() {
  videos.forEach(v => {
    v.hide()
    v.pause()
  })
}

function setup() {
  noCanvas();

	accueil = createVideo('video/accueil.mp4', onvideoload);

  initVideo('video/veht1.mp4', false, () => {
	  showImage('img/imgveht1.png');
    videos[0].hide();
    counter = 1
  });
  initVideo('video/veht2.mp4', true, () => {
		showImage('img/imgveht2.png');
		hideImage('img/imgveht1.png');
		videos[1].hide();
		counter = 2
	});
	initVideo('video/veht3.mp4', true, () => {
		showImage('img/imgveht3.png');
		hideImage('img/imgveht2.png');
		videos[2].hide();
	});
}


function windowResized(){
    videos.forEach(vid => {
        vid.size(windowWidth, windowHeight)
    })
}

/*
function mouseClicked() {
  socketFunction("1,1,0,0");
}
*/