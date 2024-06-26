document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const progressSlider = document.getElementById('progressSlider');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');    
    const backBtn = document.getElementById('backBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const speedBtn = document.getElementById('speedBtn');
    const speedOptions = document.getElementById('speedOptions');
    const speedOptionButtons = document.querySelectorAll('.speed-option');

    backBtn.addEventListener('click', function() {
        audioPlayer.currentTime -= 15;
    });

    pauseBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            pauseBtn.src = 'pause.png';
        } else {
            audioPlayer.pause();
            pauseBtn.src = 'play.png';
        }
    });

    forwardBtn.addEventListener('click', function() {
        audioPlayer.currentTime += 15;
    });

    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = volumeSlider.value;
    });

        // Update progress slider as audio plays
    audioPlayer.addEventListener('timeupdate', function () {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressSlider.value = progress;
        });
    
        // Seek to the selected position when the progress slider is adjusted
    progressSlider.addEventListener('input', function () {
    const seekTime = (audioPlayer.duration / 100) * progressSlider.value;
    audioPlayer.currentTime = seekTime;
        });

    audioPlayer.addEventListener('loadedmetadata', function() {
    const totalMinutes = Math.floor(audioPlayer.duration / 60);
    const totalSeconds = Math.floor(audioPlayer.duration % 60);
        
    totalTimeDisplay.textContent = `-${totalMinutes < 10 ? '0' : ''}${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
        });
        
    audioPlayer.addEventListener('timeupdate', function() {
    // Update current time display as audio plays
    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
        
    currentTimeDisplay.textContent = `${currentMinutes < 10 ? '0' : ''}${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        });

          // Handle speed button click
    speedBtn.addEventListener('click', function() {
        speedOptions.style.display = (speedOptions.style.display === 'block') ? 'none' : 'block';
    });

    // Handle speed option selection
    speedOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const speed = parseFloat(this.getAttribute('data-speed'));
            audioPlayer.playbackRate = speed;
            speedBtn.textContent = `${speed}×`;
            speedOptions.style.display = 'none';
        });
    });

    // Hide speed options if clicked outside
    document.addEventListener('click', function(event) {
        if (!speedBtn.contains(event.target) && !speedOptions.contains(event.target)) {
            speedOptions.style.display = 'none';
        }
    });
    });
    
    
