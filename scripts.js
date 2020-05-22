//get elements

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");

const toggle = player.querySelector(".toggle");
const skipButtons  = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const fullScreen = player.querySelector(".fullscreen");


//functions
//play button toggle
function togglePlay() {
	if(video.paused){ //.paused is a property that lives on the video element - there is no .playing!
		video.play();		
	} else {
		video.pause();
	}
}

//update play button to show whether paused
function updateButton() {
	const icon = this.paused ? '►' :'❚❚';
	toggle.textContent = icon;
}

// video skip buttons
function skip() {
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);  //this.dataset.skip is a string! 
}

//sliders for volume & playback speed
function handleRangeUpdate() {
	video[this.name] = this.value;
	console.log(this.name);
}

// progress bar - works using the flex-basis value!
function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;  //calc percent value
	progressBar.style.flexBasis = `${percent}%`;  //append the style to the progress bar
}

// scrubber
function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // % of current location * duration
	video.currentTime = scrubTime; //update video progress location
}

/* View in fullscreen */
function startFullScreen() {
	if (video.requestFullscreen) {
    	video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
    	video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    	video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
    	video.msRequestFullscreen();
    }
}

/* close fullscreen controls after exit fullscreen */
function closeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) { /* Firefox */
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { /* IE/Edge */
		document.msExitFullscreen();
	}
}

//hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); //listens for when video time changes

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//scrub
//listen for click on video bar, when clicked, get location & update video progress to match
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


//fullscreen button
fullScreen.addEventListener('click', startFullScreen);

